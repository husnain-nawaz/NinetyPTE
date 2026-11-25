const READ_ALOUD_SEED_ROWS = [
  { id: '1001648', title: 'Returning Book', difficulty: 'Medium', prediction: false, practicedCount: 1, appearedCount: 128 },
  { id: '1001647', title: 'Smart Cooking', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 86 },
  { id: '1001646', title: 'Community Gardening', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 116 },
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

const CORE_SUMMARIZE_WRITTEN_TEXT_SEED_ROWS = [
  { id: '24000439', title: 'Indoor Plants', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
  { id: '24000438', title: 'Esports', difficulty: 'Medium', newPrediction: true, practicedCount: 0, appearedCount: 104 },
  { id: '24000437', title: 'Microloans', difficulty: 'Medium', practicedCount: 0, appearedCount: 105 },
  { id: '24000436', title: 'UK Voting', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
  { id: '24000435', title: 'Coffee Shop', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 210 },
  { id: '24000434', title: 'Opening Day', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 159 },
  { id: '24000433', title: 'Card Safety', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 113 },
  { id: '24000432', title: 'Urbanization', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '24000431', title: 'Climate Change', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '24000430', title: 'Global Health', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
];

const WRITE_EMAIL_SEED_ROWS = [
  { id: '22000181', title: 'Birthday Reservation', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 1593 },
  { id: '22000180', title: 'Company of Friend', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 500 },
  { id: '22000178', title: 'Company Energy', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 757 },
  { id: '22000177', title: 'Noise and Hot Water', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 1837 },
  { id: '22000173', title: 'Stairs Light', difficulty: 'Medium', newPrediction: true, practicedCount: 0, appearedCount: 1975 },
  { id: '22000172', title: 'Carpool', difficulty: 'Medium', practicedCount: 0, appearedCount: 4 },
  { id: '22000171', title: 'Bad Dining Experience', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '22000163', title: 'Watching a Movie', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 439 },
  { id: '22000025', title: 'Movie Invite', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 515 },
  { id: '22000152', title: 'Movie Invitation', difficulty: 'Medium', newPrediction: true, practicedCount: 0, appearedCount: 3611 },
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

const CORE_RW_FILL_BLANKS_SEED_ROWS = [
  { id: '23001009', title: 'Penicillin', difficulty: 'Medium', practicedCount: 0, appearedCount: 7 },
  { id: '23001008', title: 'Brain Bus', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 53 },
  { id: '23001007', title: 'Durham Sailing Club', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 55 },
  { id: '23001006', title: 'Lute', difficulty: 'Medium', newPrediction: true, practicedCount: 0, appearedCount: 97 },
  { id: '23001005', title: 'Life in Alberta', difficulty: 'Medium', practicedCount: 0, appearedCount: 2 },
  { id: '23001004', title: 'Birthday Invitation', difficulty: 'Medium', practicedCount: 0, appearedCount: 2 },
  { id: '23001003', title: 'Catering Inquiry', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
  { id: '23001002', title: 'Sports Evolution', difficulty: 'Medium', practicedCount: 0, appearedCount: 4 },
  { id: '23001001', title: 'Job Application', difficulty: 'Easy', newPrediction: true, practicedCount: 0, appearedCount: 691 },
  { id: '23001000', title: 'Power Hamburge', difficulty: 'Medium', newPrediction: true, practicedCount: 0, appearedCount: 282 },
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

const CORE_SUMMARIZE_SPOKEN_TEXT_SEED_ROWS = [
  { id: '25000233', title: 'Interview Tips', difficulty: 'Medium', newPrediction: true, practicedCount: 0, appearedCount: 249 },
  { id: '25000232', title: 'Washing Food', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 112 },
  { id: '25000231', title: 'City of Lights', difficulty: 'Medium', practicedCount: 0, appearedCount: 3 },
  { id: '25000230', title: 'Father Guidance', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 73 },
  { id: '25000229', title: 'Railway Pass', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 1666 },
  { id: '25000228', title: 'School Lunch Box', difficulty: 'Medium', practicedCount: 0, appearedCount: 83 },
  { id: '25000227', title: 'Threatening with losses', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 68 },
  { id: '25000226', title: 'Canadian Skilled Trades', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 1429 },
  { id: '25000225', title: 'Phone Interview', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 2392 },
  { id: '25000224', title: 'Railway Cards', difficulty: 'Medium', prediction: true, practicedCount: 0, appearedCount: 107 },
];

const LISTENING_MCM_SEED_ROWS = [
  { id: '14000228', title: 'Language Skills', difficulty: 'Medium', practicedCount: 2, appearedCount: 4 },
  { id: '14000225', title: 'English Landscape Garden', difficulty: 'Medium', practicedCount: 1, appearedCount: 11 },
  { id: '14000223', title: "Rousseau's Beliefs", difficulty: 'Difficult', practicedCount: 1, appearedCount: 5 },
  { id: '14000222', title: "Children's Education", difficulty: 'Medium', practicedCount: 1, appearedCount: 3 },
  { id: '14000221', title: 'Politics', difficulty: 'Medium', practicedCount: 1, appearedCount: 3 },
  { id: '14000220', title: 'Poet Laureate', difficulty: 'Medium', practicedCount: 3, appearedCount: 2 },
  { id: '14000219', title: 'Technological Advances', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 14 },
  { id: '14000218', title: 'Woodblock Printing', difficulty: 'Medium', practicedCount: 1, appearedCount: 0 },
  { id: '14000217', title: 'Use of Technology', difficulty: 'Medium', practicedCount: 1, appearedCount: 0 },
  { id: '14000216', title: 'Good Translation', difficulty: 'Medium', practicedCount: 0, appearedCount: 2 },
];

const LISTENING_FIB_SEED_ROWS = [
  { id: '15000434', title: 'Family', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '15000433', title: 'Successful Restaurant', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0 },
  { id: '15000432', title: 'Work in Organization', difficulty: 'Medium', practicedCount: 1, appearedCount: 0 },
  { id: '15000431', title: 'Sugar and Health', difficulty: 'Medium', practicedCount: 1, appearedCount: 8 },
  { id: '15000430', title: 'Building Responsibility', difficulty: 'Medium', practicedCount: 1, appearedCount: 6 },
  { id: '15000429', title: 'Javelin Competition', difficulty: 'Medium', practicedCount: 1, appearedCount: 7 },
  { id: '15000428', title: 'Local Farmers', difficulty: 'Medium', practicedCount: 2, appearedCount: 9 },
  { id: '15000427', title: 'Food Marketing Ethics', difficulty: 'Medium', practicedCount: 1, appearedCount: 15 },
  { id: '15000426', title: 'Robotic Surgery', difficulty: 'Medium', practicedCount: 1, appearedCount: 1 },
  { id: '15000425', title: 'Park', difficulty: 'Easy', practicedCount: 1, appearedCount: 2 },
];

const HIGHLIGHT_CORRECT_SUMMARY_SEED_ROWS = [
  { id: '19000162', title: 'Sodium', difficulty: 'Medium', practicedCount: 1, appearedCount: 1 },
  { id: '19000160', title: 'Mountains', difficulty: 'Medium', practicedCount: 1, appearedCount: 0 },
  { id: '19000159', title: 'DNA Model', difficulty: 'Difficult', practicedCount: 1, appearedCount: 0 },
  { id: '19000158', title: 'Genealogy', difficulty: 'Medium', practicedCount: 1, appearedCount: 6 },
  { id: '19000157', title: 'Early Humans', difficulty: 'Medium', practicedCount: 1, appearedCount: 3 },
  { id: '19000156', title: 'Hand', difficulty: 'Medium', practicedCount: 1, appearedCount: 2 },
  { id: '19000155', title: 'Great White Sharks', difficulty: 'Medium', practicedCount: 1, appearedCount: 0 },
  { id: '19000154', title: 'Business Schools', difficulty: 'Medium', practicedCount: 0, appearedCount: 2 },
  { id: '19000153', title: 'Urban Development', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
  { id: '19000152', title: 'Telecommuting', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
];

const LISTENING_MCS_SEED_ROWS = [
  { id: '17000219', title: 'Literary Genres', difficulty: 'Medium', practicedCount: 1, appearedCount: 6 },
  { id: '17000218', title: 'Narcissism', difficulty: 'Medium', practicedCount: 1, appearedCount: 4 },
  { id: '17000217', title: 'Reasonable Force', difficulty: 'Medium', practicedCount: 1, appearedCount: 3 },
  { id: '17000216', title: 'Randall Jarrell', difficulty: 'Medium', practicedCount: 1, appearedCount: 7 },
  { id: '17000215', title: 'Languages', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '17000214', title: 'Map-making', difficulty: 'Medium', practicedCount: 1, appearedCount: 1 },
  { id: '17000213', title: 'Sign Advertising', difficulty: 'Medium', practicedCount: 0, appearedCount: 3 },
  { id: '17000212', title: 'Diet', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '17000211', title: 'Stress', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
  { id: '17000210', title: 'Genes and Environment', difficulty: 'Medium', practicedCount: 1, appearedCount: 1 },
];

const SELECT_MISSING_WORD_SEED_ROWS = [
  { id: '18000214', title: 'Faint Sound', difficulty: 'Medium', practicedCount: 2, appearedCount: 2 },
  { id: '18000213', title: 'Surfing', difficulty: 'Medium', practicedCount: 1, appearedCount: 9 },
  { id: '18000212', title: 'Presentation', difficulty: 'Medium', practicedCount: 1, appearedCount: 7 },
  { id: '18000211', title: 'Paper Money', difficulty: 'Medium', practicedCount: 1, appearedCount: 5 },
  { id: '18000210', title: 'Archaeological Site', difficulty: 'Medium', practicedCount: 0, appearedCount: 2 },
  { id: '18000209', title: 'Microscope', difficulty: 'Medium', practicedCount: 1, appearedCount: 7 },
  { id: '18000208', title: 'Careers', difficulty: 'Medium', practicedCount: 0, appearedCount: 0 },
  { id: '18000207', title: "Earth's Climate", difficulty: 'Medium', practicedCount: 1, appearedCount: 6 },
  { id: '18000206', title: 'Unreliable Narrators', difficulty: 'Medium', practicedCount: 0, appearedCount: 3 },
  { id: '18000205', title: 'First Clock', difficulty: 'Medium', practicedCount: 0, appearedCount: 1 },
];

const HIGHLIGHT_INCORRECT_WORDS_SEED_ROWS = [
  { id: '16000527', title: 'Einstein', difficulty: 'Medium', practicedCount: 1, appearedCount: 3 },
  { id: '16000526', title: 'Quantum Mechanics', difficulty: 'Medium', practicedCount: 1, appearedCount: 1 },
  { id: '16000525', title: 'Sacred Calling', difficulty: 'Medium', practicedCount: 1, appearedCount: 4 },
  { id: '16000524', title: 'Understanding Color', difficulty: 'Medium', practicedCount: 1, appearedCount: 2 },
  { id: '16000523', title: 'Height', difficulty: 'Medium', practicedCount: 1, appearedCount: 10 },
  { id: '16000522', title: 'Frog', difficulty: 'Difficult', practicedCount: 1, appearedCount: 6 },
  { id: '16000521', title: 'Baby Smile', difficulty: 'Medium', practicedCount: 1, appearedCount: 2 },
  { id: '16000520', title: 'Snack Sample', difficulty: 'Medium', practicedCount: 1, appearedCount: 5 },
  { id: '16000519', title: 'Happy New Year', difficulty: 'Medium', practicedCount: 0, appearedCount: 3 },
  { id: '16000518', title: 'Black Mamba', difficulty: 'Medium', practicedCount: 0, appearedCount: 2 },
];

const WRITE_FROM_DICTATION_SEED_ROWS = [
  { id: '20003762', title: 'WFD3762', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0, contentSnippet: 'Students who attend tutorial sessions regularly submit more structured final assignments.' },
  { id: '20003761', title: 'WFD3761', difficulty: 'Medium', isNew: true, practicedCount: 0, appearedCount: 0, contentSnippet: 'Early astronomical records helped coastal navigators track seasonal trade winds.' },
  { id: '20003760', title: 'WFD3760', difficulty: 'Medium', isNew: true, prediction: true, practicedCount: 1, appearedCount: 35, contentSnippet: 'The university library extends evening opening hours throughout the examination period.' },
  { id: '20003759', title: 'WFD3759', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 51, contentSnippet: 'Practical laboratory training prepares science graduates for modern industrial research.' },
  { id: '20003757', title: 'WFD3757', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 51, contentSnippet: 'Economic historians examine tax ledgers to understand regional living standards.' },
  { id: '20003756', title: 'WFD3756', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 50, contentSnippet: 'Renewable energy storage remains essential for balancing peak electricity demand.' },
  { id: '20003754', title: 'WFD3754', difficulty: 'Medium', prediction: true, practicedCount: 2, appearedCount: 103, contentSnippet: 'All fieldwork safety protocols must be reviewed prior to leaving the campus.' },
  { id: '20003753', title: 'WFD3753', difficulty: 'Difficult', prediction: true, practicedCount: 1, appearedCount: 51, contentSnippet: 'Public transportation subsidies reduce highway congestion during weekday commuting hours.' },
  { id: '20003752', title: 'WFD3752', difficulty: 'Medium', practicedCount: 1, appearedCount: 0, contentSnippet: 'Accurate climate models rely on decades of calibrated ocean temperature measurements.' },
  { id: '20003751', title: 'WFD3751', difficulty: 'Medium', prediction: true, practicedCount: 1, appearedCount: 51, contentSnippet: 'Guest lecturers will discuss sustainable architecture in the main auditorium tomorrow.' },
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
    coreTotalQuestions: 1552,
    startId: 1001648,
    continueItem: { id: '1001234', title: 'Social Media' },
    instruction: 'Look at the text below. In 35 seconds, you must read this text aloud as naturally and clearly as possible. You have 35 seconds to read aloud.',
    promptText:
      'When returning a borrowed book, remember that there has been a recent rise in damaged bindings, says one Toronto librarian, noting most tears stem from simple misunderstanding.',
    seedRows: READ_ALOUD_SEED_ROWS,
  },
  'speaking/repeat-sentence': {
    skill: 'speaking',
    slug: 'repeat-sentence',
    code: 'RS',
    title: 'Repeat Sentence',
    totalQuestions: 3174,
    coreTotalQuestions: 3174,
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
    coreTotalQuestions: 1207,
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
    coreTotalQuestions: 1946,
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
    coreTotalQuestions: 360,
    startId: 21000376,
    continueItem: { id: '21000360', title: 'Drama Club' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    instruction: 'Listen to and read a description of a situation. You will have 10 seconds to prepare and 40 seconds to speak an appropriate response.',
    promptText: 'You joined a campus photography group whose exhibition submission deadline was moved earlier by two days. Speak politely with the organizer about submitting your remaining prints.',
    seedRows: RESPOND_TO_SITUATION_SEED_ROWS,
  },
  'writing/summarize-written-text': {
    skill: 'writing',
    slug: 'summarize-written-text',
    code: 'SWT',
    title: 'Summarize Written Text',
    totalQuestions: 442,
    coreTotalQuestions: 434,
    startId: 6000486,
    continueItem: { id: '6000226', title: 'Paleolithic People' },
    hideDownloadButton: true,
    instruction: 'Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of the screen.',
    promptText:
      'Meaningful personal and professional growth often develops through constructive interpersonal relationships that combine empathy, clear feedback, and shared accountability over time.',
    seedRows: SUMMARIZE_WRITTEN_TEXT_SEED_ROWS,
    coreOverrides: {
      totalQuestions: 434,
      startId: 24000439,
      continueItem: null,
      supportsPriorityFilter: true,
      instruction:
        'Read the passage below. Summarize the passage in 25 to 50 words. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage.',
      promptText:
        'Bringing indoor plants into classrooms and workplaces creates natural visual breaks, softens background acoustic reflections, and helps maintain comfortable room humidity during extended computer tasks.',
      seedRows: CORE_SUMMARIZE_WRITTEN_TEXT_SEED_ROWS,
    },
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
    totalQuestions: 177,
    coreTotalQuestions: 177,
    startId: 22000181,
    continueItem: null,
    hideDownloadButton: true,
    instruction: 'Read a description of a situation. Then write an email responding to the situation in 9 minutes using complete sentences.',
    promptText:
      'You are organizing a surprise birthday dinner for a colleague next Friday evening. Write an email to the restaurant manager requesting a quiet table reservation, noting guests with nut allergies, and asking about bringing a cake.',
    seedRows: WRITE_EMAIL_SEED_ROWS,
  },
  'reading/reading-writing-fill-in-the-blanks': {
    skill: 'reading',
    slug: 'reading-writing-fill-in-the-blanks',
    code: 'RWB',
    title: 'Fill in the Blanks (Dropdown)',
    coreTitle: 'Reading & Writing Blanks',
    totalQuestions: 1165,
    coreTotalQuestions: 996,
    startId: 12001335,
    continueItem: { id: '12001335', title: 'Public Education' },
    hasDropdownBlanks: true,
    instruction: 'Below is a text with blanks. Click on each blank, a list of choices will appear. Select the appropriate answer choice for each blank.',
    promptText:
      'Public education systems empower learners to [develop] foundational literacy while [expanding] equitable career pathways across regional communities.',
    seedRows: RW_FILL_BLANKS_SEED_ROWS,
    coreOverrides: {
      title: 'Reading & Writing Blanks',
      totalQuestions: 996,
      startId: 23001009,
      continueItem: null,
      promptText:
        'Researchers reviewing Alexander Fleming’s early notes highlight how penicillin [inhibited] surrounding bacterial colonies and rapidly [transformed] modern antibiotic medicine.',
      seedRows: CORE_RW_FILL_BLANKS_SEED_ROWS,
    },
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
      { id: 'A', label: 'Applicants must hold a valid driver’s license and maintain a clean driving record with no speeding fines.', correct: true },
      { id: 'B', label: 'Candidates are restricted from working local routes unless they supply a commercial truck.', correct: false },
      { id: 'C', label: 'Applicants must carry a valid passport and be available to accept local route assignments.', correct: true },
      { id: 'D', label: 'Previous delivery or courier experience is discouraged for entry-level drivers.', correct: false },
    ],
    instruction: 'Read the text and answer the question by selecting all the correct responses. More than one response is correct.',
    promptText: 'Job description: This driving position requires a responsible candidate with a valid driver’s license, valid passport, driving experience, availability for local routes, and no speeding tickets or fines. Which requirements apply to applicants?',
    seedRows: READING_MCM_SEED_ROWS,
  },
  'reading/reorder-paragraphs': {
    skill: 'reading',
    slug: 'reorder-paragraphs',
    code: 'RO',
    title: 'Re-order Paragraphs',
    totalQuestions: 819,
    coreTotalQuestions: 819,
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
    coreTotalQuestions: 1067,
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
    coreTotalQuestions: 233,
    startId: 13000703,
    continueItem: { id: '13000055', title: 'Definitions of Globalization' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    hasEditorToolbar: true,
    instruction: 'You will hear a short lecture. Write a summary for a fellow student who was not present at the lecture. You should write 50-70 words.',
    promptText: 'Audio Lecture: Honeybee colony organization, pollination services, and seasonal hive resilience.',
    seedRows: SUMMARIZE_SPOKEN_TEXT_SEED_ROWS,
    coreOverrides: {
      totalQuestions: 233,
      startId: 25000233,
      continueItem: null,
      supportsPriorityFilter: true,
      instruction:
        'You will hear a short lecture. Write a summary for a fellow student who was not present at the lecture. You should write 20-30 words. You have 8 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points presented in the lecture.',
      promptText:
        'Audio Lecture: Preparing concise examples, researching role requirements, and practicing calm pacing for structured job interviews.',
      seedRows: CORE_SUMMARIZE_SPOKEN_TEXT_SEED_ROWS,
    },
  },
  'listening/multiple-choice-multiple': {
    skill: 'listening',
    slug: 'multiple-choice-multiple',
    code: 'MCM',
    title: 'Multiple Choice, Multiple Answers',
    totalQuestions: 193,
    coreTotalQuestions: 193,
    startId: 14000228,
    continueItem: { id: '14000072', title: 'Fruits and Vegetables' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    mcqOptions: [
      { id: 'A', label: 'Early immersion exposure improves long-term grammatical fluency.', correct: true },
      { id: 'B', label: 'Memorizing isolated dictionary lists outperforms contextual dialogue.', correct: false },
      { id: 'C', label: 'Active conversational feedback reinforces listening comprehension speed.', correct: true },
      { id: 'D', label: 'Written translation tasks should replace spoken practice entirely.', correct: false },
    ],
    instruction: 'Listen to the recording and answer the question by selecting all the correct responses. More than one response is correct.',
    promptText: 'Which TWO points does the speaker emphasize regarding practical language acquisition?',
    seedRows: LISTENING_MCM_SEED_ROWS,
  },
  'listening/fill-in-the-blanks': {
    skill: 'listening',
    slug: 'fill-in-the-blanks',
    code: 'FIB',
    title: 'Fill in the Blanks',
    totalQuestions: 421,
    coreTotalQuestions: 421,
    startId: 15000434,
    continueItem: { id: '15000055', title: 'Whales & Dolphins' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    typedBlanksAnswers: ['support', 'communication', 'routines', 'resilience'],
    instruction: 'You will hear a recording. Type the missing words directly into each blank as you listen.',
    promptText: 'Strong family [support] and open [communication] reinforce healthy daily [routines] and emotional [resilience].',
    seedRows: LISTENING_FIB_SEED_ROWS,
  },
  'listening/highlight-correct-summary': {
    skill: 'listening',
    slug: 'highlight-correct-summary',
    code: 'HCS',
    title: 'Highlight Correct Summary',
    totalQuestions: 155,
    startId: 19000162,
    continueItem: { id: '19000058', title: 'Student Loans' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    singleChoice: true,
    mcqOptions: [
      { id: 'A', label: 'The speaker explains how dietary sodium regulates fluid balance while excessive processed intake raises cardiovascular risk.', correct: true },
      { id: 'B', label: 'Athletes should eliminate all electrolytes prior to endurance events regardless of climate conditions.', correct: false },
      { id: 'C', label: 'Modern sea salt harvests contain zero trace minerals compared to refined industrial salts.', correct: false },
      { id: 'D', label: 'Public health guidelines recommend doubling daily processed condiment portions.', correct: false },
    ],
    instruction: 'You will hear a recording. Click on the paragraph that best relates to the recording.',
    promptText: 'Select the paragraph that accurately summarizes the speaker’s audio lecture.',
    seedRows: HIGHLIGHT_CORRECT_SUMMARY_SEED_ROWS,
  },
  'listening/multiple-choice-single': {
    skill: 'listening',
    slug: 'multiple-choice-single',
    code: 'MCS',
    title: 'Multiple Choice, Single Answer',
    totalQuestions: 204,
    coreTotalQuestions: 204,
    startId: 17000219,
    continueItem: { id: '17000006', title: 'Political Science' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    singleChoice: true,
    mcqOptions: [
      { id: 'A', label: 'Genre conventions evolved gradually as writers adapted earlier forms for new audiences.', correct: true },
      { id: 'B', label: 'Contemporary novels abandoned all narrative techniques derived from classical drama.', correct: false },
      { id: 'C', label: 'Oral poetry had no measurable influence on printed prose fiction in Europe.', correct: false },
      { id: 'D', label: 'Literary critics classify every eighteenth-century essay strictly as lyric verse.', correct: false },
    ],
    instruction: 'Listen to the recording and answer the multiple-choice question by selecting the correct response. Only one response is correct.',
    promptText: 'What key observation does the speaker make regarding how literary genres develop over time?',
    seedRows: LISTENING_MCS_SEED_ROWS,
  },
  'listening/select-missing-word': {
    skill: 'listening',
    slug: 'select-missing-word',
    code: 'SMW',
    title: 'Select Missing Word',
    totalQuestions: 203,
    coreTotalQuestions: 203,
    startId: 18000214,
    continueItem: { id: '18000207', title: "Earth's Climate" },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    singleChoice: true,
    mcqOptions: [
      { id: 'A', label: 'exceeds our normal threshold of hearing', correct: true },
      { id: 'B', label: 'eliminates background static completely', correct: false },
      { id: 'C', label: 'reverses acoustic wave frequency', correct: false },
      { id: 'D', label: 'produces a permanent echo chamber', correct: false },
    ],
    instruction: 'You will hear a recording. At the end of the recording the last word or group of words has been replaced by a beep. Select the correct option to complete the recording.',
    promptText: 'Transcript excerpt covering faint sound measurement concludes as sensitive sensors amplify energy that exceeds our normal threshold of hearing.',
    seedRows: SELECT_MISSING_WORD_SEED_ROWS,
  },
  'listening/highlight-incorrect-words': {
    skill: 'listening',
    slug: 'highlight-incorrect-words',
    code: 'HIW',
    title: 'Highlight Incorrect Words',
    totalQuestions: 515,
    coreTotalQuestions: 515,
    startId: 16000527,
    continueItem: { id: '16000521', title: 'Baby Smile' },
    hideDownloadButton: true,
    hasAudioPrompt: true,
    highlightIncorrectWords: {
      text: 'Albert Einstein developed the theory of relativity after studying electrical engineering and theoretical chemistry in Zurich before publishing four groundbreaking scientific letters.',
      incorrect: ['chemistry', 'letters'],
    },
    instruction: 'You will hear a recording. Below is a transcription of the recording. Some words in the transcription differ from what the speaker said. Please click on the words that are different.',
    promptText: 'Spoken transcript replaces "chemistry" with "physics" and "letters" with "papers".',
    seedRows: HIGHLIGHT_INCORRECT_WORDS_SEED_ROWS,
  },
  'listening/write-from-dictation': {
    skill: 'listening',
    slug: 'write-from-dictation',
    code: 'WFD',
    title: 'Write from Dictation',
    totalQuestions: 3649,
    coreTotalQuestions: 3649,
    startId: 20003762,
    continueItem: { id: '20003760', title: 'WFD3760' },
    supportsDisplayContent: true,
    supportsPriorityFilter: true,
    hasAudioPrompt: true,
    hasEditorToolbar: true,
    placeholder: 'Type your response here...',
    instruction: 'You will hear a sentence. Type the sentence in the box below exactly as you hear it.',
    promptText: 'Students who attend tutorial sessions regularly submit more structured final assignments.',
    seedRows: WRITE_FROM_DICTATION_SEED_ROWS,
  },
};

export function resolvePracticeTask(skill, taskSlug, isCoreMode = false) {
  const key = `${skill || 'speaking'}/${taskSlug || 'read-aloud'}`;
  const base = PRACTICE_TASKS_BY_KEY[key] || PRACTICE_TASKS_BY_KEY['speaking/read-aloud'];
  const raw = isCoreMode && base.coreOverrides ? { ...base, ...base.coreOverrides } : base;
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
            : taskMeta.slug === 'write-from-dictation'
              ? `WFD${3762 - idx}`
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
