import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart2,
  BookOpen,
  ChevronDown,
  FileCheck2,
  Headphones,
  HelpCircle,
  Mic,
  PenLine,
  Sparkles,
} from 'lucide-react';
import PTEDashboardHeader from '../PTEDashboardHeader';
import PTEDashboardTealFooter from '../PTEDashboardTealFooter';
import { usePortal } from '../portalContext';
import { ANALYTICS_SKILL_COLORS } from './analyticsConstants';
import {
  HalfCircleGauge,
  Last24HoursCommunityChart,
  ProgressAreaChart,
  SkillLegend,
  TaskVerticalBarChart,
} from './AnalyticsCharts';

const GRAPH_TABS = [
  { id: 'progress', label: 'Progress Graph' },
  { id: 'score', label: 'Score Graph' },
  { id: 'time', label: 'Time Graph' },
];

const QUESTION_FILTER_OPTIONS = ['All Questions', 'Prediction', 'New'];

const TIMEFRAME_OPTIONS = [
  'Last 1 day',
  'Last 7 days',
  'Last 15 days',
  'Last 30 days',
  'Last 60 days',
];

const SKILL_PILL_LIST = ['Speaking', 'Writing', 'Reading', 'Listening'];

const TIME_SKILL_META = [
  { key: 'Speaking', icon: Mic, iconBg: 'bg-[#fdf1e8]', iconColor: 'text-[#d97736]' },
  { key: 'Writing', icon: PenLine, iconBg: 'bg-[#eef6fc]', iconColor: 'text-[#4f8df9]' },
  { key: 'Reading', icon: BookOpen, iconBg: 'bg-[#eef8f1]', iconColor: 'text-[#3da854]' },
  { key: 'Listening', icon: Headphones, iconBg: 'bg-[#eff4fb]', iconColor: 'text-[#395591]' },
];

