const CORE_TASKS = [
  { code: 'RA', label: 'Read Aloud', skill: 'Speaking', communityCount: 233000, communityLabel: '233K' },
  { code: 'RS', label: 'Repeat Sentence', skill: 'Speaking', communityCount: 520000, communityLabel: '520K' },
  { code: 'DI', label: 'Describe Image', skill: 'Speaking', communityCount: 121000, communityLabel: '121K' },
  { code: 'ASQ', label: 'Answer Short Question', skill: 'Speaking', communityCount: 49000, communityLabel: '49K' },
  { code: 'RTS', label: 'Respond to a Situation', skill: 'Speaking', communityCount: 42000, communityLabel: '42K' },
  { code: 'PC:SWT', label: 'Core Summarize Written Text', skill: 'Writing', communityCount: 14000, communityLabel: '14K' },
  { code: 'PC:WEM', label: 'Core Write Email', skill: 'Writing', communityCount: 16000, communityLabel: '16K' },
  { code: 'PC:FIB(D)', label: 'Core Fill in the Blanks (Dropdown)', skill: 'Reading', communityCount: 22000, communityLabel: '22K' },
  { code: 'R:MCM', label: 'Reading Multiple Choice Multiple', skill: 'Reading', communityCount: 11000, communityLabel: '11K' },
  { code: 'RO', label: 'Re-order Paragraphs', skill: 'Reading', communityCount: 68000, communityLabel: '68K' },
  { code: 'FIB(DD)', label: 'Reading Fill in the Blanks (Drag & Drop)', skill: 'Reading', communityCount: 71000, communityLabel: '71K' },
  { code: 'R:MCS', label: 'Reading Multiple Choice Single', skill: 'Reading', communityCount: 10000, communityLabel: '10K' },
  { code: 'PC:SST', label: 'Core Summarize Spoken Text', skill: 'Listening', communityCount: 13000, communityLabel: '13K' },
  { code: 'L:MCM', label: 'Listening Multiple Choice Multiple', skill: 'Listening', communityCount: 12000, communityLabel: '12K' },
  { code: 'FIB', label: 'Listening Fill in the Blanks', skill: 'Listening', communityCount: 39000, communityLabel: '39K' },
  { code: 'L:MCS', label: 'Listening Multiple Choice Single', skill: 'Listening', communityCount: 8000, communityLabel: '8K' },
  { code: 'SMW', label: 'Select Missing Word', skill: 'Listening', communityCount: 12000, communityLabel: '12K' },
  { code: 'HIW', label: 'Highlight Incorrect Words', skill: 'Listening', communityCount: 48000, communityLabel: '48K' },
  { code: 'WFD', label: 'Write From Dictation', skill: 'Listening', communityCount: 132000, communityLabel: '132K' },
];

const CORE_60_DAY_DATES = [
  '27 Sep, 26', '28 Sep, 26', '29 Sep, 26', '30 Sep, 26', '01 Oct, 26',
  '02 Oct, 26', '03 Oct, 26', '04 Oct, 26', '05 Oct, 26', '06 Oct, 26',
  '07 Oct, 26', '08 Oct, 26', '09 Oct, 26', '10 Oct, 26', '11 Oct, 26',
  '12 Oct, 26', '13 Oct, 26', '14 Oct, 26', '15 Oct, 26', '16 Oct, 26',
  '17 Oct, 26', '18 Oct, 26', '19 Oct, 26', '20 Oct, 26', '21 Oct, 26',
  '22 Oct, 26', '23 Oct, 26', '24 Oct, 26', '25 Oct, 26',
];

const CORE_30_DAY_DATES = [
  '27 Oct, 26', '28 Oct, 26', '29 Oct, 26', '30 Oct, 26', '31 Oct, 26',
  '01 Nov, 26', '02 Nov, 26', '03 Nov, 26', '04 Nov, 26', '05 Nov, 26',
  '06 Nov, 26', '07 Nov, 26', '08 Nov, 26', '09 Nov, 26', '10 Nov, 26',
  '11 Nov, 26', '12 Nov, 26', '13 Nov, 26', '14 Nov, 26', '15 Nov, 26',
  '16 Nov, 26', '17 Nov, 26', '18 Nov, 26', '19 Nov, 26', '20 Nov, 26',
  '21 Nov, 26', '22 Nov, 26', '23 Nov, 26', '24 Nov, 26',
];

const zeroArr = (len) => Array.from({ length: len }, () => 0);

const makeZeroSeries = (len) => ({
  Speaking: zeroArr(len),
  Writing: zeroArr(len),
  Reading: zeroArr(len),
  Listening: zeroArr(len),
});

