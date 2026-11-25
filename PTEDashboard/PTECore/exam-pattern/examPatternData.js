export const CORE_EXAM_PATTERN_SECTIONS = [
  {
    sectionLabel: 'Speaking & Writing',
    rows: [
      { name: 'Read Aloud', avgQuestions: '6-7', to: '/v1/core/practice/speaking/read-aloud' },
      { name: 'Repeat Sentence', avgQuestions: '10-12', to: '/v1/core/practice/speaking/repeat-sentence' },
      { name: 'Describe Image', avgQuestions: '3-4', to: '/v1/core/practice/speaking/describe-image' },
      { name: 'Respond to a Situation', avgQuestions: '2-4', to: '/v1/core/practice/speaking/respond-to-a-situation' },
      { name: 'Answer Short Question', avgQuestions: '5-6', to: '/v1/core/practice/speaking/answer-short-question' },
      { name: 'Summarize Written Text', avgQuestions: '1-2', to: '/v1/core/practice/writing/summarize-written-text' },
      { name: 'Write Email', avgQuestions: '2-3', to: '/v1/core/practice/writing/write-email' },
    ],
  },
  {
    sectionLabel: 'Reading',
    rows: [
      { name: 'Fill in the Blanks (Drop & Down)', avgQuestions: '5-6', to: '/v1/core/practice/reading/reading-writing-fill-in-the-blanks' },
      { name: 'MCQ- Multiple', avgQuestions: '1-2', to: '/v1/core/practice/reading/multiple-choice-multiple' },
      { name: 'Re-order Paragraph', avgQuestions: '2-3', to: '/v1/core/practice/reading/reorder-paragraphs' },
      { name: 'Fill in the Blanks (Drag & Drop)', avgQuestions: '4-5', to: '/v1/core/practice/reading/fill-in-the-blanks' },
      { name: 'MCQ- Single', avgQuestions: '1-2', to: '/v1/core/practice/reading/multiple-choice-single' },
    ],
  },
  {
    sectionLabel: 'Listening',
    rows: [
      { name: 'Summarize Spoken Text', avgQuestions: '1-2', to: '/v1/core/practice/listening/summarize-spoken-text' },
      { name: 'MCQ- Multiple', avgQuestions: '1-2', to: '/v1/core/practice/listening/multiple-choice-multiple' },
      { name: 'Fill in the Blanks', avgQuestions: '2-3', to: '/v1/core/practice/listening/fill-in-the-blanks' },
      { name: 'MCQ- Single', avgQuestions: '1-2', to: '/v1/core/practice/listening/multiple-choice-single' },
      { name: 'Select Missing Word', avgQuestions: '1-2', to: '/v1/core/practice/listening/select-missing-word' },
      { name: 'Highlight Incorrect Words', avgQuestions: '1-2', to: '/v1/core/practice/listening/highlight-incorrect-words' },
      { name: 'Write from Dictation', avgQuestions: '3-4', to: '/v1/core/practice/listening/write-from-dictation' },
    ],
  },
];
