import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Gauge,
  Headphones,
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
      { code: 'MCM', label: 'Multiple Choice, Multiple Answers' },
      { code: 'RO', label: 'Re-order Paragraphs' },
      { code: 'RB', label: 'Fill in the Blanks (Drag & Drop)' },
      { code: 'MCS', label: 'Multiple Choice, Single Answer' },
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
      { code: 'MCS', label: 'Multiple Choice, Single Answer' },
      { code: 'SMW', label: 'Select Missing Word' },
      { code: 'MCM', label: 'Multiple Choice, Multiple Answers' },
      { code: 'HCS', label: 'Highlight Correct Summary' },
      { code: 'HIW', label: 'Highlight Incorrect Words' },
      { code: 'WFD', label: 'Write from Dictation' },
    ],
  },
];

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

/**
 * Full-page Mock Test Analytics view (/v1/mock-test/mock-test-result-list/full-test-analytics/:attemptId)
 * displaying radar chart, attempted/score summaries, per-task time breakdown, and skill task cards.
 */
export default function PortalMockAnalyticsPage({ syncCoreMode = false }) {
  const { attemptId } = useParams();
  const { portalMode, setPortalMode } = usePortal();
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
        questions: 68,
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
      <div className="min-h-screen bg-[#f8fbfd] text-slate-800 flex flex-col font-sans">
        <PTEDashboardHeader />
        <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0b4a7b]">Mock Test Analytics</h1>
            <Link to={dataset.routes.scores} className="text-xs font-semibold text-[#0b4a7b] hover:underline">
              &larr; Back to Scores
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <ScoreEmptyState message="Complete a mock test to view full Analytics." />
          </div>
        </main>
        <PTEDashboardTealFooter />
      </div>
    );
  }

  const results = attempt.questionResults || [];
  const totalSec = attempt.totalAllowedSeconds || 7800;
  const takenSec = attempt.elapsedSeconds || Math.round(totalSec * 0.5);

  const visibleSkillSections = SKILL_SECTIONS.filter((sec) =>
    results.some((r) => r.skillGroup === sec.key)
  );

  const timeBars = visibleSkillSections.flatMap((sec) => {
    const secItems = results.filter((r) => r.skillGroup === sec.key);
    const byCode = {};
    secItems.forEach((it) => {
      if (!byCode[it.code]) byCode[it.code] = 0;
      byCode[it.code] += it.isAttempted ? 48 : 26;
    });
    return Object.entries(byCode).map(([code, secs]) => ({
      code,
      secs,
      color: sec.color,
    }));
  });

  const maxBarSec = Math.max(120, ...timeBars.map((b) => b.secs));

  const handleShare = () => {
    try {
      navigator.clipboard?.writeText(window.location.href);
    } catch {
      // Ignore clipboard failures
    }
    setToastMsg('Copied URL Successfully');
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fbfd] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1260px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#e6eef6] text-[#0b4a7b] flex items-center justify-center shrink-0">
              <Gauge className="w-5 h-5" />
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0b4a7b]">Mock Test Analytics</h1>
          </div>

          <Link
            to={dataset.routes.scores}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b4a7b] hover:text-[#1ea7a1]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Scores</span>
          </Link>
        </div>

        {/* Radar & Attempted Overview */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share analytics URL"
              className="w-8 h-8 rounded-full border border-slate-200 text-slate-600 hover:border-[#0b4a7b] flex items-center justify-center cursor-pointer transition"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <Link
              to={`${dataset.routes.viewScore}/${attempt.id}`}
              className="rounded-full border border-slate-200 hover:border-[#0b4a7b] px-4 py-1 text-xs font-bold text-[#0b4a7b] transition"
            >
              Score
            </Link>
          </div>

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
                    className="rounded-xl border border-slate-200/80 p-4 space-y-2.5"
                  >
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: sec.color }}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{sec.key}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Attempted Questions</span>
                      <span className="font-bold" style={{ color: sec.color }}>
                        {attemptedCount}/{subset.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-600">
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

        {/* Time Taken Bar Chart + Section Timing */}
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
          <h2 className="text-sm sm:text-base font-extrabold text-[#0b4a7b]">
            Time Taken: {formatMMSS(takenSec)} / {formatMMSS(totalSec)}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 rounded-xl border border-slate-100 p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-semibold text-slate-600">
                {SKILL_SECTIONS.map((s) => (
                  <span key={s.key} className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span>{s.key}</span>
                  </span>
                ))}
              </div>

              <div className="h-44 flex items-end gap-2 sm:gap-3 pt-4 border-b border-slate-100 overflow-x-auto pb-1">
                {timeBars.map((bar) => {
                  const hPct = Math.max(12, Math.round((bar.secs / maxBarSec) * 100));
                  return (
                    <div key={bar.code} className="min-w-[34px] flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] text-slate-500 font-medium">
                        {formatMMSS(bar.secs)}
                      </span>
                      <div className="w-3.5 h-28 flex items-end justify-center">
                        <div
                          className="w-full rounded-t-full transition-all"
                          style={{ height: `${hPct}%`, backgroundColor: bar.color }}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-slate-500">{bar.code}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-2.5">
              {SKILL_SECTIONS.map((sec) => {
                const secItems = results.filter((r) => r.skillGroup === sec.key);
                const estSec = Math.max(45, secItems.length * 42);
                const Icon = sec.Icon;
                return (
                  <div
                    key={sec.key}
                    className="rounded-xl border border-slate-200/80 px-4 py-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${sec.tintBg}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-bold text-slate-700">{sec.key}</span>
                    </div>
                    <div className="text-right leading-tight">
                      <p className="text-sm font-extrabold text-[#0b4a7b]">{formatMMSS(estSec)}</p>
                      <p className="text-[10px] text-slate-400">(MM:SS)</p>
                    </div>
                  </div>
                );
              })}
              <p className="text-[11px] font-medium text-[#0b4a7b] pt-1">
                Listening time does not include SST
              </p>
            </div>
          </div>
        </section>

        {/* Per-Task Breakdown Cards by Skill */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {visibleSkillSections.map((sec) => {
            const Icon = sec.Icon;
            const secItems = results.filter((r) => r.skillGroup === sec.key);
            const activeTasks = sec.tasks.filter((t) => secItems.some((r) => r.code === t.code));
            return (
              <section
                key={sec.key}
                className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-2xs"
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
                        className="rounded-xl border border-slate-200/80 p-3.5 space-y-2.5"
                      >
                        <p className="text-xs font-bold text-[#0b4a7b] truncate">{task.label}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-bold text-slate-500">
                            {avgTaskScore}/90
                          </span>
                          <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
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
