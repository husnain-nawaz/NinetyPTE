import { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Headphones,
  Info,
  Mic,
  Pencil,
  Play,
  Sliders,
  Timer,
  X,
} from 'lucide-react';
import { SECTION_TABS, SKILL_THEME_TOKENS } from './mockTestsData';

const SKILL_ICONS = {
  Speaking: Mic,
  Writing: Pencil,
  Reading: BookOpen,
  Listening: Headphones,
  Overall: ClipboardList,
};

export function SkillIconGlyph({ skill, className = 'w-4 h-4' }) {
  const Icon = SKILL_ICONS[skill] || ClipboardList;
  return <Icon className={className} />;
}

/**
 * Shared empty-state illustration shown in Mock Tests -> Scores and Score History
 * whenever a category has zero completed mock attempts.
 */
export function ScoreEmptyState({ message = 'There are currently no Score available in this section.' }) {
  return (
    <div className="py-14 px-4 flex flex-col items-center justify-center text-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 180 120"
        className="w-40 h-28 mb-4 text-slate-400"
        fill="none"
      >
        <path
          d="M36 32 C56 26, 74 28, 88 35 L88 90 C74 84, 56 82, 36 88 Z"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          strokeWidth="2"
        />
        <path
          d="M140 32 C120 26, 102 28, 88 35 L88 90 C102 84, 120 82, 140 88 Z"
          fill="#f8fafc"
          stroke="#cbd5e1"
          strokeWidth="2"
        />
        <text
          x="100"
          y="63"
          fill="#94a3b8"
          fontSize="14"
          fontWeight="700"
          fontFamily="sans-serif"
        >
          Score
        </text>
        <circle cx="137" cy="49" r="5" fill="#cbd5e1" />
        <path
          d="M137 55 L137 83 M137 64 L121 56 M137 83 L130 98 M137 83 L145 98"
          stroke="#94a3b8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-sm font-bold text-slate-700">Record Not Found</p>
      <p className="mt-1 text-xs text-slate-400 max-w-xs leading-relaxed">{message}</p>
    </div>
  );
}

/**
 * 4-module horizontal tab header (Speaking / Writing / Reading / Listening)
 * reused across Sectional Mock Tests, Timed Sectional Mock Tests, and Score History.
 */
