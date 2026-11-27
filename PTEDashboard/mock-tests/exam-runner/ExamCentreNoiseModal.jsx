import { useEffect, useRef, useState } from 'react';
import { AudioLines, FileText, LayoutGrid, Mic, Pause, Play, Volume2, X } from 'lucide-react';

const SAMPLE_WAVE_BARS = [
  5, 9, 6, 13, 10, 7, 15, 11, 8, 14, 9, 12, 6, 13, 8, 11, 15, 7, 12, 9, 6, 14, 10, 8, 12, 6, 9,
];

const NOISE_SCOPES = [
  {
    id: 'question',
    title: 'Only this question',
    subtitle: 'Play background noise for the current question only.',
    Icon: FileText,
  },
  {
    id: 'type',
    title: 'This question type',
    subtitle: 'Use background noise for all questions of this type.',
    Icon: LayoutGrid,
  },
  {
    id: 'module',
    title: 'Complete speaking module',
    subtitle: 'Use background noise for all speaking questions.',
    Icon: Mic,
  },
];

/**
 * Interactive Exam Centre Noise modal allowing learners to preview ambient noise
 * and enable simulated room background noise for the question, type, or module.
 */
export default function ExamCentreNoiseModal({ noiseState, onUpdateNoise, onClose, darkMode }) {
  const [samplePlaying, setSamplePlaying] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(22);
  const audioRef = useRef({ ctx: null, gain: null, source: null });
  const timerRef = useRef(null);

  const stopPreview = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    try {
      audioRef.current.source?.stop();
      audioRef.current.ctx?.close();
    } catch {
      // Ignore cleanup issues
    }
    audioRef.current = { ctx: null, gain: null, source: null };
    setSamplePlaying(false);
  };

  useEffect(() => () => stopPreview(), []);

  useEffect(() => {
    if (audioRef.current.gain && audioRef.current.ctx) {
      audioRef.current.gain.gain.setValueAtTime(
        ((noiseState.volume ?? 65) / 100) * 0.08,
        audioRef.current.ctx.currentTime
      );
    }
  }, [noiseState.volume]);

  const toggleSampleAudio = () => {
    if (samplePlaying) {
      stopPreview();
      return;
    }

    setSamplePlaying(true);
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i += 1) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.03 * white) / 1.03;
          lastOut = data[i];
          data[i] *= 1.8;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const gain = ctx.createGain();
        gain.gain.value = ((noiseState.volume ?? 65) / 100) * 0.08;
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start();

        audioRef.current = { ctx, gain, source };
      }
    } catch {
      // Visual preview continues gracefully
    }

    timerRef.current = setInterval(() => {
      setElapsedSec((prev) => (prev <= 1 ? 22 : prev - 1));
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-70 bg-black/45 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exam-noise-title"
    >
      <div
        className={`relative w-full max-w-md rounded-2xl border-r-4 border-r-[#22c5bd] p-6 shadow-2xl space-y-5 ${
          darkMode ? 'bg-[#262626] text-zinc-100' : 'bg-white text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Exam Centre Noise panel"
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-4 pr-6">
          <span className="w-12 h-12 rounded-full bg-[#3cd1ca] text-white flex items-center justify-center shrink-0">
            <AudioLines className="w-6 h-6" />
          </span>
          <div>
            <h3
              id="exam-noise-title"
              className={`text-sm sm:text-base font-extrabold ${darkMode ? 'text-white' : 'text-slate-900'}`}
            >
              Exam Centre Noise
            </h3>
            <p className={`text-[11px] leading-relaxed mt-1 ${darkMode ? 'text-zinc-300' : 'text-slate-500'}`}>
              Attempt your mock test with background noise to get used to the real PTE test centre
              environment. Please note that this feature will not appear in the actual PTE exam.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-200' : 'text-slate-700'}`}>
            Listen to sample audio
          </p>
          <div
            className={`rounded-xl border px-3.5 py-2.5 flex items-center gap-3 ${
              darkMode ? 'border-zinc-600 bg-[#1f1f1f]' : 'border-slate-200 bg-white'
            }`}
          >
            <button
              type="button"
              onClick={toggleSampleAudio}
              aria-label={samplePlaying ? 'Pause sample noise' : 'Play sample noise'}
              className="w-8 h-8 rounded-full bg-[#22c5bd] hover:bg-[#19afa7] text-white flex items-center justify-center shrink-0 cursor-pointer"
            >
              {samplePlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <div className="flex-1 flex items-center gap-1 h-5 overflow-hidden">
              {SAMPLE_WAVE_BARS.map((h, idx) => (
                <span
                  key={idx}
                  className={`w-[2px] rounded-full transition-colors ${
                    samplePlaying && idx % 3 === elapsedSec % 3 ? 'bg-[#22c5bd]' : 'bg-slate-300'
                  }`}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            <span className="text-[11px] font-mono text-slate-400 shrink-0">
              00:{String(elapsedSec).padStart(2, '0')}
            </span>

            <Volume2 className="w-4 h-4 text-[#22c5bd] shrink-0" />
            <input
              type="range"
              min={0}
              max={100}
              value={noiseState.volume ?? 65}
              onChange={(e) => onUpdateNoise({ ...noiseState, volume: Number(e.target.value) })}
              aria-label="Exam centre noise volume"
              className="w-16 h-1.5 accent-[#22c5bd] cursor-pointer"
            />
          </div>
        </div>

        <div
          className={`rounded-xl border px-4 py-3 flex items-center justify-between gap-3 ${
            darkMode ? 'border-zinc-600 bg-[#1f1f1f]' : 'border-slate-200 bg-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#e5f8f6] text-[#22c5bd] flex items-center justify-center shrink-0">
              <Volume2 className="w-4 h-4" />
            </span>
            <div>
              <p className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                Enable Exam Center Noise
              </p>
              <p className={`text-[11px] leading-snug ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                When turned on, background noise will play continuously while you are on the mock test
                screen.
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={Boolean(noiseState.enabled)}
            onClick={() => onUpdateNoise({ ...noiseState, enabled: !noiseState.enabled })}
            className={`w-10 h-5 rounded-full transition-colors p-0.5 shrink-0 cursor-pointer ${
              noiseState.enabled ? 'bg-[#22c5bd]' : 'bg-slate-400'
            }`}
          >
            <span
              className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                noiseState.enabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="space-y-2.5">
          <p className={`text-xs font-semibold ${darkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
            Apply this setting to:
          </p>
          <div className="space-y-2">
            {NOISE_SCOPES.map((item) => {
              const Icon = item.Icon;
              const selected = (noiseState.scope || 'question') === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onUpdateNoise({ ...noiseState, scope: item.id })}
                  className={`w-full text-left flex items-center gap-3 rounded-xl px-2.5 py-2 transition cursor-pointer ${
                    darkMode ? 'hover:bg-zinc-700/60' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="w-9 h-9 rounded-lg bg-[#e5f8f6] text-[#22c5bd] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      selected ? 'border-[#22c5bd] bg-[#22c5bd] text-white' : 'border-slate-300'
                    }`}
                  >
                    {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                      {item.title}
                    </p>
                    <p className={`text-[11px] ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
