import { HelpCircle } from 'lucide-react';
import { formatMMSS } from '../exam-runner';
import { avgNormalizedTaskScore, SKILL_SECTIONS } from './analyticsConfig';

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

export function AnalyticsOverviewSection({
  attempt,
  results,
  targetSec,
  targetVal,
  attemptedTotal,
  isTimed,
  isSingleSectionAnalytics,
  actionBar,
  darkMode,
}) {
  if (isSingleSectionAnalytics) {
    return (
      <section
        className={`rounded-2xl border p-5 sm:p-6 shadow-2xs space-y-4 ${
          darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
        }`}
      >
        {actionBar}

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
              <SectionalDonutRing score={targetVal} color={targetSec.color} darkMode={darkMode} />
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
    );
  }

  return (
    <section
      className={`rounded-2xl border p-5 sm:p-6 shadow-2xs space-y-5 ${
        darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
      }`}
    >
      {actionBar}

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
  );
}

function TaskProgressCard({ label, avgScore, color, darkMode }) {
  const pct = Math.min(100, Math.round((avgScore / 90) * 100));
  return (
    <div
      className={`rounded-xl border p-3.5 space-y-2.5 ${
        darkMode ? 'border-zinc-800 bg-[#181c23]' : 'border-slate-200/80'
      }`}
    >
      <p className={`text-xs font-bold truncate ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
        {label}
      </p>
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-bold text-slate-400">{avgScore}/90</span>
        <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
      </div>
    </div>
  );
}

export function AnalyticsTaskBreakdownSection({
  results,
  targetSec,
  visibleSkillSections,
  contributorTaskSummaries,
  isSingleSectionAnalytics,
  darkMode,
}) {
  if (isSingleSectionAnalytics) {
    return (
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
          {contributorTaskSummaries.map((item) => (
            <TaskProgressCard
              key={item.key}
              label={item.label}
              avgScore={item.avgScore}
              color={item.color}
              darkMode={darkMode}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
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
                return (
                  <TaskProgressCard
                    key={task.code}
                    label={task.label}
                    avgScore={avgNormalizedTaskScore(taskRows)}
                    color={sec.color}
                    darkMode={darkMode}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function AnalyticsTimeTakenSection({
  takenSec,
  totalSec,
  visibleSkillSections,
  timeData,
  isTimed,
  isSingleSectionAnalytics,
  darkMode,
}) {
  const { timeBars, maxBarSec, yTicks, hasListeningSst, sectionTimings } = timeData;

  return (
    <section
      className={`rounded-2xl border p-5 sm:p-6 shadow-2xs space-y-5 ${
        darkMode ? 'border-zinc-800 bg-[#14171c]' : 'border-slate-200/80 bg-white'
      }`}
    >
      <h2 className={`text-sm sm:text-base font-extrabold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
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
                      <span className="text-[9px] text-slate-400 font-medium">{formatMMSS(bar.secs)}</span>
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
          {sectionTimings.map(({ sec, sstSec, mainSec }) => {
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
                    <span className={`text-xs font-bold block ${darkMode ? 'text-zinc-200' : 'text-slate-700'}`}>
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
                  <p className={`text-sm font-extrabold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
                    {formatMMSS(mainSec)}
                  </p>
                  <p className="text-[10px] text-slate-400">(MM:SS)</p>
                </div>
              </div>
            );
          })}
          <div className={`text-[11px] font-medium pt-1 space-y-0.5 ${darkMode ? 'text-[#4ea5f5]' : 'text-[#0b4a7b]'}`}>
            {isSingleSectionAnalytics && (
              <p>The above graph shows the question-wise distribution of your total time spent on this mock test.</p>
            )}
            {(hasListeningSst || !isSingleSectionAnalytics) && (
              <p>Listening time does not include SST</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
