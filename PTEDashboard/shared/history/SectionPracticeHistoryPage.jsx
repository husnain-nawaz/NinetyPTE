import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart2,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Headphones,
  Mic,
  PenLine,
  Sparkles,
} from 'lucide-react';
import PTEDashboardHeader from '../PTEDashboardHeader';
import PTEDashboardTealFooter from '../PTEDashboardTealFooter';
import { usePortal } from '../portalContext';
import ScoreAnalysisModal from './ScoreAnalysisModal';
import {
  getPracticeHistoryOverview,
  HISTORY_TASK_CATALOG,
  TASK_BADGE_THEMES,
} from './practiceHistoryData';

const ROWS_PER_PAGE = 10;

const TASK_HEADER_ICONS = {
  speaking: Mic,
  writing: PenLine,
  reading: BookOpen,
  listening: Headphones,
};

/**
 * In-portal Section Practice History page (/v1/section-practice-history &
 * /v1/core/section-practice-history), listing individual question attempts
 * and opening the detailed AI Score / Score Analysis modal.
 */
export default function SectionPracticeHistoryPage({ syncCoreMode = false }) {
  const [searchParams] = useSearchParams();
  const { portalMode, setPortalMode } = usePortal();
  const isCoreMode = portalMode === 'core' || syncCoreMode;
  const activeTrack = isCoreMode ? 'core' : 'academic';

  useEffect(() => {
    if (syncCoreMode) {
      setPortalMode('core');
    }
  }, [syncCoreMode, setPortalMode]);

  const rawCode = (searchParams.get('task') || 'RS').toUpperCase();
  const taskMeta = HISTORY_TASK_CATALOG[rawCode] || HISTORY_TASK_CATALOG.RS;
  const overview = useMemo(() => getPracticeHistoryOverview(activeTrack), [activeTrack]);

  const [pageByTask, setPageByTask] = useState({});
  const [selectedAttempt, setSelectedAttempt] = useState(null);

  const scopeKey = `${activeTrack}:${taskMeta.code}`;
  const currentPage = pageByTask[scopeKey] || 1;
  const setCurrentPage = (updater) => {
    setPageByTask((prev) => {
      const curr = prev[scopeKey] || 1;
      const next = typeof updater === 'function' ? updater(curr) : updater;
      return { ...prev, [scopeKey]: next };
    });
  };

  const totalRows = taskMeta.rows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * ROWS_PER_PAGE;
  const visibleRows = taskMeta.rows.slice(startIdx, startIdx + ROWS_PER_PAGE);

  const theme = TASK_BADGE_THEMES[taskMeta.skill] || TASK_BADGE_THEMES.speaking;
  const HeaderIcon = TASK_HEADER_ICONS[taskMeta.skill] || Mic;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1140px] mx-auto px-4 sm:px-6 py-7 sm:py-9 space-y-6">
        {/* Top Task Header Card */}
        <section className="rounded-2xl bg-white border border-slate-200/80 border-t-[3px] border-t-[#2cc9ba] px-5 py-4 sm:px-6 sm:py-5 shadow-md space-y-2.5">
          <Link
            to={overview.historyBasePath}
            aria-label="Back to Practice History"
            className="inline-flex items-center text-[#2cc9ba] hover:text-[#1fb3a5] transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`relative w-12 h-12 rounded-xl ${theme.codeBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}
              >
                <HeaderIcon className="w-5 h-5" />
                <span className="absolute -bottom-1 -right-1 rounded bg-white px-1 py-0.2 text-[9px] font-extrabold text-slate-800 shadow-xs">
                  {taskMeta.code}
                </span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {taskMeta.title}
                </h1>
                <p className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{taskMeta.dateLabel}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="min-w-[82px] rounded-xl bg-slate-50/90 border border-slate-100 px-3.5 py-2.5 text-center space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-[#38c6bd] text-white flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <p className="text-sm font-extrabold text-slate-900">{taskMeta.pracQs}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  PRAC. QS
                </p>
              </div>

              <div className="min-w-[82px] rounded-xl bg-slate-50/90 border border-slate-100 px-3.5 py-2.5 text-center space-y-1">
                <span className="w-6 h-6 mx-auto rounded-full bg-[#3b82f6] text-white flex items-center justify-center">
                  <BarChart2 className="w-3.5 h-3.5" />
                </span>
                <p className="text-sm font-extrabold text-slate-900">{taskMeta.ansCount}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  ANS. COUNT
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Details Table Card */}
        <section className="rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-md space-y-4">
          <h2 className="text-sm sm:text-base font-extrabold text-slate-900">Practice Details</h2>

          <div className="border-b border-slate-100 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            QUESTION
          </div>

          <div className="space-y-2.5">
            {visibleRows.map((row) => (
              <div
                key={row.id}
                className="rounded-xl border border-slate-100 bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 hover:border-[#9be5de] transition"
              >
                <div className="flex items-center gap-3 min-w-[200px] sm:w-[260px]">
                  <span
                    className={`w-7 h-7 rounded-md ${theme.codeBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}
                  >
                    {taskMeta.code}
                  </span>
                  <div className="min-w-0 flex items-center gap-2 text-xs">
                    <span className="font-medium text-slate-600 shrink-0">{row.qid}</span>
                    <span className="font-semibold text-slate-800 truncate">{row.title}</span>
                  </div>
                </div>

                {/* Score Badges + Modal Button */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {row.badges.map((badge, bIdx) => (
                    <span
                      key={`${row.id}-b-${bIdx}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[#67e0d8] bg-white pl-1 pr-3 py-0.5 text-xs font-semibold text-[#23b6ae]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#3dc8c1] text-white text-[10px] font-extrabold flex items-center justify-center">
                        {badge.skill}
                      </span>
                      <span>{badge.value}</span>
                    </span>
                  ))}

                  <button
                    type="button"
                    onClick={() => setSelectedAttempt(row)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#eb8c44] hover:bg-[#d97831] px-3.5 py-1 text-xs font-bold text-white shadow-2xs transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{taskMeta.buttonLabel}</span>
                  </button>
                </div>

                {/* Practiced Count & Prediction Badges */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="rounded bg-[#dff5e3] px-2.5 py-0.5 text-[11px] font-semibold text-[#289c46]">
                    Practiced ({row.practicedCount})
                  </span>
                  {row.isPrediction && (
                    <span className="rounded bg-[#dff4f2] px-2.5 py-0.5 text-[11px] font-semibold text-[#1ea7a1]">
                      Prediction
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination & Showing Count */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="hidden sm:block w-28" />
            <p className="text-[11px] font-medium text-slate-500">
              showing {startIdx + 1} - {Math.min(startIdx + visibleRows.length, totalRows)} out of{' '}
              {totalRows}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                aria-label="Previous page"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => {
                const pageNum = idx + 1;
                const active = pageNum === safePage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition cursor-pointer ${
                      active
                        ? 'bg-[#3dc8c1] text-white rotate-45 shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className={active ? '-rotate-45 inline-block' : ''}>{pageNum}</span>
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                aria-label="Next page"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <PTEDashboardTealFooter />

      {selectedAttempt && (
        <ScoreAnalysisModal
          key={selectedAttempt.id}
          taskMeta={taskMeta}
          row={selectedAttempt}
          onClose={() => setSelectedAttempt(null)}
        />
      )}
    </div>
  );
}
