import { useState } from 'react';
import {
  Check,
  FileText,
  LayoutGrid,
  Mic,
  Pause,
  Play,
  Volume2,
  X,
} from 'lucide-react';
import CyanBarsLoader from '../shared/CyanBarsLoader';

const NOISE_SCOPES = [
  {
    id: 'question',
    title: 'Only this question',
    desc: 'Play background noise for the current question only.',
    Icon: FileText,
  },
  {
    id: 'task',
    title: 'This question type',
    desc: 'Use background noise for all questions of this type.',
    Icon: LayoutGrid,
  },
  {
    id: 'module',
    title: 'Complete speaking module',
    desc: 'Use background noise for all speaking questions.',
    Icon: Mic,
  },
];

const MINI_DICTIONARY_ENTRIES = {
  returning: { pos: 'verb', ipa: '/rɪˈtɜːrnɪŋ/', meaning: 'Bringing or sending an item back to where it came from.' },
  borrowed: { pos: 'adjective', ipa: '/ˈbɒrəʊd/', meaning: 'Temporarily taken with permission and intention to return.' },
  missing: { pos: 'adjective', ipa: '/ˈmɪsɪŋ/', meaning: 'Absent or lost from the expected place.' },
  experts: { pos: 'noun', ipa: '/ˈekspɜːrts/', meaning: 'People with comprehensive knowledge or skill in an area.' },
  transparency: { pos: 'noun', ipa: '/trænˈspærənsi/', meaning: 'Openness, honesty, and straightforward communication.' },
  etiquette: { pos: 'noun', ipa: '/ˈetɪket/', meaning: 'Customary code of polite behavior in society or professions.' },
  disputes: { pos: 'noun', ipa: '/dɪˈspjuːts/', meaning: 'Disagreements, arguments, or formal debates.' },
  unreported: { pos: 'adjective', ipa: '/ˌʌnrɪˈpɔːrtɪd/', meaning: 'Not officially stated, disclosed, or documented.' },
  defects: { pos: 'noun', ipa: '/ˈdiːfekts/', meaning: 'Imperfections, flaws, or physical damage.' },
  acknowledge: { pos: 'verb', ipa: '/əkˈnɒlɪdʒ/', meaning: 'Recognize or admit the truth or existence of something.' },
  apology: { pos: 'noun', ipa: '/əˈpɒlədʒi/', meaning: 'A regretful admission of a mistake or offense.' },
  prevent: { pos: 'verb', ipa: '/prɪˈvent/', meaning: 'Keep something undesirable from happening.' },
  misunderstanding: { pos: 'noun', ipa: '/ˌmɪsʌndərˈstændɪŋ/', meaning: 'A failure to interpret someone’s words or actions accurately.' },
};

/**
 * Exam Centre Noise configuration modal matching the Speaking head-wave toolbar button.
 */
