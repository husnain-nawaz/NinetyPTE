import {
  buildTaskQuestionList,
  resolvePracticeTask,
} from '../../practice-arena/practiceTaskCatalog';

const IN_PROGRESS_KEY_PREFIX = 'ninetypte_mock_inprogress_v1_';

const PART_TASK_PLANS = {
  Speaking: [
    'speaking/read-aloud',
    'speaking/repeat-sentence',
    'speaking/describe-image',
    'speaking/retell-lecture',
    'speaking/answer-short-question',
  ],
  SpeakingCore: [
    'speaking/read-aloud',
    'speaking/repeat-sentence',
    'speaking/describe-image',
    'speaking/respond-to-a-situation',
    'speaking/answer-short-question',
  ],
  Writing: ['writing/summarize-written-text', 'writing/write-essay'],
  WritingCore: ['writing/summarize-written-text', 'writing/write-email'],
  Reading: [
    'reading/reading-writing-fill-in-the-blanks',
    'reading/multiple-choice-multiple',
    'reading/reorder-paragraphs',
    'reading/fill-in-the-blanks',
    'reading/multiple-choice-single',
  ],
  Listening: [
    'listening/summarize-spoken-text',
    'listening/multiple-choice-multiple',
    'listening/fill-in-the-blanks',
    'listening/highlight-correct-summary',
    'listening/multiple-choice-single',
    'listening/select-missing-word',
    'listening/highlight-incorrect-words',
    'listening/write-from-dictation',
  ],
};

/**
 * Formats minutes into Pearson-style test duration text (e.g. "2 hours & 17 minutes").
 */
export function formatExamDurationLabel(totalMinutes) {
  const mins = Math.max(1, Math.round(totalMinutes));
  const hours = Math.floor(mins / 60);
  const rem = mins % 60;
  if (hours === 0) {
    return `${rem} minute${rem === 1 ? '' : 's'}`;
  }
  const hourStr = `${hours} hour${hours === 1 ? '' : 's'}`;
  if (rem === 0) return hourStr;
  return `${hourStr} & ${rem} minute${rem === 1 ? '' : 's'}`;
}

/**
 * Formats seconds into HH:MM:SS for the mock exam header timer.
 */
export function formatCountdownHMS(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds || 0));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  return [hrs, mins, secs].map((v) => String(v).padStart(2, '0')).join(':');
}

/**
 * Builds the Part / Content / Time Allowed breakdown rows for any mock test item.
 */
export function getMockTestPartBreakdown(testItem, isCore) {
  const totalQ = Math.max(1, Number(testItem?.questions) || 65);

  if (testItem?.mode === 'sectional' || testItem?.mode === 'timed') {
    const skill = testItem.skill || 'Speaking';
    const contentMap = {
      Speaking: 'Speaking',
      Writing: 'Writing',
      Reading: 'Reading',
      Listening: 'Listening',
    };
    const mins = testItem.durationMinutes || Math.max(12, Math.round(totalQ * 1.1));
    return {
      totalMinutes: mins,
      rows: [{ part: 'Part 1', content: contentMap[skill] || skill, minutes: mins }],
    };
  }

  const skills = Array.isArray(testItem?.skills) && testItem.skills.length > 0
    ? testItem.skills
    : ['Speaking', 'Writing', 'Reading', 'Listening'];

  const hasPart1 = skills.includes('Speaking') || skills.includes('Writing');
  const hasPart2 = skills.includes('Reading');
  const hasPart3 = skills.includes('Listening');

  // Exact official Academic breakdown when full 78-question Free Mock Test is opened
  if (!isCore && hasPart1 && hasPart2 && hasPart3 && totalQ === 78) {
    return {
      totalMinutes: 137,
      rows: [
        { part: 'Part 1', content: 'Speaking and writing', minutes: 79 },
        { part: 'Part 2', content: 'Reading', minutes: 25 },
        { part: 'Part 3', content: 'Listening', minutes: 32 },
      ],
    };
  }

  const ratio = Math.max(0.45, Math.min(1.25, totalQ / (isCore ? 64 : 78)));
  const rows = [];
  let partNum = 1;
  if (hasPart1) {
    const swRatio = skills.includes('Speaking') && skills.includes('Writing') ? 1 : 0.65;
    rows.push({
      part: `Part ${partNum}`,
      content: 'Speaking and writing',
      minutes: Math.max(15, Math.round((isCore ? 68 : 79) * ratio * swRatio)),
    });
    partNum += 1;
  }
  if (hasPart2) {
    rows.push({
      part: `Part ${partNum}`,
      content: 'Reading',
      minutes: Math.max(10, Math.round((isCore ? 23 : 25) * ratio)),
    });
    partNum += 1;
  }
  if (hasPart3) {
    rows.push({
      part: `Part ${partNum}`,
      content: 'Listening',
      minutes: Math.max(12, Math.round((isCore ? 28 : 32) * ratio)),
    });
  }

  const summedMinutes = rows.reduce((sum, r) => sum + r.minutes, 0);
  const totalMinutes = testItem?.skills ? summedMinutes : Math.max(summedMinutes, testItem?.durationMinutes || summedMinutes);
  return { totalMinutes, rows };
}

