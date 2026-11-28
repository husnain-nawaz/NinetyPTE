import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Clock, Lightbulb } from 'lucide-react';
import PTEDashboardHeader from '../../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../../shared/PTEDashboardTealFooter';
import { usePortal } from '../../shared/portalContext';
import {
  getMockTestsDataset,
  readMockAttempts,
  SCORE_HISTORY_FILTER_OPTIONS,
  SCORE_HISTORY_MODES,
} from '../mockTestsData';
import {
  FullMockHistorySection,
  SectionalMockHistorySection,
} from './ScoreHistoryTables';
import {
  filterAttemptsByPeriod,
  summarizeFullAttempts,
  summarizeSectionalScore,
} from './scoreHistoryUtils';

/**
 * In-portal Mock Test Score History analytics page supporting Light and Dark modes
 * (/v1/mock-test/score-history and /v1/core/mock-test/score-history).
 */
export default function PortalScoreHistoryPage({ syncCoreMode = false }) {
  const { portalMode, setPortalMode, portalDarkMode: darkMode } = usePortal();
  const isCoreMode = portalMode === 'core' || syncCoreMode;
  const activeTrack = isCoreMode ? 'core' : 'academic';

  useEffect(() => {
    if (syncCoreMode) {
      setPortalMode('core');
    }
  }, [syncCoreMode, setPortalMode]);

  const dataset = useMemo(() => getMockTestsDataset(activeTrack), [activeTrack]);
  const [historyTab, setHistoryTab] = useState('full');
  const [activeSkill, setActiveSkill] = useState('Speaking');
  const [filterOption, setFilterOption] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [referenceNow, setReferenceNow] = useState(() => Date.now());

  const allAttempts = useMemo(() => readMockAttempts(activeTrack), [activeTrack]);

  const activeFilterLabel =
    SCORE_HISTORY_FILTER_OPTIONS.find((opt) => opt.id === filterOption)?.label || 'All';

  const fullAttempts = useMemo(
    () =>
      filterAttemptsByPeriod(
        allAttempts.filter((a) => a.mode === 'full'),
        filterOption,
        referenceNow
      ),
    [allAttempts, filterOption, referenceNow]
  );

  const sectionalAttempts = useMemo(
    () =>
      filterAttemptsByPeriod(
        allAttempts.filter(
          (a) => (a.mode === 'sectional' || a.mode === 'timed') && a.skill === activeSkill
        ),
        filterOption,
        referenceNow
      ),
    [allAttempts, activeSkill, filterOption, referenceNow]
  );

  const summary = useMemo(() => summarizeFullAttempts(fullAttempts), [fullAttempts]);
  const activeSkillScore = useMemo(
    () => summarizeSectionalScore(sectionalAttempts),
    [sectionalAttempts]
  );

  const handleSelectDropdown = (optionId) => {
    setDropdownOpen(false);
    setReferenceNow(Date.now());
    setFilterOption(optionId);
  };

  const cardSurface = darkMode
    ? 'border-zinc-800 bg-[#14171c]'
    : 'border-slate-200/80 bg-white';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        darkMode ? 'bg-[#0a0c0e] text-zinc-200' : 'bg-[#f8fbfd] text-slate-800'
      }`}
    >
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                darkMode ? 'bg-[#1a2433] text-[#4ea5f5]' : 'bg-[#e6eef6] text-[#0b4a7b]'
              }`}
            >
              <Clock className="w-5 h-5" />
            </span>
            <h1 className={`text-lg sm:text-xl font-extrabold ${darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'}`}>
              Score History
            </h1>
          </div>

          <Link
            to={dataset.routes.full}
            className={`text-xs font-semibold transition ${
              darkMode ? 'text-zinc-300 hover:text-[#3dc8c1]' : 'text-[#0b4a7b] hover:text-[#00b4c6]'
            }`}
          >
            &larr; Back to Mock Tests
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            className={`inline-flex rounded-xl border overflow-hidden shadow-2xs ${
              darkMode ? 'border-zinc-700 bg-[#14171c]' : 'border-slate-200 bg-white'
            }`}
          >
            {SCORE_HISTORY_MODES.map((tab) => {
              const isActive = historyTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setHistoryTab(tab.id)}
                  className={`min-w-[155px] px-5 py-2.5 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#3dc8c1] text-white'
                      : darkMode
                        ? 'bg-transparent text-zinc-300 hover:bg-zinc-800'
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`min-w-[160px] rounded-full border px-4 py-2 text-xs font-semibold shadow-2xs flex items-center justify-between gap-2 hover:border-[#00b4c6] cursor-pointer ${
                darkMode
                  ? 'border-zinc-700 bg-[#14171c] text-zinc-200'
                  : 'border-slate-200 bg-white text-slate-600'
              }`}
            >
              <span>{activeFilterLabel}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div
                  className={`absolute right-0 top-11 z-30 w-48 rounded-2xl border py-1.5 shadow-xl text-xs ${
                    darkMode
                      ? 'border-zinc-800 bg-[#181a1f] text-zinc-200'
                      : 'border-slate-100 bg-white text-slate-600'
                  }`}
                >
                  {SCORE_HISTORY_FILTER_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectDropdown(opt.id)}
                      className={`w-full px-4 py-2.5 text-left transition cursor-pointer border-b last:border-b-0 ${
                        darkMode ? 'border-zinc-800' : 'border-slate-100'
                      } ${
                        filterOption === opt.id
                          ? darkMode
                            ? 'font-bold text-[#3dc8c1] bg-zinc-800/70'
                            : 'font-bold text-[#0b4a7b] bg-slate-50/60'
                          : darkMode
                            ? 'hover:bg-zinc-800/50'
                            : 'hover:bg-slate-50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {historyTab === 'full' ? (
          <FullMockHistorySection
            fullAttempts={fullAttempts}
            summary={summary}
            viewScoreRoute={dataset.routes.viewScore}
            cardSurface={cardSurface}
            darkMode={darkMode}
          />
        ) : (
          <SectionalMockHistorySection
            activeSkill={activeSkill}
            onSelectSkill={setActiveSkill}
            activeSkillScore={activeSkillScore}
            sectionalAttempts={sectionalAttempts}
            viewScoreRoute={dataset.routes.viewScore}
            cardSurface={cardSurface}
            darkMode={darkMode}
          />
        )}

        <section
          className={`rounded-xl border px-5 py-3.5 flex items-start gap-3 ${
            darkMode
              ? 'border-[#1f565a] bg-[#0e2629] text-zinc-300'
              : 'border-[#8ce2dc] bg-[#ebfaf9] text-slate-600'
          }`}
        >
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              darkMode ? 'bg-[#17393e] text-[#3dc8c1]' : 'bg-white text-[#0b4a7b]'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
          </span>
          <div>
            <p className={`text-xs sm:text-sm font-bold ${darkMode ? 'text-[#3dc8c1]' : 'text-[#0b4a7b]'}`}>
              AI Study Recommendation
            </p>
            <p className="text-xs mt-0.5 leading-relaxed">
              Based on your mock test history and performance trends, we recommend following a
              structured study plan with regular practice to improve your overall exam score.
            </p>
          </div>
        </section>
      </main>

      <PTEDashboardTealFooter />
    </div>
  );
}
