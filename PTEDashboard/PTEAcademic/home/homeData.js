export const TOP_SUMMARY_STATS = [
  { key: 'predictions', label: 'Prediction Questions', count: '1,606', pct: 56, targetTab: 'Speaking' },
  { key: 'speaking', label: 'Speaking Questions', count: '9,016', pct: 14, targetTab: 'Speaking' },
  { key: 'writing', label: 'Writing Questions', count: '911', pct: 12, targetTab: 'Writing' },
  { key: 'reading', label: 'Reading Questions', count: '3,502', pct: 10, targetTab: 'Reading' },
  { key: 'listening', label: 'Listening Questions', count: '5,997', pct: 12, targetTab: 'Listening' },
];

export const TODAYS_SKILLS = [
  {
    key: 'Speaking',
    bg: 'bg-[#fdf5ef]',
    border: 'border-[#f3dac8]',
    iconColor: 'text-[#d97736]',
    time: '00:00',
    practiced: 0,
    avgScore: '0/90',
  },
  {
    key: 'Writing',
    bg: 'bg-[#eff6fc]',
    border: 'border-[#cee2f3]',
    iconColor: 'text-[#4f8df9]',
    time: '00:00',
    practiced: 0,
    avgScore: '0/90',
  },
  {
    key: 'Reading',
    bg: 'bg-[#eef8f1]',
    border: 'border-[#cbe9d3]',
    iconColor: 'text-[#3da854]',
    time: '00:00',
    practiced: 0,
    avgScore: '0/90',
  },
  {
    key: 'Listening',
    bg: 'bg-[#f0f5fb]',
    border: 'border-[#cdddf0]',
    iconColor: 'text-[#395591]',
    time: '00:00',
    practiced: 0,
    avgScore: '0/90',
  },
];

export const SKILL_TAB_META = {
  Speaking: {
    badgeBg: 'bg-[#d97736]',
    barColor: 'bg-[#d97736]',
    underlineColor: 'border-[#d97736]',
  },
  Writing: {
    badgeBg: 'bg-[#3b82f6]',
    barColor: 'bg-[#3b82f6]',
    underlineColor: 'border-[#3b82f6]',
  },
  Reading: {
    badgeBg: 'bg-[#22c55e]',
    barColor: 'bg-[#22c55e]',
    underlineColor: 'border-[#22c55e]',
  },
  Listening: {
    badgeBg: 'bg-[#0284c7]',
    barColor: 'bg-[#0284c7]',
    underlineColor: 'border-[#0284c7]',
  },
};

export const PRACTICE_TASKS_ACADEMIC = {
  Speaking: [
    { name: 'Read Aloud', done: 67, total: 1552, to: '/pte-speaking-practice' },
    { name: 'Answer Short Question', done: 57, total: 1946, to: '/pte-speaking-practice' },
    { name: 'Repeat Sentence', done: 769, total: 3174, to: '/pte-speaking-practice' },
    { name: 'Summarize Group Discussion', done: 18, total: 199, to: '/pte-speaking-practice' },
    { name: 'Describe Image', done: 175, total: 1207, to: '/pte-speaking-practice' },
    { name: 'Respond to a Situation', done: 97, total: 360, to: '/pte-speaking-practice' },
    { name: 'Re-Tell Lecture', done: 116, total: 578, to: '/pte-speaking-practice' },
  ],
  Writing: [
    { name: 'Summarize Written Text', done: 42, total: 390, to: '/pte-writing-practice' },
    { name: 'Write Essay', done: 28, total: 521, to: '/pte-writing-practice' },
  ],
  Reading: [
    { name: 'Reading & Writing: Fill in the Blanks', done: 114, total: 980, to: '/pte-reading-practice' },
    { name: 'Multiple Choice, Multiple Answers', done: 39, total: 420, to: '/pte-reading-practice' },
    { name: 'Re-order Paragraphs', done: 68, total: 645, to: '/pte-reading-practice' },
    { name: 'Reading: Fill in the Blanks', done: 92, total: 967, to: '/pte-reading-practice' },
    { name: 'Multiple Choice, Single Answer', done: 35, total: 490, to: '/pte-reading-practice' },
  ],
  Listening: [
    { name: 'Summarize Spoken Text', done: 44, total: 612, to: '/pte-listening-practice' },
    { name: 'Multiple Choice, Multiple Answers', done: 29, total: 480, to: '/pte-listening-practice' },
    { name: 'Fill in the Blanks', done: 103, total: 1120, to: '/pte-listening-practice' },
    { name: 'Highlight Correct Summary', done: 31, total: 410, to: '/pte-listening-practice' },
    { name: 'Multiple Choice, Single Answer', done: 26, total: 395, to: '/pte-listening-practice' },
    { name: 'Select Missing Word', done: 41, total: 460, to: '/pte-listening-practice' },
    { name: 'Highlight Incorrect Words', done: 98, total: 890, to: '/pte-listening-practice' },
    { name: 'Write From Dictation', done: 348, total: 1630, to: '/pte-listening-practice' },
  ],
};

