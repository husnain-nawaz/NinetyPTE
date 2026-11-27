import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
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
  clearInProgressMock,
} from './exam-runner';
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

function ScoreRing({ value, color }) {
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
          stroke="#e8edf5"
          strokeWidth="5"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={value > 0 ? color : '#e8edf5'}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-tight">
        <span className="text-xs font-extrabold text-slate-800">{value}</span>
        <span className="text-[9px] text-slate-400">/ 90</span>
      </div>
    </div>
  );
}

/**
 * In-portal Mock Test Score History analytics page
 * (/v1/mock-test/score-history and /v1/core/mock-test/score-history).
 */
export default function PortalScoreHistoryPage({ syncCoreMode = false }) {
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
  const [historyTab, setHistoryTab] = useState('full');
  const [activeSkill, setActiveSkill] = useState('Speaking');
  const [filterOption, setFilterOption] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [referenceNow, setReferenceNow] = useState(() => Date.now());

  const allAttempts = useMemo(() => readMockAttempts(activeTrack), [activeTrack]);

  const activeFilterLabel =
    SCORE_HISTORY_FILTER_OPTIONS.find((opt) => opt.id === filterOption)?.label || 'All';

  const fullAttempts = useMemo(() => {
    const base = allAttempts.filter((a) => a.mode === 'full');
    if (filterOption === '7d' || filterOption === '15d' || filterOption === '30d') {
      const days = filterOption === '7d' ? 7 : filterOption === '15d' ? 15 : 30;
      const cutoff = referenceNow - days * 24 * 60 * 60 * 1000;
      return base.filter((a) => new Date(a.completedAt).getTime() >= cutoff);
    }
    return base;
  }, [allAttempts, filterOption, referenceNow]);

  const sectionalAttempts = useMemo(
    () =>
      allAttempts.filter(
        (a) => (a.mode === 'sectional' || a.mode === 'timed') && a.skill === activeSkill
      ),
    [allAttempts, activeSkill]
  );

  const summary = useMemo(() => {
    if (fullAttempts.length === 0) {
      return {
        count: 0,
        avg: '-',
        best: '-',
        lowest: '-',
        last: '-',
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
    return {
      count: fullAttempts.length,
      avg: `${avg}`,
      best: `${Math.max(...overallScores)}`,
      lowest: `${Math.min(...overallScores)}`,
      last: `${overallScores[0]}`,
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
    if (optionId === 'resume') {
      navigate(dataset.routes.full, { state: { examAction: 'resume' } });
      return;
    }
    if (optionId === 'restart') {
      clearInProgressMock(activeTrack);
      navigate(dataset.routes.full);
      return;
    }
    setReferenceNow(Date.now());
    setFilterOption(optionId);
  };

  const performanceRows = [
    { label: 'Task Taken', value: summary.count, Icon: FileText, color: 'text-slate-600' },
    { label: 'Avg. Score', value: summary.avg, Icon: Clock, color: 'text-amber-500' },
    { label: 'Best Score', value: summary.best, Icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Lowest Score', value: summary.lowest, Icon: TrendingDown, color: 'text-rose-500' },
    { label: 'Last Test', value: summary.last, Icon: Clock, color: 'text-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbfd] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
        {/* Top Heading */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#e6eef6] text-[#0b4a7b] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0b4a7b]">Score History</h1>
          </div>

          <Link
            to={dataset.routes.full}
            className="text-xs font-semibold text-[#0b4a7b] hover:text-[#00b4c6] transition"
          >
            &larr; Back to Mock Tests
          </Link>
        </div>

        {/* Full / Sectional Switcher + Action Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
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
              className="min-w-[170px] rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-2xs flex items-center justify-between gap-2 hover:border-[#00b4c6] cursor-pointer"
            >
              <span>{activeFilterLabel}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-11 z-30 w-56 rounded-2xl border border-slate-100 bg-white py-2 shadow-xl text-xs">
                {SCORE_HISTORY_FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectDropdown(opt.id)}
                    className={`w-full px-4 py-2.5 text-left transition cursor-pointer border-b last:border-b-0 border-slate-100 ${
                      filterOption === opt.id
                        ? 'font-bold text-[#0b4a7b] bg-slate-50/60'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
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
                    className={`rounded-2xl border bg-white px-4 py-3.5 shadow-2xs flex items-center justify-between gap-3 ${
                      skill === 'Overall' ? 'border-[#dfd6f7]' : 'border-slate-200/80'
                    }`}
                  >
                    <div>
                      <div className={`inline-flex items-center gap-1.5 text-xs font-bold ${token.cardAccentClass}`}>
                        <SkillIconGlyph skill={skill} className="w-3.5 h-3.5" />
                        <span>{skill}</span>
                      </div>
                      <p className="mt-1.5 text-xs font-semibold text-slate-500">
                        <span className="text-sm font-extrabold text-slate-900">{val}</span> / 90
                      </p>
                    </div>
                    <ScoreRing value={val} color={token.ringColor} />
                  </div>
                );
              })}
            </div>

            {/* Score Progress Chart + Performance Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h2 className="text-sm sm:text-base font-extrabold text-[#0b4a7b]">
                    Overall Score Progress
                  </h2>
                  <p className="text-xs font-semibold text-slate-500">
                    IMPROVED:{' '}
                    <span className="font-extrabold text-[#0b4a7b]">
                      {summary.improved} Points
                    </span>
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {CHART_Y_TICKS.map((tick) => (
                    <div key={tick} className="flex items-center gap-3">
                      <span className="w-5 text-[10px] text-slate-400 text-right">{tick}</span>
                      <div className="flex-1 border-b border-dashed border-slate-100" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                <h2 className="text-sm sm:text-base font-extrabold text-[#0b4a7b] mb-3">
                  Performance Summary
                </h2>
                <div className="divide-y divide-slate-100">
                  {performanceRows.map((row) => {
                    const RowIcon = row.Icon;
                    return (
                      <div
                        key={row.label}
                        className="py-3 flex items-center justify-between text-xs sm:text-sm"
                      >
                        <span className="inline-flex items-center gap-2.5 text-slate-600 font-medium">
                          <span className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center">
                            <RowIcon className={`w-3.5 h-3.5 ${row.color}`} />
                          </span>
                          <span>{row.label}</span>
                        </span>
                        <span className="font-extrabold text-[#0b4a7b]">{row.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mock Test History Table / Empty State */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
              <h2 className="text-sm sm:text-base font-extrabold text-[#0b4a7b] mb-4">
                Mock Test History
              </h2>
              <div className="rounded-xl border border-slate-200/80">
                {fullAttempts.length === 0 ? (
                  <ScoreEmptyState />
                ) : (
                  <div className="divide-y divide-slate-100">
                    {fullAttempts.map((entry) => (
                      <div
                        key={entry.id}
                        className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm"
                      >
                        <div>
                          <p className="font-bold text-[#0b4a7b]">{entry.title}</p>
                          <p className="text-[11px] text-slate-400">
                            {new Date(entry.completedAt).toLocaleString()}
                          </p>
                        </div>
                        <span className="rounded-lg bg-[#eefaf9] px-3 py-1 text-xs font-extrabold text-[#1ea7a1]">
                          Score: {entry.overall} / 90
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : (
          /* Sectional Mock Test History View */
          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs space-y-4">
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
                  <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${activeSkillToken.barColor}`}
                      style={{ width: `${Math.round((activeSkillScore / 90) * 100)}%` }}
                    />
                  </div>
                </div>
              }
            />

            <div className="rounded-xl border border-slate-200/80 min-h-[300px]">
              {sectionalAttempts.length === 0 ? (
                <ScoreEmptyState />
              ) : (
                <div className="divide-y divide-slate-100">
                  {sectionalAttempts.map((entry) => (
                    <div
                      key={entry.id}
                      className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm"
                    >
                      <div>
                        <p className="font-bold text-[#0b4a7b]">{entry.title}</p>
                        <p className="text-[11px] text-slate-400">
                          {new Date(entry.completedAt).toLocaleString()}
                        </p>
                      </div>
                      <span className="rounded-lg bg-[#eefaf9] px-3 py-1 text-xs font-extrabold text-[#1ea7a1]">
                        {activeSkill}: {entry.overall} / 90
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* AI Study Recommendation Banner */}
        <section className="rounded-xl border border-[#8ce2dc] bg-[#ebfaf9] px-5 py-3.5 flex items-start gap-3">
          <span className="w-7 h-7 rounded-full bg-white text-[#0b4a7b] flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </span>
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#0b4a7b]">AI Study Recommendation</p>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
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