export function ExamCentreNoiseModal({
  initialEnabled = false,
  initialScope = 'question',
  onClose,
  onSave,
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [scope, setScope] = useState(initialScope);
  const [samplePlaying, setSamplePlaying] = useState(false);
  const [volume, setVolume] = useState(72);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave({ enabled, scope, volume });
      onClose();
    }, 240);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-5 border-r-4 border-r-[#56dcd4]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <span className="w-12 h-12 rounded-full bg-[#adf2ee] text-[#35bdb5] flex items-center justify-center shrink-0">
              <Mic className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-lg font-extrabold text-slate-800">Exam Centre Noise</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Practice with background noise similar to a real PTE test centre.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Exam Centre Noise modal"
            className="text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-bold text-slate-700">Listen to sample audio</p>
          <div className="rounded-xl border border-slate-200 px-3.5 py-2.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSamplePlaying((p) => !p)}
              aria-label={samplePlaying ? 'Pause sample noise' : 'Play sample noise'}
              className="w-8 h-8 rounded-full bg-[#56dcd4] hover:bg-[#3cc9c0] text-white flex items-center justify-center shrink-0 cursor-pointer"
            >
              {samplePlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
            <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className={`h-full rounded-full bg-[#56dcd4] transition-all ${
                  samplePlaying ? 'w-1/2' : 'w-0'
                }`}
              />
            </div>
            <span className="text-[11px] font-medium text-slate-500 tabular-nums">00:22</span>
            <Volume2 className="w-4 h-4 text-[#56dcd4] shrink-0" />
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Exam noise sample volume"
              className="w-16 accent-[#56dcd4] cursor-pointer"
            />
          </div>
        </div>

        {/* Enable Switch Row */}
        <div className="rounded-xl border border-slate-200 px-4 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-lg bg-[#e6fbfa] text-[#4ad2ca] flex items-center justify-center shrink-0">
              <Volume2 className="w-4 h-4" />
            </span>
            <div>
              <p className="text-xs font-extrabold text-slate-800">Enable Exam Center Noise</p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                When turned on, background noise will play continuously while you are on the
                question screen.
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={() => setEnabled((p) => !p)}
            className={`w-11 h-6 rounded-full p-0.5 transition shrink-0 cursor-pointer ${
              enabled ? 'bg-[#4bd5cc]' : 'bg-slate-400'
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full bg-white shadow transition-transform ${
                enabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {saving && (
          <div className="flex justify-center">
            <CyanBarsLoader label="Saving noise setting" />
          </div>
        )}

        {/* Scope Selection */}
        <div className="space-y-2.5">
          <p className="text-xs font-bold text-slate-700">Apply this setting to:</p>
          {NOISE_SCOPES.map((opt) => {
            const Icon = opt.Icon;
            const active = scope === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setScope(opt.id)}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-left flex items-start gap-3 transition cursor-pointer ${
                  active
                    ? 'border-[#7ee4de] bg-[#f4fdfc]'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <span className="w-9 h-9 rounded-lg bg-[#e6fbfa] text-[#4ad2ca] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                        active
                          ? 'bg-[#4bd5cc] border-[#4bd5cc] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {active && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{opt.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 pl-6">{opt.desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-[#5ee1d9] hover:bg-[#3cc9c0] px-5 py-2 text-xs font-bold text-white cursor-pointer"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive word-click Dictionary modal triggered by the "A" button in the question banner.
 */
export function DictionaryModal({ promptText, onClose }) {
  const [selectedWord, setSelectedWord] = useState('');

  const cleanLookup = (token) => token.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '').toLowerCase();
  const entry =
    selectedWord &&
    (MINI_DICTIONARY_ENTRIES[selectedWord] || {
      pos: 'vocabulary',
      ipa: `/${selectedWord}/`,
      meaning: `Context word from the active passage. Pronounce "${selectedWord}" clearly with natural word stress.`,
    });

  const handlePronounce = (word) => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(word);
        u.lang = 'en-US';
        window.speechSynthesis.speak(u);
      }
    } catch {
      // Ignore synthesis unavailability
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-extrabold text-[#5ee1d9]">Dictionary</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Dictionary modal"
            className="w-6 h-6 rounded-full bg-[#5ee1d9] hover:bg-[#3cc9c0] text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        <p className="text-xs font-extrabold text-slate-800">Click word to check dictionary</p>

        <div className="text-xs sm:text-[13px] leading-7 text-slate-700 flex flex-wrap gap-x-1">
          {String(promptText || '')
            .split(/\s+/)
            .filter(Boolean)
            .map((token, idx) => {
              const cleaned = cleanLookup(token);
              const isSelected = cleaned && selectedWord === cleaned;
              return (
                <button
                  key={`${idx}-${token}`}
                  type="button"
                  onClick={() => {
                    if (cleaned) {
                      setSelectedWord(cleaned);
                      handlePronounce(cleaned);
                    }
                  }}
                  className={`rounded px-1 transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#e2f9f7] text-[#0b4a7b] font-bold underline decoration-[#4bd5cc]'
                      : 'hover:bg-slate-100 hover:text-[#1db3a8]'
                  }`}
                >
                  {token}
                </button>
              );
            })}
        </div>

        {entry && (
          <div className="rounded-xl border border-[#8ce2dc] bg-[#f4fdfc] p-4 space-y-1 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-[#0b4a7b] capitalize">
                  {selectedWord}
                </span>
                <span className="text-slate-400">{entry.ipa}</span>
                <span className="rounded bg-[#dff6f4] px-2 py-0.5 text-[10px] font-bold text-[#1db3a8]">
                  {entry.pos}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handlePronounce(selectedWord)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1db3a8] hover:underline cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">{entry.meaning}</p>
          </div>
        )}
      </div>
    </div>
  );
}