export const MOCK_TEST_CARDS = [
  { name: 'Full Mock Test', done: 9, total: 194, to: '/mock-tests' },
  { name: 'Sectional Mock Test', done: 29, total: 517, to: '/pte-sectional-mock-test' },
  { name: 'Timed Mock Test', done: 1, total: 80, to: '/pte-full-mock-test' },
];

export const QUICK_TOOL_TILES = [
  { key: 'predictions', label: 'Predictions', to: '/v1/prediction' },
  { key: 'strategy', label: 'Strategy Videos', to: '/v1/youtube-videos/1' },
  { key: 'vocab', label: 'Vocab Bank', to: '/v1/vocab-bank' },
  { key: 'feedback', label: 'Score Feedback', to: '/pte-score-calculator' },
  { key: 'compatibility', label: 'Compatibility', to: '/on-test-day' },
  { key: 'full-mock', label: 'Full Mock Test', to: '/mock-tests' },
  { key: 'sectional-mock', label: 'Sectional Mock Test', to: '/pte-sectional-mock-test' },
  { key: 'timed-mock', label: 'Timed Mock Test', to: '/pte-full-mock-test' },
];

export const VIDEO_GUIDES = [
  {
    id: 'ai-vs-human',
    tagTop: 'PTE AI SCORE',
    tagHighlight: 'VS HUMAN SCORE',
    bg: 'from-slate-900 via-[#0e2d47] to-[#1e1b4b]',
    badgeBg: 'bg-red-600',
    title: 'PTE AI Score vs Human Score: How Accurate Is the Scoring?',
    timeAgo: 'a month ago',
    duration: '11:24',
    summary:
      'Detailed side-by-side breakdown of automated speech and writing trait rubrics versus human benchmark grading.',
  },
  {
    id: 'swt-stuck-70',
    tagTop: 'WHY YOUR',
    tagHighlight: 'PTE SWT SCORE WON’T IMPROVE',
    bg: 'from-[#1a1033] via-[#2c1654] to-[#0f172a]',
    badgeBg: 'bg-sky-500',
    title: 'Practising PTE SWT Every Day? Why Is Your Score Still Stuck in the 70s?',
    timeAgo: 'a month ago',
    duration: '09:18',
    summary:
      'Learn how compound-sentence clause joining, comma placement, and key noun retention unlock full form and grammar credit.',
  },
  {
    id: '100-speaking-mistakes',
    tagTop: 'I ANALYSED 100',
    tagHighlight: 'SPEAKING MISTAKES',
    bg: 'from-slate-950 via-slate-900 to-[#3f1414]',
    badgeBg: 'bg-amber-500',
    title: 'I Analysed 100 PTE Speaking Responses: 7 Mistakes You Must Avoid!',
    timeAgo: 'a month ago',
    duration: '14:02',
    summary:
      'Real recordings diagnosis covering hesitation pauses, mic breathing distortion, and rushed word clipping.',
  },
  {
    id: 'respond-situation',
    tagTop: 'RESPOND TO',
    tagHighlight: 'A SITUATION',
    bg: 'from-[#06283d] via-[#133b5c] to-[#0c1b2a]',
    badgeBg: 'bg-cyan-500',
    title: 'PTE Respond to a Situation: Practice Questions + Model Answers',
    timeAgo: '2 months ago',
    duration: '12:45',
    summary:
      'Practical workplace and campus scenario templates with polite register adaptation for 90/90 Speaking.',
  },
  {
    id: 'latest-pte-result',
    tagTop: 'LATEST',
    tagHighlight: 'PTE EXAM RESULT!',
    bg: 'from-[#1f0d2b] via-[#361047] to-[#0f172a]',
    badgeBg: 'bg-rose-600',
    title: 'Took the Latest PTE Exam | Full Result & Expert Analysis',
    timeAgo: '2 months ago',
    duration: '16:10',
    summary:
      'First-hand scorecard review inspecting speaking fluency feedback, reading FIB weightage, and test-day timing.',
  },
  {
    id: 'academic-core-real-talk',
    tagTop: 'PTE ACADEMIC',
    tagHighlight: '& CORE REAL TALK',
    bg: 'from-[#0d2238] via-[#173654] to-[#2e1a12]',
    badgeBg: 'bg-orange-500',
    title: 'PTE Academic & Core Exam Experience | What to Expect (Real Talk)',
    timeAgo: '2 months ago',
    duration: '13:35',
    summary:
      'Walkthrough of check-in verification, headset calibration, background test-room noise, and section pacing.',
  },
];

