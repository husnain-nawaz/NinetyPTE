import { Clock, FileText, TrendingDown, TrendingUp } from 'lucide-react';

export const FULL_SCORE_SKILLS = ['Speaking', 'Writing', 'Reading', 'Listening', 'Overall'];
export const CHART_Y_TICKS = [90, 80, 70, 60, 50, 40, 30, 20, 10];

export function filterAttemptsByPeriod(list, filterOption, referenceNow) {
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

export function summarizeFullAttempts(fullAttempts) {
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
}

export function buildPerformanceRows(summary) {
  return [
    { label: 'Task Taken', value: summary.count, Icon: FileText, color: 'text-slate-500' },
    { label: 'Avg. Score', value: summary.avg, Icon: Clock, color: 'text-amber-500' },
    { label: 'Best Score', value: summary.best, Icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'Lowest Score', value: summary.lowest, Icon: TrendingDown, color: 'text-rose-500' },
    { label: 'Last Test', value: summary.lastDate, Icon: Clock, color: 'text-indigo-500' },
  ];
}

export function summarizeSectionalScore(sectionalAttempts) {
  if (sectionalAttempts.length === 0) return 0;
  return Math.round(
    sectionalAttempts.reduce((acc, item) => acc + item.overall, 0) / sectionalAttempts.length
  );
}
