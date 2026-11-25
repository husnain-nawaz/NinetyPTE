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

const DESCRIBE_IMAGE_SEED_ROWS = [
  { id: '3001451', title: 'Household of Pet', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 63, imageType: 'Bar Chart' },
  { id: '3001449', title: 'Music Streaming', difficulty: 'Medium', isNew: true, prediction: true, practicedCount: 0, appearedCount: 50, imageType: 'Line Graph' },
  { id: '3001448', title: 'Pet Expenditure', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 1, imageType: 'Pie Chart' },
  { id: '3001447', title: 'Overseas Visitors', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 2, imageType: 'Line Graph' },
  { id: '3001446', title: 'River Water Speed', difficulty: 'Medium', isNew: true, prediction: true, practicedCount: 1, appearedCount: 87, imageType: 'Process Diagram' },
  { id: '3001445', title: 'Apartment and House', difficulty: 'Medium', isNew: true, prediction: true, practicedCount: 1, appearedCount: 35, imageType: 'Bar Chart' },
  { id: '3001444', title: 'Leisure Time', difficulty: 'Medium', practicedCount: 1, appearedCount: 1, imageType: 'Pie Chart' },
  { id: '3001443', title: 'Taiwan Bicycle Production', difficulty: 'Medium', practicedCount: 1, appearedCount: 0, imageType: 'Table' },
  { id: '3001442', title: 'Sport Participants', difficulty: 'Medium', practicedCount: 1, appearedCount: 0, imageType: 'Bar Chart' },
  { id: '3001439', title: 'Types of Dwellings', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 53, imageType: 'Pie Chart' },
];

const RETELL_LECTURE_SEED_ROWS = [
  { id: '4000604', title: 'Biological Factors', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 60, questionType: 'Audio Only' },
  { id: '4000603', title: 'Four Dimensions', difficulty: 'Medium', practicedCount: 1, appearedCount: 59, questionType: 'Audio + Slide' },
  { id: '4000602', title: 'Increased Productivity', difficulty: 'Medium', practicedCount: 2, appearedCount: 6, questionType: 'Audio Only' },
  { id: '4000601', title: 'Pragmatism', difficulty: 'Medium', practicedCount: 9, appearedCount: 5, questionType: 'Video Lecture' },
  { id: '4000599', title: 'Part Time Job', difficulty: 'Medium', practicedCount: 3, appearedCount: 60, questionType: 'Audio Only' },
  { id: '4000597', title: 'Gas Giants', difficulty: 'Medium', practicedCount: 1, appearedCount: 73, questionType: 'Audio + Slide' },
  { id: '4000596', title: 'Television', difficulty: 'Medium', practicedCount: 0, appearedCount: 4, questionType: 'Audio Only' },
  { id: '4000595', title: 'Shy Fish', difficulty: 'Difficult', practicedCount: 1, appearedCount: 108, questionType: 'Video Lecture' },
  { id: '4000594', title: 'Practice', difficulty: 'Medium', prediction: true, practicedCount: 2, appearedCount: 112, questionType: 'Audio Only' },
  { id: '4000593', title: 'Dissociation of Personalities', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 107, questionType: 'Audio + Slide' },
];

const ANSWER_SHORT_QUESTION_SEED_ROWS = [
  { id: '5002001', title: 'ASQ2001', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0, contentSnippet: 'What instrument do meteorologists use to measure atmospheric pressure? (Barometer)' },
  { id: '5002000', title: 'ASQ2000', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0, contentSnippet: 'What do we call a period of ten consecutive years? (Decade)' },
  { id: '5001999', title: 'ASQ1999', difficulty: 'Medium', isNew: true, prediction: true, practicedCount: 0, appearedCount: 51, contentSnippet: 'Which organ in the human body pumps blood through the circulatory system? (Heart)' },
  { id: '5001998', title: 'ASQ1998', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 50, contentSnippet: 'What do you call the document needed to travel between different countries? (Passport)' },
  { id: '5001997', title: 'ASQ1997', difficulty: 'Medium', practicedCount: 0, appearedCount: 51, contentSnippet: 'How many sides does an octagon have? (Eight)' },
  { id: '5001996', title: 'ASQ1996', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 50, contentSnippet: 'What is the opposite direction of sunrise? (West)' },
  { id: '5001995', title: 'ASQ1995', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 50, contentSnippet: 'Which scientist studies rocks, minerals, and Earth’s crust? (Geologist)' },
  { id: '5001994', title: 'ASQ1994', difficulty: 'Medium', practicedCount: 0, appearedCount: 50, contentSnippet: 'What do we call a list of chapters shown at the front of a book? (Table of contents)' },
  { id: '5001993', title: 'ASQ1993', difficulty: 'Medium', practicedCount: 0, appearedCount: 0, contentSnippet: 'Which month immediately follows August? (September)' },
  { id: '5001992', title: 'ASQ1992', difficulty: 'Medium', practicedCount: 0, appearedCount: 0, contentSnippet: 'What freezing temperature in Celsius turns water into ice? (Zero degrees)' },
];

