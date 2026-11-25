export const QUESTION_FILTER_OPTIONS = ['All Questions', 'Prediction', 'New'];

export const TIMEFRAME_OPTIONS = [
  'Last 1 day',
  'Last 7 days',
  'Last 15 days',
  'Last 30 days',
  'Last 60 days',
];

export const SKILL_COLORS = {
  Speaking: '#eb8c44',
  Writing: '#5ba4f5',
  Reading: '#36c959',
  Listening: '#12487a',
};

export const ANALYTICS_MOCK_TESTS = [
  { name: 'Full Mock Test', done: 9, total: 194, to: '/mock-tests' },
  { name: 'Sectional Mock Test', done: 29, total: 517, to: '/pte-sectional-mock-test' },
  { name: 'Timed Sectional Mock Test', done: 1, total: 80, to: '/pte-full-mock-test' },
];

export const TASK_METRIC_ITEMS = [
  { code: 'RA', label: 'Read Aloud', skill: 'Speaking', score: 0, timeSec: 0, communityCount: 233000, communityLabel: '233K' },
  { code: 'RS', label: 'Repeat Sentence', skill: 'Speaking', score: 0, timeSec: 0, communityCount: 520000, communityLabel: '520K' },
  { code: 'DI', label: 'Describe Image', skill: 'Speaking', score: 0, timeSec: 0, communityCount: 121000, communityLabel: '121K' },
  { code: 'RL', label: 'Re-Tell Lecture', skill: 'Speaking', score: 0, timeSec: 0, communityCount: 32000, communityLabel: '32K' },
  { code: 'ASQ', label: 'Answer Short Question', skill: 'Speaking', score: 0, timeSec: 0, communityCount: 49000, communityLabel: '49K' },
  { code: 'SGD', label: 'Summarize Group Discussion', skill: 'Speaking', score: 0, timeSec: 0, communityCount: 14000, communityLabel: '14K' },
  { code: 'RTS', label: 'Respond to a Situation', skill: 'Speaking', score: 0, timeSec: 0, communityCount: 42000, communityLabel: '42K' },
  { code: 'SWT', label: 'Summarize Written Text', skill: 'Writing', score: 0, timeSec: 0, communityCount: 54000, communityLabel: '54K' },
  { code: 'WE', label: 'Write Essay', skill: 'Writing', score: 52, timeSec: 2854, communityCount: 19000, communityLabel: '19K' },
  { code: 'FIB(D)', label: 'R&W Fill in the Blanks', skill: 'Reading', score: 0, timeSec: 0, communityCount: 102000, communityLabel: '102K' },
  { code: 'R:MCM', label: 'Reading Multiple Choice Multiple', skill: 'Reading', score: 0, timeSec: 0, communityCount: 11000, communityLabel: '11K' },
  { code: 'RO', label: 'Re-order Paragraphs', skill: 'Reading', score: 0, timeSec: 0, communityCount: 68000, communityLabel: '68K' },
  { code: 'FIB(DD)', label: 'Reading Fill in the Blanks (Drag & Drop)', skill: 'Reading', score: 0, timeSec: 0, communityCount: 71000, communityLabel: '71K' },
  { code: 'R:MCS', label: 'Reading Multiple Choice Single', skill: 'Reading', score: 0, timeSec: 0, communityCount: 10000, communityLabel: '10K' },
  { code: 'SST', label: 'Summarize Spoken Text', skill: 'Listening', score: 0, timeSec: 0, communityCount: 24000, communityLabel: '24K' },
  { code: 'L:MCM', label: 'Listening Multiple Choice Multiple', skill: 'Listening', score: 0, timeSec: 0, communityCount: 12000, communityLabel: '12K' },
  { code: 'FIB', label: 'Listening Fill in the Blanks', skill: 'Listening', score: 0, timeSec: 0, communityCount: 39000, communityLabel: '39K' },
  { code: 'HCS', label: 'Highlight Correct Summary', skill: 'Listening', score: 0, timeSec: 0, communityCount: 8000, communityLabel: '8K' },
  { code: 'L:MCS', label: 'Listening Multiple Choice Single', skill: 'Listening', score: 0, timeSec: 0, communityCount: 8000, communityLabel: '8K' },
  { code: 'SMW', label: 'Select Missing Word', skill: 'Listening', score: 0, timeSec: 0, communityCount: 12000, communityLabel: '12K' },
  { code: 'HIW', label: 'Highlight Incorrect Words', skill: 'Listening', score: 0, timeSec: 0, communityCount: 48000, communityLabel: '48K' },
  { code: 'WFD', label: 'Write From Dictation', skill: 'Listening', score: 0, timeSec: 0, communityCount: 132000, communityLabel: '132K' },
];

