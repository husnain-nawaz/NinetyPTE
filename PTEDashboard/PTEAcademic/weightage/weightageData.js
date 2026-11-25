export const WEIGHTAGE_LEGEND = [
  { label: 'Speaking', color: '#eb8c44' },
  { label: 'Listening', color: '#0b4a7b' },
  { label: 'Reading', color: '#22c55e' },
  { label: 'Writing', color: '#5ba4f5' },
];

export const WEIGHTAGE_SECTIONS_ACADEMIC = [
  {
    sectionLabel: 'Speaking & Writing',
    rows: [
      { name: 'Read Aloud', questions: '6-7', overall: '4%', speaking: '9%', listening: null, reading: null, writing: null, to: '/pte-speaking-practice' },
      { name: 'Repeat Sentence', questions: '10-12', overall: '7%', speaking: '16%', listening: '17%', reading: null, writing: null, to: '/pte-speaking-practice' },
      { name: 'Describe Image', questions: '5-6', overall: '15%', speaking: '31%', listening: null, reading: null, writing: null, to: '/pte-speaking-practice' },
      { name: 'Retell Lecture', questions: '2-3', overall: '6%', speaking: '13%', listening: '13%', reading: null, writing: null, to: '/pte-speaking-practice' },
      { name: 'Answer Short Question', questions: '5-6', overall: '2%', speaking: null, listening: '4%', reading: null, writing: null, to: '/pte-speaking-practice' },
      { name: 'Summarize Group Discussion', questions: '2-3', overall: '9%', speaking: '19%', listening: '20%', reading: null, writing: null, to: '/pte-speaking-practice' },
      { name: 'Respond to a Situation', questions: '2-3', overall: '6%', speaking: '13%', listening: null, reading: null, writing: null, to: '/pte-speaking-practice' },
      { name: 'Summarize Written Text', questions: '2', overall: '7%', speaking: null, listening: null, reading: '23%', writing: '28%', to: '/pte-writing-practice' },
      { name: 'Write Essay', questions: '1', overall: '7%', speaking: null, listening: null, reading: null, writing: '31%', to: '/pte-writing-practice' },
    ],
  },
  {
    sectionLabel: 'Reading',
    rows: [
      { name: 'Fill in the Blanks (Drop-down)', questions: '5-6', overall: '7%', speaking: null, listening: null, reading: '25%', writing: null, to: '/pte-reading-practice' },
      { name: 'MCQ - Multiple', questions: '2-3', overall: '1%', speaking: null, listening: null, reading: '5%', writing: null, to: '/pte-reading-practice' },
      { name: 'Re-order Paragraph', questions: '2-3', overall: '3%', speaking: null, listening: null, reading: '9%', writing: null, to: '/pte-reading-practice' },
      { name: 'Fill in the Blanks (Drag & Drop)', questions: '4-5', overall: '6%', speaking: null, listening: null, reading: '20%', writing: null, to: '/pte-reading-practice' },
      { name: 'MCQ - Single', questions: '2-3', overall: '<1%', speaking: null, listening: null, reading: '3%', writing: null, to: '/pte-reading-practice' },
    ],
  },
  {
    sectionLabel: 'Listening',
    rows: [
      { name: 'Summarize Spoken Text', questions: '1', overall: '4%', speaking: null, listening: '10%', reading: null, writing: '18%', to: '/pte-listening-practice' },
      { name: 'MCQ - Multiple', questions: '2-3', overall: '1%', speaking: null, listening: '3%', reading: null, writing: null, to: '/pte-listening-practice' },
      { name: 'Fill in the Blanks', questions: '2-3', overall: '3%', speaking: null, listening: '8%', reading: null, writing: null, to: '/pte-listening-practice' },
      { name: 'Highlight Correct Summary', questions: '2-3', overall: '<1%', speaking: null, listening: '2%', reading: '3%', writing: null, to: '/pte-listening-practice' },
      { name: 'MCQ - Single', questions: '2-3', overall: '<1%', speaking: null, listening: '2%', reading: null, writing: null, to: '/pte-listening-practice' },
      { name: 'Select Missing Word', questions: '1-2', overall: '1%', speaking: null, listening: '1%', reading: null, writing: null, to: '/pte-listening-practice' },
      { name: 'Highlight Incorrect Words', questions: '2-3', overall: '4%', speaking: null, listening: '8%', reading: '13%', writing: null, to: '/pte-listening-practice' },
      { name: 'Write From Dictation', questions: '3-4', overall: '5%', speaking: null, listening: '13%', reading: null, writing: '23%', to: '/pte-listening-practice' },
    ],
  },
];