function allocateCountsProportionally(total, weights) {
  const sumWeights = weights.reduce((acc, w) => acc + w.weight, 0);
  const counts = weights.map((w) => Math.floor((total * w.weight) / sumWeights));
  let assigned = counts.reduce((acc, c) => acc + c, 0);
  let idx = 0;
  while (assigned < total) {
    counts[idx % counts.length] += 1;
    assigned += 1;
    idx += 1;
  }
  // Ensure every selected section receives at least 1 question if total >= sections.length
  if (total >= weights.length) {
    for (let i = 0; i < counts.length; i += 1) {
      if (counts[i] === 0) {
        const donorIdx = counts.findIndex((c) => c > 1);
        if (donorIdx >= 0) {
          counts[donorIdx] -= 1;
          counts[i] = 1;
        }
      }
    }
  }
  return counts;
}

/**
 * Generates an ordered mock exam queue of exact length `testItem.questions` using
 * shared practice-arena task metadata and prompts.
 */
export function buildMockExamQueue(testItem, isCore) {
  const totalQ = Math.max(1, Number(testItem?.questions) || 20);
  const isSectional = testItem?.mode === 'sectional' || testItem?.mode === 'timed';
  const activeSkills = isSectional
    ? [testItem.skill || 'Speaking']
    : Array.isArray(testItem?.skills) && testItem.skills.length > 0
      ? testItem.skills
      : ['Speaking', 'Writing', 'Reading', 'Listening'];

  const defaultWeights = {
    Speaking: 44,
    Writing: 6,
    Reading: 22,
    Listening: 28,
  };

  const sectionWeights = activeSkills.map((skill) => ({
    skill,
    weight: defaultWeights[skill] || 20,
  }));
  const sectionCounts = allocateCountsProportionally(totalQ, sectionWeights);
  const offsetSeed = Math.abs(
    String(testItem?.id || 'mock')
      .split('')
      .reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7)
  );

  const partLabelForSkill = (skill) => {
    if (skill === 'Speaking' || skill === 'Writing') return 'Part 1: Speaking and writing';
    if (skill === 'Reading') return 'Part 2: Reading';
    return 'Part 3: Listening';
  };

  const queue = [];
  activeSkills.forEach((skill, sIdx) => {
    const countForSkill = sectionCounts[sIdx];
    if (countForSkill <= 0) return;

    const planKey =
      skill === 'Speaking' && isCore
        ? 'SpeakingCore'
        : skill === 'Writing' && isCore
          ? 'WritingCore'
          : skill;
    const taskKeys = PART_TASK_PLANS[planKey] || PART_TASK_PLANS.Speaking;

    for (let i = 0; i < countForSkill; i += 1) {
      const taskKey = taskKeys[i % taskKeys.length];
      const [taskSkill, taskSlug] = taskKey.split('/');
      const taskMeta = resolvePracticeTask(taskSkill, taskSlug, isCore);
      const bankItems = buildTaskQuestionList(taskMeta);
      const picked = bankItems[(offsetSeed + i) % Math.min(bankItems.length, 40)] || {
        id: `${taskMeta.startId}`,
        title: `${taskMeta.title} #${i + 1}`,
        contentSnippet: taskMeta.promptText,
      };

      queue.push({
        index: queue.length,
        partLabel: partLabelForSkill(skill),
        skillGroup: skill,
        taskKey,
        taskMeta,
        question: picked,
      });
    }
  });

  return queue;
}