export const SKILL_SIDE_STATS = {
  Speaking: { score: 0, attempted: 0, totalQuestions: 9016, timeFormatted: '00:00' },
  Writing: { score: 52, attempted: 1, totalQuestions: 911, timeFormatted: '47:34' },
  Reading: { score: 0, attempted: 0, totalQuestions: 3502, timeFormatted: '00:00' },
  Listening: { score: 0, attempted: 0, totalQuestions: 5997, timeFormatted: '00:00' },
};

export const PROGRESS_TIMELINE_SERIES = {
  'Last 1 day': {
    rangeLabel: '24 Nov, 2026 to 25 Nov, 2026',
    points: [
      { date: '08:00 AM', value: 0 },
      { date: '12:00 PM', value: 0 },
      { date: '04:00 PM', value: 0 },
      { date: '08:00 PM', value: 0 },
      { date: '11:59 PM', value: 0 },
    ],
  },
  'Last 7 days': {
    rangeLabel: '18 Nov, 2026 to 25 Nov, 2026',
    points: [
      { date: '18 Nov, 26', value: 0 },
      { date: '19 Nov, 26', value: 0 },
      { date: '20 Nov, 26', value: 0 },
      { date: '21 Nov, 26', value: 0 },
      { date: '22 Nov, 26', value: 0 },
      { date: '23 Nov, 26', value: 0 },
      { date: '24 Nov, 26', value: 0 },
    ],
  },
  'Last 15 days': {
    rangeLabel: '10 Nov, 2026 to 25 Nov, 2026',
    points: [
      '10 Nov, 26', '11 Nov, 26', '12 Nov, 26', '13 Nov, 26', '14 Nov, 26',
      '15 Nov, 26', '16 Nov, 26', '17 Nov, 26', '18 Nov, 26', '19 Nov, 26',
      '20 Nov, 26', '21 Nov, 26', '22 Nov, 26', '23 Nov, 26', '24 Nov, 26',
    ].map((date) => ({ date, value: 0 })),
  },
  'Last 30 days': {
    rangeLabel: '27 Oct, 2026 to 25 Nov, 2026',
    points: [
      '27 Oct, 26', '28 Oct, 26', '29 Oct, 26', '30 Oct, 26', '31 Oct, 26',
      '01 Nov, 26', '02 Nov, 26', '03 Nov, 26', '04 Nov, 26', '05 Nov, 26',
      '06 Nov, 26', '07 Nov, 26', '08 Nov, 26', '09 Nov, 26', '10 Nov, 26',
      '11 Nov, 26', '12 Nov, 26', '13 Nov, 26', '14 Nov, 26', '15 Nov, 26',
      '16 Nov, 26', '17 Nov, 26', '18 Nov, 26', '19 Nov, 26', '20 Nov, 26',
      '21 Nov, 26',
    ].map((date) => ({ date, value: date === '30 Oct, 26' ? 52 : 0 })),
  },
  'Last 60 days': {
    rangeLabel: '26 Sep, 2026 to 25 Nov, 2026',
    points: [
      '26 Sep, 26', '03 Oct, 26', '10 Oct, 26', '17 Oct, 26', '24 Oct, 26',
      '30 Oct, 26', '07 Nov, 26', '14 Nov, 26', '21 Nov, 26', '25 Nov, 26',
    ].map((date) => ({ date, value: date === '30 Oct, 26' ? 52 : 0 })),
  },
};

export const formatMinutesSeconds = (totalSeconds) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};
