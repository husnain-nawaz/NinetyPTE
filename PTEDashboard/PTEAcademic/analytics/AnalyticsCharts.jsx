import { useState } from 'react';
import {
  SKILL_COLORS,
  TASK_METRIC_ITEMS,
  formatMinutesSeconds,
} from './analyticsData';

export function SkillLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 text-xs sm:text-sm font-medium text-slate-600">
      {Object.entries(SKILL_COLORS).map(([skill, color]) => (
        <span key={skill} className="inline-flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span>{skill}</span>
        </span>
      ))}
    </div>
  );
}

/**
 * Smooth SVG Area/Line chart rendered on the "Progress Graph" analytics tab.
 */
export function ProgressAreaChart({ points }) {
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
    points.length <= 1
      ? padL + innerW / 2
      : padL + (idx / (points.length - 1)) * innerW;
  const getY = (val) => padT + innerH - (val / 90) * innerH;

  // Build smooth cubic bezier curve path across data points
  const coords = points.map((pt, idx) => ({
    ...pt,
    x: getX(idx),
    y: getY(pt.value),
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

  const baselineY = getY(0);
  const areaPath =
    coords.length > 0
      ? `${linePath} L ${coords[coords.length - 1].x} ${baselineY} L ${coords[0].x} ${baselineY} Z`
      : '';

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[780px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="progressAreaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines & Y Ticks */}
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
                <text
                  x={padL - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-[11px]"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Area & Line */}
          {areaPath && <path d={areaPath} fill="url(#progressAreaFill)" />}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="#5ba4f5"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          )}

          {/* Points & X-axis labels */}
          {coords.map((pt, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <g
                key={pt.date}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={pt.value > 0 || isHovered ? 4.5 : 2.5}
                  fill="#5ba4f5"
                  stroke="#ffffff"
                  strokeWidth={1.5}
                />
                <text
                  x={pt.x}
                  y={baselineY + 14}
                  transform={`rotate(-35 ${pt.x} ${baselineY + 14})`}
                  textAnchor="end"
                  className="fill-slate-500 text-[10px]"
                >
                  {pt.date}
                </text>

                {isHovered && (
                  <g transform={`translate(${Math.min(pt.x, width - 130)}, ${Math.max(pt.y - 34, 6)})`}>
                    <rect width="114" height="24" rx="6" fill="#0f172a" />
                    <text
                      x="57"
                      y="15"
                      textAnchor="middle"
                      className="fill-white text-[10px] font-semibold"
                    >
                      {pt.date}: {pt.value}/90
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
 * Vertical pill bar chart shared by both Score Graph (0-90) and Time Graph (MM:SS).
 */
export function TaskVerticalBarChart({ mode, questionFilter, timeframe }) {
  const [hoveredCode, setHoveredCode] = useState(null);
  const shownTasks = TASK_METRIC_ITEMS.slice(0, 18);
  const width = 760;
  const height = 310;
  const padL = 48;
  const padR = 16;
  const padT = 24;
  const padB = 56;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const maxVal = mode === 'time' ? 2854 : 90;

  const scaleFactor =
    timeframe === 'Last 1 day'
      ? 0
      : timeframe === 'Last 7 days'
        ? 0.25
        : questionFilter === 'New'
          ? 0.75
          : 1;

  const yTicks =
    mode === 'time'
      ? [0, 317, 634, 951, 1268, 1586, 1902, 2220, 2537, 2854]
      : [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  const colW = innerW / shownTasks.length;

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
                <text
                  x={padL - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-[10px]"
                >
                  {mode === 'time' ? formatMinutesSeconds(tick) : tick}
                </text>
              </g>
            );
          })}

          {shownTasks.map((task, idx) => {
            const rawVal = mode === 'time' ? task.timeSec : task.score;
            const value = Math.round(rawVal * scaleFactor);
            const barH = value > 0 ? Math.max(8, (value / maxVal) * innerH) : 0;
            const cx = padL + idx * colW + colW / 2;
            const barW = 14;
            const barY = padT + innerH - barH;
            const displayValue =
              mode === 'time' ? formatMinutesSeconds(value) : String(value);

            return (
              <g
                key={task.code}
                onMouseEnter={() => setHoveredCode(task.code)}
                onMouseLeave={() => setHoveredCode(null)}
                className="cursor-pointer"
              >
                {barH > 0 && (
                  <>
                    <text
                      x={cx}
                      y={barY - 6}
                      textAnchor="middle"
                      className="fill-slate-500 text-[10.5px] font-semibold"
                    >
                      {displayValue}
                    </text>
                    <rect
                      x={cx - barW / 2}
                      y={barY}
                      width={barW}
                      height={barH}
                      rx={barW / 2}
                      fill={SKILL_COLORS[task.skill]}
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
                  <g transform={`translate(${Math.min(cx - 55, width - 165)}, 2)`}>
                    <rect width="155" height="22" rx="5" fill="#0f172a" />
                    <text
                      x="77.5"
                      y="14.5"
                      textAnchor="middle"
                      className="fill-white text-[10px] font-semibold"
                    >
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
 * Clean semi-circular SVG gauge used inside Score Graph right panel.
 */
export function HalfCircleGauge({ labelText, centerText, subText }) {
  return (
    <div className="flex flex-col items-center">
      <svg className="w-40 h-24" viewBox="0 0 140 80" aria-hidden="true">
        <path
          d="M 16 70 A 54 54 0 0 1 124 70"
          fill="none"
          stroke="#eef2f6"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {Number(centerText) > 0 && (
          <path
            d="M 16 70 A 54 54 0 0 1 88 20"
            fill="none"
            stroke="#5ba4f5"
            strokeWidth="6"
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="-mt-8 text-center">
        <span className="text-xl font-extrabold text-slate-800">{centerText}</span>
        {subText && (
          <span className="text-xs font-medium text-slate-400 ml-1">/ {subText}</span>
        )}
        {labelText && <p className="text-[11px] text-slate-400 mt-0.5">{labelText}</p>}
      </div>
    </div>
  );
}

/**
 * 22-task global community practice bar chart in the bottom card.
 */
export function Last24HoursCommunityChart() {
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

  const colW = innerW / TASK_METRIC_ITEMS.length;

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
                <text
                  x={padL - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-400 text-[11px]"
                >
                  {t.label}
                </text>
              </g>
            );
          })}

          {TASK_METRIC_ITEMS.map((task, idx) => {
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
                  fill={SKILL_COLORS[task.skill]}
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
                  <g transform={`translate(${Math.min(cx - 70, width - 170)}, ${Math.max(barY - 30, 4)})`}>
                    <rect width="160" height="24" rx="6" fill="#0f172a" />
                    <text
                      x="80"
                      y="15.5"
                      textAnchor="middle"
                      className="fill-white text-[10.5px] font-semibold"
                    >
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
