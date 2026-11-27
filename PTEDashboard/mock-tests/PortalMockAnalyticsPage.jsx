import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Gauge,
  Headphones,
  HelpCircle,
  Mic,
  Pencil,
  Share2,
} from 'lucide-react';
import PTEDashboardHeader from '../shared/PTEDashboardHeader';
import PTEDashboardTealFooter from '../shared/PTEDashboardTealFooter';
import { usePortal } from '../shared/portalContext';
import { MockActionToast } from './MockReportIssueModal';
import { ScoreEmptyState } from './MockTestSharedUI';
import { buildMockAttemptScore, formatMMSS } from './exam-runner';
import { getMockTestsDataset, readMockAttemptById } from './mockTestsData';

const SKILL_SECTIONS = [
  {
    key: 'Speaking',
    field: 'speaking',
    color: '#eb8c44',
    headerBg: 'bg-[#f49d56]',
    tintBg: 'bg-[#fdf1e6] text-[#c96b27]',
    Icon: Mic,
    tasks: [
      { code: 'RA', label: 'Read Aloud' },
      { code: 'RS', label: 'Repeat Sentence' },
      { code: 'DI', label: 'Describe Image' },
      { code: 'RL', label: 'Re-Tell Lecture' },
      { code: 'ASQ', label: 'Answer Short Question' },
      { code: 'SGD', label: 'Summarize Group Discussion' },
      { code: 'RTS', label: 'Respond to a Situation' },
    ],
  },
  {
    key: 'Writing',
    field: 'writing',
    color: '#4ea5f5',
    headerBg: 'bg-[#4ea5f5]',
    tintBg: 'bg-[#eaf2ff] text-[#2563eb]',
    Icon: Pencil,
    tasks: [
      { code: 'SWT', label: 'Summarize Written Text' },
      { code: 'WE', label: 'Write Essay' },
      { code: 'WEM', label: 'Write Email' },
    ],
  },
  {
    key: 'Reading',
    field: 'reading',
    color: '#22c55e',
    headerBg: 'bg-[#22c55e]',
    tintBg: 'bg-[#e8f8ed] text-[#16a34a]',
    Icon: BookOpen,
    tasks: [
      { code: 'RWB', label: 'Fill in the Blanks (Dropdown)' },
      { code: 'MCM', label: 'Multiple Choice Multiple Answer' },
      { code: 'RO', label: 'Re-order Paragraphs' },
      { code: 'RB', label: 'Fill in the Blanks (Drag & Drop)' },
      { code: 'MCS', label: 'Multiple Choice Single Answer' },
    ],
  },
  {
    key: 'Listening',
    field: 'listening',
    color: '#0b4a7b',
    headerBg: 'bg-[#0b4a7b]',
    tintBg: 'bg-[#e6eff8] text-[#0b4a7b]',
    Icon: Headphones,
    tasks: [
      { code: 'SST', label: 'Summarize Spoken Text' },
      { code: 'FIB', label: 'Fill in the Blanks' },
      { code: 'MCS', label: 'Multiple Choice Single Answer' },
      { code: 'SMW', label: 'Select Missing Words' },
      { code: 'MCM', label: 'Multiple Choice Multiple Answer' },
      { code: 'HCS', label: 'Highlight Correct Summary' },
      { code: 'HIW', label: 'Highlight Incorrect Words' },
      { code: 'WFD', label: 'Write from Dictation' },
    ],
  },
];

const formatChartTaskCode = (code) => {
  if (code === 'MCS') return 'MCSA';
  if (code === 'MCM') return 'MCMA';
  return code;
};

