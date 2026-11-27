import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Clock,
  FileText,
  Lightbulb,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import PTEDashboardHeader from '../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../shared/PTEDashboardTealFooter';
import { usePortal } from '../shared/portalContext';
import {
  ModuleTabsBar,
  ScoreEmptyState,
  SkillIconGlyph,
} from './MockTestSharedUI';
import {
  getMockTestsDataset,
  readMockAttempts,
  SCORE_HISTORY_FILTER_OPTIONS,
  SCORE_HISTORY_MODES,
  SCORE_SECTION_TABS,
  SKILL_THEME_TOKENS,
} from './mockTestsData';

const FULL_SCORE_SKILLS = ['Speaking', 'Writing', 'Reading', 'Listening', 'Overall'];
const CHART_Y_TICKS = [90, 80, 70, 60, 50, 40, 30, 20, 10];

function ScoreRing({ value, color, darkMode = false }) {
  const pct = Math.max(0, Math.min(100, Math.round((value / 90) * 100)));
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56" aria-hidden="true">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={darkMode ? '#272c35' : '#e8edf5'}
          strokeWidth="5"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={value > 0 ? color : darkMode ? '#272c35' : '#e8edf5'}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
        <span className={`text-xs font-extrabold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          {value}
        </span>
        <span className="text-[9px] text-slate-400">/ 90</span>
      </div>
    </div>
  );
}

function OverallScoreProgressChart({ attempts, darkMode }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const chronological = useMemo(() => [...attempts].reverse(), [attempts]);

  const width = 620;
  const height = 220;
  const padLeft = 32;
  const padRight = 24;
  const padTop = 16;
  const padBottom = 26;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const yForScore = (score) => {
    const clamped = Math.max(10, Math.min(90, Number(score) || 10));
    return padTop + ((90 - clamped) / 80) * plotH;
  };

  const points = chronological.map((entry, idx) => {
    const x =
      chronological.length === 1
        ? padLeft + plotW / 2
        : padLeft + (idx / (chronological.length - 1)) * plotW;
    const y = yForScore(entry.overall);
    const dt = new Date(entry.completedAt);
    return {
      x,
      y,
      score: entry.overall,
      shortDate: dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      fullDate: dt.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
  });

  const linePath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${padTop + plotH} L ${points[0].x} ${padTop + plotH} Z`
      : '';

  const hovered = hoveredIdx !== null ? points[hoveredIdx] : null;

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-56 overflow-visible">
        <defs>
          <linearGradient id="scoreAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c026d3" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#c026d3" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {CHART_Y_TICKS.map((tick) => {
          const y = yForScore(tick);
          return (
            <g key={tick}>
              <text
                x={padLeft - 8}
                y={y + 3}
                textAnchor="end"
                className="fill-slate-400 text-[10px]"
              >
                {tick}
              </text>
              <line
                x1={padLeft}
                y1={y}
                x2={width - padRight}
                y2={y}
                stroke={darkMode ? '#272c35' : '#e2e8f0'}
                strokeDasharray="3 3"
                strokeWidth="1"
              />
            </g>
          );
        })}

        {points.length > 0 && (
          <>
            <path d={areaPath} fill="url(#scoreAreaGrad)" />
            <path d={linePath} fill="none" stroke="#c026d3" strokeWidth="1.75" />

            {points.map((pt, idx) => (
              <g key={idx}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredIdx === idx ? 5 : 3.5}
                  fill="#c026d3"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
                <text
                  x={pt.x}
                  y={height - 4}
                  textAnchor="middle"
                  className="fill-slate-400 text-[10px]"
                >
                  {pt.shortDate}
                </text>
              </g>
            ))}

            {hovered && (
              <g transform={`translate(${Math.min(width - 125, Math.max(padLeft, hovered.x - 45))}, ${Math.max(4, hovered.y - 46)})`}>
                <rect width="106" height="36" rx="6" fill="#0f172a" />
                <text x="10" y="15" className="fill-white text-[10px] font-bold">
                  {hovered.fullDate}
                </text>
                <circle cx="14" cy="25" r="3" fill="#c026d3" />
                <text x="22" y="28" className="fill-zinc-200 text-[10px] font-bold">
                  {hovered.score}
                </text>
              </g>
            )}
          </>
        )}
      </svg>
    </div>
  );
}

function filterAttemptsByPeriod(list, filterOption, referenceNow) {
  if (filterOption === 'all') return list;
  const refDate = new Date(referenceNow);
  const startOfToday = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate()).getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;

  return list.filter((item) => {
    const t = new Date(item.completedAt).getTime();
    if (filterOption === 'today') return t >= startOfToday;
    if (filterOption === 'yesterday') return t >= startOfToday - oneDayMs && t < startOfToday;
    const days = filterOption === '7d' ? 7 : filterOption === '15d' ? 15 : 30;
    return t >= referenceNow - days * oneDayMs;
  });
}

