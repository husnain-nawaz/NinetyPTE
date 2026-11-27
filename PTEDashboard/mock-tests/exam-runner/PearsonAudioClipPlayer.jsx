import { useEffect, useState } from 'react';
import { Play, Volume2 } from 'lucide-react';
import { formatMMSS } from './mockTestSessionStore';

/**
 * Reusable Pearson-style blue (#3792b5) audio prompt box used across
 * Speaking audio items and all Listening mock test items.
 */
export default function PearsonAudioClipPlayer({
  promptSpeechText,
  delaySeconds = 6,
  playDuration = 6,
  initialCompleted = false,
  onStartPlayback,
  onCompletePlayback,
}) {
  const [clipPhase, setClipPhase] = useState(initialCompleted ? 'done' : 'delay'); // 'delay' | 'playing' | 'done'
  const [delayLeft, setDelayLeft] = useState(delaySeconds);
  const [playElapsed, setPlayElapsed] = useState(0);
  const [volume, setVolume] = useState(85);

  useEffect(() => {
    return () => {
      try {
        window.speechSynthesis?.cancel();
      } catch {
        // Ignore speech synthesis cleanup errors
      }
    };
  }, []);

  const triggerPlayNow = () => {
    setClipPhase('playing');
    setPlayElapsed(1);
    onStartPlayback?.();

    try {
      if ('speechSynthesis' in window && promptSpeechText) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(promptSpeechText);
        utterance.volume = Math.max(0.1, volume / 100);
        utterance.rate = 0.96;
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Fallback silently when SpeechSynthesis is restricted
    }
  };

  useEffect(() => {
    if (clipPhase === 'done') return undefined;

    const timer = setInterval(() => {
      if (clipPhase === 'delay') {
        setDelayLeft((prev) => {
          if (prev > 1) return prev - 1;
          triggerPlayNow();
          return 0;
        });
      } else if (clipPhase === 'playing') {
        setPlayElapsed((prev) => {
          if (prev < playDuration) return prev + 1;
          setClipPhase('done');
          onCompletePlayback?.();
          return playDuration;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clipPhase, playDuration]);

  const progressPct =
    clipPhase === 'done'
      ? 100
      : clipPhase === 'playing'
        ? Math.min(100, Math.round((playElapsed / Math.max(1, playDuration)) * 100))
        : 0;

  return (
    <div className="w-[290px] rounded-xs bg-[#3792b5] text-white px-5 py-4 space-y-5 shadow-md">
      <div className="text-right text-xs font-mono h-4">
        {clipPhase === 'playing' ? formatMMSS(playElapsed) : ''}
      </div>

      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => {
            if (clipPhase === 'delay') triggerPlayNow();
          }}
          aria-label="Audio clip indicator"
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
          aria-label="Audio volume slider"
          className="w-32 h-1.5 accent-white cursor-pointer"
        />
      </div>
    </div>
  );
}