export function readInProgressMock(track) {
  try {
    const raw = localStorage.getItem(`${IN_PROGRESS_KEY_PREFIX}${track}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && parsed.testId ? parsed : null;
  } catch {
    return null;
  }
}

export function saveInProgressMock(track, session) {
  try {
    localStorage.setItem(
      `${IN_PROGRESS_KEY_PREFIX}${track}`,
      JSON.stringify({ ...session, updatedAt: new Date().toISOString() })
    );
  } catch {
    // Ignore storage errors gracefully
  }
}

export function clearInProgressMock(track) {
  try {
    localStorage.removeItem(`${IN_PROGRESS_KEY_PREFIX}${track}`);
  } catch {
    // Ignore storage errors gracefully
  }
}

export function getSessionProgressPercent(session) {
  if (!session || !session.totalQuestions) return 0;
  if (session.stage !== 'questions') return 0;
  const answeredCount = Math.max(
    session.currentQuestionIndex || 0,
    Object.keys(session.answersByIndex || {}).length
  );
  return Math.max(0, Math.min(99, Math.round((answeredCount / session.totalQuestions) * 100)));
}

/**
 * Generates an initial in-progress session object when a user starts a mock test.
 */
export function createMockSession(testItem, isCore) {
  const { totalMinutes } = getMockTestPartBreakdown(testItem, isCore);
  return {
    testItem,
    testId: testItem.id,
    title: testItem.title,
    mode: testItem.mode,
    skill: testItem.skill || 'All',
    difficulty: testItem.difficulty || 'Medium',
    totalQuestions: Math.max(1, Number(testItem.questions) || 20),
    modalStep: 0, // 0 = USB Headset alert, 1 = Single Window alert, 2 = Dismissed
    stage: 'onboarding', // 'onboarding' | 'questions' | 'completed'
    onboardingStep: 0, // 0..5
    currentQuestionIndex: 0,
    writingStyle: 'American (US)',
    darkMode: false,
    remainingSeconds: totalMinutes * 60,
    answersByIndex: {},
    startedAt: new Date().toISOString(),
  };
}

/**
 * Produces an authentic scorecard payload from completed answers.
 */
export function buildMockAttemptScore(testItem, session, trackLabel) {
  const answeredCount = Object.keys(session?.answersByIndex || {}).length;
  const totalQ = Math.max(1, session?.totalQuestions || testItem.questions || 20);
  const completionRatio = Math.min(1, answeredCount / totalQ);
  const diffBase = testItem.difficulty === 'Easy' ? 74 : testItem.difficulty === 'Difficult' ? 66 : 70;
  const overall = Math.min(89, Math.max(52, Math.round(diffBase + completionRatio * 10)));

  const isAll = !testItem.skill || testItem.skill === 'All';
  return {
    id: `attempt-${Date.now()}`,
    testId: testItem.id,
    title: testItem.title,
    mode: testItem.mode,
    skill: testItem.skill || 'All',
    trackLabel,
    writingStyle: session?.writingStyle || 'American (US)',
    overall,
    speaking: isAll || testItem.skill === 'Speaking' ? Math.min(90, overall + 2) : null,
    writing: isAll || testItem.skill === 'Writing' ? Math.max(45, overall - 1) : null,
    reading: isAll || testItem.skill === 'Reading' ? Math.min(90, overall + 1) : null,
    listening: isAll || testItem.skill === 'Listening' ? Math.max(45, overall - 2) : null,
    completedAt: new Date().toISOString(),
  };
}
