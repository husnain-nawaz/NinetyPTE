import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Headphones,
  Mic,
  PenLine,
} from 'lucide-react';
import PTEDashboardHeader from '../PTEDashboardHeader';
import PTEDashboardTealFooter from '../PTEDashboardTealFooter';
import { usePortal } from '../portalContext';
import {
  getPracticeHistoryOverview,
  PRACTICE_HISTORY_PERIODS,
  TASK_BADGE_THEMES,
} from './practiceHistoryData';

const SKILL_ICON_META = {
  Speaking: { Icon: Mic, colorClass: 'text-[#eb8c44]', barClass: 'bg-[#eb8c44]' },
  Writing: { Icon: PenLine, colorClass: 'text-[#3b82f6]', barClass: 'bg-[#3b82f6]' },
  Reading: { Icon: BookOpen, colorClass: 'text-[#2fc860]', barClass: 'bg-[#2fc860]' },
  Listening: { Icon: Headphones, colorClass: 'text-[#1b4f82]', barClass: 'bg-[#1b4f82]' },
};

/**
 * Shared Practice History overview page (/v1/practice-history & /v1/core/practice-history),
 * displaying lifetime stats, date filter, categorized practiced tasks, and skill breakdown.
 */
export default function PortalPracticeHistoryPage({ syncCoreMode = false }) {
  const { portalMode, setPortalMode } = usePortal();
  const isCoreMode = portalMode === 'core' || syncCoreMode;
  const activeTrack = isCoreMode ? 'core' : 'academic';

  useEffect(() => {
    if (syncCoreMode) {
      setPortalMode('core');
    }
  }, [syncCoreMode, setPortalMode]);

  const overview = useMemo(() => getPracticeHistoryOverview(activeTrack), [activeTrack]);
  const [periodId, setPeriodId] = useState('custom');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const selectedPeriod =
    PRACTICE_HISTORY_PERIODS.find((opt) => opt.id === periodId) || PRACTICE_HISTORY_PERIODS[0];

  const filteredDays = useMemo(() => {
    if (selectedPeriod.id === 'today') {
      return overview.dateDays.filter((day) => day.daysAgo === 0);
    }
    return overview.dateDays.filter((day) => day.daysAgo <= selectedPeriod.days);
  }, [overview.dateDays, selectedPeriod.id, selectedPeriod.days]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1140px] mx-auto px-4 sm:px-6 py-7 sm:py-9 space-y-6">
        {/* Top Summary Header Card */}
        <section className="rounded-2xl bg-white border border-slate-200/90 border-t-[3px] border-t-[#2cc9ba] px-6 py-5 shadow-md">
          <Link
            to={overview.backToDashboardPath}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2cc9ba] hover:text-[#1fb3a5] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Practice History
              </h1>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-400">Your recent practice data</p>
            </div>

            <div className="flex flex-wrap items-center gap-5 self-start sm:self-auto">
              <div className="text-left sm:text-right">
                <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-400">
                  LIFETIME ACTIVITY
                </p>
                <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                  {overview.lifetimeQuestions} Questions
                </p>
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-expanded={dropdownOpen}
                  aria-label="Filter practice history period"
                  className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:text-[13px] font-medium text-slate-700 hover:border-[#2cc9ba] transition shadow-2xs cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{selectedPeriod.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-30"
                  >
                    {PRACTICE_HISTORY_PERIODS.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setPeriodId(option.id);
                          setDropdownOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left text-xs sm:text-[13px] hover:bg-slate-50 cursor-pointer ${
                          option.id === periodId
                            ? 'font-bold text-[#0c4a7e] bg-cyan-50/40'
                            : 'text-slate-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Daily Activity Section */}
        {filteredDays.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-xs sm:text-sm font-medium text-slate-400">
              Not Practiced Any Question Yet
            </p>
          </div>
        ) : (
          filteredDays.map((day) => {
            const visibleCards = showAllCategories ? day.cards : day.cards.slice(0, 6);
            return (
              <section
                key={day.id}
                className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-md"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Date + Task Category Cards */}
                  <div className="lg:col-span-9 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3.5">
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {day.dateLabel}
                      </h2>
                      <span className="rounded-full bg-[#38c6bd] px-3.5 py-1 text-xs font-bold text-white shadow-2xs">
                        {day.totalPracticedLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {visibleCards.map((card) => {
                        const theme = TASK_BADGE_THEMES[card.skill] || TASK_BADGE_THEMES.speaking;
                        return (
                          <Link
                            key={card.code}
                            to={`${overview.sectionHistoryBasePath}?task=${card.code}`}
                            className={`rounded-xl border ${theme.cardBorder} ${theme.cardBg} px-4 py-3.5 flex items-center gap-3.5 hover:shadow-xs transition group`}
                          >
                            <span
                              className={`w-9 h-9 rounded-lg ${theme.codeBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}
                            >
                              {card.code}
                            </span>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-[13px] font-bold text-slate-900 group-hover:text-[#0b4a7b] truncate">
                                {card.title}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                {card.practicedLabel}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {day.cards.length > 6 && (
                      <div className="pt-1 flex justify-center">
                        <button
                          type="button"
                          onClick={() => setShowAllCategories((prev) => !prev)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#38c6bd] px-4 py-1.5 text-xs font-bold text-[#0b4a7b] shadow-2xs transition cursor-pointer"
                        >
                          {showAllCategories ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#0b4a7b]" />
                              <span>All categories shown</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5 text-[#0b4a7b]" />
                              <span>More</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right: 4-Skill Summary Breakdown */}
                  <div className="lg:col-span-3 lg:border-l lg:border-slate-100 lg:pl-5 space-y-4">
                    {day.skillBreakdown.map((item) => {
                      const meta = SKILL_ICON_META[item.skill] || SKILL_ICON_META.Speaking;
                      const SkillIcon = meta.Icon;
                      return (
                        <div key={item.skill} className="space-y-1.5">
                          <div className="flex items-start gap-2.5">
                            <div className="w-12 shrink-0 flex flex-col items-center text-center pt-1">
                              <SkillIcon className={`w-4 h-4 ${meta.colorClass}`} />
                              <span className="text-[11px] font-bold text-slate-700 mt-1">
                                {item.skill}
                              </span>
                            </div>

                            <div className="flex-1 text-[11px] space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-400">Question Practiced</span>
                                <span className="font-bold text-slate-800">{item.practiced}</span>
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-400">Time Spent</span>
                                <span className="font-bold text-slate-800">{item.timeSpent}</span>
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-slate-400">Average Score</span>
                                <span className="font-bold text-slate-800">{item.avgScore}</span>
                              </div>
                            </div>
                          </div>

                          <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${meta.barClass}`}
                              style={{ width: `${item.pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })
        )}

        {/* Bottom 60-Day Activity Note */}
        <section className="max-w-[660px] mx-auto rounded-xl border border-[#cde9e6] bg-[#ebf7f6] px-6 py-4 shadow-2xs">
          <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-slate-600">
            <li>Practice history displays activity from the last 60 days only.</li>
            <li>
              Scores and attempt counts for deleted questions may still appear in this history;
              however, the original questions will no longer be accessible.
            </li>
            <li>Overall module scores are calculated using Pearson&apos;s dual scoring effect.</li>
          </ul>
        </section>
      </main>

      <PTEDashboardTealFooter />
    </div>
  );
}
