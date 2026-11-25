import { useState } from 'react';
import {
  ANALYTICS_SKILL_COLORS,
  formatMinutesSeconds,
} from './analyticsConstants';

export function SkillLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 text-xs sm:text-sm font-medium text-slate-600">
      {Object.entries(ANALYTICS_SKILL_COLORS).map(([skill, color]) => (
        <span key={skill} className="inline-flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span>{skill}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * Multi-series smooth SVG area/line timeline chart supporting 1 or all 4 skills
 * simultaneously across dates and scores 0–90.
 */
export function ProgressAreaChart({ dates, seriesBySkill }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const width = 1080;
  const height = 310;
  const padL = 42;
  const padR = 24;
  const padT = 20;
  const padB = 64;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const yTicks = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  const getX = (idx) =>
    dates.length <= 1 ? padL + innerW / 2 : padL + (idx / (dates.length - 1)) * innerW;
  const getY = (val) => padT + innerH - (val / 90) * innerH;
  const baselineY = getY(0);

  const skillKeys = Object.keys(seriesBySkill);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[780px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            {skillKeys.map((skill) => (
              <linearGradient
                key={skill}
                id={`progressFill-${skill}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={ANALYTICS_SKILL_COLORS[skill]} stopOpacity="0.32" />
                <stop offset="100%" stopColor={ANALYTICS_SKILL_COLORS[skill]} stopOpacity="0.03" />
              </linearGradient>
            ))}
          </defs>

          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padL}
                  y1={y}
                  x2={width - padR}
                  y2={y}
                  stroke={tick === 0 ? '#94a3b8' : '#e2e8f0'}
                  strokeDasharray={tick === 0 ? undefined : '4 4'}
                  strokeWidth={1}
                />
                <text x={padL - 8} y={y + 4} textAnchor="end" className="fill-slate-400 text-[11px]">
                  {tick}
                </text>
              </g>
            );
          })}

          {skillKeys.map((skill) => {
            const values = seriesBySkill[skill] || [];
            const coords = dates.map((d, idx) => ({
              date: d,
              val: values[idx] || 0,
              x: getX(idx),
              y: getY(values[idx] || 0),
            }));

            let linePath = '';
            coords.forEach((pt, idx) => {
              if (idx === 0) {
                linePath += `M ${pt.x} ${pt.y}`;
                return;
              }
              const prev = coords[idx - 1];
              const cx = (prev.x + pt.x) / 2;
              linePath += ` C ${cx} ${prev.y}, ${cx} ${pt.y}, ${pt.x} ${pt.y}`;
            });

            const areaPath =
              coords.length > 0
                ? `${linePath} L ${coords[coords.length - 1].x} ${baselineY} L ${coords[0].x} ${baselineY} Z`
                : '';

            return (
              <g key={skill}>
                {areaPath && <path d={areaPath} fill={`url(#progressFill-${skill})`} />}
                {linePath && (
                  <path
                    d={linePath}
                    fill="none"
                    stroke={ANALYTICS_SKILL_COLORS[skill]}
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                )}
                {coords.map((pt, idx) => (
                  <circle
                    key={`${skill}-${pt.date}`}
                    cx={pt.x}
                    cy={pt.y}
                    r={pt.val > 0 || hoveredIdx === idx ? 4 : 2.2}
                    fill={ANALYTICS_SKILL_COLORS[skill]}
                    stroke="#ffffff"
                    strokeWidth={1.2}
                  />
                ))}
              </g>
            );
          })}

          {/* Interactive X-axis ticks + shared multi-skill hover tooltip */}
          {dates.map((dateLabel, idx) => {
            const x = getX(idx);
            const isHovered = hoveredIdx === idx;
            const entries = skillKeys.map((s) => ({
              skill: s,
              val: seriesBySkill[s]?.[idx] ?? 0,
            }));
            const maxVal = Math.max(...entries.map((e) => e.val));

            return (
              <g
                key={dateLabel}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <rect x={x - 12} y={padT} width={24} height={innerH + 10} fill="transparent" />
                <text
                  x={x}
                  y={baselineY + 14}
                  transform={`rotate(-35 ${x} ${baselineY + 14})`}
                  textAnchor="end"
                  className="fill-slate-500 text-[10px]"
                >
                  {dateLabel}
                </text>

                {isHovered && (
                  <g
                    transform={`translate(${Math.min(x - 65, width - 175)}, ${Math.max(getY(maxVal) - 46, 4)})`}
                  >
                    <rect width="165" height="36" rx="6" fill="#0f172a" />
                    <text x="82.5" y="14" textAnchor="middle" className="fill-cyan-300 text-[10px] font-bold">
                      {dateLabel}
                    </text>
                    <text x="82.5" y="28" textAnchor="middle" className="fill-white text-[9.5px] font-medium">
                      {entries.map((e) => `${e.skill[0]}:${e.val}`).join(' · ')}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/**
 * Vertical pill bar chart for both Score Graph (0-90) and Time Graph (MM:SS)
 * parameterized by track tasks and selected timeframe/question filters.
 */
export function TaskVerticalBarChart({
  tasks,
  mode,
  scoresByCode,
  timesByCode,
  questionFilter,
  timeframe,
}) {
  const [hoveredCode, setHoveredCode] = useState(null);
  const width = 760;
  const height = 310;
  const padL = 48;
  const padR = 16;
  const padT = 24;
  const padB = 56;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const isAllTime = timeframe === 'Last 60 days' || timeframe === 'Last 30 days';
  const filterScale = questionFilter === 'New' ? 0.8 : questionFilter === 'Prediction' ? 0.9 : 1;

  const maxTimeSec = Math.max(540, ...tasks.map((t) => timesByCode[t.code] || 0));
  const maxVal = mode === 'time' ? maxTimeSec : 90;

  const yTicks =
    mode === 'time'
      ? Array.from({ length: 10 }, (_, i) => Math.round((maxTimeSec / 9) * i))
      : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  const colW = innerW / tasks.length;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {yTicks.map((tick) => {
            const y = padT + innerH - (tick / maxVal) * innerH;
            return (
              <g key={tick}>
                <line
                  x1={padL}
                  y1={y}
                  x2={width - padR}
                  y2={y}
                  stroke={tick === 0 ? '#94a3b8' : '#e2e8f0'}
                  strokeDasharray={tick === 0 ? undefined : '3 3'}
                  strokeWidth={1}
                />
                <text x={padL - 8} y={y + 4} textAnchor="end" className="fill-slate-400 text-[10px]">
                  {mode === 'time' ? formatMinutesSeconds(tick) : tick}
                </text>
              </g>
            );
          })}

          {tasks.map((task, idx) => {
            const rawVal = mode === 'time' ? timesByCode[task.code] || 0 : scoresByCode[task.code] || 0;
            const value = isAllTime && timeframe !== 'Last 1 day' ? Math.round(rawVal * filterScale) : 0;
            const barH = value > 0 ? Math.max(8, (value / maxVal) * innerH) : 0;
            const cx = padL + idx * colW + colW / 2;
            const barW = 14;
            const barY = padT + innerH - barH;
            const displayValue = mode === 'time' ? formatMinutesSeconds(value) : String(value);

            return (
              <g
                key={task.code}
                onMouseEnter={() => setHoveredCode(task.code)}
                onMouseLeave={() => setHoveredCode(null)}
                className="cursor-pointer"
              >
                {barH > 0 && (
                  <>
                    <text x={cx} y={barY - 6} textAnchor="middle" className="fill-slate-500 text-[10.5px] font-semibold">
                      {displayValue}
                    </text>
                    <rect
                      x={cx - barW / 2}
                      y={barY}
                      width={barW}
                      height={barH}
                      rx={barW / 2}
                      fill={ANALYTICS_SKILL_COLORS[task.skill]}
                    />
                  </>
                )}

                <text
                  x={cx}
                  y={padT + innerH + 14}
                  transform={`rotate(-35 ${cx} ${padT + innerH + 14})`}
                  textAnchor="end"
                  className="fill-slate-500 text-[10px]"
                >
                  {task.code}
                </text>

                {hoveredCode === task.code && (
                  <g transform={`translate(${Math.min(cx - 55, width - 175)}, 2)`}>
                    <rect width="165" height="22" rx="5" fill="#0f172a" />
                    <text x="82.5" y="14.5" textAnchor="middle" className="fill-white text-[10px] font-semibold">
                      {task.label.slice(0, 20)}: {displayValue}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/**
 * Semi-circular SVG gauge supporting skill-matched arc color and progress ratio.
 */
export function HalfCircleGauge({
  centerText,
  subText,
  progressRatio = 0,
  arcColor = '#eb8c44',
}) {
  const clamped = Math.max(0, Math.min(1, progressRatio));
  const arcLen = Math.PI * 54;
  const dashOffset = arcLen * (1 - clamped);

  return (
    <div className="flex flex-col items-center">
      <svg className="w-40 h-24" viewBox="0 0 140 80" aria-hidden="true">
        <path
          d="M 16 70 A 54 54 0 0 1 124 70"
          fill="none"
          stroke="#eef2f6"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {clamped > 0 && (
          <path
            d="M 16 70 A 54 54 0 0 1 124 70"
            fill="none"
            stroke={arcColor}
            strokeWidth="7"
            strokeDasharray={arcLen}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="-mt-8 text-center">
        <span className="text-xl font-extrabold text-slate-800">{centerText}</span>
        {subText && <span className="text-xs font-medium text-slate-400 ml-1">/ {subText}</span>}
      </div>
    </div>
  );
}

/**
 * Community 24-hour task volume bar chart rendered at the bottom of analytics pages.
 */
export function Last24HoursCommunityChart({ tasks }) {
  const [hoveredCode, setHoveredCode] = useState(null);
  const width = 1220;
  const height = 270;
  const padL = 56;
  const padR = 24;
  const padT = 18;
  const padB = 56;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const maxVal = 523000;
  const yTicks = [
    { val: 0, label: '0' },
    { val: 58000, label: '58K' },
    { val: 116000, label: '116K' },
    { val: 174000, label: '174K' },
    { val: 233000, label: '233K' },
    { val: 291000, label: '291K' },
    { val: 349000, label: '349K' },
    { val: 407000, label: '407K' },
    { val: 465000, label: '465K' },
    { val: 523000, label: '523K' },
  ];

  const colW = innerW / tasks.length;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[820px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {yTicks.map((t) => {
            const y = padT + innerH - (t.val / maxVal) * innerH;
            return (
              <g key={t.label}>
                <line
                  x1={padL}
                  y1={y}
                  x2={width - padR}
                  y2={y}
                  stroke={t.val === 0 ? '#94a3b8' : '#eef2f6'}
                  strokeWidth={1}
                />
                <text x={padL - 8} y={y + 4} textAnchor="end" className="fill-slate-400 text-[11px]">
                  {t.label}
                </text>
              </g>
            );
          })}

          {tasks.map((task, idx) => {
            const barH = Math.max(4, (task.communityCount / maxVal) * innerH);
            const cx = padL + idx * colW + colW / 2;
            const barW = 14;
            const barY = padT + innerH - barH;

            return (
              <g
                key={task.code}
                onMouseEnter={() => setHoveredCode(task.code)}
                onMouseLeave={() => setHoveredCode(null)}
                className="cursor-pointer"
              >
                <rect
                  x={cx - barW / 2}
                  y={barY}
                  width={barW}
                  height={barH}
                  rx={6}
                  fill={ANALYTICS_SKILL_COLORS[task.skill]}
                />

                <text
                  x={cx}
                  y={padT + innerH + 16}
                  transform={`rotate(-35 ${cx} ${padT + innerH + 16})`}
                  textAnchor="end"
                  className="fill-slate-500 text-[10.5px]"
                >
                  {task.code}
                </text>

                {hoveredCode === task.code && (
                  <g transform={`translate(${Math.min(cx - 70, width - 180)}, ${Math.max(barY - 30, 4)})`}>
                    <rect width="170" height="24" rx="6" fill="#0f172a" />
                    <text x="85" y="15.5" textAnchor="middle" className="fill-white text-[10.5px] font-semibold">
                      {task.code}: {task.communityLabel} practiced
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
