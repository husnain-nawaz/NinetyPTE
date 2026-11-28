import { Clock, Sparkles } from 'lucide-react';
import { ScoreEmptyState } from '../MockTestSharedUI';
import { formatMMSS } from '../exam-runner';
import { REPORT_SKILLS, SKILL_PILL_COLOR } from './viewScoreConfig';

/**
 * Detailed Question Analysis list with skill filters (Full), stopwatch timings (Timed),
 * per-question skill score pills, and AI Score / Score Analysis modal triggers.
 */
export function QuestionAnalysisSection({
  availableTabs,
  resolvedSkillTab,
  onSelectSkillTab,
  activeQuestions,
  isSingleModuleReport,
  isTimedReport,
  onOpenAiScore,
  darkMode,
}) {
  return (
    <section className="space-y-4">
      <h2 className={`text-sm sm:text-base font-extrabold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
        Detailed Question Analysis
      </h2>

      {!isSingleModuleReport && (
        <div className="flex flex-wrap items-center gap-2.5">
          {availableTabs.map((skill) => {
            const isActive = skill.key === resolvedSkillTab;
            const TabIcon = skill.Icon;
            return (
              <button
                key={skill.key}
                type="button"
                onClick={() => onSelectSkillTab(skill.key)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? skill.activeBg
                    : darkMode
                      ? 'bg-[#16191e] border border-zinc-800 text-zinc-300 hover:border-zinc-600'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <TabIcon className="w-3.5 h-3.5" />
                <span>{skill.key}</span>
              </button>
            );
          })}
        </div>
      )}

      <div
        className={`rounded-2xl border shadow-2xs overflow-hidden ${
          darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
        }`}
      >
        {activeQuestions.length === 0 ? (
          <ScoreEmptyState
            message={`No ${resolvedSkillTab} questions recorded in this mock test.`}
            darkMode={darkMode}
          />
        ) : (
          <div className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
            {activeQuestions.map((item, idx) => {
              const tabMeta =
                REPORT_SKILLS.find((s) => s.key === item.skillGroup) || REPORT_SKILLS[0];
              return (
                <div
                  key={`${item.id}-${idx}`}
                  className={`px-4 sm:px-6 py-3.5 transition ${
                    isTimedReport
                      ? 'flex flex-col gap-3 md:grid md:grid-cols-[minmax(0,1fr)_120px_auto] md:items-center md:gap-4'
                      : 'flex flex-wrap items-center justify-between gap-3'
                  } ${darkMode ? 'hover:bg-[#1a1f28]' : 'hover:bg-slate-50/60'}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-9 h-9 rounded-lg ${tabMeta.badgeBg} text-[11px] font-extrabold flex items-center justify-center shrink-0`}
                    >
                      {item.code}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-xs sm:text-sm font-bold truncate ${
                          darkMode ? 'text-white' : 'text-[#0b4a7b]'
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-400">#{item.id}</p>
                    </div>
                  </div>

                  {isTimedReport && (
                    <div
                      className={`inline-flex items-center gap-1.5 text-xs font-bold shrink-0 md:justify-center ${
                        darkMode ? 'text-zinc-200' : 'text-[#0b4a7b]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 opacity-80" />
                      <span>{formatMMSS(item.timeSpentSeconds || 45)}</span>
                    </div>
                  )}

                  <div
                    className={`flex flex-wrap items-center gap-2.5 shrink-0 ${
                      isTimedReport ? 'md:justify-end' : 'ml-auto sm:ml-0'
                    }`}
                  >
                    {(item.skillPills || []).map((pill) => (
                      <span
                        key={pill.key}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
                          darkMode
                            ? 'border-zinc-700 bg-[#1a1f28] text-zinc-100'
                            : 'border-slate-200 bg-white text-[#0b4a7b]'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full text-[9px] font-extrabold flex items-center justify-center ${
                            SKILL_PILL_COLOR[pill.key] || 'bg-[#0b4a7b] text-white'
                          }`}
                        >
                          {pill.key}
                        </span>
                        <span>
                          {(item.skillGroup === 'Reading' || item.skillGroup === 'Listening') &&
                          pill.max < 10
                            ? `${pill.score}/${pill.max}`
                            : `${String(pill.score).padStart(2, '0')}/${String(pill.max).padStart(2, '0')}`}
                        </span>
                      </span>
                    ))}

                    <button
                      type="button"
                      onClick={() => onOpenAiScore(item)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                        darkMode
                          ? 'border-purple-700/60 bg-[#1a1f28] text-purple-300 hover:bg-purple-950/40'
                          : 'border-purple-200 bg-white text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Score</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div
          className={`border-t py-2.5 px-4 text-center text-[11px] font-semibold ${
            darkMode
              ? 'bg-[#182230] border-zinc-800 text-[#4ea5f5]'
              : 'bg-[#eef8fe] border-slate-100 text-[#0b4a7b]'
          }`}
        >
          This detailed score analysis will disappear in 6 months.
        </div>
      </div>
    </section>
  );
}
