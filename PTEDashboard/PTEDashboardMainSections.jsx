import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  ChevronDown,
  Clock,
  FileCheck2,
  FileText,
  Headphones,
  Info,
  Layers,
  Mic,
  PenLine,
  Play,
  Plus,
  Minus,
  Puzzle,
  RefreshCw,
  Search,
  Timer,
  Video,
} from 'lucide-react';
import {
  MOCK_TEST_CARDS,
  PRACTICE_TASKS_ACADEMIC,
  PRACTICE_TASKS_CORE,
  PTE_GUIDE_FAQS,
  PTE_GUIDE_TABS,
  QUICK_TOOL_TILES,
  SKILL_TAB_META,
  TODAYS_SKILLS,
  TOP_SUMMARY_STATS,
  VIDEO_GUIDES,
} from './pteDashboardData';

const SKILL_ICON = {
  Speaking: Mic,
  Writing: PenLine,
  Reading: BookOpen,
  Listening: Headphones,
};

const QUICK_TOOL_ICON = {
  predictions: FileText,
  strategy: Video,
  vocab: BookOpen,
  feedback: Award,
  compatibility: Puzzle,
  'full-mock': FileCheck2,
  'sectional-mock': Layers,
  'timed-mock': Timer,
};

function DonutRing({ pct }) {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <svg className="w-10 h-10 -rotate-90 shrink-0" viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r={radius} fill="none" stroke="#dbe7f3" strokeWidth="4" />
      <circle
        cx="18"
        cy="18"
        r={radius}
        fill="none"
        stroke="#0c4a7e"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Main left-hand column of PTEDashboard containing progress summary, task trackers,
 * mock test progress, quick-access tools, video guides, and PTE FAQ guide accordion.
 */
export default function PTEDashboardMainSections({
  examVariant,
  onSelectVideo,
  onShowHistoryModal,
}) {
  const [viewMode, setViewMode] = useState('practice');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillTab, setActiveSkillTab] = useState('Speaking');
  const [timeframe, setTimeframe] = useState('All');
  const [activeGuideTab, setActiveGuideTab] = useState('About PTE');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const tasksSource =
    examVariant === 'core' ? PRACTICE_TASKS_CORE : PRACTICE_TASKS_ACADEMIC;

  const visibleSkillTasks = useMemo(() => {
    const tasks = tasksSource[activeSkillTab] || [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((item) => item.name.toLowerCase().includes(q));
  }, [activeSkillTab, searchQuery, tasksSource]);

  const currentFaqs = PTE_GUIDE_FAQS[activeGuideTab] || [];

  return (
    <div className="space-y-4">
      {/* 1. Pill Switcher + Search Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-0.5 shadow-2xs self-start">
          <button
            type="button"
            onClick={() => setViewMode('practice')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
              viewMode === 'practice'
                ? 'bg-[#2cc9ba] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Practice Progress
          </button>
          <button
            type="button"
            onClick={() => setViewMode('performance')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
              viewMode === 'performance'
                ? 'bg-[#2cc9ba] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Performance Progress
          </button>
        </div>

        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            aria-label="Filter practice tasks"
            className="w-full rounded-full border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 shadow-2xs"
          />
        </div>
      </div>

      {/* 2. Top 5 Question Bank Donut Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {TOP_SUMMARY_STATS.map((stat) => (
          <button
            key={stat.key}
            type="button"
            onClick={() => setActiveSkillTab(stat.targetTab)}
            className="text-left bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs hover:border-cyan-400 transition flex items-center justify-between gap-2 cursor-pointer"
          >
            <div>
              <p className="text-[11px] font-medium text-slate-500">{stat.label}</p>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-base font-extrabold text-slate-900">{stat.count}</span>
                <span className="text-[10px] font-bold text-[#0c4a7e]">{stat.pct}%</span>
              </div>
            </div>
            <DonutRing pct={stat.pct} />
          </button>
        ))}
      </div>

      {/* 3. Today's Progress / Performance Summary */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-bold text-slate-800">
            {viewMode === 'practice' ? "Today's Progress" : 'Performance Breakdown'}
          </h2>
          <button
            type="button"
            onClick={onShowHistoryModal}
            className="rounded-full bg-[#0d5488] hover:bg-[#093e66] text-white px-4 py-1.5 text-[11px] font-bold transition shadow-2xs cursor-pointer"
          >
            Show Full Practice History
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {TODAYS_SKILLS.map((skill) => {
            const Icon = SKILL_ICON[skill.key];
            return (
              <div
                key={skill.key}
                className={`rounded-xl border ${skill.border} ${skill.bg} p-4 space-y-3.5`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${skill.iconColor}`} />
                    <span className="text-xs font-bold text-slate-800">{skill.key}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10.5px] text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {skill.time}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span>Que Practiced: {skill.practiced}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-medium text-slate-600 shrink-0">
                    Average Score: <strong className="text-slate-800">{skill.avgScore}</strong>
                  </span>
                  <div className="h-1.5 flex-1 rounded-full bg-slate-300/70 overflow-hidden">
                    <div className="h-full w-0 rounded-full bg-slate-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3.5">
          <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Award className="w-3.5 h-3.5 text-[#00a8b5]" />
                <span>Total Average Score</span>
              </div>
              <p className="mt-2 text-lg font-extrabold text-slate-900">0/90</p>
            </div>
            <div className="w-11 h-11 rounded-full border-[5px] border-slate-200" />
          </div>

          <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Clock className="w-3.5 h-3.5 text-[#2cc9ba]" />
                <span>Average Practice Time</span>
              </div>
              <p className="mt-2 text-lg font-extrabold text-slate-900">00:00</p>
            </div>
            <div className="w-11 h-11 rounded-full border-[5px] border-slate-200" />
          </div>
        </div>
      </section>

      {/* 4. Practice Progress Task Breakdown Card */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-bold text-slate-800">Practice Progress</h2>
          <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              title="Reset task filter"
              className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
            <span>Last updated on Nov 21, 2026</span>
            <div className="relative">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                aria-label="Select practice timeframe"
                className="appearance-none rounded-full border border-slate-200 bg-white pl-3 pr-7 py-1 text-[11px] font-semibold text-slate-700 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Weekly">Last 7 Days</option>
                <option value="Monthly">Last 30 Days</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 4 Skill Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-slate-100 pb-3 mb-4">
          {Object.keys(SKILL_TAB_META).map((skillName) => {
            const Icon = SKILL_ICON[skillName];
            const meta = SKILL_TAB_META[skillName];
            const isActive = activeSkillTab === skillName;

            return (
              <button
                key={skillName}
                type="button"
                onClick={() => setActiveSkillTab(skillName)}
                className={`flex items-center gap-2.5 pb-2.5 border-b-2 transition cursor-pointer ${
                  isActive
                    ? `${meta.underlineColor} text-slate-900`
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive ? `${meta.badgeBg} text-white` : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold">{skillName}</span>
              </button>
            );
          })}
        </div>

        {/* Task Progress Bars */}
        {visibleSkillTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {visibleSkillTasks.map((task) => {
              const pct = Math.min(100, Math.round((task.done / task.total) * 100));
              const meta = SKILL_TAB_META[activeSkillTab];
              return (
                <Link
                  key={task.name}
                  to={task.to}
                  className="group rounded-xl border border-slate-200 bg-white p-3.5 hover:border-cyan-400 transition block"
                >
                  <p className="text-xs font-semibold text-slate-800 group-hover:text-[#0097a7]">
                    {task.name}
                  </p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <span className="text-[10.5px] font-semibold text-slate-500 w-16 shrink-0">
                      {task.done}/{task.total}
                    </span>
                    <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${meta.barColor}`}
                        style={{ width: `${Math.max(4, pct)}%` }}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="py-6 text-center text-xs text-slate-500">
            No {activeSkillTab} tasks matching &ldquo;{searchQuery}&rdquo;.
          </p>
        )}
      </section>

      {/* 5. Mock Test Progress Row */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <h2 className="text-sm font-bold text-slate-800 mb-3.5">Mock Test</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {MOCK_TEST_CARDS.map((card) => {
            const pct = Math.max(4, Math.min(100, Math.round((card.done / card.total) * 100)));
            const toUrl =
              examVariant === 'core' && card.name === 'Full Mock Test'
                ? '/pte-core-mock-test'
                : card.to;
            return (
              <Link
                key={card.name}
                to={toUrl}
                className="rounded-xl border border-[#ebd7ed] bg-[#fdf7fd] p-4 hover:border-fuchsia-400 transition block"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#f6e3f8] text-[#c026d3] flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{card.name}</p>
                    <p className="text-[10.5px] font-medium text-slate-500 mt-0.5">
                      {card.done}/{card.total}
                    </p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-[#eeddf0] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#d946ef]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. 8-Tile Quick Tools Grid */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {QUICK_TOOL_TILES.map((tile) => {
            const TileIcon = QUICK_TOOL_ICON[tile.key] || FileText;
            return (
              <Link
                key={tile.key}
                to={tile.to}
                className="rounded-xl border border-[#dbe8f5] bg-white p-4 hover:border-[#00b4c6] hover:bg-cyan-50/20 transition flex flex-col gap-3"
              >
                <span className="w-7 h-7 rounded-lg bg-[#eff6fd] text-[#0d5488] flex items-center justify-center">
                  <TileIcon className="w-4 h-4" />
                </span>
                <span className="text-xs font-semibold text-slate-700">{tile.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 7. PTE Video Guide */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-slate-800">PTE Video Guide</h2>
          <Link
            to="/pte-online-course"
            className="rounded-full border border-slate-200 px-3.5 py-1 text-[11px] font-semibold text-slate-600 hover:border-cyan-400 hover:text-[#0097a7]"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VIDEO_GUIDES.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => onSelectVideo(video)}
              className="group flex items-center gap-3 text-left rounded-xl p-1.5 hover:bg-slate-50 transition cursor-pointer"
            >
              {/* Thumbnail */}
              <div
                className={`relative w-32 h-20 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br ${video.bg} p-2 flex flex-col justify-between text-white shadow-2xs`}
              >
                <div className="flex items-center justify-between text-[8px] font-black tracking-wider uppercase">
                  <span className="text-cyan-300">ninetypte</span>
                  <span className="bg-black/50 px-1 rounded">{video.duration}</span>
                </div>
                <div className="leading-none">
                  <p className="text-[9px] font-black uppercase text-white/95 line-clamp-1">
                    {video.tagTop}
                  </p>
                  <span
                    className={`inline-block mt-0.5 px-1 py-0.5 rounded text-[8px] font-extrabold uppercase ${video.badgeBg}`}
                  >
                    {video.tagHighlight}
                  </span>
                </div>
                <span className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/30 transition">
                  <span className="w-7 h-5 rounded-md bg-red-600 text-white flex items-center justify-center shadow-sm">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </span>
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-[#0097a7]">
                  {video.title}
                </p>
                <p className="text-[10.5px] text-slate-400 mt-1">{video.timeAgo}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 8. PTE Guide Tabs + FAQ Accordion */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
        <h2 className="text-sm font-bold text-slate-800 mb-3.5">PTE Guide</h2>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {PTE_GUIDE_TABS.map((tab) => {
            const isActive = activeGuideTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveGuideTab(tab);
                  setOpenFaqIdx(null);
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#38c6bd] text-white shadow-xs'
                    : 'bg-[#f4f8fc] text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Info className="w-3 h-3" />
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-2.5">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <Minus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-3.5 pt-1 text-xs text-slate-500 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
