import {
  buildTaskQuestionList,
  resolvePracticeTask,
} from '../../practice-arena/practiceTaskCatalog';

const IN_PROGRESS_KEY_PREFIX = 'ninetypte_mock_inprogress_v1_';

export const DESCRIBE_IMAGE_URLS = [
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    alt: 'Data visualization and analytics chart',
  },
  {
    src: 'https://images.unsplash.com/photo-1661548306911-7821c3b64be3?auto=format&fit=crop&w=900&q=80',
    alt: 'Mother and child together in the kitchen',
  },
  {
    src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80',
    alt: 'Statistical market and trend line chart',
  },
  {
    src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
    alt: 'Family preparing meal together at kitchen counter',
  },
  {
    src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80',
    alt: 'Business performance charts and graphs',
  },
  {
    src: 'https://images.unsplash.com/photo-1477959858617-67f30bc47b82?auto=format&fit=crop&w=900&q=80',
    alt: 'Modern city skyline architecture view',
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    alt: 'Dashboard metrics and visual reports',
  },
  {
    src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80',
    alt: 'Urban city skyline and bridge view',
  },
];

const PART_TASK_PLANS = {
  Speaking: [
    'speaking/read-aloud',
    'speaking/repeat-sentence',
    'speaking/describe-image',
    'speaking/retell-lecture',
    'speaking/answer-short-question',
    'speaking/summarize-group-discussion',
    'speaking/respond-to-a-situation',
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
    'listening/fill-in-the-blanks',
    'listening/multiple-choice-single',
    'listening/select-missing-word',
    'listening/multiple-choice-multiple',
    'listening/highlight-correct-summary',
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
 * Formats seconds into MM:SS for audio players and recording countdowns.
 */
export function formatMMSS(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds || 0));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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
      const planIdx =
        countForSkill >= taskKeys.length
          ? Math.min(taskKeys.length - 1, Math.floor((i * taskKeys.length) / countForSkill))
          : i % taskKeys.length;
      const taskKey = taskKeys[planIdx];
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
 * Returns the rowspan Content | Time Allowed breakdown table before entering a Part.
 */
export function getPartIntroSpec(partIndex, testItem, isCore) {
  const breakdown = getMockTestPartBreakdown(testItem, isCore);

  if (testItem?.mode === 'sectional' || testItem?.mode === 'timed') {
    const skill = testItem.skill || 'Speaking';
    const singleMap = {
      Speaking: {
        partTitle: 'Speaking',
        groups: [
          {
            tasks: isCore
              ? ['Read Aloud', 'Repeat Sentence', 'Describe Image', 'Respond to a Situation', 'Answer Short Question']
              : ['Read Aloud', 'Repeat Sentence', 'Describe Image', 'Re-Tell Lecture', 'Answer Short Question'],
            minutes: testItem.durationMinutes || 35,
          },
        ],
      },
      Writing: {
        partTitle: 'Writing',
        groups: [
          {
            tasks: isCore ? ['Summarize Written Text', 'Write Email'] : ['Summarize Written Text', 'Write Essay'],
            minutes: testItem.durationMinutes || 40,
          },
        ],
      },
      Reading: {
        partTitle: 'Reading',
        groups: [
          {
            tasks: [
              'Reading & Writing: Fill in the Blanks',
              'Multiple Choice, Multiple Answer',
              'Re-order Paragraphs',
              'Fill in the Blanks',
              'Multiple Choice, Single Answer',
            ],
            minutes: testItem.durationMinutes || 25,
          },
        ],
      },
      Listening: {
        partTitle: 'Listening',
        groups: [
          {
            tasks: [
              'Summarize Spoken Text',
              'Multiple Choice, Multiple Answer',
              'Fill in the Blanks',
              'Highlight Correct Summary',
              'Multiple Choice, Single Answer',
              'Select Missing Word',
              'Highlight Incorrect Words',
              'Write from Dictation',
            ],
            minutes: testItem.durationMinutes || 32,
          },
        ],
      },
    };
    const chosen = singleMap[skill] || singleMap.Speaking;
    return {
      partLabel: 'Part 1',
      partTitle: chosen.partTitle,
      groups: chosen.groups,
    };
  }

  if (partIndex === 2) {
    return {
      partLabel: 'Part 2',
      partTitle: 'Reading',
      groups: [
        {
          tasks: [
            'Reading & Writing: Fill in the Blanks',
            'Multiple Choice, Multiple Answer',
            'Re-order Paragraphs',
            'Fill in the Blanks',
            'Multiple Choice, Single Answer',
          ],
          minutes: breakdown.rows[1]?.minutes || 25,
        },
      ],
    };
  }

  if (partIndex === 3) {
    return {
      partLabel: 'Part 3',
      partTitle: 'Listening',
      groups: [
        {
          tasks: [
            'Summarize Spoken Text',
            'Multiple Choice, Multiple Answer',
            'Fill in the Blanks',
            'Highlight Correct Summary',
            'Multiple Choice, Single Answer',
            'Select Missing Word',
            'Highlight Incorrect Words',
            'Write from Dictation',
          ],
          minutes: breakdown.rows[2]?.minutes || 32,
        },
      ],
    };
  }

  const p1Total = breakdown.rows[0]?.minutes || 76;
  const speakingMins = Math.max(15, Math.round(p1Total * 0.47));
  const writingMins = Math.max(15, p1Total - speakingMins);

  return {
    partLabel: 'Part 1',
    partTitle: 'Speaking and Writing',
    groups: [
      {
        tasks: isCore
          ? ['Read Aloud', 'Repeat Sentence', 'Describe Image', 'Respond to a Situation', 'Answer Short Question']
          : [
              'Read Aloud',
              'Repeat Sentence',
              'Describe Image',
              'Re-Tell Lecture',
              'Answer Short Question',
              'Summarize Group Discussion',
              'Respond to a Situation',
            ],
        minutes: speakingMins,
      },
      {
        tasks: isCore ? ['Summarize Written Text', 'Write Email'] : ['Summarize Written Text', 'Write Essay'],
        minutes: writingMins,
      },
    ],
  };
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
    onboardingStep: 0, // 0..8 (0 Overview .. 5 Writing .. 6 Personal Intro .. 7 About to Start .. 8 Part 1)
    currentQuestionIndex: 0,
    writingStyle: '',
    darkMode: false,
    examNoise: { enabled: false, scope: 'question', volume: 65 },
    remainingSeconds: totalMinutes * 60,
    answersByIndex: {},
    startedAt: new Date().toISOString(),
  };
}

