export { ANALYTICS_SKILL_COLORS as SKILL_COLORS } from '../../shared/analytics/analyticsConstants';

const ACADEMIC_TASKS = [
  { code: 'RA', label: 'Read Aloud', skill: 'Speaking', communityCount: 233000, communityLabel: '233K' },
  { code: 'RS', label: 'Repeat Sentence', skill: 'Speaking', communityCount: 520000, communityLabel: '520K' },
  { code: 'DI', label: 'Describe Image', skill: 'Speaking', communityCount: 121000, communityLabel: '121K' },
  { code: 'RL', label: 'Re-Tell Lecture', skill: 'Speaking', communityCount: 32000, communityLabel: '32K' },
  { code: 'ASQ', label: 'Answer Short Question', skill: 'Speaking', communityCount: 49000, communityLabel: '49K' },
  { code: 'SGD', label: 'Summarize Group Discussion', skill: 'Speaking', communityCount: 14000, communityLabel: '14K' },
  { code: 'RTS', label: 'Respond to a Situation', skill: 'Speaking', communityCount: 42000, communityLabel: '42K' },
  { code: 'SWT', label: 'Summarize Written Text', skill: 'Writing', communityCount: 54000, communityLabel: '54K' },
  { code: 'WE', label: 'Write Essay', skill: 'Writing', communityCount: 19000, communityLabel: '19K' },
  { code: 'FIB(D)', label: 'R&W Fill in the Blanks', skill: 'Reading', communityCount: 102000, communityLabel: '102K' },
  { code: 'R:MCM', label: 'Reading Multiple Choice Multiple', skill: 'Reading', communityCount: 11000, communityLabel: '11K' },
  { code: 'RO', label: 'Re-order Paragraphs', skill: 'Reading', communityCount: 68000, communityLabel: '68K' },
  { code: 'FIB(DD)', label: 'Reading Fill in the Blanks (Drag & Drop)', skill: 'Reading', communityCount: 71000, communityLabel: '71K' },
  { code: 'R:MCS', label: 'Reading Multiple Choice Single', skill: 'Reading', communityCount: 10000, communityLabel: '10K' },
  { code: 'SST', label: 'Summarize Spoken Text', skill: 'Listening', communityCount: 24000, communityLabel: '24K' },
  { code: 'L:MCM', label: 'Listening Multiple Choice Multiple', skill: 'Listening', communityCount: 12000, communityLabel: '12K' },
  { code: 'FIB', label: 'Listening Fill in the Blanks', skill: 'Listening', communityCount: 39000, communityLabel: '39K' },
  { code: 'HCS', label: 'Highlight Correct Summary', skill: 'Listening', communityCount: 8000, communityLabel: '8K' },
  { code: 'L:MCS', label: 'Listening Multiple Choice Single', skill: 'Listening', communityCount: 8000, communityLabel: '8K' },
  { code: 'SMW', label: 'Select Missing Word', skill: 'Listening', communityCount: 12000, communityLabel: '12K' },
  { code: 'HIW', label: 'Highlight Incorrect Words', skill: 'Listening', communityCount: 48000, communityLabel: '48K' },
  { code: 'WFD', label: 'Write From Dictation', skill: 'Listening', communityCount: 132000, communityLabel: '132K' },
];

const ACAD_30_DAY_DATES = [
  '27 Oct, 26', '28 Oct, 26', '29 Oct, 26', '30 Oct, 26', '31 Oct, 26',
  '01 Nov, 26', '02 Nov, 26', '03 Nov, 26', '04 Nov, 26', '05 Nov, 26',
  '06 Nov, 26', '07 Nov, 26', '08 Nov, 26', '09 Nov, 26', '10 Nov, 26',
  '11 Nov, 26', '12 Nov, 26', '13 Nov, 26', '14 Nov, 26', '15 Nov, 26',
  '16 Nov, 26', '17 Nov, 26', '18 Nov, 26', '19 Nov, 26', '20 Nov, 26',
  '21 Nov, 26',
];

const zeroArr = (len) => Array.from({ length: len }, () => 0);

const ACAD_60_DAY_DATES = [
  '26 Sep, 26', '03 Oct, 26', '10 Oct, 26', '17 Oct, 26', '24 Oct, 26',
  '30 Oct, 26', '07 Nov, 26', '14 Nov, 26', '21 Nov, 26', '25 Nov, 26',
];

