const READ_ALOUD_SEED_ROWS = [
  { id: '1001648', title: 'Returning Book', difficulty: 'Medium', prediction: false, practicedCount: 1, appearedCount: 128 },
  { id: '1001647', title: 'Smart Cooking', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 86 },
  { id: '1001646', title: 'Community Gardening', difficulty: 'Medium', prediction: false, practicedCount: 1, appearedCount: 116 },
  { id: '1001645', title: 'Visit to Canada', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 284 },
  { id: '1001644', title: 'Road Bicycle Racing', difficulty: 'Medium', prediction: false, practicedCount: 1, appearedCount: 17 },
  { id: '1001643', title: 'Coconut Oil', difficulty: 'Medium', prediction: false, practicedCount: 1, appearedCount: 12 },
  { id: '1001642', title: 'Shrimp Farmers-V2', difficulty: 'Difficult', prediction: false, practicedCount: 1, appearedCount: 14 },
  { id: '1001641', title: 'Teamwork', difficulty: 'Medium', prediction: false, practicedCount: 1, appearedCount: 10 },
  { id: '1001640', title: 'Honey Bees', difficulty: 'Medium', prediction: false, practicedCount: 1, appearedCount: 9 },
  { id: '1001639', title: 'Methane', difficulty: 'Medium', prediction: false, practicedCount: 1, appearedCount: 5 },
];

const REPEAT_SENTENCE_SEED_ROWS = [
  {
    id: '2003380',
    title: 'RS3380',
    difficulty: 'Medium',
    isNew: true,
    newPrediction: true,
    practicedCount: 0,
    appearedCount: 51,
    contentSnippet: 'All laboratory equipment must be calibrated before the afternoon chemistry seminar begins.',
  },
  {
    id: '2003379',
    title: 'RS3379',
    difficulty: 'Medium',
    isNew: true,
    newPrediction: true,
    practicedCount: 0,
    appearedCount: 50,
    contentSnippet: 'Students submitting dissertations early qualify for priority reference library access.',
  },
  {
    id: '2003378',
    title: 'RS3378',
    difficulty: 'Medium',
    prediction: true,
    practicedCount: 1,
    appearedCount: 57,
    contentSnippet: 'Urban greenways significantly lower peak summer temperatures along crowded avenues.',
  },
  {
    id: '2003377',
    title: 'RS3377',
    difficulty: 'Medium',
    practicedCount: 1,
    appearedCount: 3,
    contentSnippet: 'The engineering faculty announced an optional workshop on renewable microgrids.',
  },
  {
    id: '2003376',
    title: 'RS3376',
    difficulty: 'Medium',
    practicedCount: 2,
    appearedCount: 51,
    contentSnippet: 'Accurate weather forecasting relies on satellite imaging and ocean buoy sensors.',
  },
  {
    id: '2003375',
    title: 'RS3375',
    difficulty: 'Medium',
    practicedCount: 2,
    appearedCount: 54,
    contentSnippet: 'Peer review ensures experimental data can be reproduced by independent researchers.',
  },
  {
    id: '2003374',
    title: 'RS3374',
    difficulty: 'Medium',
    practicedCount: 7,
    appearedCount: 6,
    contentSnippet: 'Please return all borrowed reference volumes to the main desk before Friday.',
  },
  {
    id: '2003373',
    title: 'RS3373',
    difficulty: 'Medium',
    practicedCount: 1,
    appearedCount: 7,
    contentSnippet: 'Freshwater aquifers replenish slowly compared with seasonal surface reservoirs.',
  },
  {
    id: '2003372',
    title: 'RS3372',
    difficulty: 'Medium',
    practicedCount: 6,
    appearedCount: 7,
    contentSnippet: 'Clear visual charts allow policy makers to compare regional employment trends.',
  },
  {
    id: '2003371',
    title: 'RS3371',
    difficulty: 'Medium',
    prediction: true,
    practicedCount: 9,
    appearedCount: 55,
    contentSnippet: 'Museum visitors may explore the newly restored maritime gallery this weekend.',
  },
];

