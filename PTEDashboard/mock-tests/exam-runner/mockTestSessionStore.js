import {
  buildTaskQuestionList,
  resolvePracticeTask,
} from '../../practice-arena/practiceTaskCatalog';
import {
  HIGHLIGHT_INCORRECT_WORDS_PASSAGES,
  LISTENING_CHOICE_BANK,
  LISTENING_DICTATION_SENTENCES,
  LISTENING_TYPED_BLANKS_PASSAGES,
} from './listeningExamBank';
import {
  DRAG_DROP_BANK,
  DROPDOWN_PASSAGE_BANK,
  READING_MCQ_PASSAGES,
  REORDER_CARD_BANK,
} from './readingExamBank';

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

  const resolveTaskSkillGroup = (taskSkill) => {
    if (taskSkill === 'writing') return 'Writing';
    if (taskSkill === 'reading') return 'Reading';
    if (taskSkill === 'listening') return 'Listening';
    return 'Speaking';
  };

  const getSectionalTaskKeys = (skill) => {
    if (skill === 'Writing') {
      return [
        'writing/summarize-written-text',
        isCore ? 'writing/write-email' : 'writing/write-essay',
        'listening/summarize-spoken-text',
        'listening/write-from-dictation',
      ];
    }
    if (skill === 'Reading') {
      return [
        'writing/summarize-written-text',
        'reading/reading-writing-fill-in-the-blanks',
        'reading/multiple-choice-multiple',
        'reading/reorder-paragraphs',
        'reading/fill-in-the-blanks',
        'reading/multiple-choice-single',
        'listening/highlight-correct-summary',
        'listening/highlight-incorrect-words',
      ];
    }
    if (skill === 'Listening') {
      return [
        'speaking/repeat-sentence',
        ...(!isCore ? ['speaking/retell-lecture'] : []),
        'speaking/answer-short-question',
        ...(!isCore ? ['speaking/summarize-group-discussion'] : []),
        'listening/summarize-spoken-text',
        'listening/fill-in-the-blanks',
        'listening/multiple-choice-single',
        'listening/select-missing-word',
        'listening/multiple-choice-multiple',
        'listening/highlight-correct-summary',
        'listening/highlight-incorrect-words',
        'listening/write-from-dictation',
      ];
    }
    return isCore ? PART_TASK_PLANS.SpeakingCore : PART_TASK_PLANS.Speaking;
  };

  const queue = [];
  const isCrossSkillSectional = testItem?.mode === 'sectional';
  const isTimedSectional = testItem?.mode === 'timed';
  activeSkills.forEach((skill, sIdx) => {
    const countForSkill = sectionCounts[sIdx];
    if (countForSkill <= 0) return;

    const planKey =
      skill === 'Speaking' && isCore
        ? 'SpeakingCore'
        : skill === 'Writing' && isCore
          ? 'WritingCore'
          : skill;
    const taskKeys = isCrossSkillSectional
      ? getSectionalTaskKeys(skill)
      : PART_TASK_PLANS[planKey] || PART_TASK_PLANS.Speaking;

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
      const itemSkillGroup = resolveTaskSkillGroup(taskSkill);

      queue.push({
        index: queue.length,
        partLabel: isCrossSkillSectional
          ? `${skill} Sectional Test`
          : isTimedSectional
            ? `${skill} Timed Test`
            : partLabelForSkill(itemSkillGroup),
        skillGroup: itemSkillGroup,
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

function buildQuestionScoreResult(item, ans, diffBase, writingStyle) {
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
  const englishVariant = writingStyle?.includes('UK') ? 'British' : 'American';

  // Reading: compute itemized score (Out of 1..5) and structured Score Analysis payload
  if (skillGroup === 'Reading') {
    if (code === 'RWB') {
      const passage = DROPDOWN_PASSAGE_BANK[item.index % DROPDOWN_PASSAGE_BANK.length];
      const blanks = passage.segments.filter((s) => typeof s !== 'string');
      const questionWithBlanks = passage.segments
        .map((s) => (typeof s === 'string' ? s : '______'))
        .join('');
      const userList = blanks.map((b) => {
        const val = ans?.blankSelections?.[b.id] || '';
        return { value: val || '-', isCorrect: Boolean(val && val === b.correct) };
      });
      const earned = userList.filter((u) => u.isCorrect).length;
      return {
        id: question?.id || String(1200000 + item.index),
        code,
        slug: taskMeta?.slug || 'reading-writing-fill-in-the-blanks',
        skillGroup,
        title: question?.title || passage.title,
        promptText: questionWithBlanks,
        isAttempted: hasBlank,
        skillPills: [{ key: 'R', score: earned, max: blanks.length }],
        modalVariant: 'reading-score-analysis',
        analysisData: {
          kind: 'blanks',
          questionText: questionWithBlanks,
          correctList: blanks.map((b) => b.correct),
          userList,
          timeSpent: '00:32',
        },
      };
    }

    if (code === 'RB') {
      const dd = DRAG_DROP_BANK[item.index % DRAG_DROP_BANK.length];
      const blanks = dd.segments.filter((s) => typeof s !== 'string');
      const questionWithBlanks = dd.segments
        .map((s) => (typeof s === 'string' ? s : '______'))
        .join('');
      const userList = blanks.map((b) => {
        const val = ans?.blankSelections?.[b.id] || '';
        return { value: val || '-', isCorrect: Boolean(val && val === b.correct) };
      });
      const earned = userList.filter((u) => u.isCorrect).length;
      return {
        id: question?.id || String(1100000 + item.index),
        code,
        slug: taskMeta?.slug || 'fill-in-the-blanks',
        skillGroup,
        title: question?.title || dd.title,
        promptText: questionWithBlanks,
        isAttempted: hasBlank,
        skillPills: [{ key: 'R', score: earned, max: blanks.length }],
        modalVariant: 'reading-score-analysis',
        analysisData: {
          kind: 'blanks',
          questionText: questionWithBlanks,
          correctList: blanks.map((b) => b.correct),
          userList,
          timeSpent: '00:54',
        },
      };
    }

    if (code === 'RO') {
      const ro = REORDER_CARD_BANK[item.index % REORDER_CARD_BANK.length];
      const userIds = ans?.reorderTargetIds || [];
      let earnedPairs = 0;
      for (let k = 0; k < userIds.length - 1; k += 1) {
        const pos = ro.correctOrder.indexOf(userIds[k]);
        if (pos >= 0 && ro.correctOrder[pos + 1] === userIds[k + 1]) {
          earnedPairs += 1;
        }
      }
      const letterFor = (cid) => ro.cards.find((c) => c.id === cid)?.letter || 'A';
      const correctLetters = ro.correctOrder.map(letterFor);
      const userLetters = userIds.map((cid, idx) => ({
        letter: letterFor(cid),
        isMatched: ro.correctOrder[idx] === cid,
      }));
      return {
        id: question?.id || String(1000000 + item.index),
        code,
        slug: taskMeta?.slug || 'reorder-paragraphs',
        skillGroup,
        title: question?.title || ro.title,
        promptText,
        isAttempted: userIds.length > 0,
        skillPills: [{ key: 'R', score: earnedPairs, max: ro.correctOrder.length - 1 }],
        modalVariant: 'reading-score-analysis',
        analysisData: {
          kind: 'reorder',
          cards: ro.cards,
          correctLetters,
          userLetters,
          timeSpent: '01:24',
        },
      };
    }

    const mcq = READING_MCQ_PASSAGES[item.index % READING_MCQ_PASSAGES.length];
    const isSingle = code === 'MCS';
    const stem = isSingle ? mcq.singleQuestion : mcq.question;
    const options = isSingle ? mcq.singleOptions : mcq.multiOptions;
    const correctIds = isSingle ? mcq.singleCorrect : mcq.multiCorrect;
    const userIds = ans?.selectedChoices || [];
    const earned = isSingle
      ? userIds[0] && correctIds.includes(userIds[0])
        ? 1
        : 0
      : Math.max(
          0,
          userIds.filter((id) => correctIds.includes(id)).length -
            userIds.filter((id) => !correctIds.includes(id)).length
        );
    return {
      id: question?.id || String(800000 + item.index),
      code,
      slug: taskMeta?.slug || (isSingle ? 'multiple-choice-single' : 'multiple-choice-multiple'),
      skillGroup,
      title: question?.title || `${taskMeta?.title || 'Reading Question'} #${item.index + 1}`,
      promptText: mcq.passage,
      isAttempted: userIds.length > 0,
      skillPills: [{ key: 'R', score: earned, max: correctIds.length }],
      modalVariant: 'reading-score-analysis',
      analysisData: {
        kind: 'mcq',
        passage: mcq.passage,
        stem,
        options,
        correctIds,
        userIds,
        timeSpent: isSingle ? '00:24' : '00:38',
      },
    };
  }

  // Writing: compute SWT (W + R + 4 enabling metrics) and WE / WEM (W + 7 enabling metrics)
  if (skillGroup === 'Writing') {
    const responseText = ans?.responseText?.trim() || '';
    const wordCount = responseText ? responseText.split(/\s+/).length : 0;

    if (code === 'SWT') {
      const validForm = wordCount >= 5 && wordCount <= 75;
      const wScore = validForm ? Math.min(89, Math.max(55, diffBase + seed - 2)) : 0;
      const rScore = validForm ? Math.max(48, wScore - 4) : 0;
      return {
        id: question?.id || String(600000 + item.index),
        code,
        slug: taskMeta?.slug || 'summarize-written-text',
        skillGroup,
        title: question?.title || 'Summarize Written Text',
        promptText,
        isAttempted: wordCount > 0,
        skillPills: [
          { key: 'W', score: wScore, max: 90 },
          { key: 'R', score: rScore, max: 90 },
        ],
        enablingRows: [
          { label: 'Content', score: validForm ? 3 : 0, max: 4 },
          { label: 'Form', score: validForm ? 1 : 0, max: 1 },
          { label: 'Grammar', score: validForm ? 2 : 0, max: 2 },
          { label: 'Vocabulary Range', score: validForm ? 2 : 0, max: 2 },
        ],
        modalVariant: 'writing-ai-score',
        writingMeta: {
          responseText,
          wordCount,
          timeSpent: '01:12',
          englishVariant,
          suggestionsText: validForm
            ? 'Form: Strong concise single-sentence summary within the required 5 - 75 word range.'
            : 'Form: Your response has to be within the word limit of 5 - 75 words only. If this criterion is not met, you won’t get a score in rest of the enabling skills.',
        },
      };
    }

    const isEmail = code === 'WEM';
    const minW = isEmail ? 50 : 120;
    const maxW = isEmail ? 120 : 380;
    const validForm = wordCount >= minW && wordCount <= maxW;
    const wScore = validForm ? Math.min(89, Math.max(55, diffBase + seed - 2)) : 0;

    return {
      id: question?.id || String(700000 + item.index),
      code,
      slug: taskMeta?.slug || (isEmail ? 'write-email' : 'write-essay'),
      skillGroup,
      title: question?.title || (isEmail ? 'Write Email' : 'Write Essay'),
      promptText,
      isAttempted: wordCount > 0,
      skillPills: [{ key: 'W', score: wScore, max: 90 }],
      enablingRows: [
        { label: 'Content', score: validForm ? 5 : 0, max: 6 },
        { label: 'General Linguistic Range', score: validForm ? 5 : 0, max: 6 },
        { label: 'Grammar', score: validForm ? 2 : 0, max: 2 },
        { label: 'Development, Structure & Coherence', score: validForm ? 5 : 0, max: 6 },
        { label: 'Spelling', score: validForm ? 2 : 0, max: 2 },
        { label: 'Vocabulary Range', score: validForm ? 2 : 0, max: 2 },
        { label: 'Form', score: validForm ? 2 : 0, max: 2 },
      ],
      modalVariant: 'writing-ai-score',
      writingMeta: {
        responseText,
        wordCount,
        timeSpent: '00:39',
        englishVariant,
        suggestionsText: isEmail
          ? validForm
            ? 'Form: Well-structured email meeting the 50-120 words target.'
            : 'Form: Your email response has to stay within 50 - 120 words to score in enabling skills.'
          : validForm
            ? 'Form: Balanced academic essay within the recommended 200-300 words target range.'
            : 'Form: Your response has to be within the word limit of 200-300 words. Essays with fewer than 120 words or more than 380 words will not receive a score in any of the enabling skills.',
      },
    };
  }

  // Listening: SST, FIB, MCS, SMW, MCM, HCS, HIW, WFD
  if (skillGroup === 'Listening') {
    if (code === 'SST') {
      const responseText = ans?.responseText?.trim() || '';
      const wordCount = responseText ? responseText.split(/\s+/).length : 0;
      const validForm = wordCount >= 40 && wordCount <= 100;
      const lScore = validForm ? Math.min(89, Math.max(55, diffBase + seed - 2)) : 0;
      const wScore = validForm ? Math.max(50, lScore - 3) : 0;
      return {
        id: question?.id || String(1300000 + item.index),
        code,
        slug: 'summarize-spoken-text',
        skillGroup,
        title: question?.title || 'Summarize Spoken Text',
        promptText,
        hasPromptAudio: true,
        isAttempted: wordCount > 0,
        skillPills: [
          { key: 'L', score: lScore, max: 90 },
          { key: 'W', score: wScore, max: 90 },
        ],
        enablingRows: [
          { label: 'Content', score: validForm ? 3 : 0, max: 4 },
          { label: 'Grammar', score: validForm ? 2 : 0, max: 2 },
          { label: 'Spelling', score: validForm ? 2 : 0, max: 2 },
          { label: 'Vocabulary Range', score: validForm ? 2 : 0, max: 2 },
          { label: 'Form', score: validForm ? 2 : 0, max: 2 },
        ],
        modalVariant: 'sst-ai-score',
        writingMeta: {
          responseText,
          wordCount,
          timeSpent: '01:56',
          audioDuration: '01:06',
          englishVariant,
          suggestionsText: validForm
            ? 'Form: Well-paced summary within the target word limit.'
            : 'Form: Your response has to be within the word limit of 50-70 words. Summaries with fewer than 40 words or more than 100 words will not receive a score in any of the enabling skills.',
        },
      };
    }

    if (code === 'WFD') {
      const targetEntry =
        LISTENING_DICTATION_SENTENCES[item.index % LISTENING_DICTATION_SENTENCES.length];
      const targetSentence = targetEntry.sentence;
      const cleanTarget = targetSentence.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);
      const userRaw = ans?.responseText?.trim() || '';
      const userWords = userRaw.replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean);
      const lowerSet = new Set(userWords.map((w) => w.toLowerCase()));
      const targetLowerSet = new Set(cleanTarget.map((w) => w.toLowerCase()));

      const matched = cleanTarget.filter((w) => lowerSet.has(w.toLowerCase()));
      const missed = cleanTarget.filter((w) => !lowerSet.has(w.toLowerCase()));
      const extra = userWords.filter((w) => !targetLowerSet.has(w.toLowerCase()));
      const earned = Math.max(0, matched.length - extra.length);
      const maxW = cleanTarget.length;

      return {
        id: question?.id || String(2000000 + item.index),
        code,
        slug: 'write-from-dictation',
        skillGroup,
        title: targetEntry.title || question?.title || `WFD${3480 + item.index}`,
        promptText: targetSentence,
        hasPromptAudio: true,
        isAttempted: Boolean(userRaw),
        skillPills: [
          { key: 'L', score: earned, max: maxW },
          { key: 'W', score: earned, max: maxW },
        ],
        modalVariant: 'wfd-ai-score',
        wfdData: {
          correctSentence: targetSentence,
          userRaw,
          matchedWords: matched,
          missedWords: missed,
          extraWords: extra,
          missingCap: !userRaw || userRaw[0] !== userRaw[0]?.toUpperCase(),
          missingPeriod: !userRaw.endsWith('.'),
          minutes: '00',
          seconds: '47',
          audioDuration: '00:04',
        },
      };
    }

    if (code === 'FIB') {
      const fibEntry = LISTENING_TYPED_BLANKS_PASSAGES[item.index % LISTENING_TYPED_BLANKS_PASSAGES.length];
      const blanks = fibEntry.segments.filter((s) => typeof s !== 'string');
      const questionWithBlanks = fibEntry.segments
        .map((s) => (typeof s === 'string' ? s : '______'))
        .join('');
      const userList = blanks.map((b, idx) => {
        const expected = fibEntry.answers[idx];
        const given = ans?.blankSelections?.[b.id]?.trim() || '';
        return {
          value: given || '-',
          isCorrect: Boolean(given && given.toLowerCase() === expected.toLowerCase()),
        };
      });
      const earned = userList.filter((u) => u.isCorrect).length;
      return {
        id: question?.id || String(1500000 + item.index),
        code,
        slug: 'fill-in-the-blanks',
        skillGroup,
        title: fibEntry.title,
        promptText: questionWithBlanks,
        hasPromptAudio: true,
        isAttempted: hasBlank,
        skillPills: [{ key: 'L', score: earned, max: blanks.length }],
        modalVariant: 'listening-score-analysis',
        analysisData: {
          kind: 'blanks',
          questionText: questionWithBlanks,
          correctList: fibEntry.answers,
          userList,
          audioDuration: '00:41',
          timeSpent: '00:03',
        },
      };
    }

    if (code === 'HIW') {
      const hiwEntry =
        HIGHLIGHT_INCORRECT_WORDS_PASSAGES[item.index % HIGHLIGHT_INCORRECT_WORDS_PASSAGES.length];
      const allWords = hiwEntry.paragraphs.join(' ').split(/\s+/).filter(Boolean);
      const replaceIndices = Object.keys(hiwEntry.replacements).map(Number);
      const userIndices = ans?.highlightedWords || [];
      const correctPicked = userIndices.filter((i) => replaceIndices.includes(i));
      const wrongPicked = userIndices.filter((i) => !replaceIndices.includes(i));
      const lEarned = Math.max(0, correctPicked.length - wrongPicked.length);
      const rMax = Math.max(1, replaceIndices.length - 3);
      const rEarned = Math.min(rMax, lEarned);

      const paragraphWordGroups = hiwEntry.paragraphs.reduce((acc, para) => {
        const offset = acc.length > 0 ? acc[acc.length - 1].endOffset : 0;
        const words = para.split(/\s+/).filter(Boolean);
        acc.push({
          tokens: words.map((w, idx) => ({
            word: w,
            replacement: hiwEntry.replacements[offset + idx] || null,
          })),
          endOffset: offset + words.length,
        });
        return acc;
      }, []);

      return {
        id: question?.id || String(1600000 + item.index),
        code,
        slug: 'highlight-incorrect-words',
        skillGroup,
        title: hiwEntry.title,
        promptText: hiwEntry.paragraphs.join(' '),
        hasPromptAudio: true,
        isAttempted: userIndices.length > 0,
        skillPills: [
          { key: 'L', score: lEarned, max: replaceIndices.length },
          { key: 'R', score: rEarned, max: rMax },
        ],
        modalVariant: 'listening-score-analysis',
        analysisData: {
          kind: 'hiw',
          paragraphWordGroups,
          correctList: replaceIndices.map((idx) =>
            (allWords[idx] || '').replace(/[.,":?]/g, '')
          ),
          userList: userIndices.map((idx) => ({
            value: allWords[idx] || '-',
            isCorrect: replaceIndices.includes(idx),
          })),
          audioDuration: '01:02',
          timeSpent: '00:07',
        },
      };
    }

    const bankList = LISTENING_CHOICE_BANK[taskMeta?.slug] || LISTENING_CHOICE_BANK['multiple-choice-single'];
    const choiceEntry = bankList[item.index % bankList.length];
    const userIds = ans?.selectedChoices || [];
    const correctIds = choiceEntry.correctIds || ['A'];
    const isHcs = code === 'HCS';
    const isMulti = code === 'MCM';
    const earned = isMulti
      ? Math.max(
          0,
          userIds.filter((id) => correctIds.includes(id)).length -
            userIds.filter((id) => !correctIds.includes(id)).length
        )
      : userIds[0] && correctIds.includes(userIds[0])
        ? 1
        : 0;

    return {
      id: question?.id || String(1700000 + item.index),
      code,
      slug: taskMeta?.slug || 'multiple-choice-single',
      skillGroup,
      title: choiceEntry.title || question?.title || taskMeta?.title,
      promptText: choiceEntry.speech || promptText,
      hasPromptAudio: true,
      isAttempted: userIds.length > 0,
      skillPills: isHcs
        ? [
            { key: 'L', score: earned, max: 1 },
            { key: 'R', score: earned, max: 1 },
          ]
        : [{ key: 'L', score: earned, max: correctIds.length }],
      modalVariant: 'listening-score-analysis',
      analysisData: {
        kind: isHcs ? 'hcs' : 'mcq',
        stem: choiceEntry.stem || '',
        options: choiceEntry.options || [],
        correctIds,
        userIds,
        audioDuration: isHcs ? '01:29' : code === 'MCM' ? '02:18' : '01:08',
        timeSpent: isHcs ? '00:02' : '00:14',
      },
    };
  }

  let skillPills = [{ key: skillGroup[0], score: baseVal, max: 90 }];
  if (code === 'RS' || code === 'RL' || code === 'SGD') {
    skillPills = [
      { key: 'S', score: baseVal, max: 90 },
      { key: 'L', score: isAttempted ? Math.max(45, baseVal - 3) : 0, max: 90 },
    ];
  } else if (code === 'ASQ') {
    skillPills = [{ key: 'L', score: isAttempted ? 1 : 0, max: 1 }];
  }

  const enablingRows = [
    { label: 'Content', score: isAttempted ? Math.min(90, baseVal + 2) : 0, max: 90 },
    { label: 'Fluency', score: isAttempted ? Math.max(45, baseVal - 2) : 0, max: 90 },
    { label: 'Pronunciation', score: isAttempted ? baseVal : 0, max: 90 },
  ];

  const responseSummary = isAttempted ? 'Audio response captured cleanly.' : '';

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
    hasPromptAudio: Boolean(taskMeta?.hasAudioPrompt),
    showPromptTextInModal: code === 'RTS',
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

function defaultQuestionTimeSeconds(code, isAttempted, idx) {
  const baseByCode = {
    SST: 465,
    WE: 420,
    WEM: 420,
    SWT: 310,
    RO: 96,
    FIB: 77,
    RWB: 95,
    RB: 68,
    HCS: 124,
    HIW: 76,
    MCM: 104,
    MCS: 66,
    SMW: 73,
    WFD: 44,
    SGD: 165,
    RL: 112,
    RTS: 74,
    DI: 64,
    RA: 58,
    RS: 22,
    ASQ: 18,
  };
  const base = baseByCode[code] || 48;
  const jitter = ((idx * 13) % 19) - 9;
  return Math.max(12, Math.round((isAttempted ? base : base * 0.88) + jitter));
}

/**
 * Produces an authentic scorecard payload with per-question AI diagnostic items
 * and section timing metrics from completed mock test answers.
 */
export function buildMockAttemptScore(testItem, session, trackLabel, isCore = false) {
  const queue = buildMockExamQueue(testItem, isCore);
  const diffBase = testItem.difficulty === 'Easy' ? 74 : testItem.difficulty === 'Difficult' ? 66 : 70;
  const questionResults = queue.map((item) => {
    const ans = session?.answersByIndex?.[item.index];
    const raw = buildQuestionScoreResult(item, ans, diffBase, session?.writingStyle);
    const timeSpentSeconds =
      Number(ans?.timeSpentSeconds) > 0
        ? Number(ans.timeSpentSeconds)
        : defaultQuestionTimeSeconds(raw.code, raw.isAttempted, item.index);
    const formattedTime = formatMMSS(timeSpentSeconds);
    return {
      ...raw,
      timeSpentSeconds,
      writingMeta: raw.writingMeta ? { ...raw.writingMeta, timeSpent: formattedTime } : undefined,
      analysisData: raw.analysisData ? { ...raw.analysisData, timeSpent: formattedTime } : undefined,
      wfdData: raw.wfdData
        ? { ...raw.wfdData, minutes: formattedTime.slice(0, 2), seconds: formattedTime.slice(3, 5) }
        : undefined,
    };
  });

  const avgSkillFromResults = (skill) => {
    const items = questionResults.filter((r) => r.skillGroup === skill);
    if (items.length === 0) return null;
    const sum = items.reduce((acc, r) => {
      const p = r.skillPills?.[0];
      if (!p || !p.max) return acc;
      return acc + Math.round((p.score / p.max) * 90);
    }, 0);
    return Math.max(10, Math.round(sum / items.length));
  };

  const isSectional = testItem.mode === 'sectional' || testItem.mode === 'timed';
  const targetSkill = testItem.skill || 'Speaking';
  const computeSectionalTarget = () => {
    const initialKey = targetSkill[0];
    const sum = questionResults.reduce((acc, r) => {
      const match = r.skillPills?.find((p) => p.key === initialKey) || r.skillPills?.[0];
      if (!match || !match.max) return acc;
      return acc + Math.round((match.score / match.max) * 90);
    }, 0);
    return questionResults.length ? Math.max(10, Math.round(sum / questionResults.length)) : 12;
  };

  const speaking = isSectional
    ? targetSkill === 'Speaking'
      ? computeSectionalTarget()
      : null
    : avgSkillFromResults('Speaking');
  const writing = isSectional
    ? targetSkill === 'Writing'
      ? computeSectionalTarget()
      : null
    : avgSkillFromResults('Writing');
  const reading = isSectional
    ? targetSkill === 'Reading'
      ? computeSectionalTarget()
      : null
    : avgSkillFromResults('Reading');
  const listening = isSectional
    ? targetSkill === 'Listening'
      ? computeSectionalTarget()
      : null
    : avgSkillFromResults('Listening');
  const activeVals = [speaking, writing, reading, listening].filter((v) => v !== null);
  const overall = activeVals.length
    ? Math.max(10, Math.round(activeVals.reduce((a, b) => a + b, 0) / activeVals.length))
    : 12;

  const breakdown = getMockTestPartBreakdown(testItem, isCore);
  const totalAllowedSeconds = breakdown.totalMinutes * 60;
  const hasRecordedTime = Object.values(session?.answersByIndex || {}).some(
    (a) => Number(a?.timeSpentSeconds) > 0
  );
  const summedQuestionSeconds = questionResults.reduce(
    (acc, r) => acc + (Number(r.timeSpentSeconds) || 0),
    0
  );
  const elapsedSeconds = hasRecordedTime
    ? Math.max(
        1,
        Math.min(
          totalAllowedSeconds,
          totalAllowedSeconds - Math.max(0, Number(session?.remainingSeconds) || 0)
        )
      )
    : Math.max(60, Math.min(totalAllowedSeconds, summedQuestionSeconds));

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
    elapsedSeconds,
    totalAllowedSeconds,
    questionResults,
    completedAt: new Date().toISOString(),
  };
}
