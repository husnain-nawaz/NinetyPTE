import { useEffect, useRef, useState } from 'react';
import { Play, Volume2 } from 'lucide-react';
import SpeakingRecorderWidget from './SpeakingRecorderWidget';

const WAVE_HEIGHTS = [16, 24, 12, 22, 26, 14, 20, 24, 12, 18, 8, 10, 12, 16, 10, 14, 8, 12, 18];

/**
 * Combined PTE audio-prompt Speaking stage (Repeat Sentence, Re-Tell Lecture, Answer Short Question,
 * Respond to a Situation): countdown -> automatic audio playback -> automatic microphone recording.
 */
export default function AudioPromptSpeakingStage({
  promptSpeechText,
  recordSeconds = 15,
  darkMode = false,
  initialCompleted = false,
  onPhaseChange,
  onCompleteRecording,
}) {
  const [clipPhase, setClipPhase] = useState(initialCompleted ? 'done' : 'delay'); // 'delay' | 'playing' | 'done'
  const [delayLeft, setDelayLeft] = useState(5);
  const [playElapsed, setPlayElapsed] = useState(0);
  const [volume, setVolume] = useState(85);
  const [recPhase, setRecPhase] = useState(initialCompleted ? 'complete' : 'recording');
  const [recLeft, setRecLeft] = useState(initialCompleted ? 0 : recordSeconds);
  const [waveTick, setWaveTick] = useState(0);

  const playDuration = 4;
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (initialCompleted) {
      onPhaseChange?.('complete');
      return;
    }
    if (clipPhase !== 'done') {
      onPhaseChange?.('prep');
    } else {
      onPhaseChange?.(recPhase);
    }
  }, [initialCompleted, clipPhase, recPhase, onPhaseChange]);

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
    setRecPhase('recording');
    setRecLeft(recordSeconds);

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
      // Proceed gracefully with visual recorder UI when hardware mic is absent
    }
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
      // Continue silently with visual progress if speechSynthesis unavailable
    }
  };

  // Handle delay countdown and playback progress automatically
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
          startAutoRecording();
          return playDuration;
        });
      }
    }, 1000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clipPhase]);

  // Handle recording timer once clip completes
  useEffect(() => {
    if (clipPhase !== 'done' || recPhase !== 'recording') return undefined;

    const timer = setInterval(() => {
      setRecLeft((prev) => {
        if (prev > 1) return prev - 1;
        try {
          if (recorderRef.current && recorderRef.current.state !== 'inactive') {
            recorderRef.current.stop();
          }
        } catch {
          // Ignore stop errors
        }
        setRecPhase('complete');
        onCompleteRecording?.();
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [clipPhase, recPhase, onCompleteRecording]);

  useEffect(() => {
    if (clipPhase !== 'done' || recPhase !== 'recording') return undefined;
    const anim = setInterval(() => setWaveTick((t) => t + 1), 150);
    return () => clearInterval(anim);
  }, [clipPhase, recPhase]);

  const progressPct =
    clipPhase === 'done'
      ? 100
      : clipPhase === 'playing'
        ? Math.min(100, Math.round((playElapsed / playDuration) * 100))
        : 0;

  if (initialCompleted) {
    return (
      <SpeakingRecorderWidget
        prepSeconds={0}
        recordSeconds={recordSeconds}
        darkMode={darkMode}
        initialCompleted
      />
    );
  }

  return (
    <div className="space-y-10 flex flex-col items-center">
      {/* Classic Pearson Blue Audio Player Box */}
      <div className="w-[290px] rounded-xs bg-[#3792b5] text-white px-5 py-4 space-y-5 shadow-md">
        <div className="text-right text-xs font-mono h-4">
          {clipPhase === 'playing' ? `00:0${playElapsed}` : ''}
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

      {/* Bottom Microphone Status Indicator */}
      {clipPhase !== 'done' ? (
        <div className="flex items-center justify-center gap-3 py-2">
          <span className="w-11 h-11 rounded-full border-[3px] border-zinc-400 flex items-center justify-center shrink-0">
            <span className="w-4 h-4 rounded-full bg-zinc-400" />
          </span>
          <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-300' : 'text-zinc-500'}`}>
            Ready
          </span>
        </div>
      ) : recPhase === 'recording' ? (
        <div className="py-2 flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full border-[3px] border-[#f25c5c] flex items-center justify-center shrink-0">
              <span className="w-4 h-4 rounded-full bg-[#f25c5c] animate-pulse" />
            </span>
            <div className="space-y-1">
              <p className={`text-[11px] font-semibold ${darkMode ? 'text-zinc-300' : 'text-zinc-400'}`}>
                Recording
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5 h-6">
                  {WAVE_HEIGHTS.map((h, idx) => {
                    const active = (idx + waveTick) % 5 < 3;
                    const barH = active ? ((h + waveTick * 2) % 20) + 6 : 3;
                    return (
                      <span
                        key={idx}
                        className="w-[2.5px] rounded-full bg-[#0f7496] transition-all duration-150"
                        style={{ height: `${barH}px` }}
                      />
                    );
                  })}
                </div>
                <span className={`text-xs font-mono font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  00:{String(recLeft).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setRecPhase('complete');
              setRecLeft(0);
              onCompleteRecording?.();
            }}
            className={`text-[11px] font-semibold underline cursor-pointer transition ${
              darkMode ? 'text-sky-300 hover:text-sky-200' : 'text-[#0d6f8c] hover:text-[#095368]'
            }`}
          >
            Finish speaking
          </button>
        </div>
      ) : (
        <div className="py-2 flex items-center justify-center gap-3">
          <span className="w-11 h-11 rounded-full border-[3px] border-zinc-400 flex items-center justify-center shrink-0">
            <span className="w-4 h-4 rounded-full bg-zinc-400" />
          </span>
          <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-300' : 'text-zinc-500'}`}>
            Complete
          </span>
          <span className="h-[1px] w-20 bg-zinc-400 inline-block" />
        </div>
      )}
    </div>
  );
}
