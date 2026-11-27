import { useEffect, useRef, useState } from 'react';
import { Play, Volume2 } from 'lucide-react';
import MicStatusIndicator from './MicStatusIndicator';
import { formatMMSS } from './mockTestSessionStore';

/**
 * Unified audio-prompt Speaking stage (Repeat Sentence, Re-Tell Lecture, Answer Short Question,
 * Summarize Group Discussion, Respond to a Situation): delay -> audio playback -> optional post-clip prep
 * -> 1s green Loading -> red Recording -> Complete. Optionally renders an accompanying lecture/discussion image.
 */
export default function AudioPromptSpeakingStage({
  promptSpeechText,
  playDuration = 4,
  postClipPrepSeconds = 0,
  recordSeconds = 15,
  sideImage = null,
  darkMode = false,
  initialCompleted = false,
  onPhaseChange,
  onCompleteRecording,
}) {
  const [clipPhase, setClipPhase] = useState(initialCompleted ? 'done' : 'delay'); // 'delay' | 'playing' | 'done'
  const [delayLeft, setDelayLeft] = useState(5);
  const [playElapsed, setPlayElapsed] = useState(0);
  const [volume, setVolume] = useState(85);
  const [micPhase, setMicPhase] = useState(initialCompleted ? 'complete' : 'ready'); // 'ready' | 'prep' | 'loading' | 'recording' | 'complete'
  const [prepLeft, setPrepLeft] = useState(postClipPrepSeconds);
  const [recLeft, setRecLeft] = useState(initialCompleted ? 0 : recordSeconds);
  const [recordingElapsed, setRecordingElapsed] = useState(initialCompleted ? recordSeconds : 0);
  const [waveTick, setWaveTick] = useState(0);

  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (initialCompleted) {
      onPhaseChange?.({ phase: 'complete', recordingElapsed: recordSeconds });
      return;
    }
    if (clipPhase !== 'done') {
      onPhaseChange?.({ phase: 'prep', recordingElapsed: 0 });
    } else {
      onPhaseChange?.({ phase: micPhase, recordingElapsed });
    }
  }, [initialCompleted, clipPhase, micPhase, recordingElapsed, recordSeconds, onPhaseChange]);

  useEffect(
    () => () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {
        // Ignore TTS cleanup issues
      }
      try {
        if (recorderRef.current && recorderRef.current.state !== 'inactive') {
          recorderRef.current.stop();
        }
      } catch {
        // Ignore recorder cleanup
      }
      streamRef.current?.getTracks().forEach((tr) => tr.stop());
    },
    []
  );

  const startAutoRecording = async () => {
    setMicPhase('recording');
    setRecLeft(recordSeconds);
    setRecordingElapsed(0);

    try {
      if (navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        recorder.onstop = () => {
          stream.getTracks().forEach((tr) => tr.stop());
          streamRef.current = null;
        };
        recorder.start();
        recorderRef.current = recorder;
      }
    } catch {
      // Visual recorder state runs cleanly even without physical microphone permissions
    }
  };

  const triggerLoadingThenRecord = () => {
    setMicPhase('loading');
    setRecLeft(recordSeconds);
  };

  const finishRecording = () => {
    try {
      if (recorderRef.current && recorderRef.current.state !== 'inactive') {
        recorderRef.current.stop();
      }
    } catch {
      // Ignore stop errors
    }
    setMicPhase('complete');
    setRecLeft(0);
    onCompleteRecording?.();
  };

  const triggerAudioClipPlay = () => {
    setClipPhase('playing');
    setPlayElapsed(1);

    try {
      if ('speechSynthesis' in window && promptSpeechText) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(promptSpeechText);
        utterance.volume = Math.max(0.1, volume / 100);
        utterance.rate = 0.98;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Fallback gracefully if speechSynthesis is blocked
    }
  };

  // Drive audio clip delay & playback phases
  useEffect(() => {
    if (clipPhase === 'done') return undefined;

    const id = setInterval(() => {
      if (clipPhase === 'delay') {
        setDelayLeft((prev) => {
          if (prev > 1) return prev - 1;
          triggerAudioClipPlay();
          return 0;
        });
      } else if (clipPhase === 'playing') {
        setPlayElapsed((prev) => {
          if (prev < playDuration) return prev + 1;
          setClipPhase('done');
          if (postClipPrepSeconds > 0) {
            setMicPhase('prep');
            setPrepLeft(postClipPrepSeconds);
          } else {
            triggerLoadingThenRecord();
          }
          return playDuration;
        });
      }
    }, 1000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clipPhase]);

  // Drive post-clip prep -> 1s green Loading -> Recording -> Complete
  useEffect(() => {
    if (clipPhase !== 'done') return undefined;

    if (micPhase === 'prep') {
      const id = setInterval(() => {
        setPrepLeft((prev) => {
          if (prev > 1) return prev - 1;
          triggerLoadingThenRecord();
          return 0;
        });
      }, 1000);
      return () => clearInterval(id);
    }

    if (micPhase === 'loading') {
      const loadingTimer = setTimeout(() => {
        startAutoRecording();
      }, 1000);
      return () => clearTimeout(loadingTimer);
    }

    if (micPhase === 'recording') {
      const timer = setInterval(() => {
        setRecordingElapsed((e) => e + 1);
        setRecLeft((prev) => {
          if (prev > 1) return prev - 1;
          finishRecording();
          return 0;
        });
      }, 1000);
      return () => clearInterval(timer);
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clipPhase, micPhase, recordSeconds]);

  useEffect(() => {
    if (micPhase !== 'recording') return undefined;
    const anim = setInterval(() => setWaveTick((t) => t + 1), 150);
    return () => clearInterval(anim);
  }, [micPhase]);

  const progressPct =
    clipPhase === 'done'
      ? 100
      : clipPhase === 'playing'
        ? Math.min(100, Math.round((playElapsed / playDuration) * 100))
        : 0;

  const rightPanelContent = (
    <div className="space-y-9 flex flex-col items-center">
      {!initialCompleted && (
        <div className="w-[290px] rounded-xs bg-[#3792b5] text-white px-5 py-4 space-y-5 shadow-md">
          <div className="text-right text-xs font-mono h-4">
            {clipPhase === 'playing' ? formatMMSS(playElapsed) : ''}
          </div>

          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => {
                if (clipPhase === 'delay') triggerAudioClipPlay();
              }}
              aria-label="Prompt audio indicator"
              className="text-white pt-0.5 shrink-0 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
            </button>

            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-full bg-white/95 border border-[#1d6e8f] overflow-hidden">
                <div
                  className="h-full bg-[#0997d6] transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-[11px] text-white/95">
                {clipPhase === 'delay'
                  ? `The clip will begin in ${delayLeft} seconds`
                  : clipPhase === 'playing'
                    ? 'Playing...'
                    : 'Completed'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-1">
            <Volume2 className="w-5 h-5 text-white shrink-0" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Prompt audio volume"
              className="w-32 h-1.5 accent-white cursor-pointer"
            />
          </div>
        </div>
      )}

      <MicStatusIndicator
        phase={initialCompleted ? 'complete' : micPhase}
        prepSecondsLeft={prepLeft}
        recordSecondsLeft={recLeft}
        waveTick={waveTick}
        darkMode={darkMode}
        onStartRecordingNow={
          clipPhase === 'done' && micPhase === 'prep' ? triggerLoadingThenRecord : undefined
        }
        onFinishRecording={micPhase === 'recording' ? finishRecording : undefined}
      />
    </div>
  );

  if (sideImage) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 pt-2">
        <div className="md:col-span-6 flex justify-center md:justify-start">
          <div className="p-2 rounded-xs bg-white shadow-sm border border-slate-200/70">
            <img
              src={sideImage.src}
              alt={sideImage.alt}
              className={
                sideImage.isIcon
                  ? 'w-56 h-56 p-3 object-contain'
                  : 'w-full max-w-[420px] max-h-[300px] object-cover'
              }
            />
          </div>
        </div>
        <div className="md:col-span-6 flex justify-center">{rightPanelContent}</div>
      </div>
    );
  }

  return rightPanelContent;
}
