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
  Minus,
  PenLine,
  Play,
  Plus,
  Puzzle,
  RefreshCw,
  Search,
  Timer,
  Video,
} from 'lucide-react';
import {
  MOCK_TEST_CARDS,
  PRACTICE_TASKS_ACADEMIC,
  PTE_GUIDE_FAQS,
  PTE_GUIDE_TABS,
  QUICK_TOOL_TILES,
  SKILL_TAB_META,
  TODAYS_SKILLS,
  TOP_SUMMARY_STATS,
  VIDEO_GUIDES,
} from './homeData';

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
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <svg className="w-12 h-12 -rotate-90 shrink-0" viewBox="0 0 38 38" aria-hidden="true">
      <circle cx="19" cy="19" r={radius} fill="none" stroke="#dbe7f3" strokeWidth="4.5" />
      <circle
        cx="19"
        cy="19"
        r={radius}
        fill="none"
        stroke="#0c4a7e"
        strokeWidth="4.5"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Left main column of PTE Academic dashboard home page.
 */
export default function HomeMainSections({ onSelectVideo }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillTab, setActiveSkillTab] = useState('Speaking');
  const [timeframe, setTimeframe] = useState('All');
  const [activeGuideTab, setActiveGuideTab] = useState('About PTE');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const visibleSkillTasks = useMemo(() => {
    const tasks = PRACTICE_TASKS_ACADEMIC[activeSkillTab] || [];
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((item) => item.name.toLowerCase().includes(q));
  }, [activeSkillTab, searchQuery]);

  const currentFaqs = PTE_GUIDE_FAQS[activeGuideTab] || [];

  return (
    <div className="space-y-5">
      {/* 1. Pill Switcher + Search Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-2xs self-start">
          <Link
            to="/dashboard"
            className="px-6 py-2 rounded-full text-xs sm:text-sm font-bold bg-[#2cc9ba] text-white shadow-xs"
          >
            Practice Progress
          </Link>
          <Link
            to="/v1/analytics"
            className="px-6 py-2 rounded-full text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition"
          >
            Performance Progress
          </Link>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            aria-label="Filter practice tasks"
            className="w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 shadow-2xs"
          />
        </div>
      </div>

      {/* 2. Top 5 Question Bank Donut Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {TOP_SUMMARY_STATS.map((stat) => (
          <button
            key={stat.key}
            type="button"
            onClick={() => setActiveSkillTab(stat.targetTab)}
            className="text-left bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs hover:border-cyan-400 transition flex items-center justify-between gap-2 cursor-pointer"
          >
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 leading-snug">{stat.label}</p>
              <div className="mt-2.5 flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-slate-900">{stat.count}</span>
                <span className="text-xs font-bold text-[#0c4a7e]">{stat.pct}%</span>
              </div>
            </div>
            <DonutRing pct={stat.pct} />
          </button>
        ))}
      </div>

      {/* 3. Today's Progress */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-base sm:text-lg font-bold text-slate-800">
            Today&apos;s Progress
          </h2>
          <Link
            to="/v1/practice-history"
            className="rounded-full bg-[#0d5488] hover:bg-[#093e66] text-white px-5 py-2 text-xs font-bold transition shadow-2xs inline-block"
          >
            Show Full Practice History
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TODAYS_SKILLS.map((skill) => {
            const Icon = SKILL_ICON[skill.key];
            return (
              <div
                key={skill.key}
                className={`rounded-xl border ${skill.border} ${skill.bg} p-4 sm:p-5 space-y-4`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-[18px] h-[18px] ${skill.iconColor}`} />
                    <span className="text-sm font-bold text-slate-800">{skill.key}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {skill.time}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span>Que Practiced: {skill.practiced}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs sm:text-[13px] font-medium text-slate-600 shrink-0">
                    Average Score: <strong className="text-slate-800">{skill.avgScore}</strong>
                  </span>
                  <div className="h-2 flex-1 rounded-full bg-slate-300/70 overflow-hidden">
                    <div className="h-full w-0 rounded-full bg-slate-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4 sm:p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
                <Award className="w-4 h-4 text-[#00a8b5]" />
                <span>Total Average Score</span>
              </div>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">0/90</p>
            </div>
            <div className="w-12 h-12 rounded-full border-[6px] border-slate-200" />
          </div>

          <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4 sm:p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-500">
                <Clock className="w-4 h-4 text-[#2cc9ba]" />
                <span>Average Practice Time</span>
              </div>
              <p className="mt-2 text-2xl font-extrabold text-slate-900">00:00</p>
            </div>
            <div className="w-12 h-12 rounded-full border-[6px] border-slate-200" />
          </div>
        </div>
      </section>

      {/* 4. Practice Progress Task Breakdown Card */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h2 className="text-base sm:text-lg font-bold text-slate-800">Practice Progress</h2>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              title="Reset task filter"
              className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <span>Last updated on Nov 21, 2026</span>
            <div className="relative">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                aria-label="Select practice timeframe"
                className="appearance-none rounded-full border border-slate-200 bg-white pl-3.5 pr-8 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Weekly">Last 7 Days</option>
                <option value="Monthly">Last 30 Days</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 border-b border-slate-100 pb-3.5 mb-5">
          {Object.keys(SKILL_TAB_META).map((skillName) => {
            const Icon = SKILL_ICON[skillName];
            const meta = SKILL_TAB_META[skillName];
            const isActive = activeSkillTab === skillName;

            return (
              <button
                key={skillName}
                type="button"
                onClick={() => setActiveSkillTab(skillName)}
                className={`flex items-center gap-3 pb-3 border-b-2 transition cursor-pointer ${
                  isActive
                    ? `${meta.underlineColor} text-slate-900`
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? `${meta.badgeBg} text-white` : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-sm font-bold">{skillName}</span>
              </button>
            );
          })}
        </div>

        {visibleSkillTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleSkillTasks.map((task) => {
              const pct = Math.min(100, Math.round((task.done / task.total) * 100));
              const meta = SKILL_TAB_META[activeSkillTab];
              return (
                <Link
                  key={task.name}
                  to={task.to}
                  className="group rounded-xl border border-slate-200 bg-white p-4 hover:border-cyan-400 transition block"
                >
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-[#0097a7]">
                    {task.name}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-500 w-20 shrink-0">
                      {task.done}/{task.total}
                    </span>
                    <div className="h-2 flex-1 rounded-full bg-slate-100 overflow-hidden">
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
          <p className="py-8 text-center text-sm text-slate-500">
            No {activeSkillTab} tasks matching &ldquo;{searchQuery}&rdquo;.
          </p>
        )}
      </section>

      {/* 5. Mock Test Progress Row */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-4">Mock Test</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MOCK_TEST_CARDS.map((card) => {
            const pct = Math.max(4, Math.min(100, Math.round((card.done / card.total) * 100)));
            return (
              <Link
                key={card.name}
                to={card.to}
                className="rounded-xl border border-[#ebd7ed] bg-[#fdf7fd] p-4 sm:p-5 hover:border-fuchsia-400 transition block"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-[#f6e3f8] text-[#c026d3] flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{card.name}</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      {card.done}/{card.total}
                    </p>
                  </div>
                </div>
                <div className="mt-3.5 h-2 rounded-full bg-[#eeddf0] overflow-hidden">
                  <div className="h-full rounded-full bg-[#d946ef]" style={{ width: `${pct}%` }} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 6. 8-Tile Quick Tools Grid */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {QUICK_TOOL_TILES.map((tile) => {
            const TileIcon = QUICK_TOOL_ICON[tile.key] || FileText;
            return (
              <Link
                key={tile.key}
                to={tile.to}
                className="rounded-xl border border-[#dbe8f5] bg-white p-4 sm:p-5 hover:border-[#00b4c6] hover:bg-cyan-50/20 transition flex flex-col gap-3.5"
              >
                <span className="w-9 h-9 rounded-lg bg-[#eff6fd] text-[#0d5488] flex items-center justify-center">
                  <TileIcon className="w-5 h-5" />
                </span>
                <span className="text-sm font-semibold text-slate-700">{tile.label}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 7. PTE Video Guide */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base sm:text-lg font-bold text-slate-800">PTE Video Guide</h2>
          <Link
            to="/v1/youtube-videos/1"
            className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:border-cyan-400 hover:text-[#0097a7]"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {VIDEO_GUIDES.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => onSelectVideo(video)}
              className="group flex items-center gap-3.5 text-left rounded-xl p-1.5 hover:bg-slate-50 transition cursor-pointer"
            >
              <div
                className={`relative w-40 h-24 sm:w-44 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${video.bg} p-2.5 flex flex-col justify-between text-white shadow-2xs`}
              >
                <div className="flex items-center justify-between text-[9px] font-black tracking-wider uppercase">
                  <span className="text-cyan-300">ninetypte</span>
                  <span className="bg-black/50 px-1.5 py-0.5 rounded">{video.duration}</span>
                </div>
                <div className="leading-tight">
                  <p className="text-[10.5px] font-black uppercase text-white/95 line-clamp-1">
                    {video.tagTop}
                  </p>
                  <span
                    className={`inline-block mt-0.5 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${video.badgeBg}`}
                  >
                    {video.tagHighlight}
                  </span>
                </div>
                <span className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/30 transition">
                  <span className="w-8 h-6 rounded-md bg-red-600 text-white flex items-center justify-center shadow-sm">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </span>
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 group-hover:text-[#0097a7]">
                  {video.title}
                </p>
                <p className="text-xs text-slate-400 mt-1.5">{video.timeAgo}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 8. PTE Guide Tabs + FAQ Accordion */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
        <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-4">PTE Guide</h2>

        <div className="flex flex-wrap items-center gap-2.5 mb-5">
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
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs sm:text-[13px] font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-[#38c6bd] text-white shadow-xs'
                    : 'bg-[#f4f8fc] text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          {currentFaqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={faq.q} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100">
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