const SAMPLE_TOPIC_WORDS = [
  'Urban Transit',
  'Marine Ecosystems',
  'Digital Libraries',
  'Renewable Grids',
  'Soil Microbiology',
  'Workplace Communication',
  'Coastal Protection',
  'Memory Consolidation',
  'Public Health',
  'Supply Chain Design',
  'Solar Storage',
  'Remote Collaboration',
];

const SKILL_BADGE_COLORS = {
  speaking: '#eb8c44',
  writing: '#5ba4f5',
  reading: '#22c55e',
  listening: '#0b4a7b',
};

const DIFFICULTIES = ['Easy', 'Medium', 'Difficult'];

export const PRACTICE_TASKS_BY_KEY = {
  'speaking/read-aloud': {
    skill: 'speaking',
    slug: 'read-aloud',
    code: 'RA',
    title: 'Read Aloud',
    totalQuestions: 1552,
    startId: 1001648,
    continueItem: { id: '1001234', title: 'Social Media' },
    instruction: 'Look at the text below. In 35 seconds, you must read this text aloud as naturally and clearly as possible. You have 35 seconds to read aloud.',
    promptText:
      'Returning borrowed library materials before the due date keeps high-demand academic collections accessible for every student enrolled in foundational research courses across the faculty.',
    seedRows: READ_ALOUD_SEED_ROWS,
  },
  'speaking/repeat-sentence': {
    skill: 'speaking',
    slug: 'repeat-sentence',
    code: 'RS',
    title: 'Repeat Sentence',
    totalQuestions: 3174,
    startId: 2003380,
    continueItem: { id: '2001147', title: 'RS1147' },
    supportsDisplayContent: true,
    hasAudioPrompt: true,
    instruction: 'You will hear a sentence. Please repeat the sentence exactly as you hear it. You will hear the sentence only once.',
    promptText: 'All laboratory equipment must be calibrated before the afternoon chemistry seminar begins.',
    seedRows: REPEAT_SENTENCE_SEED_ROWS,
  },
  'speaking/describe-image': {
    skill: 'speaking',
    slug: 'describe-image',
    code: 'DI',
    title: 'Describe Image',
    totalQuestions: 1207,
    startId: 3001207,
    continueItem: { id: '3000912', title: 'Global Solar Share' },
    instruction: 'Look at the chart below. In 25 seconds, please speak into the microphone and describe in detail what the chart is showing.',
    promptText: 'Chart comparison: Renewable Energy Capacity Growth across Wind, Solar, and Hydro from 2018 to 2026.',
  },
  'speaking/retell-lecture': {
    skill: 'speaking',
    slug: 'retell-lecture',
    code: 'RL',
    title: 'Re-Tell Lecture',
    totalQuestions: 578,
    startId: 4000578,
    continueItem: { id: '4000410', title: 'Deep Ocean Currents' },
    instruction: 'You will hear a lecture. After listening to the lecture, in 10 seconds, please speak into the microphone and retell what you have just heard from the lecture in your own words.',
    promptText: 'Audio Lecture Topic: Thermohaline circulation patterns and regional climate moderation.',
  },
  'speaking/answer-short-question': {
    skill: 'speaking',
    slug: 'answer-short-question',
    code: 'ASQ',
    title: 'Answer Short Question',
    totalQuestions: 1946,
    startId: 5001946,
    continueItem: { id: '5001522', title: 'Thermometer Scale' },
    instruction: 'You will hear a question. Please give a simple and short answer. Often just one or a few words is enough.',
    promptText: 'What instrument do meteorologists use to measure atmospheric pressure?',
  },
  'speaking/summarize-group-discussion': {
    skill: 'speaking',
    slug: 'summarize-group-discussion',
    code: 'SGD',
    title: 'Summarize Group Discussion',
    totalQuestions: 199,
    startId: 6000199,
    continueItem: { id: '6000142', title: 'Hybrid Campus Policy' },
    instruction: 'You will hear a group discussion among three speakers. Summarize the main viewpoints and conclusion clearly in your own words.',
    promptText: 'Discussion prompt: Balancing in-person lab collaboration with flexible recorded lectures.',
  },
  'speaking/respond-to-a-situation': {
    skill: 'speaking',
    slug: 'respond-to-a-situation',
    code: 'RTS',
    title: 'Respond to a Situation',
    totalQuestions: 360,
    startId: 7000360,
    continueItem: { id: '7000284', title: 'Rescheduling Appointment' },
    instruction: 'Listen to and read a description of a situation. You will have 10 seconds to prepare and 40 seconds to speak an appropriate response.',
    promptText: 'You ordered office supplies for a community event tomorrow morning, but the delivery just arrived with two missing boxes. Call the supplier politely to resolve this before closing time.',
  },
  'writing/summarize-written-text': {
    skill: 'writing',
    slug: 'summarize-written-text',
    code: 'SWT',
    title: 'Summarize Written Text',
    totalQuestions: 390,
    coreTotalQuestions: 300,
    startId: 8000390,
    continueItem: { id: '8000215', title: 'Urban Canopy Cooling' },
    instruction: 'Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of the screen.',
    promptText:
      'Municipal tree-planting initiatives reduce summer surface temperatures in dense neighbourhoods while filtering airborne particulates and lowering peak household cooling demand.',
  },
  'writing/write-essay': {
    skill: 'writing',
    slug: 'write-essay',
    code: 'WE',
    title: 'Write Essay',
    totalQuestions: 521,
    startId: 8500521,
    continueItem: { id: '8500401', title: 'Public Transit Subsidies' },
    instruction: 'You will have 20 minutes to plan, write and revise an essay about the topic below. Write 200–300 words.',
    promptText:
      'Some cities offer free public transportation to reduce traffic congestion and carbon emissions. Discuss whether the economic benefits outweigh the funding costs.',
  },
  'writing/write-email': {
    skill: 'writing',
    slug: 'write-email',
    code: 'WEM',
    title: 'Write Email',
    totalQuestions: 311,
    startId: 8800311,
    continueItem: { id: '8800209', title: 'Conference Room Booking' },
    instruction: 'You have 9 minutes to read the prompt and write an email (50–120 words) covering all three requested points cleanly.',
    promptText:
      'You recently attended a workplace training workshop and noticed a broken projector in Room B. Write an email to the facilities coordinator describing the room issue, session impact, and request for inspection before Monday.',
  },
  'reading/reading-writing-fill-in-the-blanks': {
    skill: 'reading',
    slug: 'reading-writing-fill-in-the-blanks',
    code: 'FIB(D)',
    title: 'Reading & Writing: Fill in the Blanks',
    totalQuestions: 980,
    coreTotalQuestions: 950,
    startId: 9000980,
    continueItem: { id: '9000740', title: 'Microplastic Filtration' },
    instruction: 'Below is a text with blanks. Click on each blank, a list of choices will appear. Select the appropriate answer choice for each blank.',
    promptText:
      'Clean-water engineers rely on multi-stage membrane filtration to [separate] fine suspended particles from municipal reservoirs before distribution.',
  },
  'reading/multiple-choice-multiple': {
    skill: 'reading',
    slug: 'multiple-choice-multiple',
    code: 'MCM',
    title: 'Multiple Choice, Multiple Answers',
    totalQuestions: 420,
    coreTotalQuestions: 410,
    startId: 9100420,
    continueItem: { id: '9100302', title: 'Early Printing Presses' },
    instruction: 'Read the text and answer the question by selecting all the correct responses. More than one response is correct.',
    promptText: 'Which TWO historical factors accelerated book affordability across sixteenth-century European towns?',
  },
  'reading/reorder-paragraphs': {
    skill: 'reading',
    slug: 'reorder-paragraphs',
    code: 'RO',
    title: 'Re-order Paragraphs',
    totalQuestions: 645,
    coreTotalQuestions: 615,
    startId: 9200645,
    continueItem: { id: '9200512', title: 'Glacier Core Sampling' },
    instruction: 'The text boxes below have been placed in a random order. Restore the original order cleanly.',
    promptText: 'Arrange statements A–D into logical chronological order describing Antarctic ice-core dating.',
  },
  'reading/fill-in-the-blanks': {
    skill: 'reading',
    slug: 'fill-in-the-blanks',
    code: 'FIB(DD)',
    title: 'Reading: Fill in the Blanks',
    totalQuestions: 967,
    coreTotalQuestions: 898,
    startId: 9300967,
    continueItem: { id: '9300811', title: 'Pollination Networks' },
    instruction: 'In the text below some words are missing. Drag words from the box below to the appropriate place in the text.',
    promptText: 'Healthy pollinator habitats [strengthen] crop resilience and [stabilize] seasonal orchard yields.',
  },
  'reading/multiple-choice-single': {
    skill: 'reading',
    slug: 'multiple-choice-single',
    code: 'MCS',
    title: 'Multiple Choice, Single Answer',
    totalQuestions: 490,
    coreTotalQuestions: 460,
    startId: 9400490,
    continueItem: { id: '9400350', title: 'Architectural Acoustics' },
    instruction: 'Read the text and answer the multiple-choice question by selecting the correct response. Only one response is correct.',
    promptText: 'What is the main reason the author mentions timber baffle panels in Paragraph 2?',
  },
  'listening/summarize-spoken-text': {
    skill: 'listening',
    slug: 'summarize-spoken-text',
    code: 'SST',
    title: 'Summarize Spoken Text',
    totalQuestions: 612,
    coreTotalQuestions: 580,
    startId: 9500612,
    continueItem: { id: '9500488', title: 'Battery Recycling Loops' },
    instruction: 'You will hear a short audio recording. Write a concise summary of what you heard covering all key points.',
    promptText: 'Audio Lecture: Closed-loop lithium recovery reduces raw ore extraction pressure.',
  },
  'listening/multiple-choice-multiple': {
    skill: 'listening',
    slug: 'multiple-choice-multiple',
    code: 'L:MCM',
    title: 'Multiple Choice, Multiple Answers',
    totalQuestions: 480,
    coreTotalQuestions: 450,
    startId: 9600480,
    continueItem: { id: '9600399', title: 'Museum Lighting Update' },
    instruction: 'Listen to the recording and answer the question by selecting all the correct responses.',
    promptText: 'Which objectives did the curator mention regarding archival gallery lighting?',
  },
  'listening/fill-in-the-blanks': {
    skill: 'listening',
    slug: 'fill-in-the-blanks',
    code: 'L:FIB',
    title: 'Fill in the Blanks',
    totalQuestions: 1120,
    coreTotalQuestions: 1080,
    startId: 9701120,
    continueItem: { id: '9700914', title: 'Botanical Classification' },
    instruction: 'You will hear a recording. Type the missing words directly into each blank as you listen.',
    promptText: 'Modern taxonomy relies on genetic [sequencing] alongside morphological [traits] observed in herbarium specimens.',
  },
  'listening/highlight-correct-summary': {
    skill: 'listening',
    slug: 'highlight-correct-summary',
    code: 'HCS',
    title: 'Highlight Correct Summary',
    totalQuestions: 410,
    startId: 9750410,
    continueItem: { id: '9750290', title: 'Tidal Barrage Engineering' },
    instruction: 'You will hear a recording. Select the paragraph that best relates to the recording.',
    promptText: 'Select the option that accurately summarizes the speaker’s comparison of tidal lagoons and turbines.',
  },
  'listening/multiple-choice-single': {
    skill: 'listening',
    slug: 'multiple-choice-single',
    code: 'L:MCS',
    title: 'Multiple Choice, Single Answer',
    totalQuestions: 395,
    coreTotalQuestions: 390,
    startId: 9800395,
    continueItem: { id: '9800280', title: 'Regional Rail Punctuality' },
    instruction: 'Listen to the recording and select the single best answer choice.',
    promptText: 'Why did the transport planner postpone the express timetable revision?',
  },
  'listening/select-missing-word': {
    skill: 'listening',
    slug: 'select-missing-word',
    code: 'SMW',
    title: 'Select Missing Word',
    totalQuestions: 460,
    coreTotalQuestions: 450,
    startId: 9850460,
    continueItem: { id: '9850318', title: 'Podcast Audio Mixing' },
    instruction: 'You will hear a recording in which the last word or group of words has been replaced by a beep. Select the best option to complete the recording.',
    promptText: 'Audio prompt concludes with a brief tone after discussing acoustic feedback control.',
  },
  'listening/highlight-incorrect-words': {
    skill: 'listening',
    slug: 'highlight-incorrect-words',
    code: 'HIW',
    title: 'Highlight Incorrect Words',
    totalQuestions: 890,
    coreTotalQuestions: 888,
    startId: 9900890,
    continueItem: { id: '9900712', title: 'Coastal Salt Marshes' },
    instruction: 'You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker said. Click on the words that differ.',
    promptText: 'Coastal salt marshes shelter juvenile fish and absorb storm surges along low-lying estuaries.',
  },
  'listening/write-from-dictation': {
    skill: 'listening',
    slug: 'write-from-dictation',
    code: 'WFD',
    title: 'Write from Dictation',
    totalQuestions: 1630,
    coreTotalQuestions: 1580,
    startId: 9951630,
    continueItem: { id: '9951305', title: 'Research Ethics Deadline' },
    instruction: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it.',
    promptText: 'Every research proposal must include a clear schedule and measurable evaluation criteria.',
  },
};

