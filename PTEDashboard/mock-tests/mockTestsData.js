export const MOCK_TEST_MODES = [
  { id: 'full', label: 'Full Mock Test' },
  { id: 'sectional', label: 'Sectional Mock Test' },
  { id: 'timed', label: 'Timed Sectional Mock Test' },
];

export const SCORE_HISTORY_MODES = [
  { id: 'full', label: 'Full Mock Test' },
  { id: 'sectional', label: 'Sectional Mock Test' },
];

export const SCORE_HISTORY_FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: '7d', label: 'Last 7 days' },
  { id: '15d', label: 'Last 15 days' },
  { id: '30d', label: 'Last 30 days' },
];

export const MOCK_DIFFICULTY_FILTERS = [
  'All',
  'Difficult',
  'Medium',
  'Easy',
  'Bookmark',
];

export const SECTION_TABS = ['Speaking', 'Writing', 'Reading', 'Listening'];

// Screenshot of Score History Sectional tab places Listening before Reading.
export const SCORE_SECTION_TABS = ['Speaking', 'Writing', 'Listening', 'Reading'];

export const SKILL_THEME_TOKENS = {
  Speaking: {
    activeTabClass: 'border-b-2 border-[#eb8c44] text-[#eb8c44]',
    iconBgClass: 'bg-[#fdf1e6] text-[#eb8c44]',
    cardAccentClass: 'text-[#eb8c44]',
    ringColor: '#eb8c44',
    barColor: 'bg-[#eb8c44]',
  },
  Writing: {
    activeTabClass: 'border-b-2 border-[#3b82f6] text-[#3b82f6]',
    iconBgClass: 'bg-[#eaf2ff] text-[#3b82f6]',
    cardAccentClass: 'text-[#3b82f6]',
    ringColor: '#3b82f6',
    barColor: 'bg-[#3b82f6]',
  },
  Reading: {
    activeTabClass: 'border-b-2 border-[#16a34a] text-[#16a34a]',
    iconBgClass: 'bg-[#e8f8ed] text-[#16a34a]',
    cardAccentClass: 'text-[#16a34a]',
    ringColor: '#16a34a',
    barColor: 'bg-[#16a34a]',
  },
  Listening: {
    activeTabClass: 'border-b-2 border-[#0d5488] text-[#0d5488]',
    iconBgClass: 'bg-[#e6eff8] text-[#0d5488]',
    cardAccentClass: 'text-[#0d5488]',
    ringColor: '#0d5488',
    barColor: 'bg-[#0d5488]',
  },
  Overall: {
    activeTabClass: 'border-b-2 border-[#7c3aed] text-[#7c3aed]',
    iconBgClass: 'bg-[#f3ecff] text-[#7c3aed]',
    cardAccentClass: 'text-[#7c3aed]',
    ringColor: '#7c3aed',
    barColor: 'bg-[#7c3aed]',
  },
};

const FULL_PATTERN = [
  { difficulty: 'Medium', coreQuestions: 61, academicQuestions: 68 },
  { difficulty: 'Medium', coreQuestions: 61, academicQuestions: 67 },
  { difficulty: 'Difficult', coreQuestions: 64, academicQuestions: 72 },
  { difficulty: 'Difficult', coreQuestions: 64, academicQuestions: 71 },
  { difficulty: 'Easy', coreQuestions: 62, academicQuestions: 65 },
];

const SECTIONAL_PATTERN = {
  Speaking: [
    { difficulty: 'Medium', coreQuestions: 28, academicQuestions: 32 },
    { difficulty: 'Difficult', coreQuestions: 30, academicQuestions: 35 },
    { difficulty: 'Difficult', coreQuestions: 30, academicQuestions: 34 },
    { difficulty: 'Easy', coreQuestions: 28, academicQuestions: 30 },
  ],
  Writing: [
    { difficulty: 'Medium', coreQuestions: 5, academicQuestions: 4 },
    { difficulty: 'Difficult', coreQuestions: 6, academicQuestions: 5 },
    { difficulty: 'Difficult', coreQuestions: 6, academicQuestions: 5 },
    { difficulty: 'Easy', coreQuestions: 4, academicQuestions: 3 },
  ],
  Reading: [
    { difficulty: 'Medium', coreQuestions: 15, academicQuestions: 16 },
    { difficulty: 'Difficult', coreQuestions: 18, academicQuestions: 19 },
    { difficulty: 'Difficult', coreQuestions: 17, academicQuestions: 18 },
    { difficulty: 'Easy', coreQuestions: 13, academicQuestions: 14 },
  ],
  Listening: [
    { difficulty: 'Medium', coreQuestions: 16, academicQuestions: 18 },
    { difficulty: 'Difficult', coreQuestions: 19, academicQuestions: 21 },
    { difficulty: 'Difficult', coreQuestions: 18, academicQuestions: 20 },
    { difficulty: 'Easy', coreQuestions: 14, academicQuestions: 16 },
  ],
};