function buildSpeechTokensForItem(promptText, isAttempted, code) {
  const words = String(promptText || 'Respond clearly with structured academic phrasing.')
    .replace(/[.,]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 52);

  if (!isAttempted) {
    if (code === 'DI') {
      return [
        { isPause: true },
        { word: 'You', status: 'average' },
        { word: 'know', status: 'average' },
        { isPause: true },
      ];
    }
    if (code === 'SGD') {
      return [
        { isPause: true },
        { word: 'oh', status: 'average' },
        { word: 'oh', status: 'average' },
        { isPause: true },
        { word: 'no', status: 'average' },
        { isPause: true },
      ];
    }
    if (code === 'ASQ') {
      return [{ word: 'Radius', status: 'missed' }];
    }
    return [
      { isPause: true },
      ...words.map((w) => ({ word: w.toLowerCase(), status: 'missed' })),
    ];
  }

  const out = [{ isPause: true }];
  words.forEach((w, idx) => {
    const status = idx % 9 === 6 ? 'average' : 'good';
    out.push({ word: w, status });
    if (idx > 0 && idx % 8 === 0) out.push({ isPause: true });
  });
  out.push({ isPause: true });
  return out;
}

function buildQuestionScoreResult(item, ans, diffBase) {
  const { taskMeta, question, skillGroup } = item;
  const code = taskMeta?.code || 'RA';
  const promptText = question?.contentSnippet || taskMeta?.promptText || '';
  const hasBlank = Object.values(ans?.blankSelections || {}).some((v) => String(v || '').trim());
  const isAttempted = Boolean(
    ans?.recorded ||
      ans?.responseText?.trim() ||
      hasBlank ||
      (ans?.selectedChoices || []).length > 0 ||
      (ans?.highlightedWords || []).length > 0 ||
      (ans?.reorderTargetIds || []).length > 0
  );

  const seed = Math.abs((item.index * 17 + Number(question?.id || 11)) % 14);
  const baseVal = isAttempted ? Math.min(89, Math.max(52, diffBase + seed - 4)) : 0;

  let skillPills = [{ key: skillGroup[0], score: baseVal, max: 90 }];
  if (code === 'RS' || code === 'RL' || code === 'SGD') {
    skillPills = [
      { key: 'S', score: baseVal, max: 90 },
      { key: 'L', score: isAttempted ? Math.max(45, baseVal - 3) : 0, max: 90 },
    ];
  } else if (code === 'ASQ') {
    skillPills = [{ key: 'L', score: isAttempted ? 1 : 0, max: 1 }];
  } else if (code === 'RWB') {
    skillPills = [
      { key: 'R', score: baseVal, max: 90 },
      { key: 'W', score: isAttempted ? Math.max(48, baseVal - 2) : 0, max: 90 },
    ];
  } else if (code === 'SST' || code === 'WFD') {
    skillPills = [
      { key: 'L', score: baseVal, max: 90 },
      { key: 'W', score: isAttempted ? Math.max(48, baseVal - 2) : 0, max: 90 },
    ];
  } else if (code === 'HIW') {
    skillPills = [
      { key: 'L', score: baseVal, max: 90 },
      { key: 'R', score: isAttempted ? Math.max(46, baseVal - 3) : 0, max: 90 },
    ];
  }

  let enablingRows = [
    { label: 'Content', score: isAttempted ? Math.min(90, baseVal + 2) : 0, max: 90 },
    { label: 'Fluency', score: isAttempted ? Math.max(45, baseVal - 2) : 0, max: 90 },
    { label: 'Pronunciation', score: isAttempted ? baseVal : 0, max: 90 },
  ];
  if (skillGroup === 'Writing' || code === 'SST' || code === 'WFD') {
    enablingRows = [
      { label: 'Content', score: isAttempted ? baseVal : 0, max: 90 },
      { label: 'Form', score: isAttempted ? Math.min(90, baseVal + 6) : 0, max: 90 },
      { label: 'Grammar', score: isAttempted ? Math.max(45, baseVal - 3) : 0, max: 90 },
      { label: 'Spelling', score: isAttempted ? Math.min(90, baseVal + 4) : 0, max: 90 },
    ];
  } else if (skillGroup === 'Reading' || skillGroup === 'Listening') {
    enablingRows = [
      { label: 'Accuracy', score: isAttempted ? baseVal : 0, max: 90 },
      { label: 'Comprehension', score: isAttempted ? Math.min(90, baseVal + 3) : 0, max: 90 },
    ];
  }

  const responseSummary = ans?.responseText?.trim()
    ? ans.responseText.trim()
    : hasBlank
      ? `Filled blanks: ${Object.values(ans.blankSelections).filter(Boolean).join(', ')}`
      : (ans?.selectedChoices || []).length > 0
        ? `Selected option(s): ${ans.selectedChoices.join(', ')}`
        : (ans?.highlightedWords || []).length > 0
          ? `Highlighted ${ans.highlightedWords.length} word(s)`
          : (ans?.reorderTargetIds || []).length > 0
            ? `Ordered sequence: ${ans.reorderTargetIds.join(' -> ')}`
            : isAttempted
              ? 'Audio response captured cleanly.'
              : '';

  return {
    id: question?.id || String(1001000 + item.index),
    code,
    slug: taskMeta?.slug || 'read-aloud',
    skillGroup,
    title: question?.title || `${taskMeta?.title || 'Question'} #${item.index + 1}`,
    promptText,
    imageUrl:
      code === 'DI'
        ? DESCRIBE_IMAGE_URLS[item.index % DESCRIBE_IMAGE_URLS.length]?.src
        : null,
    hasPromptAudio: Boolean(taskMeta?.hasAudioPrompt || skillGroup === 'Listening'),
    showPromptTextInModal: code === 'RTS' || skillGroup === 'Writing' || skillGroup === 'Reading',
    isAttempted,
    skillPills,
    enablingRows,
    speechTokens:
      skillGroup === 'Speaking' ? buildSpeechTokensForItem(promptText, isAttempted, code) : [],
    responseSummary,
    feedbackComment: isAttempted
      ? 'Good attempt. Maintain steady pacing, clear phrasing, and key terminology coverage.'
      : 'Irrelevant or insufficient content spoken. Please try again.',
  };
}