export function resolvePracticeTask(skill, taskSlug, isCoreMode = false) {
  const key = `${skill || 'speaking'}/${taskSlug || 'read-aloud'}`;
  const raw = PRACTICE_TASKS_BY_KEY[key] || PRACTICE_TASKS_BY_KEY['speaking/read-aloud'];
  const totalQuestions =
    isCoreMode && raw.coreTotalQuestions ? raw.coreTotalQuestions : raw.totalQuestions;

  const isAudioListeningTask =
    raw.hasAudioPrompt ||
    raw.skill === 'listening' ||
    ['repeat-sentence', 'retell-lecture', 'answer-short-question', 'summarize-group-discussion', 'respond-to-a-situation'].includes(raw.slug);

  const isShortCodeTask =
    raw.supportsDisplayContent ||
    ['repeat-sentence', 'answer-short-question', 'write-from-dictation'].includes(raw.slug);

  return {
    ...raw,
    totalQuestions,
    hasAudioPrompt: isAudioListeningTask,
    supportsDisplayContent: isShortCodeTask,
    badgeColor: SKILL_BADGE_COLORS[raw.skill] || '#eb8c44',
  };
}

/**
 * Builds deterministic paginated catalog entries for a given task without bloating memory.
 */
export function buildTaskQuestionList(taskMeta) {
  const seeded = taskMeta.seedRows || [];
  const total = Math.min(taskMeta.totalQuestions, 300);
  const items = [];

  for (let idx = 0; idx < total; idx += 1) {
    if (idx < seeded.length) {
      items.push({ ...seeded[idx], bookmarked: false });
      continue;
    }

    const idNum = taskMeta.startId - idx;
    const topic = SAMPLE_TOPIC_WORDS[idx % SAMPLE_TOPIC_WORDS.length];
    const difficulty = DIFFICULTIES[(idx + 1) % DIFFICULTIES.length];
    const isNew = idx < 2;
    const newPrediction = isNew;
    const prediction = !newPrediction && idx % 3 === 1;
    const practicedCount = idx < 18 ? (idx % 5) + 1 : 0;
    const appearedCount = ((idx * 17) % 140) + 3;

    items.push({
      id: String(idNum),
      title: taskMeta.slug === 'repeat-sentence' ? `RS${3380 - idx}` : `${topic} ${taskMeta.code}-${total - idx}`,
      difficulty,
      isNew,
      newPrediction,
      prediction,
      practicedCount,
      appearedCount,
      contentSnippet: `Practice statement covering ${topic.toLowerCase()} for ${taskMeta.title}.`,
      bookmarked: false,
    });
  }

  return items;
}