function PerformanceDeltaCell({ currentScore, previousScore }) {
  if (typeof previousScore !== 'number') return <span className="text-slate-400">-</span>;
  const diff = currentScore - previousScore;
  const improved = diff >= 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-bold ${
        improved ? 'text-emerald-500' : 'text-rose-500'
      }`}
    >
      {improved ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
      <span>
        {Math.abs(diff)} {improved ? 'Improved' : 'Declined'}
      </span>
    </span>
  );
}

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

  const summary = useMemo(() => {
    if (fullAttempts.length === 0) {
      return {
        count: 0,
        avg: '-',
        best: '-',
        lowest: '-',
        lastDate: '-',
        improved: 0,
        skills: { Speaking: 0, Writing: 0, Reading: 0, Listening: 0, Overall: 0 },
      };
    }
    const overallScores = fullAttempts.map((a) => a.overall);
    const avg = Math.round(overallScores.reduce((acc, s) => acc + s, 0) / overallScores.length);
    const avgSkill = (key) => {
      const vals = fullAttempts.map((a) => a[key]).filter((v) => typeof v === 'number');
      return vals.length ? Math.round(vals.reduce((acc, v) => acc + v, 0) / vals.length) : avg;
    };
    const improved =
      overallScores.length > 1
        ? overallScores[0] - overallScores[overallScores.length - 1]
        : 0;
    const latestDt = new Date(fullAttempts[0].completedAt).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return {
      count: fullAttempts.length,
      avg: `${avg}/90`,
      best: `${Math.max(...overallScores)}/90`,
      lowest: `${Math.min(...overallScores)}/90`,
      lastDate: latestDt,
      improved,
      skills: {
        Speaking: avgSkill('speaking'),
        Writing: avgSkill('writing'),
        Reading: avgSkill('reading'),
        Listening: avgSkill('listening'),
        Overall: avg,
      },
    };
  }, [fullAttempts]);

  const activeSkillScore = useMemo(() => {
    if (sectionalAttempts.length === 0) return 0;
    return Math.round(
      sectionalAttempts.reduce((acc, item) => acc + item.overall, 0) / sectionalAttempts.length
    );
  }, [sectionalAttempts]);

  const activeSkillToken = SKILL_THEME_TOKENS[activeSkill] || SKILL_THEME_TOKENS.Speaking;

  const handleSelectDropdown = (optionId) => {
    setDropdownOpen(false);
    setReferenceNow(Date.now());
    setFilterOption(optionId);
  };

  const performanceRows = [
    { label: 'Task Taken', value: summary.count, Icon: FileText, color: 'text-slate-500' },
    { label: 'Avg. Score', value: summary.avg, Icon: Clock, color: 'text-amber-500' },
    { label: 'Best Score', value: summary.best, Icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Lowest Score', value: summary.lowest, Icon: TrendingDown, color: 'text-rose-500' },
    { label: 'Last Test', value: summary.lastDate, Icon: Clock, color: 'text-indigo-500' },
  ];

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
        {/* Top Heading */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                darkMode ? 'bg-[#1a2433] text-[#4ea5f5]' : 'bg-[#e6eef6] text-[#0b4a7b]'
              }`}
            >
              <Clock className="w-5 h-5" />
            </span>
            <h1
              className={`text-lg sm:text-xl font-extrabold ${
                darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'
              }`}
            >
              Score History
            </h1>
          </div>

          <Link
            to={dataset.routes.full}
            className={`text-xs font-semibold transition ${
              darkMode
                ? 'text-zinc-300 hover:text-[#3dc8c1]'
                : 'text-[#0b4a7b] hover:text-[#00b4c6]'
            }`}
          >
            &larr; Back to Mock Tests
          </Link>
        </div>

        {/* Full / Sectional Switcher + Action Dropdown */}
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
          <div className="space-y-5">
            {/* 5 Skill & Overall Ring Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {FULL_SCORE_SKILLS.map((skill) => {
                const token = SKILL_THEME_TOKENS[skill] || SKILL_THEME_TOKENS.Overall;
                const val = summary.skills[skill] || 0;
                return (
                  <div
                    key={skill}
                    className={`rounded-2xl border px-4 py-3.5 shadow-2xs flex items-center justify-between gap-3 ${
                      darkMode
                        ? 'border-zinc-800 bg-[#14171c]'
                        : skill === 'Overall'
                          ? 'border-[#dfd6f7] bg-white'
                          : 'border-slate-200/80 bg-white'
                    }`}
                  >
                    <div>
                      <div
                        className={`inline-flex items-center gap-1.5 text-xs font-bold ${token.cardAccentClass}`}
                      >
                        <SkillIconGlyph skill={skill} className="w-3.5 h-3.5" />
                        <span>{skill}</span>
                      </div>
                      <p className="mt-1.5 text-xs font-semibold text-slate-400">
                        <span
                          className={`text-sm font-extrabold ${
                            darkMode ? 'text-white' : 'text-slate-900'
                          }`}
                        >
                          {val}
                        </span>{' '}
                        / 90
                      </p>
                    </div>
                    <ScoreRing value={val} color={token.ringColor} darkMode={darkMode} />
                  </div>
                );
              })}
            </div>

            {/* Score Progress Chart + Performance Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className={`lg:col-span-7 rounded-2xl border p-5 shadow-2xs ${cardSurface}`}>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h2
                    className={`text-sm sm:text-base font-extrabold ${
                      darkMode ? 'text-white' : 'text-[#0b4a7b]'
                    }`}
                  >
                    Overall Score Progress
                  </h2>
                  <p className="text-xs font-semibold text-slate-400">
                    {summary.improved < 0 ? 'DECLINED:' : 'IMPROVED:'}{' '}
                    <span
                      className={`font-extrabold ${
                        summary.improved < 0
                          ? 'text-rose-500'
                          : darkMode
                            ? 'text-[#4ea5f5]'
                            : 'text-[#0b4a7b]'
                      }`}
                    >
                      {summary.improved} Points
                    </span>
                  </p>
                </div>

                <OverallScoreProgressChart attempts={fullAttempts} darkMode={darkMode} />
              </div>

              <div className={`lg:col-span-5 rounded-2xl border p-5 shadow-2xs ${cardSurface}`}>
                <h2
                  className={`text-sm sm:text-base font-extrabold mb-3 ${
                    darkMode ? 'text-white' : 'text-[#0b4a7b]'
                  }`}
                >
                  Performance Summary
                </h2>
                <div className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
                  {performanceRows.map((row) => {
                    const RowIcon = row.Icon;
                    return (
                      <div
                        key={row.label}
                        className="py-3 flex items-center justify-between text-xs sm:text-sm"
                      >
                        <span
                          className={`inline-flex items-center gap-2.5 font-medium ${
                            darkMode ? 'text-zinc-300' : 'text-slate-600'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                              darkMode ? 'bg-[#1c2028]' : 'bg-slate-50'
                            }`}
                          >
                            <RowIcon className={`w-3.5 h-3.5 ${row.color}`} />
                          </span>
                          <span>{row.label}</span>
                        </span>
                        <span
                          className={`font-extrabold ${
                            darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'
                          }`}
                        >
                          {row.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mock Test History Table */}
            <section className={`rounded-2xl border p-5 shadow-2xs ${cardSurface}`}>
              <h2
                className={`text-sm sm:text-base font-extrabold mb-4 ${
                  darkMode ? 'text-white' : 'text-[#0b4a7b]'
                }`}
              >
                Mock Test History
              </h2>
              <div
                className={`rounded-xl border overflow-x-auto ${
                  darkMode ? 'border-zinc-800' : 'border-slate-200/80'
                }`}
              >
                {fullAttempts.length === 0 ? (
                  <ScoreEmptyState />
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr
                        className={`border-b font-bold ${
                          darkMode
                            ? 'border-zinc-800 bg-[#1a1f28] text-zinc-300'
                            : 'border-slate-100 bg-slate-50/70 text-[#0b4a7b]'
                        }`}
                      >
                        <th className="py-3 px-4">Test Name</th>
                        <th className="py-3 px-2 text-center">S</th>
                        <th className="py-3 px-2 text-center">W</th>
                        <th className="py-3 px-2 text-center">R</th>
                        <th className="py-3 px-2 text-center">L</th>
                        <th className="py-3 px-2 text-center">O</th>
                        <th className="py-3 px-3">Performance</th>
                        <th className="py-3 px-3">Score</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
                      {fullAttempts.map((entry, idx) => (
                        <tr key={entry.id} className={darkMode ? 'hover:bg-[#1a1f28]/60' : 'hover:bg-slate-50/60'}>
                          <td className="py-3 px-4">
                            <p
                              className={`font-bold ${
                                darkMode ? 'text-white' : 'text-[#0b4a7b]'
                              }`}
                            >
                              {entry.title}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              Date: {new Date(entry.completedAt).toLocaleDateString('en-GB')}
                            </p>
                          </td>
                          {[
                            { v: entry.speaking, cls: 'bg-orange-50 text-[#eb8c44]' },
                            { v: entry.writing, cls: 'bg-sky-50 text-[#4ea5f5]' },
                            { v: entry.reading, cls: 'bg-emerald-50 text-[#22c55e]' },
                            { v: entry.listening, cls: 'bg-blue-50 text-[#0b4a7b]' },
                            { v: entry.overall, cls: 'bg-purple-50 text-[#7c3aed]' },
                          ].map((cell, cIdx) => (
                            <td key={cIdx} className="py-3 px-2 text-center">
                              <span
                                className={`inline-block min-w-[28px] rounded-md px-1.5 py-0.5 font-extrabold ${
                                  darkMode ? 'bg-[#202632] text-zinc-100' : cell.cls
                                }`}
                              >
                                {cell.v ?? '-'}
                              </span>
                            </td>
                          ))}
                          <td className="py-3 px-3">
                            <PerformanceDeltaCell
                              currentScore={entry.overall}
                              previousScore={fullAttempts[idx + 1]?.overall}
                            />
                          </td>
                          <td className="py-3 px-3 font-extrabold text-[#1ea7a1]">
                            {entry.overall}/90
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Link
                              to={`${dataset.routes.viewScore}/${entry.id}`}
                              className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
                                darkMode
                                  ? 'border-zinc-700 text-zinc-200 hover:border-[#3dc8c1]'
                                  : 'border-slate-200 text-[#0b4a7b] hover:bg-[#0b4a7b] hover:text-white'
                              }`}
                            >
                              View Score
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </section>
          </div>
        ) : (
          /* Sectional Mock Test History View */
          <section className={`rounded-2xl border p-5 shadow-2xs space-y-4 ${cardSurface}`}>
            <ModuleTabsBar
              tabs={SCORE_SECTION_TABS}
              activeTab={activeSkill}
              onSelect={setActiveSkill}
              rightSlot={
                <div className="flex items-center gap-2.5 pb-2">
                  <SkillIconGlyph
                    skill={activeSkill}
                    className={`w-3.5 h-3.5 ${activeSkillToken.cardAccentClass}`}
                  />
                  <span className={`text-xs font-bold ${activeSkillToken.cardAccentClass}`}>
                    {String(activeSkillScore).padStart(2, '0')}/90
                  </span>
                  <div className="w-24 h-1.5 rounded-full bg-slate-200/60 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${activeSkillToken.barColor}`}
                      style={{ width: `${Math.round((activeSkillScore / 90) * 100)}%` }}
                    />
                  </div>
                </div>
              }
            />

            <div
              className={`rounded-xl border min-h-[300px] overflow-x-auto ${
                darkMode ? 'border-zinc-800' : 'border-slate-200/80'
              }`}
            >
              {sectionalAttempts.length === 0 ? (
                <ScoreEmptyState />
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className={`border-b font-bold ${
                        darkMode
                          ? 'border-zinc-800 bg-[#1a1f28] text-zinc-300'
                          : 'border-slate-100 bg-slate-50/70 text-[#0b4a7b]'
                      }`}
                    >
                      <th className="py-3 px-4">Test Name</th>
                      <th className="py-3 px-3 text-center">{activeSkill.charAt(0)}</th>
                      <th className="py-3 px-3">Performance</th>
                      <th className="py-3 px-3">Score</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-zinc-800' : 'divide-slate-100'}`}>
                    {sectionalAttempts.map((entry, idx) => (
                      <tr key={entry.id} className={darkMode ? 'hover:bg-[#1a1f28]/60' : 'hover:bg-slate-50/60'}>
                        <td className="py-3 px-4">
                          <p
                            className={`font-bold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}
                          >
                            {entry.title}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Date: {new Date(entry.completedAt).toLocaleDateString('en-GB')}
                          </p>
                        </td>
                        <td className="py-3 px-3 text-center font-extrabold">{entry.overall}</td>
                        <td className="py-3 px-3">
                          <PerformanceDeltaCell
                            currentScore={entry.overall}
                            previousScore={sectionalAttempts[idx + 1]?.overall}
                          />
                        </td>
                        <td className="py-3 px-3 font-extrabold text-[#1ea7a1]">
                          {entry.overall}/90
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            to={`${dataset.routes.viewScore}/${entry.id}`}
                            className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${
                              darkMode
                                ? 'border-zinc-700 text-zinc-200 hover:border-[#3dc8c1]'
                                : 'border-slate-200 text-[#0b4a7b] hover:bg-[#0b4a7b] hover:text-white'
                            }`}
                          >
                            View Score
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        )}

        {/* AI Study Recommendation Banner */}
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
            <p
              className={`text-xs sm:text-sm font-bold ${
                darkMode ? 'text-[#3dc8c1]' : 'text-[#0b4a7b]'
              }`}
            >
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
