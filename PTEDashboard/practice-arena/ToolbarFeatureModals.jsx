import { useState } from 'react';
import {
  Calendar,
  Check,
  FileText,
  Info,
  LayoutGrid,
  Mic,
  Pause,
  Play,
  Trash2,
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

const MINI_DICTIONARY_DETAILS = {
  home: {
    ipa: '(hoʊm)',
    definitions: [
      '(baseball) base consisting of a rubber slab where the batter stands; it must be touched by a base runner in order to score',
      'an institution where people are cared for',
      'a social unit living together',
      'inside the country',
      'where you live at a particular time',
      'the place where you are stationed and from which missions start',
    ],
    examples: [
      'he ruled that the runner failed to touch home',
      'a home for the elderly',
      'the teacher asked how many people made up his home',
      'deliver the package to my home',
      "he doesn't have a home to go to",
      'they raise money to provide homes for the homeless',
      'home is where the heart is',
    ],
  },
  transparency: {
    ipa: '(trænˈspærənsi)',
    definitions: [
      'the quality of being done in an open way without secrets',
      'the quality of allowing light to pass through clearly',
      'honesty and clear disclosure between parties',
    ],
    examples: [
      'experts say transparency is key when reporting missing pages',
      'financial transparency builds stronger public confidence',
    ],
  },
  etiquette: {
    ipa: '(ˈetɪket)',
    definitions: [
      'the customary code of polite behavior in society or among members of a profession',
      'accepted conventions governing respectful communication',
    ],
    examples: [
      'librarians and etiquette coaches recommend prompt acknowledgment',
      'email etiquette matters in workplace communication',
    ],
  },
  kitchen: {
    ipa: '(ˈkɪtʃən)',
    definitions: [
      'a room or area equipped for preparing and cooking meals',
      'culinary preparation traditions of a household or chef',
    ],
    examples: [
      "you don't have to spend a lot of time in the kitchen on weekends",
      'smart appliances streamline busy weekday kitchens',
    ],
  },
};

function getDictionaryEntry(word) {
  const key = word.toLowerCase();
  if (MINI_DICTIONARY_DETAILS[key]) return MINI_DICTIONARY_DETAILS[key];
  return {
    ipa: `(/${key}/)`,
    definitions: [
      `Academic & general English vocabulary term appearing in this PTE task: "${word}".`,
      'Used in context to convey precise meaning, tone, and grammatical cohesion.',
    ],
    examples: [
      `Practice pronouncing "${word}" crisply with clear syllable stress.`,
      `Notice how "${word}" connects ideas naturally in the passage.`,
    ],
  };
}

function speakWord(word) {
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
}

const FALLBACK_MICS = [
  { id: 'default-realtek', label: 'Default - Microphone Array (3- Realtek(R) Audio)' },
  { id: 'comm-realtek', label: 'Communications - Microphone Array (3- Realtek(R) Audio)' },
  { id: 'array-realtek', label: 'Microphone Array (3- Realtek(R) Audio)' },
];

const BROWSER_GUIDES = {
  chrome: {
    title: 'Chrome Setup',
    breadcrumb: 'Chrome > Settings > Privacy and Security > Site Settings > Microphone',
    steps: [
      'Click the site controls icon near the address bar.',
      'Open site settings and set microphone to allow.',
      'Choose allow if chrome prompts you again.',
      'Refresh the page and retry the check.',
    ],
    stuck: [
      'Click the site controls icon near the address bar.',
      'In chrome microphone settings, confirm the correct input device is selected.',
      'Close other tabs or apps that may already be using the microphone.',
    ],
  },
  edge: {
    title: 'Edge Setup',
    breadcrumb: 'Edge > Settings > Cookies and site permissions > Microphone',
    steps: [
      'Open this page in Edge and click the lock or site controls icon beside the address bar.',
      'Open Permissions for this site and set Microphone to Allow.',
      'If you do not see the site-level option, open Edge settings, go to Cookies and site permissions, then open Microphone.',
      'Refresh the page and retry the microphone check.',
    ],
    stuck: [
      'Check that this site is not listed in the blocked sites section for Microphone.',
      'Verify Edge is using the correct microphone input device.',
      'If Windows blocked browser microphone access, allow microphone access in Windows Privacy settings and try again.',
    ],
  },
};

/**
 * Choose a microphone modal + Chrome/Edge Browser Help troubleshooting guide.
 */
export function MicrophoneSetupModal({ initialMicId, onClose, onSelectMic }) {
  const [selectedId, setSelectedId] = useState(initialMicId || FALLBACK_MICS[1].id);
  const [showBrowserHelp, setShowBrowserHelp] = useState(false);
  const [browserTab, setBrowserTab] = useState('chrome');

  const activeGuide = BROWSER_GUIDES[browserTab] || BROWSER_GUIDES.chrome;

  if (showBrowserHelp) {
    return (
      <div
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="w-full max-w-3xl rounded-2xl bg-white p-5 sm:p-6 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-5 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setShowBrowserHelp(false)}
            aria-label="Close browser help"
            className="absolute right-4 top-4 w-6 h-6 rounded-full border border-[#0b4a7b] text-[#0b4a7b] flex items-center justify-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Left Sidebar */}
          <div className="md:col-span-4 rounded-xl bg-[#f3f9fc] p-4 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <span className="w-9 h-9 rounded-full bg-white text-[#0b4a7b] flex items-center justify-center shadow-2xs">
                <Mic className="w-4 h-4" />
              </span>
              <h3 className="text-base font-extrabold text-[#0b4a7b] leading-snug">
                Microphone
                <br />
                Instruction
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose your browser and allow microphone access for this site. The matching browser
                tab is selected automatically when we can detect it.
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'chrome', label: 'Chrome', dotClass: 'bg-amber-400' },
                { id: 'edge', label: 'Edge', dotClass: 'bg-sky-500' },
              ].map((b) => {
                const active = browserTab === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBrowserTab(b.id)}
                    className={`w-full rounded-xl px-4 py-2.5 text-left text-xs font-bold flex items-center gap-2.5 transition cursor-pointer ${
                      active
                        ? 'bg-[#0b568c] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${b.dotClass}`} />
                    <span>{b.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Instructions */}
          <div className="md:col-span-8 space-y-4 pt-1">
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-[#0b4a7b]">
                {activeGuide.title}
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{activeGuide.breadcrumb}</p>
            </div>

            <ol className="space-y-2.5 text-xs text-slate-600">
              {activeGuide.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#eef5fb] text-[#0b4a7b] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            <div className="rounded-xl bg-[#f4f8fc] p-4 space-y-2 text-xs text-slate-600">
              <p className="font-bold text-slate-800">Still stuck?</p>
              <ul className="list-disc pl-4 space-y-1.5 leading-relaxed">
                {activeGuide.stuck.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={() => setShowBrowserHelp(false)}
                className="rounded-full border border-[#0b4a7b] px-10 py-1.5 text-xs font-bold text-[#0b4a7b] hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl space-y-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close microphone selector"
          className="absolute right-4 top-4 w-6 h-6 rounded-full border border-[#0b4a7b] text-[#0b4a7b] flex items-center justify-center cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-start gap-3.5">
          <span className="w-11 h-11 rounded-full bg-[#faeffb] text-[#c056d3] flex items-center justify-center shrink-0">
            <Mic className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-800">
              Choose a microphone
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Test the microphone you want to use before the speaking task can start recording.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-[#eff7fe] px-4 py-2.5 text-xs font-bold text-[#0b568c]">
          Recording stays locked until a microphone is selected.
        </div>

        <div className="space-y-1">
          <p className="text-xs font-extrabold text-slate-700">Available microphones</p>
          <p className="text-[11px] text-slate-500">
            Select the microphone you want to use for this speaking task.
          </p>
        </div>

        <div className="space-y-2.5">
          {FALLBACK_MICS.map((mic) => {
            const active = selectedId === mic.id;
            return (
              <button
                key={mic.id}
                type="button"
                onClick={() => setSelectedId(mic.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-xs font-semibold flex items-center gap-3 transition cursor-pointer ${
                  active
                    ? 'border-[#86ded8] bg-[#f4fdfc] text-[#28b5ac]'
                    : 'border-slate-200 bg-white text-[#0b4a7b] hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    active ? 'bg-[#4bd5cc] border-[#4bd5cc] text-white' : 'border-slate-300'
                  }`}
                >
                  {active && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </span>
                <span>{mic.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              onSelectMic(selectedId);
              onClose();
            }}
            className="rounded-full bg-[#0b568c] hover:bg-[#08426d] px-7 py-2 text-xs font-bold text-white cursor-pointer"
          >
            Use This Microphone
          </button>
          <button
            type="button"
            onClick={() => setShowBrowserHelp(true)}
            className="rounded-full border border-[#0b568c] px-8 py-2 text-xs font-bold text-[#0b568c] hover:bg-slate-50 cursor-pointer"
          >
            Browser Help
          </button>
        </div>
      </div>
    </div>
  );
}

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
 * Interactive Dictionary modal supporting passage word clicks and full Definitions / Examples
 * card view with "Go Back" and "Add To Vocab-Bank" persistence.
 */
export function DictionaryModal({ promptText, onClose, onAddToVocabBank }) {
  const [selectedWord, setSelectedWord] = useState('');
  const [addedToBank, setAddedToBank] = useState(false);

  const cleanLookup = (token) => token.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');

  if (selectedWord) {
    const entry = getDictionaryEntry(selectedWord);
    return (
      <div
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base sm:text-lg font-extrabold text-[#0b4a7b]">Dictionary</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dictionary modal"
              className="w-6 h-6 rounded-full border border-[#0b4a7b] text-[#0b4a7b] flex items-center justify-center cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-sm">
              <span className="rounded bg-[#ebfbfa] px-3 py-1 font-bold text-[#35bdb5] capitalize">
                {selectedWord}
              </span>
              <span className="text-slate-500 text-xs">{entry.ipa}</span>
              <button
                type="button"
                onClick={() => speakWord(selectedWord)}
                aria-label={`Pronounce ${selectedWord}`}
                className="text-slate-500 hover:text-[#0b4a7b] cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <Info className="w-4 h-4 text-slate-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 bg-white p-4 max-h-64 overflow-y-auto space-y-2.5 shadow-2xs">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[#0b4a7b]">
                DEFINITIONS
              </p>
              <ul className="list-disc pl-4 space-y-2 text-xs text-slate-600 leading-relaxed">
                {entry.definitions.map((def, i) => (
                  <li key={i}>{def}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white p-4 max-h-64 overflow-y-auto space-y-2.5 shadow-2xs">
              <p className="text-xs font-extrabold uppercase tracking-wide text-[#0b4a7b]">
                EXAMPLES
              </p>
              <ul className="list-disc pl-4 space-y-2 text-xs text-slate-600 leading-relaxed">
                {entry.examples.map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setSelectedWord('');
                setAddedToBank(false);
              }}
              className="rounded-full border border-[#0b4a7b] px-5 py-1.5 text-xs font-bold text-[#0b4a7b] hover:bg-slate-50 cursor-pointer"
            >
              Go Back
            </button>
            <button
              type="button"
              onClick={() => {
                onAddToVocabBank?.(selectedWord);
                setAddedToBank(true);
              }}
              className="rounded-full bg-[#0b568c] hover:bg-[#08426d] px-6 py-1.5 text-xs font-bold text-white cursor-pointer"
            >
              {addedToBank ? 'Added to Vocab-Bank' : 'Add To Vocab-Bank'}
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              return (
                <button
                  key={`${idx}-${token}`}
                  type="button"
                  onClick={() => {
                    if (cleaned) {
                      setSelectedWord(cleaned);
                      speakWord(cleaned);
                    }
                  }}
                  className="rounded px-1 hover:bg-[#e2f9f7] hover:text-[#1db3a8] transition cursor-pointer"
                >
                  {token}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}

/**
 * Per-question personal study Note modal.
 */
export function QuestionNoteModal({ initialNote = '', onClose, onSaveNote }) {
  const [noteText, setNoteText] = useState(initialNote);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveNote(noteText);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#45d0c7] px-5 py-3 text-white flex items-center justify-between">
          <span className="w-6" />
          <h3 className="text-base font-extrabold">Note</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Note modal"
            className="w-6 h-6 rounded-full bg-white text-[#45d0c7] flex items-center justify-center cursor-pointer"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <textarea
            rows={5}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter Note..."
            className="w-full rounded-xl border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#45d0c7]"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-full border border-[#7ce0d9] text-[#2cc3b9] hover:bg-[#effbfa] px-8 py-1.5 text-xs font-bold cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * "This question has appeared in my exam" modal: displays previously logged appearances
 * with "Appeared again" & Delete controls when present, or the submission form otherwise.
 */
export function AppearedInExamModal({
  appearedEntries = [],
  onClose,
  onSubmitAppeared,
  onDeleteAppeared,
}) {
  const [addingAgain, setAddingAgain] = useState(appearedEntries.length === 0);
  const [examDate, setExamDate] = useState('27/11/26');
  const [venue, setVenue] = useState('');
  const [memory, setMemory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!examDate.trim()) return;
    onSubmitAppeared({
      id: `app-${Date.now()}`,
      examDate: examDate.trim(),
      venue: venue.trim() || 'Pearson Professional Center',
      memory: memory.trim(),
      loggedAt: '27-11-2026',
    });
    onClose();
  };

  const showingHistory = appearedEntries.length > 0 && !addingAgain;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#45d0c7] px-5 py-3 text-white flex items-center justify-between">
          <span className="w-6" />
          <h3 className="text-sm sm:text-base font-extrabold text-center">
            {showingHistory
              ? `This question has appeared in my exam ${appearedEntries.length} times`
              : 'This question has appeared in my exam'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-6 h-6 rounded-full bg-white text-[#45d0c7] flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {showingHistory ? (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setAddingAgain(true)}
                className="rounded-full border border-[#8ce2dc] bg-white hover:bg-[#effbfa] px-5 py-1.5 text-xs font-semibold text-[#28b5ac] transition cursor-pointer"
              >
                Appeared again
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto">
              {appearedEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-xl border border-[#8ce2dc] bg-white px-4 py-3 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 items-center">
                    <div>
                      <p className="font-bold text-slate-800">{entry.examDate}</p>
                      {entry.memory && <p className="text-slate-600 mt-0.5">{entry.memory}</p>}
                    </div>
                    <p className="font-bold text-slate-800">{entry.venue}</p>
                    <p className="text-slate-500 sm:text-center">{entry.loggedAt}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteAppeared?.(entry.id)}
                    aria-label="Remove exam appearance entry"
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              By confirming this, you can help other test-takers in getting an accurate prediction
              for their exam.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">
                Exam Date <span className="text-rose-500 font-semibold">(Required)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#45d0c7]"
                />
                <Calendar className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">Exam Venue (optional)</label>
              <select
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-500 bg-white focus:outline-none focus:border-[#45d0c7]"
              >
                <option value="">Please Select Your Exam Venue</option>
                <option value="Korea, South/Seoul">Korea, South/Seoul</option>
                <option value="Pearson Professional Center - Melbourne">Pearson Professional Center - Melbourne</option>
                <option value="Pearson Professional Center - Sydney">Pearson Professional Center - Sydney</option>
                <option value="Pearson Professional Center - Toronto">Pearson Professional Center - Toronto</option>
                <option value="Pearson Professional Center - Lahore">Pearson Professional Center - Lahore</option>
                <option value="Pearson Professional Center - London">Pearson Professional Center - London</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">Exam Memory (optional)</label>
              <textarea
                rows={3}
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                placeholder="Please Share Your Exam Memory"
                className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#45d0c7]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-1">
              <button
                type="button"
                onClick={() =>
                  appearedEntries.length > 0 ? setAddingAgain(false) : onClose()
                }
                className="rounded-full border border-slate-300 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full border border-[#7ce0d9] text-[#2cc3b9] hover:bg-[#effbfa] py-2 text-xs font-bold cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