/**
 * Produces an authentic scorecard payload with per-question AI diagnostic items
 * from completed mock test answers.
 */
export function buildMockAttemptScore(testItem, session, trackLabel, isCore = false) {
  const queue = buildMockExamQueue(testItem, isCore);
  const diffBase = testItem.difficulty === 'Easy' ? 74 : testItem.difficulty === 'Difficult' ? 66 : 70;
  const questionResults = queue.map((item) =>
    buildQuestionScoreResult(item, session?.answersByIndex?.[item.index], diffBase)
  );

  const avgSkillFromResults = (skill) => {
    const items = questionResults.filter((r) => r.skillGroup === skill);
    if (items.length === 0) return null;
    const sum = items.reduce((acc, r) => acc + (r.skillPills?.[0]?.score || 0), 0);
    return Math.max(10, Math.round(sum / items.length));
  };

  const speaking = avgSkillFromResults('Speaking');
  const writing = avgSkillFromResults('Writing');
  const reading = avgSkillFromResults('Reading');
  const listening = avgSkillFromResults('Listening');
  const activeVals = [speaking, writing, reading, listening].filter((v) => v !== null);
  const overall = activeVals.length
    ? Math.max(10, Math.round(activeVals.reduce((a, b) => a + b, 0) / activeVals.length))
    : 12;

  return {
    id: `attempt-${Date.now()}`,
    testId: testItem.id,
    title: testItem.title,
    mode: testItem.mode,
    skill: testItem.skill || 'All',
    trackLabel,
    isCore,
    writingStyle: session?.writingStyle || 'American (US)',
    overall,
    speaking,
    writing,
    reading,
    listening,
    questionResults,
    completedAt: new Date().toISOString(),
  };
}
