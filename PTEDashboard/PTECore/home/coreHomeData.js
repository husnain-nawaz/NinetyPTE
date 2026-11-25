import {
  SHARED_CALENDAR_WEEKS,
  SHARED_SKILL_TAB_META,
  SHARED_TODAYS_SKILLS,
  SHARED_VIDEO_GUIDES,
} from '../../shared/home/sharedHomeDefaults';

export const CORE_HOME_DATA = {
  lastUpdatedLabel: 'Nov 25, 2026',
  todayTargetGoal: '0/69',
  defaultTarget: { range: '69 - 87', tier: 'CLB 8' },
  targetPresets: [
    { range: '51 - 58', tier: 'CLB 6' },
    { range: '59 - 68', tier: 'CLB 7' },
    { range: '69 - 87', tier: 'CLB 8' },
    { range: '78 - 88', tier: 'CLB 9' },
    { range: '88 - 90', tier: 'CLB 10' },
  ],
  todaysSkills: SHARED_TODAYS_SKILLS,
  skillTabMeta: SHARED_SKILL_TAB_META,
  videoGuides: SHARED_VIDEO_GUIDES,
  calendarWeeks: SHARED_CALENDAR_WEEKS,
  topSummaryStats: [
    { key: 'predictions', label: 'Prediction Questions', count: '1,477', pct: 34, targetTab: 'Speaking' },
    { key: 'speaking', label: 'Speaking Questions', count: '8,239', pct: 14, targetTab: 'Speaking' },
    { key: 'writing', label: 'Writing Questions', count: '611', pct: 0, targetTab: 'Writing' },
    { key: 'reading', label: 'Reading Questions', count: '3,333', pct: 6, targetTab: 'Reading' },
    { key: 'listening', label: 'Listening Questions', count: '5,418', pct: 12, targetTab: 'Listening' },
  ],
  practiceTasks: {
    Speaking: [
      { name: 'Read Aloud', done: 67, total: 1552, to: '/v1/core/practice/speaking/read-aloud' },
      { name: 'Respond to a Situation', done: 97, total: 360, to: '/v1/core/practice/speaking/respond-to-a-situation' },
      { name: 'Repeat Sentence', done: 769, total: 3174, to: '/v1/core/practice/speaking/repeat-sentence' },
      { name: 'Answer Short Question', done: 57, total: 1946, to: '/v1/core/practice/speaking/answer-short-question' },
      { name: 'Describe Image', done: 175, total: 1207, to: '/v1/core/practice/speaking/describe-image' },
    ],
    Writing: [
      { name: 'Summarize Written Text', done: 0, total: 434, to: '/v1/core/practice/writing/summarize-written-text' },
      { name: 'Write Email', done: 0, total: 177, to: '/v1/core/practice/writing/write-email' },
    ],
    Reading: [
      { name: 'Reading & Writing Blanks', done: 68, total: 996, to: '/v1/core/practice/reading/reading-writing-fill-in-the-blanks' },
      { name: 'Multiple Choice, Multiple Answers', done: 24, total: 188, to: '/v1/core/practice/reading/multiple-choice-multiple' },
      { name: 'Re-order Paragraphs', done: 42, total: 819, to: '/v1/core/practice/reading/reorder-paragraphs' },
      { name: 'Reading: Fill in the Blanks', done: 52, total: 1067, to: '/v1/core/practice/reading/fill-in-the-blanks' },
      { name: 'Multiple Choice, Single Answer', done: 19, total: 263, to: '/v1/core/practice/reading/multiple-choice-single' },
    ],
    Listening: [
      { name: 'Summarize Spoken Text', done: 41, total: 233, to: '/v1/core/practice/listening/summarize-spoken-text' },
      { name: 'Multiple Choice, Multiple Answers', done: 28, total: 193, to: '/v1/core/practice/listening/multiple-choice-multiple' },
      { name: 'Fill in the Blanks', done: 98, total: 421, to: '/v1/core/practice/listening/fill-in-the-blanks' },
      { name: 'Multiple Choice, Single Answer', done: 24, total: 204, to: '/v1/core/practice/listening/multiple-choice-single' },
      { name: 'Select Missing Word', done: 39, total: 450, to: '/v1/core/practice/listening/select-missing-word' },
      { name: 'Highlight Incorrect Words', done: 94, total: 888, to: '/v1/core/practice/listening/highlight-incorrect-words' },
      { name: 'Write From Dictation', done: 326, total: 1580, to: '/v1/core/practice/listening/write-from-dictation' },
    ],
  },
  mockTestCards: [
    { name: 'Full Mock Test', done: 0, total: 148, to: '/pte-core-mock-test' },
    { name: 'Sectional Mock Test', done: 0, total: 473, to: '/pte-core-mock-test' },
    { name: 'Timed Mock Test', done: 0, total: 80, to: '/pte-core-mock-test' },
  ],
  quickToolTiles: [
    { key: 'predictions', label: 'Predictions', to: '/v1/prediction' },
    { key: 'strategy', label: 'Strategy Videos', to: '/v1/core/youtube-videos' },
    { key: 'vocab', label: 'Vocab Bank', to: '/v1/vocab-bank' },
    { key: 'feedback', label: 'Score Feedback', to: '/pte-core-score-calculator' },
    { key: 'compatibility', label: 'Compatibility', to: '/on-test-day' },
    { key: 'full-mock', label: 'Full Mock Test', to: '/pte-core-mock-test' },
    { key: 'sectional-mock', label: 'Sectional Mock Test', to: '/pte-core-mock-test' },
    { key: 'timed-mock', label: 'Timed Mock Test', to: '/pte-core-mock-test' },
  ],
  todaysTasksBySkill: {
    Speaking: [
      { label: 'Repeat Sentence', done: 0, total: 40 },
      { label: 'Describe Image', done: 0, total: 5 },
    ],
    Writing: [
      { label: 'Summarize Written Text', done: 0, total: 2 },
      { label: 'Write Email', done: 0, total: 2 },
    ],
    Reading: [
      { label: 'R&W Fill in the Blanks', done: 0, total: 10 },
      { label: 'Re-order Paragraphs', done: 0, total: 5 },
    ],
    Listening: [
      { label: 'Write From Dictation', done: 0, total: 25 },
      { label: 'Fill in the Blanks', done: 0, total: 8 },
    ],
  },
  guideTabs: [
    'About PTE Core',
    'Speaking Guide',
    'Writing Guide',
    'Reading Guide',
    'Listening Guide',
    'Score Guide',
  ],
  guideFaqs: {
    'About PTE Core': [
      {
        q: 'What is PTE Core ?',
        a: 'PTE Core is a computer-based general English language proficiency test approved by Immigration, Refugees and Citizenship Canada (IRCC) for Canadian permanent residency and citizenship applications.',
      },
      {
        q: 'Why is the purpose of PTE Core ?',
        a: 'It measures practical everyday and workplace communication across Speaking, Writing, Reading, and Listening so immigration candidates can prove English fluency fairly in one 2-hour sitting.',
      },
      {
        q: 'What is the Test Format ?',
        a: 'PTE Core has three timed parts completed inside ~2 hours: Speaking & Writing (including Respond to a Situation, Summarize Written Text, and Write Email), Reading, and Listening.',
      },
      {
        q: 'How to prepare for PTE Core ?',
        a: 'Focus on Core-specific tasks like Write Email (50–120 words), Respond to a Situation, Repeat Sentence, and Write From Dictation using timed NinetyPTE mock tests and instant AI scoring.',
      },
      {
        q: 'How to book the test?',
        a: 'Log in to your Pearson account with exact valid passport details, select PTE Core at an authorized test centre near you, choose a date, and apply a verified NinetyPTE exam voucher.',
      },
    ],
    'Speaking Guide': [
      {
        q: 'What is Respond to a Situation in PTE Core?',
        a: 'You hear and read an everyday or workplace scenario, then have 40 seconds to respond politely, naturally, and directly to the situation.',
      },
    ],
    'Writing Guide': [
      {
        q: 'What are the word count rules for PTE Core Write Email and SWT?',
        a: 'Write Email must be 50–120 words covering all 3 scenario points with proper opening/closing. Summarize Written Text must be one single sentence between 25 and 50 words.',
      },
    ],
    'Reading Guide': [
      {
        q: 'Which Reading tasks boost PTE Core CLB bands fastest?',
        a: 'Reading & Writing Fill in the Blanks and Reading Fill in the Blanks drive the highest Reading weightage and also support Writing scores.',
      },
    ],
    'Listening Guide': [
      {
        q: 'How is PTE Core Listening different from PTE Academic?',
        a: 'PTE Core uses shorter everyday conversations and omits Highlight Correct Summary, while keeping high-impact Write From Dictation and Listening Fill in the Blanks.',
      },
    ],
    'Score Guide': [
      {
        q: 'How do PTE Core scores map to CLB levels?',
        a: 'IRCC converts each skill score (10–90) to CLB 4 through CLB 10+. For example, CLB 8 corresponds roughly to 69–87 across skills; verify exact tables in our PTE Core Score Calculator.',
      },
    ],
  },
};
