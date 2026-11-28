import { BookOpen, Headphones, Mic, Pencil } from 'lucide-react';

export const SKILL_SECTIONS = [
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

export const formatChartTaskCode = (code) => {
  if (code === 'MCS') return 'MCSA';
  if (code === 'MCM') return 'MCMA';
  return code;
};

export function avgNormalizedTaskScore(taskRows) {
  if (!taskRows.length) return 10;
  const total = taskRows.reduce((acc, row) => {
    const pill = row.skillPills?.[0];
    return acc + (pill && pill.max ? Math.round((pill.score / pill.max) * 90) : 0);
  }, 0);
  return Math.max(10, Math.round(total / taskRows.length));
}

/**
 * Builds ordered contributor task score cards across all active items for Sectional / Timed analytics.
 */
export function buildContributorTaskSummaries(results) {
  const summaries = [];
  const seenKeys = new Set();

  results.forEach((r) => {
    const key = `${r.skillGroup}:${r.code}`;
    if (seenKeys.has(key)) return;
    seenKeys.add(key);

    const secDef = SKILL_SECTIONS.find((s) => s.key === r.skillGroup) || SKILL_SECTIONS[0];
    const taskDef = secDef.tasks.find((t) => t.code === r.code);
    const matching = results.filter((x) => x.skillGroup === r.skillGroup && x.code === r.code);

    summaries.push({
      key,
      label: taskDef?.label || r.code,
      avgScore: avgNormalizedTaskScore(matching),
      color: secDef.color,
    });
  });

  return summaries;
}

/**
 * Computes bar chart series, Y-axis ticks, and section-wise Listening/SST durations.
 */
export function buildAnalyticsTimeData(results, visibleSkillSections) {
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

  const summedBarSec = timeBars.reduce((acc, b) => acc + b.secs, 0);
  const rawMaxSec = Math.max(120, ...timeBars.map((b) => b.secs));
  const maxBarSec = Math.ceil(rawMaxSec / 60) * 60;
  const yTicks = [maxBarSec, Math.round(maxBarSec * 0.66), Math.round(maxBarSec * 0.33), 0];
  const hasListeningSst = results.some((r) => r.skillGroup === 'Listening' && r.code === 'SST');

  const sectionTimings = visibleSkillSections.map((sec) => {
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

    return { sec, sstSec, mainSec };
  });

  return {
    timeBars,
    summedBarSec,
    maxBarSec,
    yTicks,
    hasListeningSst,
    sectionTimings,
  };
}
