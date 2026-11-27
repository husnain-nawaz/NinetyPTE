import { useCallback, useEffect, useRef, useState } from 'react';
import MicStatusIndicator from './MicStatusIndicator';
import PearsonAudioClipPlayer from './PearsonAudioClipPlayer';

/**
 * Unified audio-prompt Speaking stage (Repeat Sentence, Re-Tell Lecture, Answer Short Question,
 * Summarize Group Discussion, Respond to a Situation) reusing PearsonAudioClipPlayer and
 * MicStatusIndicator across delay -> audio -> optional post-clip prep -> 1s green Loading -> Recording.
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
  const [clipDone, setClipDone] = useState(initialCompleted);
  const [micPhase, setMicPhase] = useState(initialCompleted ? 'complete' : 'ready');
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
    if (!clipDone) {
      onPhaseChange?.({ phase: 'prep', recordingElapsed: 0 });
    } else {
      onPhaseChange?.({ phase: micPhase, recordingElapsed });
    }
  }, [initialCompleted, clipDone, micPhase, recordingElapsed, recordSeconds, onPhaseChange]);

  useEffect(
    () => () => {
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
      // Allow interactive visual recording when physical microphone permission is absent
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

  const handleClipCompleted = useCallback(() => {
    setClipDone(true);
    if (postClipPrepSeconds > 0) {
      setMicPhase('prep');
      setPrepLeft(postClipPrepSeconds);
    } else {
      setMicPhase('loading');
      setRecLeft(recordSeconds);
    }
  }, [postClipPrepSeconds, recordSeconds]);

  useEffect(() => {
    if (!clipDone) return undefined;

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
  }, [clipDone, micPhase, recordSeconds]);

  useEffect(() => {
    if (micPhase !== 'recording') return undefined;
    const anim = setInterval(() => setWaveTick((t) => t + 1), 150);
    return () => clearInterval(anim);
  }, [micPhase]);

  const rightPanelContent = (
    <div className="space-y-9 flex flex-col items-center">
      {!initialCompleted && (
        <PearsonAudioClipPlayer
          promptSpeechText={promptSpeechText}
          delaySeconds={5}
          playDuration={playDuration}
          onCompletePlayback={handleClipCompleted}
        />
      )}

      <MicStatusIndicator
        phase={initialCompleted ? 'complete' : micPhase}
        prepSecondsLeft={prepLeft}
        recordSecondsLeft={recLeft}
        waveTick={waveTick}
        darkMode={darkMode}
        onStartRecordingNow={
          clipDone && micPhase === 'prep' ? triggerLoadingThenRecord : undefined
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