export const CORE_ANALYTICS_DATA = {
  defaultTimeframe: 'Last 30 days',
  chartTasks: CORE_TASKS,
  communityTasks: CORE_TASKS,
  mockTests: [
    { name: 'Full Mock Test', done: 0, total: 148, to: '/v1/core/mock-test/mock-test-list' },
    { name: 'Sectional Mock Test', done: 0, total: 473, to: '/v1/core/mock-test/mock-test-list/sectional-mock-test' },
    { name: 'Timed Sectional Mock Test', done: 0, total: 80, to: '/v1/core/mock-test/mock-test-list/timed-section-mock-test/timed-section-mock-test-list' },
  ],
  timelineByTimeframe: {
    'Last 1 day': {
      rangeLabel: '24 Nov, 2026 to 25 Nov, 2026',
      dates: ['08:00 AM', '12:00 PM', '04:00 PM', '08:00 PM', '11:59 PM'],
      seriesBySkill: makeZeroSeries(5),
    },
    'Last 7 days': {
      rangeLabel: '18 Nov, 2026 to 25 Nov, 2026',
      dates: ['18 Nov, 26', '19 Nov, 26', '20 Nov, 26', '21 Nov, 26', '22 Nov, 26', '23 Nov, 26', '24 Nov, 26'],
      seriesBySkill: makeZeroSeries(7),
    },
    'Last 15 days': {
      rangeLabel: '10 Nov, 2026 to 25 Nov, 2026',
      dates: [
        '10 Nov, 26', '11 Nov, 26', '12 Nov, 26', '13 Nov, 26', '14 Nov, 26',
        '15 Nov, 26', '16 Nov, 26', '17 Nov, 26', '18 Nov, 26', '19 Nov, 26',
        '20 Nov, 26', '21 Nov, 26', '22 Nov, 26', '23 Nov, 26', '24 Nov, 26',
      ],
      seriesBySkill: makeZeroSeries(15),
    },
    'Last 30 days': {
      rangeLabel: '27 Oct, 2026 to 25 Nov, 2026',
      dates: CORE_30_DAY_DATES,
      seriesBySkill: makeZeroSeries(CORE_30_DAY_DATES.length),
    },
    'Last 60 days': {
      rangeLabel: '27 Sep, 2026 to 25 Nov, 2026',
      dates: CORE_60_DAY_DATES,
      seriesBySkill: {
        Speaking: CORE_60_DAY_DATES.map((d) =>
          d === '30 Sep, 26' ? 64 : d === '18 Oct, 26' ? 55 : d === '19 Oct, 26' ? 59 : 0
        ),
        Writing: CORE_60_DAY_DATES.map((d) =>
          d === '30 Sep, 26' ? 90 : d === '19 Oct, 26' ? 90 : 0
        ),
        Reading: CORE_60_DAY_DATES.map((d) =>
          d === '30 Sep, 26' ? 27 : d === '18 Oct, 26' ? 59 : d === '19 Oct, 26' ? 90 : 0
        ),
        Listening: CORE_60_DAY_DATES.map((d) =>
          d === '30 Sep, 26' ? 62 : d === '18 Oct, 26' ? 63 : d === '19 Oct, 26' ? 61 : 0
        ),
      },
    },
  },
  scoresByTimeframe: {
    'Last 30 days': {},
    'Last 60 days': {
      RS: 53,
      DI: 60,
      RTS: 74,
      RO: 53,
      'FIB(DD)': 56,
      HIW: 90,
      WFD: 90,
    },
  },
  timesByTimeframe: {
    'Last 30 days': {},
    'Last 60 days': {
      RS: 380,
      DI: 245,
      RTS: 310,
      RO: 290,
      'FIB(DD)': 330,
      HIW: 195,
      WFD: 420,
    },
  },
  skillStatsByTimeframe: {
    'Last 30 days': {
      Speaking: { score: 0, attempted: 0, totalQuestions: 8239, timeFormatted: '00:00' },
      Writing: { score: 0, attempted: 0, totalQuestions: 611, timeFormatted: '00:00' },
      Reading: { score: 0, attempted: 0, totalQuestions: 3333, timeFormatted: '00:00' },
      Listening: { score: 0, attempted: 0, totalQuestions: 5418, timeFormatted: '00:00' },
    },
    'Last 60 days': {
      Speaking: { score: 59, attempted: 61, totalQuestions: 8239, timeFormatted: '15:35' },
      Writing: { score: 90, attempted: 18, totalQuestions: 611, timeFormatted: '12:40' },
      Reading: { score: 55, attempted: 14, totalQuestions: 3333, timeFormatted: '10:20' },
      Listening: { score: 78, attempted: 18, totalQuestions: 5418, timeFormatted: '10:15' },
    },
  },
};