export const WEIGHTAGE_SECTIONS_CORE = [
  {
    sectionLabel: 'Speaking & Writing',
    rows: [
      { name: 'Read Aloud', questions: '6-7', overall: '7%', speaking: '22%', listening: null, reading: null, writing: null, to: '/pte-core-speaking-practice' },
      { name: 'Repeat Sentence', questions: '10-12', overall: '10%', speaking: '25%', listening: '24%', reading: null, writing: null, to: '/pte-core-speaking-practice' },
      { name: 'Describe Image', questions: '3-4', overall: '10%', speaking: '26%', listening: null, reading: null, writing: null, to: '/pte-core-speaking-practice' },
      { name: 'Respond to a Situation', questions: '2-3', overall: '8%', speaking: '22%', listening: null, reading: null, writing: null, to: '/pte-core-speaking-practice' },
      { name: 'Answer Short Question', questions: '5-6', overall: '3%', speaking: '5%', listening: '6%', reading: null, writing: null, to: '/pte-core-speaking-practice' },
      { name: 'Summarize Written Text', questions: '1', overall: '6%', speaking: null, listening: null, reading: '18%', writing: '27%', to: '/pte-core-writing-practice' },
      { name: 'Write Email', questions: '2', overall: '12%', speaking: null, listening: null, reading: null, writing: '48%', to: '/pte-core-writing-practice' },
    ],
  },
  {
    sectionLabel: 'Reading',
    rows: [
      { name: 'Fill in the Blanks (Drop-down)', questions: '5-6', overall: '8%', speaking: null, listening: null, reading: '30%', writing: null, to: '/pte-core-reading-practice' },
      { name: 'MCQ - Multiple', questions: '2-3', overall: '2%', speaking: null, listening: null, reading: '7%', writing: null, to: '/pte-core-reading-practice' },
      { name: 'Re-order Paragraph', questions: '2-3', overall: '4%', speaking: null, listening: null, reading: '12%', writing: null, to: '/pte-core-reading-practice' },
      { name: 'Fill in the Blanks (Drag & Drop)', questions: '4-5', overall: '7%', speaking: null, listening: null, reading: '22%', writing: null, to: '/pte-core-reading-practice' },
      { name: 'MCQ - Single', questions: '2-3', overall: '1%', speaking: null, listening: null, reading: '4%', writing: null, to: '/pte-core-reading-practice' },
    ],
  },
  {
    sectionLabel: 'Listening',
    rows: [
      { name: 'Summarize Spoken Text', questions: '1', overall: '4%', speaking: null, listening: '13%', reading: null, writing: '11%', to: '/pte-core-listening-practice' },
      { name: 'MCQ - Multiple', questions: '2-3', overall: '1%', speaking: null, listening: '4%', reading: null, writing: null, to: '/pte-core-listening-practice' },
      { name: 'Fill in the Blanks', questions: '2-3', overall: '4%', speaking: null, listening: '12%', reading: null, writing: null, to: '/pte-core-listening-practice' },
      { name: 'MCQ - Single', questions: '2-3', overall: '1%', speaking: null, listening: '3%', reading: null, writing: null, to: '/pte-core-listening-practice' },
      { name: 'Select Missing Word', questions: '1-2', overall: '1%', speaking: null, listening: '3%', reading: null, writing: null, to: '/pte-core-listening-practice' },
      { name: 'Highlight Incorrect Words', questions: '2-3', overall: '5%', speaking: null, listening: '14%', reading: '7%', writing: null, to: '/pte-core-listening-practice' },
      { name: 'Write From Dictation', questions: '3-4', overall: '6%', speaking: null, listening: '21%', reading: null, writing: '14%', to: '/pte-core-listening-practice' },
    ],
  },
];