export const PTE_GUIDE_TABS = [
  'About PTE',
  'Speaking Guide',
  'Writing Guide',
  'Reading Guide',
  'Listening Guide',
  'Score Guide',
];

export const PTE_GUIDE_FAQS = {
  'About PTE': [
    {
      q: 'What is PTE Academic ?',
      a: 'PTE Academic is a two-hour computer-based English proficiency exam trusted by over 3,500 universities and global immigration authorities including Australia, UK, Canada, and New Zealand.',
    },
    {
      q: 'Why are more test takers choosing PTE Academic ?',
      a: 'Candidates prefer PTE Academic for its single-sitting format (~2 hours), unbiased automated scoring, flexible year-round test dates, and rapid scorecards typically delivered within 48 hours.',
    },
    {
      q: 'What is the Test Format ?',
      a: 'The exam evaluates four core communicative skills across three timed parts: Part 1 Speaking & Writing (54–67 min), Part 2 Reading (29–30 min), and Part 3 Listening (30–43 min).',
    },
    {
      q: 'How to prepare for PTE Academic ?',
      a: 'Start with a baseline diagnostic mock test on NinetyPTE, target high-weightage tasks (Read Aloud, Repeat Sentence, R&W Fill in the Blanks, Write From Dictation), and review detailed AI feedback regularly.',
    },
    {
      q: 'How to book the test?',
      a: 'Sign in to your official myPTE portal with passport-matching details, select PTE Academic or UKVI, pick a nearby centre date, and apply any verified voucher at checkout.',
    },
  ],
  'Speaking Guide': [
    {
      q: 'How can I score 90 in PTE Speaking?',
      a: 'Prioritise smooth Oral Fluency without unnatural pauses or self-corrections, keep your headset microphone positioned slightly below your mouth, and maintain steady natural pacing around 140 words per minute.',
    },
    {
      q: 'Does accent affect PTE Speaking score?',
      a: 'Automated scoring models are calibrated across dozens of global accents. Clear consonant and vowel articulation counts far more than imitating any specific native accent.',
    },
  ],
  'Writing Guide': [
    {
      q: 'How strict is word count in Summarize Written Text and Write Essay?',
      a: 'Stay strictly within 5–75 words in one single complete sentence for Summarize Written Text, and 200–300 words for Write Essay.',
    },
  ],
  'Reading Guide': [
    {
      q: 'Which Reading tasks carry the highest score impact?',
      a: 'Reading & Writing Fill in the Blanks and Reading Fill in the Blanks drive the majority of your Reading band and also contribute directly to Writing.',
    },
  ],
  'Listening Guide': [
    {
      q: 'How should I manage time in the Listening section?',
      a: 'Move swiftly through Multiple-Choice questions so you always leave at least 4–6 minutes for Highlight Incorrect Words and Write From Dictation at the end.',
    },
  ],
  'Score Guide': [
    {
      q: 'How does the 10–90 PTE scale map to IELTS or CLB?',
      a: 'PTE 65 roughly corresponds to IELTS 7.0 overall, while PTE 79 aligns with IELTS 8.0. Use the NinetyPTE Score Calculator for exact equivalencies.',
    },
  ],
};

export const CALENDAR_WEEKS = [
  { num: 22, status: 'none' },
  { num: 23, status: 'pending' },
  { num: 24, status: 'none' },
  { num: 25, status: 'pending' },
  { num: 26, status: 'none' },
  { num: 27, status: 'none' },
  { num: 28, status: 'none' },
  { num: 29, status: 'none' },
  { num: 30, status: 'none' },
  { num: 1, status: 'none' },
  { num: 2, status: 'none' },
  { num: 3, status: 'none' },
  { num: 4, status: 'none' },
  { num: 5, status: 'none' },
];

export const TODAYS_TASKS_BY_SKILL = {
  Speaking: [
    { label: 'Repeat Sentence', done: 0, total: 50 },
    { label: 'Describe Image', done: 0, total: 5 },
  ],
  Writing: [
    { label: 'Summarize Written Text', done: 0, total: 3 },
    { label: 'Write Essay', done: 0, total: 2 },
  ],
  Reading: [
    { label: 'R&W Fill in the Blanks', done: 0, total: 10 },
    { label: 'Re-order Paragraphs', done: 0, total: 5 },
  ],
  Listening: [
    { label: 'Write From Dictation', done: 0, total: 25 },
    { label: 'Fill in the Blanks', done: 0, total: 8 },
  ],
};

export const TARGET_PRESETS = [
  { range: '50 - 58', tier: 'Competent' },
  { range: '65 - 78', tier: 'Proficient' },
  { range: '69 - 88', tier: 'Superior' },
  { range: '79 - 90', tier: 'Expert' },
];
