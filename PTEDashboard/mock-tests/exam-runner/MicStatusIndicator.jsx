import { formatMMSS } from './mockTestSessionStore';

const WAVE_HEIGHTS = [16, 24, 12, 22, 26, 14, 20, 24, 12, 18, 8, 10, 12, 16, 10, 14, 8, 12, 18];

/**
 * Unified microphone visual status indicator shared across Speaking tasks:
 * 'ready' -> 'prep' -> 'loading' (1s green) -> 'recording' (red) -> 'complete'.
 */
export default function MicStatusIndicator({
  phase,
  prepSecondsLeft = 0,
  recordSecondsLeft = 0,
  waveTick = 0,
  darkMode = false,
  onStartRecordingNow,
  onFinishRecording,
}) {
  if (phase === 'ready') {
    return (
      <div className="py-3 flex items-center justify-center gap-3">
        <span className="w-11 h-11 rounded-full border-[3px] border-zinc-400 flex items-center justify-center shrink-0">
          <span className="w-4 h-4 rounded-full bg-zinc-400" />
        </span>
        <span className={`text-xs font-semibold ${darkMode ? 'text-zinc-300' : 'text-zinc-500'}`}>
          Ready
        </span>
      </div>
    );
  }

  if (phase === 'prep') {
    return (
      <div className="py-3 flex flex-col items-center justify-center gap-2.5">
        <div className="flex items-center gap-3.5">
          <span
            className={`w-11 h-11 rounded-full border-[3px] flex items-center justify-center text-sm font-bold ${
              darkMode ? 'border-zinc-200 text-white' : 'border-zinc-400 text-slate-700'
            }`}
          >
            {prepSecondsLeft}
          </span>
          <span className={`text-xs sm:text-[13px] font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-500'}`}>
            Recording in {prepSecondsLeft} sec
          </span>
        </div>
        {onStartRecordingNow && (
          <button
            type="button"
            onClick={onStartRecordingNow}
            className={`text-[11px] font-semibold underline cursor-pointer transition ${
              darkMode ? 'text-sky-300 hover:text-sky-200' : 'text-[#0d6f8c] hover:text-[#095368]'
            }`}
          >
            Start recording now
          </button>
        )}
      </div>
    );
  }

  if (phase === 'loading') {
    return (
      <div className="py-3 flex items-center justify-center gap-3">
        <span className="w-11 h-11 rounded-full border-[3px] border-[#39d353] flex items-center justify-center shrink-0">
          <span className="w-4 h-4 rounded-full bg-[#39d353] animate-pulse" />
        </span>

        <div className="space-y-1">
          <p className={`text-[11px] font-semibold ${darkMode ? 'text-zinc-300' : 'text-zinc-400'}`}>
            Loading
          </p>
          <div className="flex items-center gap-6">
            <span className="tracking-[3px] text-xs font-bold text-[#0f7496]">.......</span>
            <span className={`text-xs font-mono font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-500'}`}>
              {formatMMSS(recordSecondsLeft)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'recording') {
    return (
      <div className="py-3 flex flex-col items-center justify-center gap-2.5">
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
                {formatMMSS(recordSecondsLeft)}
              </span>
            </div>
          </div>
        </div>

        {onFinishRecording && (
          <button
            type="button"
            onClick={onFinishRecording}
            className={`text-[11px] font-semibold underline cursor-pointer transition ${
              darkMode ? 'text-sky-300 hover:text-sky-200' : 'text-[#0d6f8c] hover:text-[#095368]'
            }`}
          >
            Stop recording
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="py-3 flex items-center justify-center gap-3">
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