function SkillRadarPolygon({ speaking, writing, reading, listening, overall }) {
  const cx = 110;
  const cy = 110;
  const maxR = 72;
  const point = (angleDeg, score) => {
    const r = Math.max(8, ((Number(score) || 10) / 90) * maxR);
    const rad = (angleDeg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };

  const pts = [
    point(-90, speaking),
    point(0, writing),
    point(90, reading),
    point(180, listening),
  ];

  return (
    <svg viewBox="0 0 220 220" className="w-56 h-56 mx-auto" aria-label="Skill performance radar">
      {[20, 40, 60, 80, 100].map((pct) => {
        const r = (pct / 100) * maxR;
        const ring = `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`;
        return <polygon key={pct} points={ring} fill="none" stroke="#e2e8f0" strokeWidth="1" />;
      })}
      <line x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} stroke="#e2e8f0" strokeWidth="1" />
      <line x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} stroke="#e2e8f0" strokeWidth="1" />
      <polygon
        points={pts.map((p) => p.join(',')).join(' ')}
        fill="rgba(78, 165, 245, 0.16)"
        stroke="#4ea5f5"
        strokeWidth="2"
      />
      {pts.map((p, idx) => (
        <circle
          key={idx}
          cx={p[0]}
          cy={p[1]}
          r="3.5"
          fill={['#eb8c44', '#4ea5f5', '#22c55e', '#0b4a7b'][idx]}
        />
      ))}
      <text x={cx} y={18} textAnchor="middle" className="fill-[#eb8c44] text-[10px] font-bold">
        Speaking
      </text>
      <text x={cx + maxR + 18} y={cy + 3} textAnchor="start" className="fill-[#4ea5f5] text-[10px] font-bold">
        Writing
      </text>
      <text x={cx} y={208} textAnchor="middle" className="fill-[#22c55e] text-[10px] font-bold">
        Reading
      </text>
      <text x={cx - maxR - 8} y={cy + 3} textAnchor="end" className="fill-[#0b4a7b] text-[10px] font-bold">
        Listening
      </text>
      <text x={cx} y={cy - 2} textAnchor="middle" className="fill-[#0b4a7b] text-lg font-extrabold">
        {overall}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" className="fill-slate-400 text-[9px] font-semibold">
        Overall
      </text>
    </svg>
  );
}