function DropdownPill({ options, value, onChange, ariaLabel }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-[#d0ddec] bg-white px-4 py-2 text-xs sm:text-[13px] font-semibold text-[#0c4a7e] hover:border-[#00b4c6] transition cursor-pointer shadow-2xs"
      >
        <span>{value}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute right-0 top-full mt-2 min-w-[160px] rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-40"
        >
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2.5 text-left text-xs sm:text-[13px] border-b border-slate-100 last:border-b-0 transition cursor-pointer ${
                  isSelected
                    ? 'font-bold text-[#0c4a7e] bg-slate-50/70'
                    : 'font-medium text-slate-600 hover:bg-slate-50'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Shared Analytics layout rendered by both AcademicAnalyticsPage and CoreAnalyticsPage,
 * parameterized by each track's dataset.
 */
export default function PortalAnalyticsView({ data }) {
  const { portalMode } = usePortal();
  const isCoreMode = portalMode === 'core';
  const [activeTab, setActiveTab] = useState('progress');
  const [questionFilter, setQuestionFilter] = useState('All Questions');
  const [timeframe, setTimeframe] = useState(data.defaultTimeframe || 'Last 30 days');
  const [activeSkill, setActiveSkill] = useState('Speaking');

  const timeline = data.timelineByTimeframe[timeframe] || data.timelineByTimeframe['Last 30 days'];
  const skillStatsMap =
    data.skillStatsByTimeframe?.[timeframe] || data.skillStatsByTimeframe?.['Last 30 days'] || {};
  const currentSkillStat = skillStatsMap[activeSkill] || {
    score: 0,
    attempted: 0,
    totalQuestions: 0,
    timeFormatted: '00:00',
  };

  const scoresMap = data.scoresByTimeframe?.[timeframe] || {};
  const timesMap = data.timesByTimeframe?.[timeframe] || {};
  const activeColor = ANALYTICS_SKILL_COLORS[activeSkill] || '#eb8c44';

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#e5f0fa] text-[#0c4a7e] flex items-center justify-center shadow-2xs">
              <BarChart2 className="w-4 h-4" />
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0c4a7e]">
              Performance Progress
            </h1>
          </div>

          <Link
            to={isCoreMode ? '/v1/core/dashboard' : '/dashboard'}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:text-[13px] font-semibold text-slate-600 hover:border-[#00b4c6] hover:text-[#0097a7] transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Practice Progress</span>
          </Link>
        </div>

        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 self-start shadow-2xs">
              {GRAPH_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-[#38c6bd] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {activeTab === 'score' && (
              <div className="rounded-full bg-[#eef8fc] border border-[#d6ecf7] px-4 py-1.5 text-xs font-medium text-[#0c4a7e] self-start xl:self-auto">
                Overall module scores are calculated using Pearson&apos;s dual scoring effect.
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 self-start xl:self-auto">
              {activeTab === 'progress' ? (
                <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:text-[13px] font-semibold text-slate-700 shadow-2xs">
                  {timeline.rangeLabel}
                </div>
              ) : (
                <DropdownPill
                  options={QUESTION_FILTER_OPTIONS}
                  value={questionFilter}
                  onChange={setQuestionFilter}
                  ariaLabel="Filter question set"
                />
              )}

              <DropdownPill
                options={TIMEFRAME_OPTIONS}
                value={timeframe}
                onChange={setTimeframe}
                ariaLabel="Filter analytics timeframe"
              />
            </div>
          </div>

          {activeTab === 'progress' && (
            <div className="rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4">
              <SkillLegend />
              <ProgressAreaChart dates={timeline.dates} seriesBySkill={timeline.seriesBySkill} />
            </div>
          )}

          {activeTab === 'score' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <div className="lg:col-span-9 rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4">
                <SkillLegend />
                <TaskVerticalBarChart
                  tasks={data.chartTasks}
                  mode="score"
                  scoresByCode={scoresMap}
                  timesByCode={timesMap}
                  questionFilter={questionFilter}
                  timeframe={timeframe}
                />
              </div>

              <div className="lg:col-span-3 flex flex-col gap-3.5">
                <div className="grid grid-cols-4 gap-1.5">
                  {SKILL_PILL_LIST.map((skill) => {
                    const selected = activeSkill === skill;
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => setActiveSkill(skill)}
                        style={
                          selected
                            ? { backgroundColor: ANALYTICS_SKILL_COLORS[skill], borderColor: ANALYTICS_SKILL_COLORS[skill] }
                            : undefined
                        }
                        className={`rounded-full py-1.5 px-1 text-[11px] font-semibold border transition truncate cursor-pointer ${
                          selected
                            ? 'text-white shadow-2xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>

                <div className="flex-1 rounded-2xl border border-slate-200/90 p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold" style={{ color: activeColor }}>
                    <Sparkles className="w-4 h-4" />
                    <span>Score</span>
                  </div>
                  <div className="my-auto pt-2">
                    <HalfCircleGauge
                      centerText={String(currentSkillStat.score)}
                      progressRatio={currentSkillStat.score / 90}
                      arcColor={activeColor}
                    />
                  </div>
                </div>

                <div className="flex-1 rounded-2xl border border-slate-200/90 p-4 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold" style={{ color: activeColor }}>
                    <HelpCircle className="w-4 h-4" />
                    <span>Attempted Question</span>
                  </div>
                  <div className="my-auto pt-2">
                    <HalfCircleGauge
                      centerText={String(currentSkillStat.attempted)}
                      subText={String(currentSkillStat.totalQuestions)}
                      progressRatio={
                        currentSkillStat.totalQuestions > 0
                          ? currentSkillStat.attempted / currentSkillStat.totalQuestions
                          : 0
                      }
                      arcColor={activeColor}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'time' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              <div className="lg:col-span-9 rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4">
                <SkillLegend />
                <TaskVerticalBarChart
                  tasks={data.chartTasks}
                  mode="time"
                  scoresByCode={scoresMap}
                  timesByCode={timesMap}
                  questionFilter={questionFilter}
                  timeframe={timeframe}
                />
              </div>

              <div className="lg:col-span-3 flex flex-col gap-3">
                {TIME_SKILL_META.map(({ key, icon: Icon, iconBg, iconColor }) => {
                  const stat = skillStatsMap[key] || { timeFormatted: '00:00' };
                  return (
                    <div
                      key={key}
                      className="flex-1 rounded-2xl border border-slate-200/90 px-4 py-3.5 flex items-center justify-between gap-3 bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-9 h-9 rounded-full ${iconBg} ${iconColor} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-700">
                          {key}
                        </span>
                      </div>
                      <div className="text-right leading-tight">
                        <p className="text-base sm:text-lg font-extrabold text-slate-900">
                          {stat.timeFormatted}
                        </p>
                        <p className="text-[11px] font-medium text-slate-400">(MM:SS)</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-800 mb-4">Mock Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.mockTests.map((card) => {
              const pct =
                card.done === 0 ? 0 : Math.max(4, Math.min(100, Math.round((card.done / card.total) * 100)));
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

        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              Total questions practiced in the last 24 hours
            </h2>
            <SkillLegend />
          </div>

          <Last24HoursCommunityChart tasks={data.communityTasks} />
        </section>
      </main>

      <PTEDashboardTealFooter />
    </div>
  );
}
