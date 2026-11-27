import { useEffect, useRef, useState } from 'react';
import MicStatusIndicator from './MicStatusIndicator';

/**
 * Countdown + 1-second green Loading state + automatic microphone recorder widget
 * used by Personal Introduction, Read Aloud, and Describe Image.
 */
export default function SpeakingRecorderWidget({
  prepSeconds = 12,
  recordSeconds = 35,
  darkMode = false,
  initialCompleted = false,
  onPhaseChange,
  onCompleteRecording,
}) {
  const [phase, setPhase] = useState(initialCompleted ? 'complete' : 'prep'); // 'prep' | 'loading' | 'recording' | 'complete'
  const [prepLeft, setPrepLeft] = useState(initialCompleted ? 0 : prepSeconds);
  const [recLeft, setRecLeft] = useState(initialCompleted ? 0 : recordSeconds);
  const [recordingElapsed, setRecordingElapsed] = useState(initialCompleted ? recordSeconds : 0);
  const [waveTick, setWaveTick] = useState(0);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    onPhaseChange?.({ phase, recordingElapsed });
  }, [phase, recordingElapsed, onPhaseChange]);

  useEffect(
    () => () => {
      try {
        if (recorderRef.current && recorderRef.current.state !== 'inactive') {
          recorderRef.current.stop();
        }
      } catch {
        // Ignore recorder cleanup issues
      }
      streamRef.current?.getTracks().forEach((t) => t.stop());
    },
    []
  );

  const beginMicrophoneStream = async () => {
    setPhase('recording');
    setRecLeft(recordSeconds);
    setRecordingElapsed(0);

    try {
      if (navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const recorder = new MediaRecorder(stream);
        recorder.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
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
    setPhase('loading');
    setRecLeft(recordSeconds);
  };

  const finishRecording = () => {
    try {
      if (recorderRef.current && recorderRef.current.state !== 'inactive') {
        recorderRef.current.stop();
      }
    } catch {
      // Ignore stop failures
    }
    setPhase('complete');
    setRecLeft(0);
    onCompleteRecording?.();
  };

  useEffect(() => {
    if (phase === 'prep') {
      const id = setInterval(() => {
        setPrepLeft((prev) => {
          if (prev > 1) return prev - 1;
          triggerLoadingThenRecord();
          return 0;
        });
      }, 1000);
      return () => clearInterval(id);
    }

    if (phase === 'loading') {
      const loadingTimer = setTimeout(() => {
        beginMicrophoneStream();
      }, 1000);
      return () => clearTimeout(loadingTimer);
    }

    if (phase === 'recording') {
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
  }, [phase, recordSeconds]);

  useEffect(() => {
    if (phase !== 'recording') return undefined;
    const anim = setInterval(() => setWaveTick((t) => t + 1), 150);
    return () => clearInterval(anim);
  }, [phase]);

  return (
    <MicStatusIndicator
      phase={phase}
      prepSecondsLeft={prepLeft}
      recordSecondsLeft={recLeft}
      waveTick={waveTick}
      darkMode={darkMode}
      onStartRecordingNow={phase === 'prep' ? triggerLoadingThenRecord : undefined}
      onFinishRecording={phase === 'recording' ? finishRecording : undefined}
    />
  );
}