export function ModuleTabsBar({
  tabs = SECTION_TABS,
  activeTab,
  onSelect,
  showTimedInfo = false,
  rightSlot = null,
}) {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-0.5">
      <div className="flex flex-1 flex-wrap items-center gap-2 sm:gap-6">
        {tabs.map((skill) => {
          const meta = SKILL_THEME_TOKENS[skill] || SKILL_THEME_TOKENS.Speaking;
          const isActive = activeTab === skill;

          return (
            <button
              key={skill}
              type="button"
              onClick={() => onSelect(skill)}
              className={`inline-flex items-center gap-2 px-2 pb-2.5 pt-1 text-xs sm:text-sm font-semibold transition cursor-pointer border-b-2 ${
                isActive
                  ? meta.activeTabClass
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <span
                className={`w-6 h-6 rounded-md inline-flex items-center justify-center ${
                  isActive ? meta.iconBgClass : 'bg-slate-100 text-slate-400'
                }`}
              >
                <SkillIconGlyph skill={skill} className="w-3.5 h-3.5" />
              </span>
              <span>{skill}</span>
            </button>
          );
        })}
      </div>

      {rightSlot}

      {showTimedInfo && (
        <div className="relative pb-2">
          <button
            type="button"
            onClick={() => setInfoOpen((prev) => !prev)}
            aria-label="About Timed Sectional Mock Tests"
            className="text-slate-400 hover:text-[#0b4a7b] transition cursor-pointer"
          >
            <Info className="w-4 h-4" />
          </button>
          {infoOpen && (
            <div className="absolute right-0 top-7 z-20 w-72 rounded-xl border border-slate-200 bg-white p-3.5 text-left text-[11px] leading-relaxed text-slate-600 shadow-lg">
              Timed Sectional Mock Tests run with strict real Pearson countdown timers per section
              to build pacing accuracy before exam day.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Interactive modal for configuring and saving a custom Full Mock Test.
 */
export function CreateCustomMockModal({
  onClose,
  trackLabel,
  customBounds,
  defaultCount,
  onCreateTest,
}) {
  const [title, setTitle] = useState(`My Custom ${trackLabel} Mock`);
  const [questionCount, setQuestionCount] = useState(defaultCount);
  const [difficulty, setDifficulty] = useState('Medium');
  const [selectedSkills, setSelectedSkills] = useState(SECTION_TABS);

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.length > 1 ? prev.filter((s) => s !== skill) : prev;
      }
      return [...prev, skill];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateTest({
      title: title.trim() || `Custom ${trackLabel} Mock`,
      questions: Number(questionCount),
      difficulty,
      skills: selectedSkills,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-[#e6f7f6] text-[#1ea7a1] flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-[#0b4a7b]">
                Create Your Own Mock Test
              </h3>
              <p className="text-xs text-slate-500">
                Customize test length, section focus &amp; difficulty ({trackLabel})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700">Mock Test Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00b4c6]"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700 block">Include Sections</span>
            <div className="grid grid-cols-2 gap-2">
              {SECTION_TABS.map((skill) => {
                const active = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                      active
                        ? 'border-[#1ea7a1] bg-[#eefaf9] text-[#0b4a7b]'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Questions Count</span>
              <span className="text-[#1ea7a1]">{questionCount} Questions</span>
            </div>
            <input
              type="range"
              min={customBounds.min}
              max={customBounds.max}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full accent-[#1ea7a1]"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700 block">Difficulty Level</span>
            <div className="grid grid-cols-3 gap-2">
              {['Easy', 'Medium', 'Difficult'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`rounded-lg border py-1.5 text-xs font-semibold transition cursor-pointer ${
                    difficulty === level
                      ? 'border-[#0b4a7b] bg-[#0b4a7b] text-white'
                      : 'border-slate-200 text-slate-600 hover:border-[#00b4c6]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#0b4a7b] hover:bg-[#08385f] px-4 py-2 text-xs font-bold text-white cursor-pointer"
            >
              Create &amp; Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * Interactive session preview & quick AI scorecard simulation modal when clicking Start.
 */
export function StartMockTestModal({ testItem, trackLabel, onClose, onCompleteAttempt }) {
  const [completedScore, setCompletedScore] = useState(null);

  const handleCompleteDemoAttempt = () => {
    const base = testItem.difficulty === 'Easy' ? 76 : testItem.difficulty === 'Difficult' ? 68 : 72;
    const scorePayload = {
      id: `attempt-${Date.now()}`,
      testId: testItem.id,
      title: testItem.title,
      mode: testItem.mode,
      skill: testItem.skill || 'All',
      trackLabel,
      overall: base,
      speaking: testItem.skill && testItem.skill !== 'Speaking' ? null : base + 2,
      writing: testItem.skill && testItem.skill !== 'Writing' ? null : base - 1,
      reading: testItem.skill && testItem.skill !== 'Reading' ? null : base + 1,
      listening: testItem.skill && testItem.skill !== 'Listening' ? null : base - 2,
      completedAt: new Date().toISOString(),
    };
    setCompletedScore(scorePayload);
    onCompleteAttempt(scorePayload);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="inline-block rounded-full bg-[#eefaf9] px-2.5 py-0.5 text-[11px] font-bold text-[#1ea7a1]">
              {trackLabel}
            </span>
            <h3 className="text-base font-extrabold text-[#0b4a7b] mt-1">{testItem.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs">
          <div>
            <p className="text-slate-400">Questions</p>
            <p className="font-bold text-slate-800">{testItem.questions} Items</p>
          </div>
          <div>
            <p className="text-slate-400">Duration</p>
            <p className="inline-flex items-center gap-1 font-bold text-slate-800">
              <Timer className="w-3.5 h-3.5 text-[#1ea7a1]" />
              {testItem.durationMinutes || 45} Mins
            </p>
          </div>
        </div>

        {completedScore ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>AI Scorecard Recorded ({completedScore.overall} / 90)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your attempt for <strong>{testItem.title}</strong> is saved under the{' '}
              <strong>Scores</strong> tab and <strong>Score History</strong>.
            </p>
          </div>
        ) : (
          <p className="text-xs text-slate-500 leading-relaxed">
            Ensure your microphone is connected and pop-up blockers are disabled for authentic exam
            timing. Record a quick completion sample below to inspect live Scorecards &amp; Score
            History analytics.
          </p>
        )}

        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            Close
          </button>
          {!completedScore && (
            <button
              type="button"
              onClick={handleCompleteDemoAttempt}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b4a7b] hover:bg-[#08385f] px-4 py-2 text-xs font-bold text-white cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Submit Sample Attempt</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
