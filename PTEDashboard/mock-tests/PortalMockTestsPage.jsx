import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowUp,
  BarChart2,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Clock,
  FileText,
  Gift,
  Play,
  Plus,
  RotateCcw,
  Search,
  Sliders,
} from 'lucide-react';
import PTEDashboardHeader from '../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../shared/PTEDashboardTealFooter';
import { usePortal } from '../shared/portalContext';
import {
  CreateCustomMockModal,
  ModuleTabsBar,
  ScoreEmptyState,
} from './MockTestSharedUI';
import {
  ConfirmStartNewMockModal,
  MockTestExamShell,
  clearInProgressMock,
  createMockSession,
  getSessionProgressPercent,
  readInProgressMock,
  saveInProgressMock,
} from './exam-runner';
import {
  appendCustomMock,
  appendMockAttempt,
  clearMockAttempts,
  getMockTestsDataset,
  MOCK_DIFFICULTY_FILTERS,
  MOCK_TEST_MODES,
  readCustomMocks,
  readMockAttempts,
  readMockBookmarks,
  saveMockBookmarks,
  SECTION_TABS,
} from './mockTestsData';

const PAGE_SIZE = 19;

const DIFFICULTY_PILL_CLASSES = {
  Easy: 'bg-emerald-50 text-emerald-500',
  Medium: 'bg-amber-50 text-amber-500',
  Difficult: 'bg-rose-50 text-rose-500',
};

const getAttemptsCount = (item, attemptsCountMap) =>
  (item?.attempts || 0) + (attemptsCountMap[item?.id] || 0);

function MockProgressRing({ percent }) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (Math.max(0, Math.min(100, percent)) / 100) * circumference;

  return (
    <div className="relative w-9 h-9 shrink-0 flex items-center justify-center">
      <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
        <circle cx="18" cy="18" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="#3dc8c1"
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[9px] font-bold text-[#0b4a7b]">{percent}%</span>
    </div>
  );
}