function buildFullMockTests(isCore) {
  return Array.from({ length: 50 }, (_, idx) => {
    const num = 50 - idx;
    const spec = FULL_PATTERN[idx % FULL_PATTERN.length];
    return {
      id: `${isCore ? 'core' : 'academic'}-full-${num}`,
      mode: 'full',
      title: `Mock Test - ${num}`,
      questions: isCore ? spec.coreQuestions : spec.academicQuestions,
      attempts: 0,
      trackLabel: isCore ? 'PTE Core' : 'PTE Academic',
      difficulty: spec.difficulty,
      durationMinutes: isCore ? 115 : 120,
      isPrediction: idx % 3 === 0,
      isPreset: true,
    };
  });
}

function buildSectionalMockTests(isCore, skill) {
  const pattern = SECTIONAL_PATTERN[skill] || SECTIONAL_PATTERN.Speaking;
  const freeQuestionsMap = {
    Speaking: isCore ? 30 : 34,
    Writing: isCore ? 5 : 4,
    Reading: isCore ? 15 : 16,
    Listening: isCore ? 16 : 18,
  };

  const freeRow = {
    id: `${isCore ? 'core' : 'academic'}-sectional-${skill.toLowerCase()}-free`,
    mode: 'sectional',
    skill,
    title: `Free ${skill} Test`,
    questions: freeQuestionsMap[skill] || 20,
    attempts: 0,
    isFree: true,
    durationMinutes: skill === 'Speaking' ? 32 : 28,
    isPrediction: true,
    isPreset: true,
  };

  const numbered = Array.from({ length: 20 }, (_, idx) => {
    const num = 20 - idx;
    const spec = pattern[idx % pattern.length];
    return {
      id: `${isCore ? 'core' : 'academic'}-sectional-${skill.toLowerCase()}-${num}`,
      mode: 'sectional',
      skill,
      title: `${skill} - ${num}`,
      questions: isCore ? spec.coreQuestions : spec.academicQuestions,
      attempts: 0,
      difficulty: spec.difficulty,
      durationMinutes: skill === 'Speaking' ? 32 : 28,
      isPrediction: idx % 4 === 0,
      isPreset: true,
    };
  });

  return [freeRow, ...numbered];
}

function buildTimedSectionalMockTests(isCore, skill) {
  const pattern = SECTIONAL_PATTERN[skill] || SECTIONAL_PATTERN.Speaking;
  return Array.from({ length: 20 }, (_, idx) => {
    const num = 20 - idx;
    const spec = pattern[idx % pattern.length];
    return {
      id: `${isCore ? 'core' : 'academic'}-timed-${skill.toLowerCase()}-${num}`,
      mode: 'timed',
      skill,
      title: `Timed ${skill} - ${num}`,
      questions: isCore ? spec.coreQuestions : spec.academicQuestions,
      attempts: 0,
      isTimedBadge: true,
      durationMinutes: skill === 'Speaking' ? 30 : 25,
      isPrediction: idx % 3 === 0,
      isPreset: true,
    };
  });
}