const SUMMARIZE_GROUP_DISCUSSION_SEED_ROWS = [
  { id: '26000203', title: 'Study Places', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '26000202', title: 'A Trip to Iceland', difficulty: 'Medium', practicedCount: 1, appearedCount: 1 },
  { id: '26000199', title: 'Course Selection', difficulty: 'Medium', practicedCount: 0, appearedCount: 2 },
  { id: '26000198', title: 'Time Management', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
  { id: '26000197', title: 'Group Discussions', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
  { id: '26000196', title: 'Morning Timetable', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '26000195', title: 'Large Group Lectures', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
  { id: '26000194', title: 'Conference Presentation', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '26000193', title: 'Available Classes', difficulty: 'Medium', practicedCount: 1, appearedCount: 0 },
  { id: '26000192', title: 'Eco-friendly University', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
];

const RESPOND_TO_SITUATION_SEED_ROWS = [
  { id: '21000376', title: 'Photography Group', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '21000375', title: 'Laptop Charger', difficulty: 'Difficult', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '21000374', title: 'Class to Miss', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '21000373', title: 'Wrong Bag', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '21000372', title: 'Skipping Class', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '21000368', title: 'Advice for Course', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '21000367', title: 'Dinner and Meeting', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '21000366', title: 'Missing Class', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '21000365', title: 'Missing Class', difficulty: 'Difficult', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '21000364', title: 'Food in the Refrigerator', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 1 },
];

const SUMMARIZE_WRITTEN_TEXT_SEED_ROWS = [
  { id: '6000486', title: 'Learning and Growing in Relationships', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 2 },
  { id: '6000485', title: 'Design', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 1 },
  { id: '6000484', title: 'Financial Literacy Among Young Adults', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 2 },
  { id: '6000483', title: 'The Paradox of Technological Efficiency', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '6000482', title: 'The Impact of Social Media', difficulty: 'Medium', isNew: true, newPrediction: true, practicedCount: 0, appearedCount: 50 },
  { id: '6000481', title: 'The Passing of Time', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '6000480', title: 'Nature and Humanity', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '6000479', title: 'Economy and Material', difficulty: 'Medium', practicedCount: 0, appearedCount: 2 },
  { id: '6000478', title: 'Microloan', difficulty: 'Medium', practicedCount: 2, appearedCount: 102 },
  { id: '6000477', title: 'Preschool Program', difficulty: 'Medium', prediction: true, practicedCount: 2, appearedCount: 53 },
];

const RW_FILL_BLANKS_SEED_ROWS = [
  { id: '12001335', title: 'Public Education', difficulty: 'Medium', isNew: true, newPrediction: true, practicedCount: 2, appearedCount: 55 },
  { id: '12001334', title: 'Resultant Force', difficulty: 'Medium', newPrediction: true, practicedCount: 2, appearedCount: 54 },
  { id: '12001333', title: 'Dogs & Humans', difficulty: 'Medium', practicedCount: 1, appearedCount: 6 },
  { id: '12001332', title: 'Learning', difficulty: 'Medium', newPrediction: true, practicedCount: 1, appearedCount: 60 },
  { id: '12001331', title: 'Charity Group', difficulty: 'Medium', newPrediction: true, practicedCount: 1, appearedCount: 109 },
  { id: '12001330', title: 'Sleepwalking', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 63 },
  { id: '12001329', title: 'Communication Skills', difficulty: 'Medium', practicedCount: 2, appearedCount: 59 },
  { id: '12001328', title: 'Housing', difficulty: 'Medium', newPrediction: true, practicedCount: 1, appearedCount: 117 },
  { id: '12001327', title: 'Insects', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 241 },
  { id: '12001326', title: 'Workforce Plan', difficulty: 'Medium', practicedCount: 1, appearedCount: 12 },
];

const READING_MCM_SEED_ROWS = [
  { id: '9000198', title: 'Job Opening', difficulty: 'Medium', practicedCount: 1, appearedCount: 4 },
  { id: '9000197', title: 'Disciplined Inquiry', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '9000196', title: 'Migration', difficulty: 'Medium', practicedCount: 1, appearedCount: 2 },
  { id: '9000195', title: 'Genome', difficulty: 'Medium', practicedCount: 1, appearedCount: 2 },
  { id: '9000194', title: 'Attention', difficulty: 'Medium', practicedCount: 2, appearedCount: 1 },
  { id: '9000193', title: 'Human Remains', difficulty: 'Medium', practicedCount: 1, appearedCount: 1 },
  { id: '9000192', title: 'Coffee', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
  { id: '9000191', title: 'Examiner Report', difficulty: 'Difficult', practicedCount: 1, appearedCount: 0 },
  { id: '9000190', title: 'Eyes', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
  { id: '9000189', title: 'Tigers', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
];

const REORDER_PARAGRAPHS_SEED_ROWS = [
  { id: '10001083', title: 'Satellite TV', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '10001082', title: 'Farmland and Forest', difficulty: 'Medium', practicedCount: 2, appearedCount: 1 },
  { id: '10001081', title: 'Pest Control', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 52 },
  { id: '10001080', title: 'Forest Cycle', difficulty: 'Medium', prediction: true, practicedCount: 2, appearedCount: 52 },
  { id: '10001079', title: 'Bugs', difficulty: 'Medium', practicedCount: 0, appearedCount: 55 },
  { id: '10001078', title: 'Whale', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 53 },
  { id: '10001077', title: 'School Uniform', difficulty: 'Medium', practicedCount: 1, appearedCount: 3 },
  { id: '10001076', title: 'Ripple', difficulty: 'Medium', practicedCount: 1, appearedCount: 2 },
  { id: '10001075', title: 'Teaching and Learning', difficulty: 'Medium', practicedCount: 1, appearedCount: 111 },
  { id: '10001074', title: 'Hiring Chefs', difficulty: 'Medium', practicedCount: 1, appearedCount: 5 },
];

const READING_DRAG_DROP_SEED_ROWS = [
  { id: '11001117', title: 'Mountain Forest', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 53 },
  { id: '11001116', title: 'Recycling Notice', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 122 },
  { id: '11001115', title: 'Asking for Leave', difficulty: 'Medium', practicedCount: 1, appearedCount: 59 },
  { id: '11001114', title: 'Lifelong Learning', difficulty: 'Medium', practicedCount: 1, appearedCount: 3 },
  { id: '11001113', title: 'Work Preparation', difficulty: 'Medium', practicedCount: 1, appearedCount: 7 },
  { id: '11001112', title: 'School Preparation', difficulty: 'Medium', practicedCount: 1, appearedCount: 2 },
  { id: '11001111', title: 'The Petrified Forest', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 89 },
  { id: '11001110', title: 'Instinct in Business', difficulty: 'Difficult', practicedCount: 1, appearedCount: 53 },
  { id: '11001109', title: 'Wind Version 2', difficulty: 'Medium', practicedCount: 0, appearedCount: 2 },
  { id: '11001108', title: 'Funeral Violin', difficulty: 'Difficult', practicedCount: 2, appearedCount: 0 },
];

const READING_MCS_SEED_ROWS = [
  { id: '8000287', title: 'Sports Readiness', difficulty: 'Medium', practicedCount: 0, appearedCount: 3 },
  { id: '8000286', title: 'Knowledge', difficulty: 'Medium', practicedCount: 0, appearedCount: 2 },
  { id: '8000285', title: 'Persistence', difficulty: 'Medium', practicedCount: 0, appearedCount: 3 },
  { id: '8000284', title: 'Human Development Index', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '8000283', title: 'Glaciers', difficulty: 'Easy', practicedCount: 1, appearedCount: 1 },
  { id: '8000282', title: 'Fish', difficulty: 'Easy', practicedCount: 0, appearedCount: 3 },
  { id: '8000281', title: 'Gliese 581', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '8000280', title: "Piaget's theory", difficulty: 'Difficult', practicedCount: 0, appearedCount: 1 },
  { id: '8000279', title: 'Khmer Empire', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '8000278', title: 'Supplements', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
];

const SUMMARIZE_SPOKEN_TEXT_SEED_ROWS = [
  { id: '13000703', title: 'Bees', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '13000702', title: 'English Language in Poetry', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '13000701', title: "Children's Life Quality", difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 60 },
  { id: '13000700', title: 'Melatonin', difficulty: 'Medium', practicedCount: 1, appearedCount: 18 },
  { id: '13000699', title: 'Waste food', difficulty: 'Medium', practicedCount: 2, appearedCount: 14 },
  { id: '13000698', title: 'Nuts', difficulty: 'Medium', practicedCount: 1, appearedCount: 2 },
  { id: '13000697', title: 'Andrew Carnegie', difficulty: 'Medium', practicedCount: 0, appearedCount: 6 },
  { id: '13000696', title: 'Clone', difficulty: 'Medium', practicedCount: 2, appearedCount: 3 },
  { id: '13000695', title: 'Speech-Language Therapy', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '13000694', title: 'Credit Card Experiment', difficulty: 'Medium', practicedCount: 1, appearedCount: 1 },
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
    supportsPriorityFilter: true,
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
    startId: 3001451,
    continueItem: { id: '3001418', title: 'Study Space' },
    hideDownloadButton: true,
    hasImagePrompt: true,
    categoryOptions: ['Bar Chart', 'Line Graph', 'Pie Chart', 'Table', 'Process Diagram', 'Map'],
    instruction: 'Look at the image below. In 25 seconds, please speak into the microphone and describe in detail what the image is showing.',
    promptText: 'Chart comparison showing percentage distribution and category peaks across surveyed groups.',
    seedRows: DESCRIBE_IMAGE_SEED_ROWS,
  },
  'speaking/retell-lecture': {
    skill: 'speaking',
    slug: 'retell-lecture',
    code: 'RL',
    title: 'Re-Tell Lecture',
    totalQuestions: 578,
    startId: 4000604,
    continueItem: { id: '4000602', title: 'Increased Productivity' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    questionTypeOptions: ['Audio Only', 'Audio + Slide', 'Video Lecture'],
    instruction: 'You will hear a lecture. After listening to the lecture, in 10 seconds, please speak into the microphone and retell what you have just heard from the lecture in your own words.',
    promptText: 'Audio Lecture Topic: Biological Factors shaping long-term adaptation and cognitive performance.',
    seedRows: RETELL_LECTURE_SEED_ROWS,
  },
  'speaking/answer-short-question': {
    skill: 'speaking',
    slug: 'answer-short-question',
    code: 'ASQ',
    title: 'Answer Short Question',
    totalQuestions: 1946,
    startId: 5002001,
    continueItem: { id: '5000075', title: 'ASQ0075' },
    supportsDisplayContent: true,
    hasAudioPrompt: true,
    instruction: 'You will hear a question. Please give a simple and short answer. Often just one or a few words is enough.',
    promptText: 'What instrument do meteorologists use to measure atmospheric pressure?',
    seedRows: ANSWER_SHORT_QUESTION_SEED_ROWS,
  },
  'speaking/summarize-group-discussion': {
    skill: 'speaking',
    slug: 'summarize-group-discussion',
    code: 'SGD',
    title: 'Summarize Group Discussion',
    totalQuestions: 199,
    startId: 26000203,
    continueItem: { id: '26000202', title: 'A Trip to Iceland' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    instruction: 'You will hear three people having a discussion. After listening to the discussion, summarize their main viewpoints and conclusion clearly in your response.',
    promptText: 'Group Discussion Topic: Choosing quiet study places across campus during peak exam weeks.',
    seedRows: SUMMARIZE_GROUP_DISCUSSION_SEED_ROWS,
  },
  'speaking/respond-to-a-situation': {
    skill: 'speaking',
    slug: 'respond-to-a-situation',
    code: 'RTS',
    title: 'Respond to a Situation',
    totalQuestions: 360,
    startId: 21000376,
    continueItem: { id: '21000360', title: 'Drama Club' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    instruction: 'Listen to and read a description of a situation. You will have 10 seconds to prepare and 40 seconds to speak an appropriate response.',
    promptText: 'You ordered office supplies for a community event tomorrow morning, but the delivery just arrived with two missing boxes. Call the supplier politely to resolve this before closing time.',
    seedRows: RESPOND_TO_SITUATION_SEED_ROWS,
  },
  'writing/summarize-written-text': {
    skill: 'writing',
    slug: 'summarize-written-text',
    code: 'SWT',
    title: 'Summarize Written Text',
    totalQuestions: 442,
    coreTotalQuestions: 300,
    startId: 6000486,
    continueItem: { id: '6000226', title: 'Paleolithic People' },
    hideDownloadButton: true,
    instruction: 'Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of the screen.',
    promptText:
      'Meaningful personal and professional growth often develops through constructive interpersonal relationships that combine empathy, clear feedback, and shared accountability over time.',
    seedRows: SUMMARIZE_WRITTEN_TEXT_SEED_ROWS,
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
    code: 'RWB',
    title: 'Fill in the Blanks (Dropdown)',
    coreTitle: 'Reading & Writing: Fill in the Blanks',
    totalQuestions: 1165,
    coreTotalQuestions: 950,
    startId: 12001335,
    continueItem: { id: '12001335', title: 'Public Education' },
    hasDropdownBlanks: true,
    instruction: 'Below is a text with blanks. Click on each blank, a list of choices will appear. Select the appropriate answer choice for each blank.',
    promptText:
      'Public education systems empower learners to [develop] foundational literacy while [expanding] equitable career pathways across regional communities.',
    seedRows: RW_FILL_BLANKS_SEED_ROWS,
  },
  'reading/multiple-choice-multiple': {
    skill: 'reading',
    slug: 'multiple-choice-multiple',
    code: 'MCM',
    title: 'Multiple Choice, Multiple Answers',
    totalQuestions: 188,
    coreTotalQuestions: 188,
    startId: 9000198,
    continueItem: { id: '9000176', title: 'Forgiveness' },
    hideDownloadButton: true,
    mcqOptions: [
      { id: 'A', label: 'Candidates should attach two recent professional references with their portfolio.', correct: true },
      { id: 'B', label: 'Interviews are restricted exclusively to applicants residing outside the city.', correct: false },
      { id: 'C', label: 'Successful applicants receive a structured four-week onboarding mentorship.', correct: true },
      { id: 'D', label: 'Paper application forms must be mailed after the online portal closes.', correct: false },
    ],
    instruction: 'Read the text and answer the question by selecting all the correct responses. More than one response is correct.',
    promptText: 'Which TWO conditions apply to candidates applying for the advertised role according to the passage?',
    seedRows: READING_MCM_SEED_ROWS,
  },
  'reading/reorder-paragraphs': {
    skill: 'reading',
    slug: 'reorder-paragraphs',
    code: 'RO',
    title: 'Re-order Paragraphs',
    totalQuestions: 819,
    coreTotalQuestions: 615,
    startId: 10001083,
    continueItem: { id: '10001048', title: 'Causation in Criminology' },
    hideDownloadButton: true,
    reorderParagraphs: [
      { id: 'A', correctOrder: 2, text: 'As orbital transponders expanded bandwidth in the 1980s, dish sizes shrank enough for residential rooftops.' },
      { id: 'B', correctOrder: 1, text: 'Satellite television began as a specialized relay network connecting remote broadcast stations across continents.' },
      { id: 'C', correctOrder: 4, text: 'Digital compression later allowed hundreds of high-definition channels to share a single orbital slot.' },
      { id: 'D', correctOrder: 3, text: 'This breakthrough enabled rural households to receive live news and educational programming directly.' },
    ],
    instruction: 'The text boxes in the left panel have been placed in a random order. Restore the original order cleanly.',
    promptText: 'Arrange statements A–D into logical chronological order from earliest satellite relay to modern digital broadcasting.',
    seedRows: REORDER_PARAGRAPHS_SEED_ROWS,
  },
  'reading/fill-in-the-blanks': {
    skill: 'reading',
    slug: 'fill-in-the-blanks',
    code: 'RB',
    title: 'Fill in the Blanks (Drag & Drop)',
    coreTitle: 'Reading: Fill in the Blanks',
    totalQuestions: 1067,
    coreTotalQuestions: 898,
    startId: 11001117,
    continueItem: { id: '11001113', title: 'Work Preparation' },
    dragDropWordBank: {
      answers: ['canopy', 'moisture', 'elevation', 'timber'],
      choices: ['canopy', 'moisture', 'elevation', 'timber', 'desert', 'fossil'],
    },
    instruction: 'In the text below some words are missing. Drag words from the box below to the appropriate place in the text.',
    promptText:
      'High-altitude mountain forests form a dense [canopy] that traps seasonal [moisture] along steep ridges while supporting diverse [elevation] habitats and sustainable [timber] cycles.',
    seedRows: READING_DRAG_DROP_SEED_ROWS,
  },
  'reading/multiple-choice-single': {
    skill: 'reading',
    slug: 'multiple-choice-single',
    code: 'MCS',
    title: 'Multiple Choice, Single Answer',
    totalQuestions: 263,
    coreTotalQuestions: 263,
    startId: 8000287,
    continueItem: { id: '8000050', title: 'Unconscious Mind' },
    hideDownloadButton: true,
    singleChoice: true,
    mcqOptions: [
      { id: 'A', label: 'Athletes benefit most when physical conditioning is paired with structured mental readiness routines.', correct: true },
      { id: 'B', label: 'Strength training alone eliminates performance anxiety before international matches.', correct: false },
      { id: 'C', label: 'Coaches discourage warm-up feedback prior to competitive tournaments.', correct: false },
      { id: 'D', label: 'Sleep duration has minimal effect on reaction speed during endurance events.', correct: false },
    ],
    instruction: 'Read the text and answer the multiple-choice question by selecting the correct response. Only one response is correct.',
    promptText: 'What main conclusion does the writer draw regarding athletic preparation in the passage?',
    seedRows: READING_MCS_SEED_ROWS,
  },
  'listening/summarize-spoken-text': {
    skill: 'listening',
    slug: 'summarize-spoken-text',
    code: 'SST',
    title: 'Summarize Spoken Text',
    totalQuestions: 657,
    coreTotalQuestions: 580,
    startId: 13000703,
    continueItem: { id: '13000055', title: 'Definitions of Globalization' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    hasEditorToolbar: true,
    instruction: 'You will hear a short lecture. Write a summary for a fellow student who was not present at the lecture. You should write 50-70 words.',
    promptText: 'Audio Lecture: Honeybee colony organization, pollination services, and seasonal hive resilience.',
    seedRows: SUMMARIZE_SPOKEN_TEXT_SEED_ROWS,
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
  const title = isCoreMode && raw.coreTitle ? raw.coreTitle : raw.title;

  const isAudioListeningTask =
    raw.hasAudioPrompt ||
    raw.skill === 'listening' ||
    ['repeat-sentence', 'retell-lecture', 'answer-short-question', 'summarize-group-discussion', 'respond-to-a-situation'].includes(raw.slug);

  const isShortCodeTask =
    raw.supportsDisplayContent ||
    ['repeat-sentence', 'answer-short-question', 'write-from-dictation'].includes(raw.slug);

  return {
    ...raw,
    title,
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
      title:
        taskMeta.slug === 'repeat-sentence'
          ? `RS${3380 - idx}`
          : taskMeta.slug === 'answer-short-question'
            ? `ASQ${2001 - idx}`
            : `${topic} ${taskMeta.code}-${total - idx}`,
      difficulty,
      isNew,
      newPrediction,
      prediction,
      practicedCount,
      appearedCount,
      imageType: taskMeta.categoryOptions
        ? taskMeta.categoryOptions[idx % taskMeta.categoryOptions.length]
        : undefined,
      questionType: taskMeta.questionTypeOptions
        ? taskMeta.questionTypeOptions[idx % taskMeta.questionTypeOptions.length]
        : undefined,
      contentSnippet: `Practice statement covering ${topic.toLowerCase()} for ${taskMeta.title}.`,
      bookmarked: false,
    });
  }

  return items;
}