function SectionalDonutRing({ score, color, darkMode }) {
  const pct = Math.max(0, Math.min(100, Math.round(((score || 0) / 90) * 100)));
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={darkMode ? '#272c35' : '#e8eef5'}
          strokeWidth="12"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-2xl font-extrabold" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

/**
 * Full-page Mock Test & Sectional Mock Test Analytics view supporting Light & Dark mode
 * (/v1/mock-test/mock-test-result-list/full-test-analytics/:attemptId).
 */
export default function PortalMockAnalyticsPage({ syncCoreMode = false }) {
  const { attemptId } = useParams();
  const { portalMode, setPortalMode, portalDarkMode: darkMode } = usePortal();
  const isCoreMode = portalMode === 'core' || syncCoreMode;
  const activeTrack = isCoreMode ? 'core' : 'academic';

  useEffect(() => {
    if (syncCoreMode) setPortalMode('core');
  }, [syncCoreMode, setPortalMode]);

  const dataset = useMemo(() => getMockTestsDataset(activeTrack), [activeTrack]);
  const rawAttempt = useMemo(
    () => readMockAttemptById(activeTrack, attemptId),
    [activeTrack, attemptId]
  );

  const attempt = useMemo(() => {
    if (!rawAttempt) return null;
    if (Array.isArray(rawAttempt.questionResults) && rawAttempt.questionResults.length > 0) {
      return rawAttempt;
    }
    const synth = buildMockAttemptScore(
      {
        id: rawAttempt.testId || 'mock',
        title: rawAttempt.title || 'Mock Test',
        mode: rawAttempt.mode || 'full',
        skill: rawAttempt.skill || 'All',
        questions: rawAttempt.mode === 'full' ? 68 : 16,
      },
      { answersByIndex: {} },
      rawAttempt.trackLabel || dataset.trackLabel,
      isCoreMode
    );
    return { ...rawAttempt, questionResults: synth.questionResults };
  }, [rawAttempt, dataset.trackLabel, isCoreMode]);

  const [toastMsg, setToastMsg] = useState('');

  if (!attempt) {
    return (
      <div
        className={`min-h-screen flex flex-col font-sans ${
          darkMode ? 'bg-[#0a0c0e] text-zinc-200' : 'bg-[#f8fbfd] text-slate-800'
        }`}
      >
        <PTEDashboardHeader />
        <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className={`text-lg sm:text-xl font-extrabold ${darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'}`}>
              Mock Test Analytics
            </h1>
            <Link to={dataset.routes.scores} className="text-xs font-semibold text-[#0b4a7b] hover:underline">
              &larr; Back to Scores
            </Link>
          </div>
          <div className={`rounded-2xl border p-6 ${darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200 bg-white'}`}>
            <ScoreEmptyState message="Complete a mock test to view full Analytics." />
          </div>
        </main>
        <PTEDashboardTealFooter />
      </div>
    );
  }

  const results = attempt.questionResults || [];
  const isTimed = attempt.mode === 'timed';
  const isSectional = attempt.mode === 'sectional';
  const isSingleSectionAnalytics = isTimed || isSectional;
  const targetSkill = attempt.skill || 'Speaking';
  const targetSec = SKILL_SECTIONS.find((s) => s.key === targetSkill) || SKILL_SECTIONS[0];

  const visibleSkillSections = SKILL_SECTIONS.filter((sec) =>
    results.some((r) => r.skillGroup === sec.key)
  );

  // Deduplicated unique contributor tasks in order of appearance for Sectional / Timed card grid
  const contributorTaskSummaries = [];
  const seenKeys = new Set();
  results.forEach((r) => {
    const key = `${r.skillGroup}:${r.code}`;
    if (seenKeys.has(key)) return;
    seenKeys.add(key);
    const secDef = SKILL_SECTIONS.find((s) => s.key === r.skillGroup) || SKILL_SECTIONS[0];
    const taskDef = secDef.tasks.find((t) => t.code === r.code);
    const matching = results.filter((x) => x.skillGroup === r.skillGroup && x.code === r.code);
    const avgScore = matching.length
      ? Math.max(
          10,
          Math.round(
            matching.reduce((acc, m) => {
              const p = m.skillPills?.[0];
              return acc + (p && p.max ? Math.round((p.score / p.max) * 90) : 0);
            }, 0) / matching.length
          )
        )
      : 10;
    contributorTaskSummaries.push({
      key,
      label: taskDef?.label || r.code,
      avgScore,
      color: secDef.color,
    });
  });

  const timeBars = visibleSkillSections.flatMap((sec) => {
    const secItems = results.filter((r) => r.skillGroup === sec.key);
    const byCode = {};
    secItems.forEach((it) => {
      if (!byCode[it.code]) byCode[it.code] = 0;
      byCode[it.code] += Number(it.timeSpentSeconds) || (it.isAttempted ? 48 : 32);
    });
    return Object.entries(byCode).map(([code, secs]) => ({
      code: formatChartTaskCode(code),
      secs,
      color: sec.color,
    }));
  });

  const totalSec = attempt.totalAllowedSeconds || (isSingleSectionAnalytics ? 1800 : 7800);
  const summedBarSec = timeBars.reduce((acc, b) => acc + b.secs, 0);
  const takenSec = attempt.elapsedSeconds || Math.max(60, summedBarSec);
  const hasListeningSst = results.some((r) => r.skillGroup === 'Listening' && r.code === 'SST');

  const rawMaxSec = Math.max(120, ...timeBars.map((b) => b.secs));
  const maxBarSec = Math.ceil(rawMaxSec / 60) * 60;
  const yTicks = [maxBarSec, Math.round(maxBarSec * 0.66), Math.round(maxBarSec * 0.33), 0];
  const attemptedTotal = results.filter((r) => r.isAttempted).length;
  const targetVal = typeof attempt[targetSec.field] === 'number' ? attempt[targetSec.field] : attempt.overall;

  const handleShare = () => {
    try {
      navigator.clipboard?.writeText(window.location.href);
    } catch {
      // Ignore clipboard failures
    }
    setToastMsg('Copied URL Successfully');
    setTimeout(() => setToastMsg(''), 3000);
  };

  const TopActionBar = (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share analytics URL"
        className={`w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer transition ${
          darkMode
            ? 'border-zinc-700 text-zinc-300 hover:border-[#3dc8c1]'
            : 'border-slate-200 text-slate-600 hover:border-[#0b4a7b]'
        }`}
      >
        <Share2 className="w-3.5 h-3.5" />
      </button>
      <Link
        to={`${dataset.routes.viewScore}/${attempt.id}`}
        className={`rounded-full border px-4 py-1 text-xs font-bold transition ${
          darkMode
            ? 'border-zinc-700 text-zinc-200 hover:border-[#3dc8c1]'
            : 'border-slate-200 text-[#0b4a7b] hover:border-[#0b4a7b]'
        }`}
      >
        Score
      </Link>
    </div>
  );

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        darkMode ? 'bg-[#0a0c0e] text-zinc-200' : 'bg-[#f8fbfd] text-slate-800'
      }`}
    >
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                darkMode ? 'bg-[#1a2433] text-[#4ea5f5]' : 'bg-[#e6eef6] text-[#0b4a7b]'
              }`}
            >
              <Gauge className="w-5 h-5" />
            </span>
            <h1
              className={`text-lg sm:text-xl font-extrabold ${
                darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'
              }`}
            >
              {isTimed
                ? 'Timed Mock Test Analytics'
                : isSectional
                  ? 'Sectional Mock Test Analytics'
                  : 'Mock Test Analytics'}
            </h1>
          </div>

          <Link
            to={dataset.routes.scores}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
              darkMode ? 'text-zinc-300 hover:text-[#3dc8c1]' : 'text-[#0b4a7b] hover:text-[#1ea7a1]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Scores</span>
          </Link>
        </div>

        {/* Overview Card */}
        {isSingleSectionAnalytics ? (
          <section
            className={`rounded-2xl border p-5 sm:p-6 shadow-2xs space-y-4 ${
              darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
            }`}
          >
            {TopActionBar}

            {isTimed ? (
              <div className="space-y-3">
                <h2
                  className={`text-sm font-extrabold border-b pb-2 ${
                    darkMode ? 'text-white border-zinc-800' : 'text-[#0b4a7b] border-slate-100'
                  }`}
                >
                  {targetSec.key}
                </h2>
                <div className="max-w-sm">
                  <div
                    className={`rounded-xl border px-4 py-3.5 flex items-center justify-between ${
                      darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-200/80 bg-white'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                      <HelpCircle className="w-4 h-4" style={{ color: targetSec.color }} />
                      <span>Attempted Questions</span>
                    </span>
                    <span className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
                      {attemptedTotal}/{results.length}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-3">
                  <SectionalDonutRing
                    score={targetVal}
                    color={targetSec.color}
                    darkMode={darkMode}
                  />
                </div>

                <div className="md:col-span-9 space-y-3">
                  <h2
                    className={`text-sm font-extrabold border-b pb-2 ${
                      darkMode ? 'text-white border-zinc-800' : 'text-[#0b4a7b] border-slate-100'
                    }`}
                  >
                    {targetSec.key}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className={`rounded-xl border px-4 py-3.5 flex items-center justify-between ${
                        darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-200/80 bg-white'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                        <targetSec.Icon className="w-4 h-4" style={{ color: targetSec.color }} />
                        <span>Score</span>
                      </span>
                      <span className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
                        {targetVal}
                      </span>
                    </div>

                    <div
                      className={`rounded-xl border px-4 py-3.5 flex items-center justify-between ${
                        darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-200/80 bg-white'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-400">
                        <HelpCircle className="w-4 h-4" style={{ color: targetSec.color }} />
                        <span>Attempted Questions</span>
                      </span>
                      <span className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
                        {attemptedTotal}/{results.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        ) : (
          <section
            className={`rounded-2xl border p-5 sm:p-6 shadow-2xs space-y-5 ${
              darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
            }`}
          >
            {TopActionBar}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4">
                <SkillRadarPolygon
                  speaking={attempt.speaking ?? 0}
                  writing={attempt.writing ?? 0}
                  reading={attempt.reading ?? 0}
                  listening={attempt.listening ?? 0}
                  overall={attempt.overall}
                />
              </div>

              <div className="lg:col-span-2 space-y-3 text-center">
                {[
                  { label: 'SPEAKING', val: attempt.speaking ?? '-', color: '#eb8c44' },
                  { label: 'WRITING', val: attempt.writing ?? '-', color: '#4ea5f5' },
                  { label: 'READING', val: attempt.reading ?? '-', color: '#22c55e' },
                  { label: 'LISTENING', val: attempt.listening ?? '-', color: '#0b4a7b' },
                  { label: 'OVERALL', val: attempt.overall, color: '#7c3aed' },
                ].map((row) => (
                  <div key={row.label} className="leading-tight">
                    <p className="text-[10px] font-bold tracking-wide" style={{ color: row.color }}>
                      &bull; {row.label}
                    </p>
                    <p className="text-sm font-extrabold" style={{ color: row.color }}>
                      {row.val}
                    </p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SKILL_SECTIONS.map((sec) => {
                  const subset = results.filter((r) => r.skillGroup === sec.key);
                  const attemptedCount = subset.filter((r) => r.isAttempted).length;
                  const Icon = sec.Icon;
                  const val = typeof attempt[sec.field] === 'number' ? attempt[sec.field] : '-';
                  return (
                    <div
                      key={sec.key}
                      className={`rounded-xl border p-4 space-y-2.5 ${
                        darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-200/80'
                      }`}
                    >
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: sec.color }}>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{sec.key}</span>
                      </div>
                      <div
                        className={`flex items-center justify-between text-xs ${
                          darkMode ? 'text-zinc-300' : 'text-slate-600'
                        }`}
                      >
                        <span>Attempted Questions</span>
                        <span className="font-bold" style={{ color: sec.color }}>
                          {attemptedCount}/{subset.length}
                        </span>
                      </div>
                      <div
                        className={`flex items-center justify-between text-xs ${
                          darkMode ? 'text-zinc-300' : 'text-slate-600'
                        }`}
                      >
                        <span>Score</span>
                        <span className="font-bold" style={{ color: sec.color }}>
                          {val}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Per-Task Breakdown Cards: Single Section Box on Sectional / Timed, 4 Skill Grids on Full */}
        {isSingleSectionAnalytics ? (
          <section
            className={`rounded-2xl border overflow-hidden shadow-2xs ${
              darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
            }`}
          >
            <div className={`${targetSec.headerBg} text-white px-5 py-2.5 flex items-center gap-2 text-sm font-bold`}>
              <targetSec.Icon className="w-4 h-4" />
              <span>{targetSec.key}</span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {contributorTaskSummaries.map((item) => {
                const pct = Math.min(100, Math.round((item.avgScore / 90) * 100));
                return (
                  <div
                    key={item.key}
                    className={`rounded-xl border p-3.5 space-y-2.5 ${
                      darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-200/80'
                    }`}
                  >
                    <p
                      className={`text-xs font-bold truncate ${
                        darkMode ? 'text-white' : 'text-[#0b4a7b]'
                      }`}
                    >
                      {item.label}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-slate-400">
                        {item.avgScore}/90
                      </span>
                      <div
                        className={`flex-1 h-1.5 rounded-full overflow-hidden ${
                          darkMode ? 'bg-zinc-800' : 'bg-slate-100'
                        }`}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visibleSkillSections.map((sec) => {
              const Icon = sec.Icon;
              const secItems = results.filter((r) => r.skillGroup === sec.key);
              const activeTasks = sec.tasks.filter((t) => secItems.some((r) => r.code === t.code));
              return (
                <section
                  key={sec.key}
                  className={`rounded-2xl border overflow-hidden shadow-2xs ${
                    darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
                  }`}
                >
                  <div className={`${sec.headerBg} text-white px-5 py-2.5 flex items-center gap-2 text-sm font-bold`}>
                    <Icon className="w-4 h-4" />
                    <span>{sec.key}</span>
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeTasks.map((task) => {
                      const taskRows = secItems.filter((r) => r.code === task.code);
                      const avgTaskScore = taskRows.length
                        ? Math.max(
                            10,
                            Math.round(
                              taskRows.reduce((acc, r) => {
                                const p = r.skillPills?.[0];
                                return acc + (p && p.max ? Math.round((p.score / p.max) * 90) : 0);
                              }, 0) / taskRows.length
                            )
                          )
                        : 10;
                      const pct = Math.min(100, Math.round((avgTaskScore / 90) * 100));
                      return (
                        <div
                          key={task.code}
                          className={`rounded-xl border p-3.5 space-y-2.5 ${
                            darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-200/80'
                          }`}
                        >
                          <p
                            className={`text-xs font-bold truncate ${
                              darkMode ? 'text-white' : 'text-[#0b4a7b]'
                            }`}
                          >
                            {task.label}
                          </p>
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-bold text-slate-400">
                              {avgTaskScore}/90
                            </span>
                            <div
                              className={`flex-1 h-1.5 rounded-full overflow-hidden ${
                                darkMode ? 'bg-zinc-800' : 'bg-slate-100'
                              }`}
                            >
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${pct}%`, backgroundColor: sec.color }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Time Taken Bar Chart + Section Timing */}
        <section
          className={`rounded-2xl border p-5 sm:p-6 shadow-2xs space-y-5 ${
            darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
          }`}
        >
          <h2
            className={`text-sm sm:text-base font-extrabold ${
              darkMode ? 'text-white' : 'text-[#0b4a7b]'
            }`}
          >
            Time Taken: {formatMMSS(takenSec)} / {formatMMSS(totalSec)}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div
              className={`lg:col-span-8 rounded-xl border p-4 space-y-4 ${
                darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-100'
              }`}
            >
              {!isTimed && (
                <div
                  className={`flex flex-wrap items-center justify-center gap-4 text-[11px] font-semibold ${
                    darkMode ? 'text-zinc-300' : 'text-slate-600'
                  }`}
                >
                  {visibleSkillSections.map((s) => (
                    <span key={s.key} className="inline-flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span>{s.key}</span>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-stretch gap-3 pt-2">
                <div className="flex flex-col justify-between pb-6 text-[9px] font-medium text-slate-400 shrink-0 select-none">
                  {yTicks.map((tick) => (
                    <span key={tick}>{formatMMSS(tick)}</span>
                  ))}
                </div>

                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-x-0 top-1 bottom-6 flex flex-col justify-between">
                    {yTicks.map((tick) => (
                      <div
                        key={tick}
                        className={`border-b border-dashed ${
                          darkMode ? 'border-zinc-800' : 'border-slate-100'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 h-44 flex items-end gap-2 sm:gap-3 pt-4 border-b border-slate-100/20 overflow-x-auto pb-1">
                    {timeBars.map((bar) => {
                      const hPct = Math.max(12, Math.round((bar.secs / maxBarSec) * 100));
                      return (
                        <div key={bar.code} className="min-w-[34px] flex-1 flex flex-col items-center gap-1">
                          <span className="text-[9px] text-slate-400 font-medium">
                            {formatMMSS(bar.secs)}
                          </span>
                          <div className="w-3.5 h-28 flex items-end justify-center">
                            <div
                              className="w-full rounded-t-full transition-all"
                              style={{ height: `${hPct}%`, backgroundColor: bar.color }}
                            />
                          </div>
                          <span className="text-[9px] font-bold text-slate-400">{bar.code}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-2.5">
              {visibleSkillSections.map((sec) => {
                const secItems = results.filter((r) => r.skillGroup === sec.key);
                const isListeningSec = sec.key === 'Listening';
                const sstSec = isListeningSec
                  ? secItems
                      .filter((r) => r.code === 'SST')
                      .reduce((acc, r) => acc + (Number(r.timeSpentSeconds) || 465), 0)
                  : 0;
                const mainSec = secItems
                  .filter((r) => !(isListeningSec && r.code === 'SST'))
                  .reduce((acc, r) => acc + (Number(r.timeSpentSeconds) || 48), 0);
                const Icon = sec.Icon;
                return (
                  <div
                    key={sec.key}
                    className={`rounded-xl border px-4 py-3 flex items-center justify-between ${
                      darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${sec.tintBg}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <span
                          className={`text-xs font-bold block ${
                            darkMode ? 'text-zinc-200' : 'text-slate-700'
                          }`}
                        >
                          {sec.key}
                        </span>
                        {sstSec > 0 && (
                          <span className="text-[10px] font-medium text-slate-400 block">
                            SST - {formatMMSS(sstSec)}/10:00
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right leading-tight shrink-0">
                      <p
                        className={`text-sm font-extrabold ${
                          darkMode ? 'text-white' : 'text-[#0b4a7b]'
                        }`}
                      >
                        {formatMMSS(mainSec)}
                      </p>
                      <p className="text-[10px] text-slate-400">(MM:SS)</p>
                    </div>
                  </div>
                );
              })}
              <div
                className={`text-[11px] font-medium pt-1 space-y-0.5 ${
                  darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'
                }`}
              >
                {isSingleSectionAnalytics && (
                  <p>
                    The above graph shows the question-wise distribution of your total time spent on this mock test.
                  </p>
                )}
                {(hasListeningSst || !isSingleSectionAnalytics) && (
                  <p>Listening time does not include SST</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <PTEDashboardTealFooter />
      <MockActionToast message={toastMsg} />

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
