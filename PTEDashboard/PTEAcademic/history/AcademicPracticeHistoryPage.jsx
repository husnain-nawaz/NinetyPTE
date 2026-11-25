import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ChevronDown, Clock } from 'lucide-react';
import PTEDashboardHeader from '../../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../../shared/PTEDashboardTealFooter';

const HISTORY_PERIOD_OPTIONS = [
  { id: 'today', label: 'Today', days: 0 },
  { id: '7d', label: 'Last 7 Days', days: 7 },
  { id: '15d', label: 'Last 15 Days', days: 15 },
  { id: '30d', label: 'Last 30 Days', days: 30 },
  { id: '60d', label: 'Last 60 Days', days: 60 },
];

const RECENT_PRACTICE_ENTRIES = [
  {
    id: 'hist-we-1',
    task: 'Write Essay',
    code: 'WE',
    questionTitle: 'Remote Work vs Office Collaboration in Urban Economies',
    score: '52 / 90',
    duration: '18:40',
    attemptedAt: '30 Oct, 2026 · 04:15 PM',
    daysAgo: 26,
    to: '/pte-writing-practice',
    badgeClass: 'bg-[#5ba4f5]',
  },
  {
    id: 'hist-rs-1',
    task: 'Repeat Sentence',
    code: 'RS',
    questionTitle: 'Academic Library Archives Orientation Announcement',
    score: '74 / 90',
    duration: '04:12',
    attemptedAt: '18 Nov, 2026 · 07:45 PM',
    daysAgo: 7,
    to: '/pte-speaking-practice',
    badgeClass: 'bg-[#eb8c44]',
  },
  {
    id: 'hist-wfd-1',
    task: 'Write From Dictation',
    code: 'WFD',
    questionTitle: 'Climate Research Grant Submission Deadline Update',
    score: '81 / 90',
    duration: '06:25',
    attemptedAt: '12 Nov, 2026 · 09:10 AM',
    daysAgo: 13,
    to: '/pte-listening-practice',
    badgeClass: 'bg-[#12487a]',
  },
  {
    id: 'hist-fib-1',
    task: 'Fill in the Blanks (Dropdown)',
    code: 'FIB(D)',
    questionTitle: 'Early Maritime Navigation Techniques in the Pacific',
    score: '68 / 90',
    duration: '09:50',
    attemptedAt: '05 Nov, 2026 · 02:20 PM',
    daysAgo: 20,
    to: '/pte-reading-practice',
    badgeClass: 'bg-[#36c959]',
  },
];

/**
 * PTE Academic Practice History page (/v1/practice-history, /practice-history).
 */
export default function AcademicPracticeHistoryPage() {
  const [periodId, setPeriodId] = useState('today');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedPeriod =
    HISTORY_PERIOD_OPTIONS.find((item) => item.id === periodId) || HISTORY_PERIOD_OPTIONS[0];

  const filteredEntries =
    selectedPeriod.days === 0
      ? []
      : RECENT_PRACTICE_ENTRIES.filter((entry) => entry.daysAgo <= selectedPeriod.days);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[980px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <section className="rounded-2xl bg-white border border-slate-200/90 border-t-[3px] border-t-[#2cc9ba] px-6 py-5 sm:px-7 sm:py-6 shadow-md">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#2cc9ba] hover:text-[#1fb3a5] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="mt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Practice History
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">Your recent practice data</p>
            </div>

            <div className="flex flex-wrap items-center gap-5 self-start sm:self-auto">
              <div className="text-left sm:text-right">
                <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400">
                  Lifetime Activity
                </p>
                <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                  2458 Questions
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
                    {HISTORY_PERIOD_OPTIONS.map((option) => (
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

        {filteredEntries.length === 0 ? (
          <div className="py-4 text-center">
            <p className="text-xs sm:text-sm font-medium text-slate-400">
              Not Practiced Any Question Yet
            </p>
          </div>
        ) : (
          <section className="space-y-3" aria-label="Recent practice items">
            {filteredEntries.map((entry) => (
              <Link
                key={entry.id}
                to={entry.to}
                className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white px-5 py-4 shadow-2xs hover:border-[#2cc9ba] transition"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <span className={`rounded-lg px-2.5 py-1 text-[11px] font-bold text-white shrink-0 ${entry.badgeClass}`}>
                    {entry.code}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0c4a7e] truncate">
                      {entry.questionTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {entry.task} · {entry.attemptedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-xs">
                  <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {entry.duration}
                  </span>
                  <span className="rounded-full bg-[#eef8fc] px-3 py-1 font-extrabold text-[#0c4a7e]">
                    {entry.score}
                  </span>
                </div>
              </Link>
            ))}
          </section>
        )}

        <section className="max-w-[640px] mx-auto rounded-xl border border-[#cde9e6] bg-[#eef8f7] px-6 py-4 shadow-2xs">
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
