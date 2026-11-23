// PTE Academic and PTE Core Task Modules Configuration
export const PTE_MODULES = [
  {
    id: 'speaking',
    name: 'Speaking',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-500/10 text-amber-600 border-amber-200',
    description: 'Oral fluency, pronunciation, and spoken discourse',
    tasks: [
      {
        id: 'read-aloud',
        code: 'RA',
        name: 'Read Aloud',
        desc: 'Read a short passage out loud into the microphone within the time limit.',
        prepTime: 35,
        recordTime: 40,
        totalQuestions: 1420,
        predictedCount: 180,
        skillsTested: ['Fluency', 'Pronunciation', 'Content'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_speaking'
      },
      {
        id: 'repeat-sentence',
        code: 'RS',
        name: 'Repeat Sentence',
        desc: 'Listen to a short audio clip and repeat the sentence exactly as spoken.',
        prepTime: 3,
        recordTime: 15,
        totalQuestions: 2150,
        predictedCount: 220,
        skillsTested: ['Fluency', 'Pronunciation', 'Content', 'Listening'],
        difficulty: 'Hard',
        shardedDb: 'db_qb_speaking'
      },
      {
        id: 'describe-image',
        code: 'DI',
        name: 'Describe Image',
        desc: 'Analyze a graph, map, flowchart, or diagram and describe it fluently.',
        prepTime: 25,
        recordTime: 40,
        totalQuestions: 890,
        predictedCount: 110,
        skillsTested: ['Fluency', 'Pronunciation', 'Content'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_speaking'
      },
      {
        id: 'retell-lecture',
        code: 'RL',
        name: 'Re-tell Lecture',
        desc: 'Listen to or watch an academic lecture, then summarize the key points.',
        prepTime: 10,
        recordTime: 40,
        totalQuestions: 640,
        predictedCount: 85,
        skillsTested: ['Fluency', 'Pronunciation', 'Content', 'Listening'],
        difficulty: 'Hard',
        shardedDb: 'db_qb_speaking'
      },
      {
        id: 'answer-short-question',
        code: 'ASQ',
        name: 'Answer Short Question',
        desc: 'Listen to a general knowledge or conceptual question and answer with 1-3 words.',
        prepTime: 3,
        recordTime: 10,
        totalQuestions: 1120,
        predictedCount: 130,
        skillsTested: ['Vocabulary', 'Listening'],
        difficulty: 'Easy',
        shardedDb: 'db_qb_speaking'
      },
      {
        id: 'respond-situation',
        code: 'RTS',
        name: 'Respond to a Situation',
        badge: 'PTE Core',
        desc: 'Listen to and read a situational scenario, then provide an appropriate spoken response.',
        prepTime: 20,
        recordTime: 40,
        totalQuestions: 310,
        predictedCount: 45,
        skillsTested: ['Fluency', 'Pronunciation', 'Discourse'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_speaking'
      }
    ]
  },
  {
    id: 'writing',
    name: 'Writing',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-500/10 text-blue-600 border-blue-200',
    description: 'Written discourse, grammar, vocabulary, and spelling',
    tasks: [
      {
        id: 'summarize-written-text',
        code: 'SWT',
        name: 'Summarize Written Text',
        desc: 'Read a text passage and write a one-sentence summary between 5 and 75 words.',
        timeLimit: 600, // 10 minutes
        wordLimit: { min: 5, max: 75 },
        totalQuestions: 480,
        predictedCount: 65,
        skillsTested: ['Grammar', 'Vocabulary', 'Content', 'Reading'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_writing'
      },
      {
        id: 'write-essay',
        code: 'WE',
        name: 'Write Essay',
        desc: 'Write a formal 200–300 word argumentative or discursive essay on a given prompt.',
        timeLimit: 1200, // 20 minutes
        wordLimit: { min: 200, max: 300 },
        totalQuestions: 320,
        predictedCount: 50,
        skillsTested: ['Discourse', 'Grammar', 'Vocabulary', 'Spelling'],
        difficulty: 'Hard',
        shardedDb: 'db_qb_writing'
      },
      {
        id: 'write-email',
        code: 'WEM',
        name: 'Write Email',
        badge: 'PTE Core',
        desc: 'Read a real-life situation and write an email of approximately 100 words.',
        timeLimit: 540, // 9 minutes
        wordLimit: { min: 80, max: 120 },
        totalQuestions: 210,
        predictedCount: 35,
        skillsTested: ['Discourse', 'Grammar', 'Tone'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_writing'
      }
    ]
  },
  {
    id: 'reading',
    name: 'Reading',
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    description: 'Reading comprehension, collocation, and contextual inference',
    tasks: [
      {
        id: 'fill-in-blanks-rw',
        code: 'FIB-RW',
        name: 'Reading & Writing: Fill in Blanks',
        desc: 'Read a passage with dropdown blanks and select the most appropriate word for each.',
        totalQuestions: 1850,
        predictedCount: 210,
        skillsTested: ['Collocation', 'Grammar', 'Vocabulary'],
        difficulty: 'Hard',
        shardedDb: 'db_qb_reading'
      },
      {
        id: 'multiple-choice-multiple',
        code: 'MCMA-R',
        name: 'Multiple Choice (Multiple Answers)',
        desc: 'Read a text and choose all correct responses from a list of options.',
        totalQuestions: 420,
        predictedCount: 40,
        skillsTested: ['Reading Comprehension', 'Inference'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_reading'
      },
      {
        id: 'reorder-paragraphs',
        code: 'RO',
        name: 'Re-order Paragraphs',
        desc: 'Arrange mixed paragraphs in their correct logical and chronological order.',
        totalQuestions: 680,
        predictedCount: 75,
        skillsTested: ['Text Cohesion', 'Logical Structure'],
        difficulty: 'Hard',
        shardedDb: 'db_qb_reading'
      },
      {
        id: 'fill-in-blanks-r',
        code: 'FIB-R',
        name: 'Reading: Fill in Blanks',
        desc: 'Drag and drop words from a pool below into the blank spaces in the text passage.',
        totalQuestions: 1340,
        predictedCount: 160,
        skillsTested: ['Contextual Vocabulary', 'Syntax'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_reading'
      },
      {
        id: 'multiple-choice-single',
        code: 'MCSA-R',
        name: 'Multiple Choice (Single Answer)',
        desc: 'Read a text passage and choose the single best answer.',
        totalQuestions: 510,
        predictedCount: 50,
        skillsTested: ['Comprehension', 'Detail Extraction'],
        difficulty: 'Easy',
        shardedDb: 'db_qb_reading'
      }
    ]
  },
  {
    id: 'listening',
    name: 'Listening',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-500/10 text-purple-600 border-purple-200',
    description: 'Auditory processing, note-taking, transcription, and dictation',
    tasks: [
      {
        id: 'summarize-spoken-text',
        code: 'SST',
        name: 'Summarize Spoken Text',
        desc: 'Listen to a short lecture and write a 50–70 word summary within 10 minutes.',
        timeLimit: 600,
        wordLimit: { min: 50, max: 70 },
        totalQuestions: 620,
        predictedCount: 80,
        skillsTested: ['Listening', 'Grammar', 'Vocabulary', 'Discourse'],
        difficulty: 'Hard',
        shardedDb: 'db_qb_listening'
      },
      {
        id: 'multiple-choice-multiple-l',
        code: 'MCMA-L',
        name: 'Multiple Choice (Multiple Answers)',
        desc: 'Listen to an audio recording and select all correct answers.',
        totalQuestions: 380,
        predictedCount: 35,
        skillsTested: ['Listening Comprehension'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_listening'
      },
      {
        id: 'fill-in-blanks-l',
        code: 'FIB-L',
        name: 'Fill in the Blanks',
        desc: 'Listen to the audio while reading the transcript and type the missing words.',
        totalQuestions: 1190,
        predictedCount: 140,
        skillsTested: ['Spelling', 'Listening Speed'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_listening'
      },
      {
        id: 'highlight-correct-summary',
        code: 'HCS',
        name: 'Highlight Correct Summary',
        desc: 'Listen to a recording and select the paragraph that best summarizes it.',
        totalQuestions: 440,
        predictedCount: 45,
        skillsTested: ['Comprehension', 'Synthesis'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_listening'
      },
      {
        id: 'multiple-choice-single-l',
        code: 'MCSA-L',
        name: 'Multiple Choice (Single Answer)',
        desc: 'Listen to an audio recording and choose the single correct answer.',
        totalQuestions: 490,
        predictedCount: 40,
        skillsTested: ['Focused Listening'],
        difficulty: 'Easy',
        shardedDb: 'db_qb_listening'
      },
      {
        id: 'select-missing-word',
        code: 'SMW',
        name: 'Select Missing Word',
        desc: 'Listen to a recording where the final word or phrase is replaced by a beep, then choose the word.',
        totalQuestions: 390,
        predictedCount: 40,
        skillsTested: ['Context Prediction'],
        difficulty: 'Medium',
        shardedDb: 'db_qb_listening'
      },
      {
        id: 'highlight-incorrect-words',
        code: 'HIW',
        name: 'Highlight Incorrect Words',
        desc: 'Listen to an audio clip while following the text; click words that differ from what was spoken.',
        totalQuestions: 780,
        predictedCount: 95,
        skillsTested: ['Listening Accuracy', 'Reading Sync'],
        difficulty: 'Hard',
        shardedDb: 'db_qb_listening'
      },
      {
        id: 'write-from-dictation',
        code: 'WFD',
        name: 'Write from Dictation',
        desc: 'Listen to a short sentence and type it exactly with correct spelling and punctuation.',
        totalQuestions: 1680,
        predictedCount: 240,
        skillsTested: ['Spelling', 'Grammar', 'Listening Memory'],
        difficulty: 'Hard',
        shardedDb: 'db_qb_listening'
      }
    ]
  }
];

export const TASK_LOOKUP = PTE_MODULES.flatMap(m => m.tasks).reduce((acc, t) => {
  acc[t.id] = t;
  return acc;
}, {});