const BASE_SKILL_STATS = {
  Speaking: { score: 0, attempted: 0, totalQuestions: 9016, timeFormatted: '00:00' },
  Writing: { score: 52, attempted: 1, totalQuestions: 911, timeFormatted: '47:34' },
  Reading: { score: 0, attempted: 0, totalQuestions: 3502, timeFormatted: '00:00' },
  Listening: { score: 0, attempted: 0, totalQuestions: 5997, timeFormatted: '00:00' },
};

export const ACADEMIC_ANALYTICS_DATA = {
  defaultTimeframe: 'Last 30 days',
  chartTasks: ACADEMIC_TASKS.slice(0, 18),
  communityTasks: ACADEMIC_TASKS,
  mockTests: [
    { name: 'Full Mock Test', done: 9, total: 194, to: '/v1/mock-test/mock-test-list' },
    { name: 'Sectional Mock Test', done: 29, total: 517, to: '/v1/mock-test/mock-test-list/sectional-mock-test' },
    { name: 'Timed Sectional Mock Test', done: 1, total: 80, to: '/v1/mock-test/mock-test-list/timed-section-mock-test/timed-section-mock-test-list' },
  ],
  timelineByTimeframe: {
    'Last 1 day': {
      rangeLabel: '24 Nov, 2026 to 25 Nov, 2026',
      dates: ['08:00 AM', '12:00 PM', '04:00 PM', '08:00 PM', '11:59 PM'],
      seriesBySkill: { Speaking: zeroArr(5), Writing: zeroArr(5), Reading: zeroArr(5), Listening: zeroArr(5) },
    },
    'Last 7 days': {
      rangeLabel: '18 Nov, 2026 to 25 Nov, 2026',
      dates: ['18 Nov, 26', '19 Nov, 26', '20 Nov, 26', '21 Nov, 26', '22 Nov, 26', '23 Nov, 26', '24 Nov, 26'],
      seriesBySkill: { Speaking: zeroArr(7), Writing: zeroArr(7), Reading: zeroArr(7), Listening: zeroArr(7) },
    },
    'Last 15 days': {
      rangeLabel: '10 Nov, 2026 to 25 Nov, 2026',
      dates: [
        '10 Nov, 26', '11 Nov, 26', '12 Nov, 26', '13 Nov, 26', '14 Nov, 26',
        '15 Nov, 26', '16 Nov, 26', '17 Nov, 26', '18 Nov, 26', '19 Nov, 26',
        '20 Nov, 26', '21 Nov, 26', '22 Nov, 26', '23 Nov, 26', '24 Nov, 26',
      ],
      seriesBySkill: { Speaking: zeroArr(15), Writing: zeroArr(15), Reading: zeroArr(15), Listening: zeroArr(15) },
    },
    'Last 30 days': {
      rangeLabel: '27 Oct, 2026 to 25 Nov, 2026',
      dates: ACAD_30_DAY_DATES,
      seriesBySkill: {
        Speaking: zeroArr(ACAD_30_DAY_DATES.length),
        Writing: ACAD_30_DAY_DATES.map((d) => (d === '30 Oct, 26' ? 52 : 0)),
        Reading: zeroArr(ACAD_30_DAY_DATES.length),
        Listening: zeroArr(ACAD_30_DAY_DATES.length),
      },
    },
    'Last 60 days': {
      rangeLabel: '26 Sep, 2026 to 25 Nov, 2026',
      dates: ACAD_60_DAY_DATES,
      seriesBySkill: {
        Speaking: zeroArr(ACAD_60_DAY_DATES.length),
        Writing: ACAD_60_DAY_DATES.map((d) => (d === '30 Oct, 26' ? 52 : 0)),
        Reading: zeroArr(ACAD_60_DAY_DATES.length),
        Listening: zeroArr(ACAD_60_DAY_DATES.length),
      },
    },
  },
  scoresByTimeframe: {
    'Last 30 days': { WE: 52 },
    'Last 60 days': { WE: 52 },
  },
  timesByTimeframe: {
    'Last 30 days': { WE: 2854 },
    'Last 60 days': { WE: 2854 },
  },
  skillStatsByTimeframe: {
    'Last 30 days': BASE_SKILL_STATS,
    'Last 60 days': BASE_SKILL_STATS,
  },
};