function MockTestListRow({
  item,
  attemptsCount,
  inProgressPercent,
  bookmarked,
  onStart,
  onToggleBookmark,
}) {
  const isResumable = inProgressPercent !== null || attemptsCount > 0;

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 hover:border-[#9be5de] transition">
      <div className="flex items-center gap-3 min-w-0">
        <span className="w-9 h-9 rounded-lg bg-[#eef3f8] text-[#0b4a7b] flex items-center justify-center shrink-0">
          <FileText className="w-4 h-4" />
        </span>
        <div className="min-w-0">
          <p className="text-xs sm:text-[13px] font-bold text-[#0b4a7b] truncate">{item.title}</p>
          <div className="mt-0.5 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Questions : {item.questions}
            </span>
            <span className="inline-flex items-center gap-1">
              <BarChart2 className="w-3 h-3" />
              Attempt(s) : {attemptsCount}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-auto">
        {item.trackLabel && (
          <span className="text-[11px] font-semibold text-[#1ea7a1]">{item.trackLabel}</span>
        )}

        {item.isTimedBadge ? (
          <span className="text-[11px] font-semibold text-[#1ea7a1]">Timed Mock Test</span>
        ) : (
          item.difficulty && (
            <span
              className={`rounded-md px-2.5 py-0.5 text-[11px] font-semibold ${
                DIFFICULTY_PILL_CLASSES[item.difficulty] || 'bg-slate-100 text-slate-600'
              }`}
            >
              {item.difficulty}
            </span>
          )
        )}

        {inProgressPercent !== null && <MockProgressRing percent={inProgressPercent} />}

        <button
          type="button"
          onClick={() => onStart(item)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#0b4a7b] hover:bg-slate-50 px-3 py-1.5 text-xs font-semibold text-[#0b4a7b] transition cursor-pointer"
        >
          {isResumable ? <RotateCcw className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          <span>{isResumable ? 'Resume' : 'Start'}</span>
        </button>

        <button
          type="button"
          onClick={() => onToggleBookmark(item.id)}
          aria-label={bookmarked ? `Remove bookmark for ${item.title}` : `Bookmark ${item.title}`}
          className={`p-1 rounded-md transition cursor-pointer ${
            bookmarked ? 'text-[#1ea7a1]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
}

/**
 * In-portal Mock Tests page supporting Full Mock Tests, Sectional Mock Tests,
 * Timed Sectional Mock Tests, and the Mock Test -> Scores results view
 * for both PTE Academic (/v1/mock-test/...) and PTE Core (/v1/core/mock-test/...).
 */
export default function PortalMockTestsPage({
  syncCoreMode = false,
  initialTopTab = 'mock-test',
  initialMode = 'full',
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { portalMode, setPortalMode } = usePortal();
  const isCoreMode = portalMode === 'core' || syncCoreMode;
  const activeTrack = isCoreMode ? 'core' : 'academic';

  useEffect(() => {
    if (syncCoreMode) {
      setPortalMode('core');
    }
  }, [syncCoreMode, setPortalMode]);

  const dataset = useMemo(() => getMockTestsDataset(activeTrack), [activeTrack]);

  const topTab = initialTopTab;
  const mode = initialMode;
  const [activeSkill, setActiveSkill] = useState('Speaking');
  const [scoreMode, setScoreMode] = useState('full');

  const [predictionOnly, setPredictionOnly] = useState(false);
  const [presetOnly, setPresetOnly] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('All');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [pageByScope, setPageByScope] = useState({});

  const [bookmarkedIds, setBookmarkedIds] = useState(readMockBookmarks);
  const [attemptsStore, setAttemptsStore] = useState(() => ({
    academic: readMockAttempts('academic'),
    core: readMockAttempts('core'),
  }));
  const [customMocksStore, setCustomMocksStore] = useState(() => ({
    academic: readCustomMocks('academic'),
    core: readCustomMocks('core'),
  }));

  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [inProgressStore, setInProgressStore] = useState(() => ({
    academic: readInProgressMock('academic'),
    core: readInProgressMock('core'),
  }));
  const [activeExamSession, setActiveExamSession] = useState(() =>
    location.state?.examAction === 'resume' ? readInProgressMock(activeTrack) : null
  );
  const [pendingNewTestItem, setPendingNewTestItem] = useState(null);

  const inProgressSession = inProgressStore[activeTrack] || null;

  const pageScopeKey = `${activeTrack}:${mode}:${activeSkill}`;
  const currentPage = pageByScope[pageScopeKey] || 1;
  const setCurrentPage = (updater) => {
    setPageByScope((prev) => {
      const current = prev[pageScopeKey] || 1;
      const next = typeof updater === 'function' ? updater(current) : updater;
      return { ...prev, [pageScopeKey]: next };
    });
  };

  const attemptsByTrack = useMemo(
    () => attemptsStore[activeTrack] || [],
    [attemptsStore, activeTrack]
  );
  const customMocks = useMemo(
    () => customMocksStore[activeTrack] || [],
    [customMocksStore, activeTrack]
  );

  const attemptsCountMap = useMemo(() => {
    const counts = {};
    attemptsByTrack.forEach((entry) => {
      counts[entry.testId] = (counts[entry.testId] || 0) + 1;
    });
    return counts;
  }, [attemptsByTrack]);

  const rawRows = useMemo(() => {
    if (mode === 'full') {
      return [...customMocks, ...dataset.fullTests];
    }
    if (mode === 'sectional') {
      return dataset.sectionalBySkill[activeSkill] || [];
    }
    return dataset.timedBySkill[activeSkill] || [];
  }, [mode, activeSkill, customMocks, dataset]);

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return rawRows.filter((item) => {
      if (predictionOnly && !item.isPrediction) return false;
      if (presetOnly && !item.isPreset) return false;
      if (q && !item.title.toLowerCase().includes(q)) return false;

      if (filterValue === 'Easy' || filterValue === 'Medium' || filterValue === 'Difficult') {
        return item.difficulty === filterValue;
      }
      if (filterValue === 'Bookmark') return bookmarkedIds.includes(item.id);
      return true;
    });
  }, [rawRows, predictionOnly, presetOnly, searchQuery, filterValue, bookmarkedIds]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const visibleRows = filteredRows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const scoreFilteredAttempts = useMemo(
    () => attemptsByTrack.filter((item) => item.mode === scoreMode),
    [attemptsByTrack, scoreMode]
  );

  const handleSelectTopTab = (nextTopTab) => {
    navigate(nextTopTab === 'scores' ? dataset.routes.scores : dataset.routes[mode]);
  };

  const handleSelectMode = (nextMode) => {
    navigate(dataset.routes[nextMode]);
  };

  const handleResetFilters = () => {
    setPredictionOnly(false);
    setPresetOnly(true);
    setSearchQuery('');
    setFilterValue('All');
    setFilterMenuOpen(false);
    setCurrentPage(1);
  };

  const handleToggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      saveMockBookmarks(next);
      return next;
    });
  };

  const handleCreateCustomMock = (payload) => {
    const created = {
      id: `${activeTrack}-custom-${Date.now()}`,
      mode: 'full',
      title: payload.title,
      questions: payload.questions,
      attempts: 0,
      trackLabel: dataset.trackLabel,
      difficulty: payload.difficulty,
      durationMinutes: Math.round(payload.questions * 1.8),
      isPrediction: false,
      isPreset: true,
    };
    const next = appendCustomMock(activeTrack, created);
    setCustomMocksStore((prev) => ({ ...prev, [activeTrack]: next }));
    setCurrentPage(1);
  };

  const handleCompleteAttempt = (attempt) => {
    clearInProgressMock(activeTrack);
    setInProgressStore((prev) => ({ ...prev, [activeTrack]: null }));
    const next = appendMockAttempt(activeTrack, attempt);
    setAttemptsStore((prev) => ({ ...prev, [activeTrack]: next }));
  };

  const launchFreshMockSession = (testItem) => {
    const freshSession = createMockSession(testItem, isCoreMode);
    saveInProgressMock(activeTrack, freshSession);
    setInProgressStore((prev) => ({ ...prev, [activeTrack]: freshSession }));
    setPendingNewTestItem(null);
    setActiveExamSession(freshSession);
  };

  const handleRequestStartTest = (testItem) => {
    if (inProgressSession && inProgressSession.testId === testItem.id) {
      setActiveExamSession(inProgressSession);
      return;
    }

    if (inProgressSession && inProgressSession.testId !== testItem.id) {
      setPendingNewTestItem(testItem);
      return;
    }

    launchFreshMockSession(testItem);
  };

  const handlePersistExamSession = useCallback(
    (updatedSession) => {
      saveInProgressMock(activeTrack, updatedSession);
    },
    [activeTrack]
  );

  const handleSaveAndExitExam = (savedSession) => {
    if (savedSession) {
      saveInProgressMock(activeTrack, savedSession);
      setInProgressStore((prev) => ({ ...prev, [activeTrack]: savedSession }));
    }
    setActiveExamSession(null);
  };

  const freeTestAttempts = getAttemptsCount(dataset.freeFullTest, attemptsCountMap);
  const freeInProgressPercent =
    inProgressSession?.testId === dataset.freeFullTest.id
      ? getSessionProgressPercent(inProgressSession)
      : null;

  return (
    <div className="min-h-screen bg-[#f8fbfd] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
        {/* Page Heading */}
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-[#e6eef6] text-[#0b4a7b] flex items-center justify-center shrink-0">
            <ClipboardCheck className="w-5 h-5" />
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-[#0b4a7b]">Mock Tests</h1>
        </div>

        {/* Top Segmented Tabs + Score History Button */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-slate-200 bg-white p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => handleSelectTopTab('mock-test')}
              className={`min-w-[130px] rounded-full px-6 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                topTab === 'mock-test'
                  ? 'bg-[#3dc8c1] text-white shadow-2xs'
                  : 'bg-transparent text-[#0b4a7b] hover:text-[#109aa8]'
              }`}
            >
              Mock Test
            </button>
            <button
              type="button"
              onClick={() => handleSelectTopTab('scores')}
              className={`min-w-[130px] rounded-full px-6 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer ${
                topTab === 'scores'
                  ? 'bg-[#3dc8c1] text-white shadow-2xs'
                  : 'bg-transparent text-[#0b4a7b] hover:text-[#109aa8]'
              }`}
            >
              Scores
            </button>
          </div>

          <Link
            to={dataset.routes.history}
            className="inline-flex items-center gap-2 rounded-full bg-[#0b4a7b] hover:bg-[#08385f] px-4 py-2 text-xs font-bold text-white shadow-2xs transition"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Score History</span>
          </Link>
        </div>

        {topTab === 'mock-test' ? (
          <section className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-2xs space-y-5">
            {/* Mode Switcher & Filter Toolbar */}
            <div className="rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex flex-wrap items-center rounded-full border border-slate-200 bg-white p-0.5">
                {MOCK_TEST_MODES.map((tab) => {
                  const isActive = mode === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleSelectMode(tab.id)}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-[#109aa8] text-white shadow-2xs'
                          : 'bg-transparent text-[#0b4a7b] hover:text-[#109aa8]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 text-xs">
                <label className="inline-flex items-center gap-1.5 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={predictionOnly}
                    onChange={(e) => {
                      setPredictionOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="rounded border-slate-300 accent-[#3dc8c1]"
                  />
                  <span>Prediction MT</span>
                </label>

                <label className="inline-flex items-center gap-1.5 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={presetOnly}
                    onChange={(e) => {
                      setPresetOnly(e.target.checked);
                      setCurrentPage(1);
                    }}
                    className="rounded border-slate-300 accent-[#3dc8c1]"
                  />
                  <span>Preset MT</span>
                </label>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search..."
                    aria-label="Search mock tests"
                    className="w-40 sm:w-48 rounded-full border border-slate-200 bg-white pl-8.5 pr-3.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-[#00b4c6]"
                  />
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setFilterMenuOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={filterMenuOpen}
                    aria-label="Filter mock tests"
                    className="min-w-[100px] inline-flex items-center justify-between gap-4 rounded-full border border-slate-200 bg-white hover:border-[#00b4c6] px-4 py-1.5 text-xs font-medium text-[#0b4a7b] focus:outline-none focus:border-[#00b4c6] cursor-pointer transition"
                  >
                    <span>{filterValue}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                        filterMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {filterMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setFilterMenuOpen(false)}
                        aria-hidden="true"
                      />
                      <div
                        role="listbox"
                        aria-label="Mock test filter options"
                        className="absolute left-0 top-full mt-2 w-40 rounded-xl border border-slate-100 bg-white shadow-lg divide-y divide-slate-100 overflow-hidden z-30"
                      >
                        {MOCK_DIFFICULTY_FILTERS.map((opt) => {
                          const isSelected = filterValue === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setFilterValue(opt);
                                setCurrentPage(1);
                                setFilterMenuOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-xs transition cursor-pointer ${
                                isSelected
                                  ? 'font-bold text-[#0b4a7b] bg-slate-50/70'
                                  : 'font-medium text-slate-600 hover:bg-slate-50 hover:text-[#0b4a7b]'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                {mode === 'full' && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="rounded-full border border-[#0b4a7b]/40 bg-white hover:border-[#0b4a7b] px-4 py-1.5 text-xs font-semibold text-[#0b4a7b] transition cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {mode === 'full' ? (
              <div className="space-y-3">
                {/* Featured Free Mock Test Card */}
                <div className="rounded-xl border border-[#bceee9] bg-linear-to-r from-[#effcfb] to-[#f8fefe] px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-white text-[#1ea7a1] border border-[#cef2ee] flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#0b4a7b]">
                        {dataset.freeFullTest.title}
                      </p>
                      <div className="mt-0.5 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Questions : {dataset.freeFullTest.questions}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <BarChart2 className="w-3 h-3" />
                          Attempt(s) : {freeTestAttempts}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-auto">
                    <span className="rounded-md bg-[#e5f8f6] px-2.5 py-0.5 text-[11px] font-semibold text-[#1ea7a1]">
                      Free
                    </span>
                    {freeInProgressPercent !== null && (
                      <MockProgressRing percent={freeInProgressPercent} />
                    )}
                    <button
                      type="button"
                      onClick={() => handleRequestStartTest(dataset.freeFullTest)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#0b4a7b] px-3 py-1.5 text-xs font-semibold text-[#0b4a7b] transition cursor-pointer"
                    >
                      {freeInProgressPercent !== null || freeTestAttempts > 0 ? (
                        <RotateCcw className="w-3 h-3" />
                      ) : (
                        <Play className="w-3 h-3" />
                      )}
                      <span>
                        {freeInProgressPercent !== null || freeTestAttempts > 0 ? 'Resume' : 'Start'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleBookmark(dataset.freeFullTest.id)}
                      aria-label="Bookmark Free Mock Test"
                      className={`p-1 rounded-md transition cursor-pointer ${
                        bookmarkedIds.includes(dataset.freeFullTest.id)
                          ? 'text-[#1ea7a1]'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Bookmark
                        className="w-4 h-4"
                        fill={bookmarkedIds.includes(dataset.freeFullTest.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>
                </div>

                {/* Create Your Own Mock Test Banner */}
                <div className="rounded-xl border border-[#b4ece6] bg-linear-to-r from-[#e6f8f6] to-[#f4fcfb] px-4 py-3.5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-white text-[#1ea7a1] border border-[#cef2ee] flex items-center justify-center shrink-0">
                      <Sliders className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#0b4a7b]">
                        Create Your Own Mock Test
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Customize test length, section focus &amp; difficulty as per your need.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-auto">
                    <span className="text-[11px] font-medium text-slate-600">
                      {dataset.customRangeLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCustomModalOpen(true)}
                      className="inline-flex items-center gap-1 rounded-full bg-[#0b4a7b] hover:bg-[#08385f] px-4 py-1.5 text-xs font-bold text-white shadow-2xs transition cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create</span>
                    </button>
                  </div>
                </div>

                <h2 className="text-sm font-extrabold text-[#0b4a7b] pt-2">Mock Tests</h2>
              </div>
            ) : (
              <ModuleTabsBar
                tabs={SECTION_TABS}
                activeTab={activeSkill}
                onSelect={(skill) => {
                  setActiveSkill(skill);
                  setCurrentPage(1);
                }}
                showTimedInfo={mode === 'timed'}
              />
            )}

            {/* Filtered Mock Tests Rows */}
            {visibleRows.length > 0 ? (
              <div className="space-y-2.5">
                {visibleRows.map((item) => (
                  <MockTestListRow
                    key={item.id}
                    item={item}
                    attemptsCount={getAttemptsCount(item, attemptsCountMap)}
                    inProgressPercent={
                      inProgressSession?.testId === item.id
                        ? getSessionProgressPercent(inProgressSession)
                        : null
                    }
                    bookmarked={bookmarkedIds.includes(item.id)}
                    onStart={handleRequestStartTest}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <ScoreEmptyState message="No mock tests matched your selected filters. Try resetting filters above." />
            )}

            {/* Pagination Footer */}
            {totalPages > 1 && (
              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
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
                          ? 'bg-[#e6f7f6] text-[#1ea7a1] border border-[#bceee9]'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </section>
        ) : (
          /* Mock Test -> Scores View (/mock-test-result-list) */
          <section className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-2xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {MOCK_TEST_MODES.map((tab) => {
                  const isActive = scoreMode === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setScoreMode(tab.id)}
                      className={`rounded-lg px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-[#12738b] text-white shadow-2xs'
                          : 'bg-white text-slate-600 hover:text-[#0b4a7b]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {scoreFilteredAttempts.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    clearMockAttempts(activeTrack);
                    setAttemptsStore((prev) => ({ ...prev, [activeTrack]: [] }));
                  }}
                  className="text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
                >
                  Clear Sample Records
                </button>
              )}
            </div>

            <div className="rounded-xl border border-slate-200/80 min-h-[340px] p-4">
              {scoreFilteredAttempts.length === 0 ? (
                <ScoreEmptyState />
              ) : (
                <div className="space-y-3">
                  {scoreFilteredAttempts.map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-xl border border-slate-200/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-sm font-bold text-[#0b4a7b]">{entry.title}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {entry.trackLabel} • Completed{' '}
                          {new Date(entry.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-lg bg-[#eefaf9] px-3 py-1 text-xs font-extrabold text-[#1ea7a1]">
                          Overall: {entry.overall} / 90
                        </span>
                        <Link
                          to={dataset.routes.history}
                          className="text-xs font-bold text-[#0b4a7b] underline"
                        >
                          View History
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <PTEDashboardTealFooter />

      {customModalOpen && (
        <CreateCustomMockModal
          key={`${activeTrack}-${dataset.customDefaultCount}`}
          onClose={() => setCustomModalOpen(false)}
          trackLabel={dataset.trackLabel}
          customBounds={dataset.customBounds}
          defaultCount={dataset.customDefaultCount}
          onCreateTest={handleCreateCustomMock}
        />
      )}

      {pendingNewTestItem && (
        <ConfirmStartNewMockModal
          unfinishedTitle={inProgressSession?.title}
          pendingTitle={pendingNewTestItem.title}
          onConfirmYes={() => launchFreshMockSession(pendingNewTestItem)}
          onCancelNo={() => setPendingNewTestItem(null)}
        />
      )}

      {activeExamSession && (
        <MockTestExamShell
          key={`${activeTrack}-${activeExamSession.testId}-${activeExamSession.startedAt}`}
          initialSession={activeExamSession}
          isCore={isCoreMode}
          trackLabel={dataset.trackLabel}
          scoreHistoryRoute={dataset.routes.history}
          onPersistSession={handlePersistExamSession}
          onFinishAttempt={handleCompleteAttempt}
          onSaveAndExit={handleSaveAndExitExam}
        />
      )}

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-30 w-9 h-9 rounded-full border border-[#3dc8c1] bg-white text-[#1ea7a1] hover:bg-[#e5f8f6] shadow-md flex items-center justify-center transition cursor-pointer"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
