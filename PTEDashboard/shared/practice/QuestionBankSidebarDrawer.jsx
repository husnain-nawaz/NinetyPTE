import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowDownUp,
  ArrowLeftRight,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Search,
  X,
} from 'lucide-react';

const PAGE_SIZE = 10;

const LEVEL_STYLES = {
  Easy: 'border-emerald-200 bg-emerald-50 text-emerald-600',
  Medium: 'border-amber-200 bg-amber-50 text-amber-600',
  Difficult: 'border-rose-200 bg-rose-50 text-rose-600',
};

const LEVEL_DOT_STYLES = {
  Easy: 'bg-emerald-500',
  Medium: 'bg-amber-500',
  Difficult: 'bg-rose-500',
};

function downloadTaskMaterial(taskMeta, questions) {
  const lines = [
    `NinetyPTE Question Bank — ${taskMeta.title} (${taskMeta.code})`,
    `Total Listed Questions: ${taskMeta.totalQuestions}`,
    '',
    ...questions.slice(0, 40).map(
      (q, i) =>
        `${i + 1}. #${q.id} — ${q.title} [${q.difficulty}] (Appeared ${q.appearedCount}x)${
          q.contentSnippet ? ` :: ${q.contentSnippet}` : ''
        }`
    ),
  ].join('\n');

  const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${taskMeta.slug}-practice-material.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Shared slide-out Question Browser right sidebar rendered across all practice tasks
 * for both PTE Academic and PTE Core.
 */
export default function QuestionBankSidebarDrawer({
  isOpen,
  onClose,
  taskMeta,
  questions,
  activeQuestionId,
  onSelectQuestion,
  onToggleBookmark,
  onResetPractice,
}) {
  const [practiceStatus, setPracticeStatus] = useState('all'); // 'all' | 'practiced' | 'not_practiced'
  const [displayContent, setDisplayContent] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [showContinueBanner, setShowContinueBanner] = useState(true);
  const [predictionOnly, setPredictionOnly] = useState(false);
  const [bookmarkFilter, setBookmarkFilter] = useState('all'); // 'all' | 'bookmarked' | 'unbookmarked'
  const [levelFilter, setLevelFilter] = useState('all'); // 'all' | 'Easy' | 'Medium' | 'Difficult'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all' | 'new' | 'new_prediction'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [questionTypeFilter, setQuestionTypeFilter] = useState('all');
  const [bookmarkMenuOpen, setBookmarkMenuOpen] = useState(false);
  const [levelMenuOpen, setLevelMenuOpen] = useState(false);
  const [priorityMenuOpen, setPriorityMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [questionTypeMenuOpen, setQuestionTypeMenuOpen] = useState(false);
  const [sortMode, setSortMode] = useState('newest'); // 'newest' | 'oldest' | 'appeared'
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPageInput, setGoToPageInput] = useState('');

  const filteredQuestions = useMemo(() => {
    const query = searchInput.trim().toLowerCase();
    const matched = questions.filter((q) => {
      if (practiceStatus === 'practiced' && q.practicedCount === 0) return false;
      if (practiceStatus === 'not_practiced' && q.practicedCount > 0) return false;
      if (predictionOnly && !q.prediction && !q.newPrediction) return false;
      if (bookmarkFilter === 'bookmarked' && !q.bookmarked) return false;
      if (bookmarkFilter === 'unbookmarked' && q.bookmarked) return false;
      if (levelFilter !== 'all' && q.difficulty !== levelFilter) return false;
      if (priorityFilter === 'new' && !q.isNew) return false;
      if (priorityFilter === 'new_prediction' && !q.newPrediction) return false;
      if (categoryFilter !== 'all' && q.imageType !== categoryFilter) return false;
      if (questionTypeFilter !== 'all' && q.questionType !== questionTypeFilter) return false;
      if (
        query &&
        !q.title.toLowerCase().includes(query) &&
        !q.id.toLowerCase().includes(query) &&
        !(q.contentSnippet || '').toLowerCase().includes(query)
      ) {
        return false;
      }
      return true;
    });

    const sorted = [...matched];
    if (sortMode === 'oldest') {
      sorted.sort((a, b) => Number(a.id) - Number(b.id));
    } else if (sortMode === 'appeared') {
      sorted.sort((a, b) => b.appearedCount - a.appearedCount);
    }
    return sorted;
  }, [
    bookmarkFilter,
    categoryFilter,
    levelFilter,
    practiceStatus,
    predictionOnly,
    priorityFilter,
    questionTypeFilter,
    questions,
    searchInput,
    sortMode,
  ]);

  const hasActiveFilter =
    practiceStatus !== 'all' ||
    predictionOnly ||
    bookmarkFilter !== 'all' ||
    levelFilter !== 'all' ||
    priorityFilter !== 'all' ||
    categoryFilter !== 'all' ||
    questionTypeFilter !== 'all' ||
    searchInput.trim().length > 0;

  const displayTotalQuestions = hasActiveFilter
    ? filteredQuestions.length
    : taskMeta.totalQuestions;
  const displayTotalPages = Math.max(1, Math.ceil(displayTotalQuestions / PAGE_SIZE));
  const actualPagesAvailable = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(1, currentPage), actualPagesAvailable);

  const pageRows = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredQuestions.slice(start, start + PAGE_SIZE);
  }, [filteredQuestions, safePage]);

  const sortLabel =
    sortMode === 'newest' ? 'New to old' : sortMode === 'oldest' ? 'Old to new' : 'Most appeared';

  const handleApplyPageJump = () => {
    const parsed = Number.parseInt(goToPageInput, 10);
    if (!Number.isNaN(parsed)) {
      setCurrentPage(Math.min(Math.max(1, parsed), actualPagesAvailable));
    }
    setGoToPageInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/45 flex justify-end" onClick={onClose}>
      <div
        className="relative w-full max-w-[780px] h-full bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Edge Toggle Handle */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Collapse question sidebar"
          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-[#00b4c6] hover:bg-[#0097a7] text-white shadow-lg absolute -left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer transition"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>

        {/* Drawer Top Bar */}
        <div className="px-5 sm:px-6 pt-5 pb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-8 h-8 rounded-full text-white text-[11px] font-extrabold flex items-center justify-center shrink-0"
              style={{ backgroundColor: taskMeta.badgeColor }}
            >
              {taskMeta.code}
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-[#0c4a7e] truncate">
              {taskMeta.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onResetPractice}
              className="rounded-lg border border-rose-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 transition cursor-pointer"
            >
              Reset Practice
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="sm:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Checkboxes + Display Content Switch + Search + Download */}
        <div className="px-5 sm:px-6 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
            {[
              { id: 'all', label: 'All' },
              { id: 'practiced', label: 'Practiced' },
              { id: 'not_practiced', label: 'Not Practiced' },
            ].map((opt) => (
              <label key={opt.id} className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={practiceStatus === opt.id}
                  onChange={() => {
                    setPracticeStatus(opt.id);
                    setCurrentPage(1);
                  }}
                  className="rounded border-slate-300 text-[#00b4c6] focus:ring-[#00b4c6]"
                />
                <span>{opt.label}</span>
              </label>
            ))}

            {taskMeta.supportsDisplayContent && (
              <div className="inline-flex items-center gap-2 pl-1">
                <span className="text-[11px] font-bold text-slate-700">Display Content</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={displayContent}
                  aria-label="Display Content"
                  onClick={() => setDisplayContent((prev) => !prev)}
                  className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors cursor-pointer ${
                    displayContent ? 'bg-[#00b4c6]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 rounded-full bg-white shadow transition-transform ${
                      displayContent ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Content / Title / Number"
                aria-label="Search practice questions"
                className="w-44 sm:w-48 rounded-full border border-slate-200 bg-white pl-3.5 pr-9 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#00b4c6]"
              />
              <span className="absolute right-0.5 w-7 h-7 rounded-full bg-[#00b4c6] text-white flex items-center justify-center pointer-events-none">
                <Search className="w-3.5 h-3.5" />
              </span>
            </div>

            {!taskMeta.hideDownloadButton && (
              <button
                type="button"
                onClick={() => downloadTaskMaterial(taskMeta, filteredQuestions)}
                className={`rounded-full text-white px-4 py-1.5 text-xs font-bold shadow-2xs transition cursor-pointer ${
                  taskMeta.skill === 'reading'
                    ? 'bg-[#84cc16] hover:bg-[#65a30d]'
                    : 'bg-[#eb8c44] hover:bg-[#d97736]'
                }`}
              >
                Download Material
              </button>
            )}
          </div>
        </div>

        {/* Continue Banner */}
        {showContinueBanner && taskMeta.continueItem && (
          <div
            className={`mx-5 sm:mx-6 mb-3 rounded-xl border px-4 py-2.5 flex items-center justify-between gap-3 ${
              taskMeta.skill === 'reading'
                ? 'bg-[#f0fdf4] border-[#bbf7d0]'
                : taskMeta.skill === 'listening'
                  ? 'bg-[#f0f9ff] border-[#bae6fd]'
                  : 'bg-[#fff8ef] border-[#fed7aa]'
            }`}
          >
            <button
              type="button"
              onClick={() => {
                onSelectQuestion({
                  id: taskMeta.continueItem.id,
                  title: taskMeta.continueItem.title,
                  difficulty: 'Medium',
                  prediction: true,
                  practicedCount: 1,
                  appearedCount: 64,
                  contentSnippet: taskMeta.promptText,
                });
                onClose();
              }}
              className="flex flex-wrap items-center gap-2 text-left text-xs cursor-pointer"
            >
              <span className="text-slate-500 font-medium">Continue from</span>
              <span className="text-slate-300">|</span>
              <span
                className={`font-bold ${
                  taskMeta.skill === 'reading'
                    ? 'text-[#16a34a]'
                    : taskMeta.skill === 'listening'
                      ? 'text-[#0284c7]'
                      : 'text-[#ea580c]'
                }`}
              >
                {taskMeta.continueItem.id} : {taskMeta.continueItem.title}
              </span>
              <span className="text-slate-400">Click to continue the previous practice list</span>
            </button>

            <button
              type="button"
              onClick={() => setShowContinueBanner(false)}
              aria-label="Dismiss continue banner"
              className={`w-5 h-5 rounded-full text-white flex items-center justify-center shrink-0 cursor-pointer ${
                taskMeta.skill === 'reading'
                  ? 'bg-[#4ade80] hover:bg-[#22c55e]'
                  : taskMeta.skill === 'listening'
                    ? 'bg-[#38bdf8] hover:bg-[#0284c7]'
                    : 'bg-[#fb923c] hover:bg-[#ea580c]'
              }`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Secondary Filter Tabs & Sort Bar */}
        <div className="px-5 sm:px-6 pb-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setPracticeStatus('all');
                setPredictionOnly(false);
                setBookmarkFilter('all');
                setLevelFilter('all');
                setPriorityFilter('all');
                setCategoryFilter('all');
                setQuestionTypeFilter('all');
                setSearchInput('');
                setCurrentPage(1);
              }}
              className={`font-semibold pb-0.5 cursor-pointer ${
                !hasActiveFilter ? 'text-[#00b4c6]' : 'text-slate-600 hover:text-[#00b4c6]'
              }`}
            >
              All
            </button>

            <button
              type="button"
              onClick={() => {
                setPredictionOnly((prev) => !prev);
                setCurrentPage(1);
              }}
              className={`font-semibold pb-0.5 cursor-pointer ${
                predictionOnly ? 'text-[#00b4c6]' : 'text-slate-700 hover:text-[#00b4c6]'
              }`}
            >
              Prediction
            </button>

            {/* Bookmark Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setBookmarkMenuOpen((prev) => !prev);
                  setLevelMenuOpen(false);
                  setPriorityMenuOpen(false);
                }}
                className={`inline-flex items-center gap-1 font-semibold cursor-pointer ${
                  bookmarkFilter !== 'all' ? 'text-[#00b4c6]' : 'text-slate-700 hover:text-[#00b4c6]'
                }`}
              >
                <span>Bookmark</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {bookmarkMenuOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-36 rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-20">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'bookmarked', label: 'Bookmarked' },
                    { id: 'unbookmarked', label: 'Not Bookmarked' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setBookmarkFilter(opt.id);
                        setBookmarkMenuOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-slate-50 cursor-pointer ${
                        bookmarkFilter === opt.id ? 'text-[#00b4c6] font-bold' : 'text-slate-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Level Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setLevelMenuOpen((prev) => !prev);
                  setBookmarkMenuOpen(false);
                  setPriorityMenuOpen(false);
                }}
                className={`inline-flex items-center gap-1 font-semibold cursor-pointer ${
                  levelFilter !== 'all' ? 'text-[#00b4c6]' : 'text-slate-700 hover:text-[#00b4c6]'
                }`}
              >
                <span>{levelFilter === 'all' ? 'Level' : levelFilter}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {levelMenuOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-32 rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-20">
                  {['all', 'Easy', 'Medium', 'Difficult'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setLevelFilter(lvl);
                        setLevelMenuOpen(false);
                        setCurrentPage(1);
                      }}
                      className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-slate-50 cursor-pointer ${
                        levelFilter === lvl ? 'text-[#00b4c6] font-bold' : 'text-slate-600'
                      }`}
                    >
                      {lvl === 'all' ? 'All Levels' : lvl}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {Array.isArray(taskMeta.questionTypeOptions) && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setQuestionTypeMenuOpen((prev) => !prev);
                    setLevelMenuOpen(false);
                    setBookmarkMenuOpen(false);
                    setCategoryMenuOpen(false);
                    setPriorityMenuOpen(false);
                  }}
                  className={`inline-flex items-center gap-1 font-semibold cursor-pointer ${
                    questionTypeFilter !== 'all' ? 'text-[#00b4c6]' : 'text-slate-700 hover:text-[#00b4c6]'
                  }`}
                >
                  <span>{questionTypeFilter === 'all' ? 'Question Type' : questionTypeFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {questionTypeMenuOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-36 rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-20">
                    {['all', ...taskMeta.questionTypeOptions].map((qType) => (
                      <button
                        key={qType}
                        type="button"
                        onClick={() => {
                          setQuestionTypeFilter(qType);
                          setQuestionTypeMenuOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-slate-50 cursor-pointer ${
                          questionTypeFilter === qType ? 'text-[#00b4c6] font-bold' : 'text-slate-600'
                        }`}
                      >
                        {qType === 'all' ? 'All Types' : qType}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {Array.isArray(taskMeta.categoryOptions) && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setCategoryMenuOpen((prev) => !prev);
                    setLevelMenuOpen(false);
                    setBookmarkMenuOpen(false);
                    setPriorityMenuOpen(false);
                  }}
                  className="inline-flex items-center justify-between gap-2 min-w-[76px] rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-[#0c4a7e] hover:border-[#00b4c6] cursor-pointer"
                >
                  <span>{categoryFilter === 'all' ? 'All' : categoryFilter}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {categoryMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-40 rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-20">
                    {['all', ...taskMeta.categoryOptions].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setCategoryFilter(cat);
                          setCategoryMenuOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-slate-50 cursor-pointer ${
                          categoryFilter === cat ? 'text-[#00b4c6] font-bold' : 'text-slate-600'
                        }`}
                      >
                        {cat === 'all' ? 'All Categories' : cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {taskMeta.supportsPriorityFilter && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setPriorityMenuOpen((prev) => !prev);
                    setLevelMenuOpen(false);
                    setBookmarkMenuOpen(false);
                    setCategoryMenuOpen(false);
                  }}
                  title="Filter New / Prediction items"
                  aria-label="Filter New items"
                  className={`inline-flex items-center gap-0.5 p-1 rounded hover:bg-slate-100 cursor-pointer ${
                    priorityFilter !== 'all' ? 'text-[#00b4c6]' : 'text-slate-400'
                  }`}
                >
                  <ArrowLeftRight className="w-4 h-4" />
                  <ChevronDown className="w-3 h-3" />
                </button>

                {priorityMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border border-slate-200 bg-white py-1 shadow-lg z-20">
                    {[
                      { id: 'all', label: 'All Updates' },
                      { id: 'new', label: 'New Only' },
                      { id: 'new_prediction', label: 'New Prediction' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setPriorityFilter(opt.id);
                          setPriorityMenuOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-slate-50 cursor-pointer ${
                          priorityFilter === opt.id ? 'text-[#00b4c6] font-bold' : 'text-slate-600'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setSortMode((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
              title="Toggle New / Old order"
              aria-label="Toggle question sort order"
              className={`p-1 rounded hover:bg-slate-100 cursor-pointer ${
                sortMode !== 'appeared' ? 'text-[#00b4c6]' : 'text-slate-400'
              }`}
            >
              <ArrowDownUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setSortMode('appeared')}
              title="Sort by most appeared"
              aria-label="Sort by appearance count"
              className={`p-1 rounded hover:bg-slate-100 cursor-pointer ${
                sortMode === 'appeared' ? 'text-[#00b4c6]' : 'text-slate-400'
              }`}
            >
              <Activity className="w-4 h-4" />
            </button>

            <div className="text-right leading-tight">
              <p className="font-extrabold text-[#0c4a7e] text-xs">{displayTotalQuestions} Questions</p>
              <p className="text-[10.5px] text-slate-400">({sortLabel})</p>
            </div>
          </div>
        </div>

        {/* Question List */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-3 space-y-2.5">
          {pageRows.length > 0 ? (
            pageRows.map((q) => {
              const isSelected = activeQuestionId === q.id;
              return (
                <div
                  key={q.id}
                  onClick={() => {
                    onSelectQuestion(q);
                    onClose();
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectQuestion(q);
                      onClose();
                    }
                  }}
                  className={`rounded-xl border px-4 py-2.5 cursor-pointer transition space-y-1.5 ${
                    isSelected
                      ? 'border-[#00b4c6] bg-[#f4fbfc]'
                      : 'border-slate-200/80 bg-white hover:border-[#00b4c6]/60'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs font-bold text-[#00a8bd] shrink-0">#{q.id}</span>
                      <span className="text-xs sm:text-[13px] font-semibold text-slate-700 truncate">
                        {q.title}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0 text-[10.5px] font-semibold">
                      <span
                        className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 ${
                          LEVEL_STYLES[q.difficulty] || LEVEL_STYLES.Medium
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            LEVEL_DOT_STYLES[q.difficulty] || LEVEL_DOT_STYLES.Medium
                          }`}
                        />
                        {q.difficulty}
                      </span>

                      {q.isNew && (
                        <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[#0c4a7e]">
                          New
                        </span>
                      )}

                      {q.newPrediction && (
                        <span className="rounded border border-cyan-200 bg-cyan-50/40 px-2 py-0.5 text-[#0c4a7e]">
                          New Prediction
                        </span>
                      )}

                      {q.prediction && (
                        <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[#0c4a7e]">
                          Prediction
                        </span>
                      )}

                      {q.practicedCount > 0 && (
                        <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-emerald-600">
                          Practiced ({q.practicedCount})
                        </span>
                      )}

                      <span className="rounded border border-cyan-200 bg-cyan-50/40 px-2 py-0.5 text-[#00a8bd]">
                        Appeared ({q.appearedCount})
                      </span>

                      <button
                        type="button"
                        aria-label={q.bookmarked ? 'Remove bookmark' : 'Bookmark question'}
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleBookmark(q.id);
                        }}
                        className="p-1 rounded text-[#00b4c6] hover:bg-cyan-50 cursor-pointer"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${q.bookmarked ? 'fill-[#00b4c6]' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {displayContent && q.contentSnippet && (
                    <p className="text-[11px] text-slate-500 pl-1 border-l-2 border-[#00b4c6]/40">
                      {q.contentSnippet}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs text-slate-500">
              No practice questions match your selected filters.
            </div>
          )}
        </div>

        {/* Footer Pagination */}
        <div className="px-5 sm:px-6 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
              className="p-1.5 rounded text-slate-400 hover:text-[#0c4a7e] disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[1, 2, 3, 4, 5].map((pageNum) => {
              if (pageNum > displayTotalPages) return null;
              const isActive = safePage === pageNum;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(Math.min(pageNum, actualPagesAvailable))}
                  className={`w-7 h-7 rounded-md font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#00b4c6] text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {displayTotalPages > 6 && (
              <>
                <span className="px-1 text-slate-400">......</span>
                <button
                  type="button"
                  onClick={() => setCurrentPage(actualPagesAvailable)}
                  className="px-1.5 h-7 rounded-md font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  {displayTotalPages}
                </button>
              </>
            )}

            <button
              type="button"
              disabled={safePage >= actualPagesAvailable}
              onClick={() => setCurrentPage((p) => Math.min(actualPagesAvailable, p + 1))}
              aria-label="Next page"
              className="p-1.5 rounded text-slate-500 hover:text-[#0c4a7e] disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleApplyPageJump();
            }}
            className="flex items-center gap-2 text-xs text-slate-500 font-semibold"
          >
            <span>GO TO</span>
            <input
              type="text"
              inputMode="numeric"
              value={goToPageInput}
              onChange={(e) => setGoToPageInput(e.target.value)}
              onBlur={handleApplyPageJump}
              aria-label="Go to page number"
              className="w-14 rounded-lg border border-slate-200 px-2.5 py-1 text-center text-slate-700 focus:outline-none focus:border-[#00b4c6]"
            />
            <span>/ {displayTotalPages}</span>
          </form>
        </div>
      </div>
    </div>
  );
}
