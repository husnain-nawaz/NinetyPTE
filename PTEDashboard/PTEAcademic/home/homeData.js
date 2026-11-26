import {
  SHARED_CALENDAR_WEEKS,
  SHARED_SKILL_TAB_META,
  SHARED_TODAYS_SKILLS,
  SHARED_VIDEO_GUIDES,
} from '../../shared/home/sharedHomeDefaults';

export const ACADEMIC_HOME_DATA = {
  lastUpdatedLabel: 'Nov 21, 2026',
  todayTargetGoal: '0/97',
  defaultTarget: { range: '69 - 88', tier: 'Superior' },
  targetPresets: [
    { range: '50 - 58', tier: 'Competent' },
    { range: '65 - 78', tier: 'Proficient' },
    { range: '69 - 88', tier: 'Superior' },
    { range: '79 - 90', tier: 'Expert' },
  ],
  todaysSkills: SHARED_TODAYS_SKILLS,
  skillTabMeta: SHARED_SKILL_TAB_META,
  videoGuides: SHARED_VIDEO_GUIDES,
  calendarWeeks: SHARED_CALENDAR_WEEKS,
  topSummaryStats: [
    { key: 'predictions', label: 'Prediction Questions', count: '1,606', pct: 56, targetTab: 'Speaking' },
    { key: 'speaking', label: 'Speaking Questions', count: '9,016', pct: 14, targetTab: 'Speaking' },
    { key: 'writing', label: 'Writing Questions', count: '911', pct: 12, targetTab: 'Writing' },
    { key: 'reading', label: 'Reading Questions', count: '3,502', pct: 10, targetTab: 'Reading' },
    { key: 'listening', label: 'Listening Questions', count: '5,997', pct: 12, targetTab: 'Listening' },
  ],
  practiceTasks: {
    Speaking: [
      { name: 'Read Aloud', done: 67, total: 1552, to: '/v1/practice/speaking/read-aloud' },
      { name: 'Answer Short Question', done: 57, total: 1946, to: '/v1/practice/speaking/answer-short-question' },
      { name: 'Repeat Sentence', done: 769, total: 3174, to: '/v1/practice/speaking/repeat-sentence' },
      { name: 'Summarize Group Discussion', done: 18, total: 199, to: '/v1/practice/speaking/summarize-group-discussion' },
      { name: 'Describe Image', done: 175, total: 1207, to: '/v1/practice/speaking/describe-image' },
      { name: 'Respond to a Situation', done: 97, total: 360, to: '/v1/practice/speaking/respond-to-a-situation' },
      { name: 'Re-Tell Lecture', done: 116, total: 578, to: '/v1/practice/speaking/retell-lecture' },
    ],
    Writing: [
      { name: 'Summarize Written Text', done: 42, total: 390, to: '/v1/practice/writing/summarize-written-text' },
      { name: 'Write Essay', done: 28, total: 521, to: '/v1/practice/writing/write-essay' },
    ],
    Reading: [
      { name: 'Reading & Writing: Fill in the Blanks', done: 114, total: 980, to: '/v1/practice/reading/reading-writing-fill-in-the-blanks' },
      { name: 'Multiple Choice, Multiple Answers', done: 39, total: 420, to: '/v1/practice/reading/multiple-choice-multiple' },
      { name: 'Re-order Paragraphs', done: 68, total: 645, to: '/v1/practice/reading/reorder-paragraphs' },
      { name: 'Reading: Fill in the Blanks', done: 92, total: 967, to: '/v1/practice/reading/fill-in-the-blanks' },
      { name: 'Multiple Choice, Single Answer', done: 35, total: 490, to: '/v1/practice/reading/multiple-choice-single' },
    ],
    Listening: [
      { name: 'Summarize Spoken Text', done: 44, total: 612, to: '/v1/practice/listening/summarize-spoken-text' },
      { name: 'Multiple Choice, Multiple Answers', done: 29, total: 480, to: '/v1/practice/listening/multiple-choice-multiple' },
      { name: 'Fill in the Blanks', done: 103, total: 1120, to: '/v1/practice/listening/fill-in-the-blanks' },
      { name: 'Highlight Correct Summary', done: 31, total: 410, to: '/v1/practice/listening/highlight-correct-summary' },
      { name: 'Multiple Choice, Single Answer', done: 26, total: 395, to: '/v1/practice/listening/multiple-choice-single' },
      { name: 'Select Missing Word', done: 41, total: 460, to: '/v1/practice/listening/select-missing-word' },
      { name: 'Highlight Incorrect Words', done: 98, total: 890, to: '/v1/practice/listening/highlight-incorrect-words' },
      { name: 'Write From Dictation', done: 348, total: 1630, to: '/v1/practice/listening/write-from-dictation' },
    ],
  },
  mockTestCards: [
    { name: 'Full Mock Test', done: 9, total: 194, to: '/v1/mock-test/mock-test-list' },
    { name: 'Sectional Mock Test', done: 29, total: 517, to: '/v1/mock-test/mock-test-list/sectional-mock-test' },
    { name: 'Timed Mock Test', done: 1, total: 80, to: '/v1/mock-test/mock-test-list/timed-section-mock-test/timed-section-mock-test-list' },
  ],
  quickToolTiles: [
    { key: 'predictions', label: 'Predictions', to: '/v1/prediction' },
    { key: 'strategy', label: 'Strategy Videos', to: '/v1/youtube-videos/1' },
    { key: 'vocab', label: 'Vocab Bank', to: '/v1/vocab-bank' },
    { key: 'feedback', label: 'Score Feedback', to: '/pte-score-calculator' },
    { key: 'compatibility', label: 'Compatibility', to: '/on-test-day' },
    { key: 'full-mock', label: 'Full Mock Test', to: '/v1/mock-test/mock-test-list' },
    { key: 'sectional-mock', label: 'Sectional Mock Test', to: '/v1/mock-test/mock-test-list/sectional-mock-test' },
    { key: 'timed-mock', label: 'Timed Mock Test', to: '/v1/mock-test/mock-test-list/timed-section-mock-test/timed-section-mock-test-list' },
  ],
  todaysTasksBySkill: {
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
  },
  guideTabs: [
    'About PTE',
    'Speaking Guide',
    'Writing Guide',
    'Reading Guide',
    'Listening Guide',
    'Score Guide',
  ],
  guideFaqs: {
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
  },
};
