import { useEffect, useRef, useState } from 'react';

const WAVE_HEIGHTS = [16, 24, 12, 22, 26, 14, 20, 24, 12, 18, 8, 10, 12, 16, 10, 14, 8, 12, 18];

/**
 * Shared Pearson-style countdown + automatic microphone recorder visual widget
 * used by Personal Introduction and all Speaking exam questions.
 */
export default function SpeakingRecorderWidget({
  prepSeconds = 12,
  recordSeconds = 35,
  darkMode = false,
  initialCompleted = false,
  onPhaseChange,
  onCompleteRecording,
}) {
  const [phase, setPhase] = useState(initialCompleted ? 'complete' : 'prep'); // 'prep' | 'recording' | 'complete'
  const [secondsLeft, setSecondsLeft] = useState(initialCompleted ? 0 : prepSeconds);
  const [waveTick, setWaveTick] = useState(0);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  useEffect(() => {
    return () => {
      try {
        if (recorderRef.current && recorderRef.current.state !== 'inactive') {
          recorderRef.current.stop();
        }
      } catch {
        // Ignore recorder cleanup issues
      }
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const beginRecording = async () => {
    setPhase('recording');
    setSecondsLeft(recordSeconds);

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
      // Allow UI countdown & waveform recording gracefully when mic permission is absent
    }
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
    setSecondsLeft(0);
    onCompleteRecording?.();
  };

  useEffect(() => {
    if (phase === 'complete') return undefined;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;
        if (phase === 'prep') {
          beginRecording();
          return recordSeconds;
        }
        finishRecording();
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, recordSeconds]);

  useEffect(() => {
    if (phase !== 'recording') return undefined;
    const anim = setInterval(() => setWaveTick((t) => t + 1), 150);
    return () => clearInterval(anim);
  }, [phase]);

  if (phase === 'prep') {
    return (
      <div className="py-4 flex flex-col items-center justify-center gap-2.5">
        <div className="flex items-center gap-3.5">
          <span
            className={`w-11 h-11 rounded-full border-[3px] flex items-center justify-center text-sm font-bold ${
              darkMode ? 'border-zinc-200 text-white' : 'border-zinc-400 text-slate-700'
            }`}
          >
            {secondsLeft}
          </span>
          <span className={`text-xs sm:text-[13px] font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-500'}`}>
            Recording in {secondsLeft} sec
          </span>
        </div>
        <button
          type="button"
          onClick={beginRecording}
          className={`text-[11px] font-semibold underline cursor-pointer transition ${
            darkMode ? 'text-sky-300 hover:text-sky-200' : 'text-[#0d6f8c] hover:text-[#095368]'
          }`}
        >
          Start recording now
        </button>
      </div>
    );
  }

  if (phase === 'recording') {
    return (
      <div className="py-4 flex flex-col items-center justify-center gap-2.5">
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
                00:{String(secondsLeft).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={finishRecording}
          className={`text-[11px] font-semibold underline cursor-pointer transition ${
            darkMode ? 'text-sky-300 hover:text-sky-200' : 'text-[#0d6f8c] hover:text-[#095368]'
          }`}
        >
          Stop recording
        </button>
      </div>
    );
  }

  return (
    <div className="py-4 flex items-center justify-center gap-3">
      <span className="w-11 h-11 rounded-full border-[3px] border-zinc-400 flex items-center justify-center shrink-0">
        <span className="w-4 h-4 rounded-full bg-zinc-400" />
      </span>
      <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-300' : 'text-zinc-500'}`}>
        Complete
      </span>
      <span className="h-[1px] w-20 bg-zinc-400 inline-block" />
    </div>
  );
}