export function getMockTestsDataset(track) {
  const isCore = track === 'core';
  const basePath = isCore ? '/v1/core/mock-test' : '/v1/mock-test';

  return {
    track,
    trackLabel: isCore ? 'PTE Core' : 'PTE Academic',
    routes: {
      full: `${basePath}/mock-test-list`,
      sectional: `${basePath}/mock-test-list/sectional-mock-test`,
      timed: `${basePath}/mock-test-list/timed-section-mock-test/timed-section-mock-test-list`,
      scores: `${basePath}/mock-test-result-list`,
      viewScore: `${basePath}/mock-test-result-list/view-score`,
      analytics: `${basePath}/mock-test-result-list/full-test-analytics`,
      aiFeedback: `${basePath}/mock-test-result-list/ai-feedback`,
      history: `${basePath}/score-history`,
    },
    freeFullTest: {
      id: `${isCore ? 'core' : 'academic'}-full-free`,
      mode: 'full',
      title: 'Free Mock Test',
      questions: isCore ? 62 : 78,
      attempts: 1,
      trackLabel: isCore ? 'PTE Core' : 'PTE Academic',
      isFree: true,
      durationMinutes: isCore ? 115 : 120,
      isPrediction: true,
      isPreset: true,
    },
    customRangeLabel: isCore ? 'Questions: 55-65' : 'Questions: 65-75',
    customDefaultCount: isCore ? 60 : 70,
    customBounds: isCore ? { min: 55, max: 65 } : { min: 65, max: 75 },
    fullTests: buildFullMockTests(isCore),
    sectionalBySkill: {
      Speaking: buildSectionalMockTests(isCore, 'Speaking'),
      Writing: buildSectionalMockTests(isCore, 'Writing'),
      Reading: buildSectionalMockTests(isCore, 'Reading'),
      Listening: buildSectionalMockTests(isCore, 'Listening'),
    },
    timedBySkill: {
      Speaking: buildTimedSectionalMockTests(isCore, 'Speaking'),
      Writing: buildTimedSectionalMockTests(isCore, 'Writing'),
      Reading: buildTimedSectionalMockTests(isCore, 'Reading'),
      Listening: buildTimedSectionalMockTests(isCore, 'Listening'),
    },
  };
}

const BOOKMARKS_KEY = 'ninetypte_mock_bookmarks_v1';
const ATTEMPTS_KEY_PREFIX = 'ninetypte_mock_attempts_v1_';
const CUSTOM_TESTS_KEY_PREFIX = 'ninetypte_custom_mocks_v1_';

export function readMockBookmarks() {
  try {
    const parsed = JSON.parse(localStorage.getItem(BOOKMARKS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMockBookmarks(ids) {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage errors gracefully
  }
}

export function readMockAttempts(track) {
  try {
    const parsed = JSON.parse(localStorage.getItem(`${ATTEMPTS_KEY_PREFIX}${track}`) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function readMockAttemptById(track, attemptId) {
  const list = readMockAttempts(track);
  if (!attemptId) return list[0] || null;
  return list.find((entry) => String(entry.id) === String(attemptId)) || list[0] || null;
}

export function appendMockAttempt(track, attempt) {
  const prev = readMockAttempts(track);
  const next = [attempt, ...prev];
  try {
    localStorage.setItem(`${ATTEMPTS_KEY_PREFIX}${track}`, JSON.stringify(next));
  } catch {
    // Ignore storage errors gracefully
  }
  return next;
}

export function clearMockAttempts(track) {
  try {
    localStorage.removeItem(`${ATTEMPTS_KEY_PREFIX}${track}`);
  } catch {
    // Ignore storage errors gracefully
  }
}

export function deleteMockAttempt(track, attemptId) {
  const prev = readMockAttempts(track);
  const next = prev.filter((item) => String(item.id) !== String(attemptId));
  try {
    localStorage.setItem(`${ATTEMPTS_KEY_PREFIX}${track}`, JSON.stringify(next));
  } catch {
    // Ignore storage errors gracefully
  }
  return next;
}

export function readCustomMocks(track) {
  try {
    const parsed = JSON.parse(localStorage.getItem(`${CUSTOM_TESTS_KEY_PREFIX}${track}`) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendCustomMock(track, mockItem) {
  const prev = readCustomMocks(track);
  const next = [mockItem, ...prev];
  try {
    localStorage.setItem(`${CUSTOM_TESTS_KEY_PREFIX}${track}`, JSON.stringify(next));
  } catch {
    // Ignore storage errors gracefully
  }
  return next;
}
