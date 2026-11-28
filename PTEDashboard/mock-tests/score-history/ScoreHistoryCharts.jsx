import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { CHART_Y_TICKS } from './scoreHistoryUtils';

export function ScoreRing({ value, color, darkMode = false }) {
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

export function OverallScoreProgressChart({ attempts, darkMode }) {
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
              <text x={padLeft - 8} y={y + 3} textAnchor="end" className="fill-slate-400 text-[10px]">
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
                <text x={pt.x} y={height - 4} textAnchor="middle" className="fill-slate-400 text-[10px]">
                  {pt.shortDate}
                </text>
              </g>
            ))}

            {hovered && (
              <g
                transform={`translate(${Math.min(width - 125, Math.max(padLeft, hovered.x - 45))}, ${Math.max(4, hovered.y - 46)})`}
              >
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

export function PerformanceDeltaCell({ currentScore, previousScore }) {
  if (typeof previousScore !== 'number') return <span className="text-slate-400">-</span>;
  const diff = currentScore - previousScore;
  const improved = diff >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${improved ? 'text-emerald-500' : 'text-rose-500'}`}>
      {improved ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
      <span>
        {Math.abs(diff)} {improved ? 'Improved' : 'Declined'}
      </span>
    </span>
  );
}
