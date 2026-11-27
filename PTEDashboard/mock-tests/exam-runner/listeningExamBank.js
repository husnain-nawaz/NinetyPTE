export const LISTENING_TYPED_BLANKS_PASSAGES = [
  {
    title: 'Global Warming',
    answers: ['initial', 'modified', 'altered', 'decade'],
    segments: [
      'Global warming might seem like a botanical boon. After all, milder temperatures and more carbon dioxide and nitrogen should feed flora. But a ten year study has found that any ',
      { id: 'lb1' },
      ' positive effects on plant growth from climate change may soon disappear. The report is in the journal Nature Climate Change. Researchers transplanted vegetation from four grassland ecosystems to lower, warmer elevations. They also ',
      { id: 'lb2' },
      ' the precipitation at the transplant sites based on ',
      { id: 'lb3' },
      ' rainfall estimates. For the first year, the plants did great, producing more biomass and churning out more oxygen for us. But their productivity went down for the rest of the ',
      { id: 'lb4' },
      '.',
    ],
  },
  {
    title: 'Earth Warning',
    answers: ['sea', 'Access', 'opening', 'nations', 'share'],
    segments: [
      'The Earth is warming. Almost all the Arctic ',
      { id: 'lb1' },
      ' ice may have melted by the end of the century, claims the Intergovernmental Panel on Climate Change the IPCC. The upside. ',
      { id: 'lb2' },
      " to an estimated quarter of the world's oil and gas resources and the ",
      { id: 'lb3' },
      ' of the fabled Northwest Passage. The downside. The Arctic wilderness is lost as neighboring ',
      { id: 'lb4' },
      ', Denmark and Greenland, Russia, Canada, Norway, and the United States all race to ',
      { id: 'lb5' },
      ' in the bounty.',
    ],
  },
];

export const LISTENING_CHOICE_BANK = {
  'multiple-choice-multiple': [
    {
      title: 'Ancient Greeks',
      instruction:
        'Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response.',
      stem: 'What reasons for studying the ancient Greeks does the lecturer mention?',
      speech:
        'Historians continue to study the ancient Greeks because their cultural ideas deeply shaped the Western world and introduced foundational institutions of civic government and law.',
      correctIds: ['A', 'B'],
      options: [
        { id: 'A', label: 'The ancient Greeks were very influential in the Western world.' },
        { id: 'B', label: 'The ancient Greeks created institutions of government and law.' },
        { id: 'C', label: 'The ancient Greeks are very interesting.' },
        { id: 'D', label: 'The ancient Greeks had good technological achievements.' },
        { id: 'E', label: 'The ancient Greeks provide for a subjective field of study.' },
      ],
    },
    {
      title: 'Language Acquisition',
      instruction:
        'Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response.',
      stem: 'Which TWO points does the speaker emphasize regarding practical language acquisition?',
      speech:
        'Practical language research demonstrates that early immersion exposure builds grammatical accuracy while active conversational feedback improves listening comprehension speed.',
      correctIds: ['A', 'C'],
      options: [
        { id: 'A', label: 'Early immersion exposure improves long-term grammatical fluency.' },
        { id: 'B', label: 'Memorizing isolated dictionary lists outperforms contextual dialogue.' },
        { id: 'C', label: 'Active conversational feedback reinforces listening comprehension speed.' },
        { id: 'D', label: 'Written translation tasks should replace spoken practice entirely.' },
      ],
    },
  ],
  'highlight-correct-summary': [
    {
      title: 'The Big Bang Theory',
      stem: 'Which of the following most accurately summarizes the opinion of the speaker in the recording?',
      speech:
        'Cosmology models indicate that the universe originated in the Big Bang approximately 13.8 billion years ago. While physical equations describe early expansion well, future cosmic developments remain partly inferred.',
      correctIds: ['A'],
      options: [
        {
          id: 'A',
          label:
            "The prediction of cosmology indicates the universe began a big bang, and it's 13.8 billion years old. Besides this, the Laws of physical explains what happened in the big bang. Therefore, although we cannot predict what's going on in the future, we got some ideas.",
        },
        {
          id: 'B',
          label:
            'The universe began a big bang, and the universe is about ten or twenty billion years old. So their universe is just a little bit older than the stars.',
        },
        {
          id: 'C',
          label:
            "Big Bang is not clear any how, everything fits together and we know how the universe began, we got to know how the way it is. But we don't know quite well what's going",
        },
        {
          id: 'D',
          label:
            "The universe did start in a Big bang and it's 13.8 billion years old, and that's a stunning achievement to know that.",
        },
      ],
    },
    {
      title: 'Leadership Management',
      stem: 'Which summary best reflects the main message of the lecture?',
      speech:
        'Modern education leaders need dynamic and entrepreneurial problem-solving skills beyond traditional administration. As a result, Schools of Education emphasize learning processes while Schools of Business concentrate on organizational management.',
      correctIds: ['B'],
      options: [
        {
          id: 'A',
          label:
            'The business school gets together with the education school and talks about education leadership.',
        },
        {
          id: 'B',
          label:
            'Leaders need to be dynamic and entrepreneurial change agents, but management is not enough. Therefore, the School of Education will focus on learning while the School of Business will focus on management.',
        },
        {
          id: 'C',
          label:
            'Participants collaborate and build relationships through group work. However, they must realize that it is their own responsibility to achieve and accomplish.',
        },
        {
          id: 'D',
          label:
            'Education leaders need to be dynamic and entrepreneurial change agents. So now many institutes are providing education leadership learning opportunities, for-profit or non-profit.',
        },
      ],
    },
  ],
  'multiple-choice-single': [
    {
      title: 'English Diet',
      stem: 'Which of the following statements is true, according to the text?',
      speech:
        'In the sixteenth century expanded trade and agrarian cultivation introduced a noticeably wider choice of foods across everyday households.',
      correctIds: ['A'],
      options: [
        { id: 'A', label: 'In the 16th century people had a wider choice of food.' },
        { id: 'B', label: 'There were no root crops in medieval times.' },
        { id: 'C', label: 'Potatoes and tomatoes were extremely popular.' },
        { id: 'D', label: 'Spices were too expensive for the average person.' },
      ],
    },
    {
      title: 'Social Sciences',
      stem: 'The author is primarily concerned with',
      speech:
        'Social scientists face a distinctive dilemma because human researchers attempt to evaluate objectively the very social systems they belong to.',
      correctIds: ['D'],
      options: [
        { id: 'A', label: 'advocating a more modest view, and less widespread utilization, of the social sciences' },
        { id: 'B', label: 'analyzing the mechanisms for translating discoveries into applications in the social sciences.' },
        { id: 'C', label: 'dissolving the air of paradox inherent in human beings studying themselves' },
        { id: 'D', label: 'explaining a peculiar dilemma that the social sciences are in.' },
      ],
    },
  ],
  'select-missing-word': [
    {
      title: 'Depression',
      speech:
        'Modern neuroimaging helps clinicians monitor overlapping neurological pathways linked closely with anxiety and depressive disorders.',
      correctIds: ['B'],
      options: [
        { id: 'A', label: 'actions' },
        { id: 'B', label: 'disorders' },
        { id: 'C', label: 'reactions' },
        { id: 'D', label: 'medicines' },
      ],
    },
    {
      title: 'Urban Green Corridors',
      speech:
        'When municipal planners integrate shaded tree corridors with permeable pavements, heavy summer storms drain rapidly and surface heat anomalies drop steadily.',
      correctIds: ['A'],
      options: [
        { id: 'A', label: 'cool surrounding city neighborhoods' },
        { id: 'B', label: 'halt underground subway schedules' },
        { id: 'C', label: 'expand highway concrete tolls' },
        { id: 'D', label: 'discourage pedestrian cycling routes' },
      ],
    },
  ],
};

export const HIGHLIGHT_INCORRECT_WORDS_PASSAGES = [
  {
    title: 'Bookworm',
    replacements: {
      8: 'black-tufted',
      20: 'scientists',
      50: 'encroachments',
      62: 'Scientists',
      66: 'studying',
      84: 'whatever',
      138: 'unwelcome',
    },
    paragraphs: [
      'What does a bookworm have in common with a mulcted marmoset? They both like a little quiet. Or so say researchers in the Royal Society journal Biology Letters.',
      'As urban areas continue to expand, their human inhabitants spread all sorts of pollution: air pollution, light pollution, even noise pollution. Each of these environmental changes affects the survival and behavior of local wildlife. And monkeys are no exception.',
      'People in Brazil were enquiring how marmosets in a city park cope with ambient noise. And they found that the monkeys tend to settle down in every part of the park is most quiet. On weekdays, the marmosets steered clear of the roar of traffic, and on Sundays they shunned the clamor of visiting crowds. They dodged all the din, even when moving meant that they had to leave behind the places that offered them the most food.',
      'It could be that the monkeys are just skittish when it comes to disagreeable sounds. Or they can’t hear what their friends are saying when it gets too loud. Either way, next time you see a cute little marmoset, forget "oooh" or "awwww" or "ee-ee-ee." Try shhhh.',
    ],
  },
  {
    title: 'Freedom',
    replacements: {
      7: 'students',
      14: 'presented',
      21: 'Association',
      26: 'suggests',
      56: 'teaching',
      115: 'answered',
    },
    paragraphs: [
      "What's the best way for pupils to really learn basic science? New research just showed at the annual meeting of the American Federation for the Advancement of Science declares an answer: freedom. After years of watching nonscience majors struggle with biology courses, Steve Rissing of Ohio State University decided to see how the boring old cookbook method of learning stacked up against something new.",
      'The old way was to give students a big textbook to follow and dumb down experiments. Many students still scored poorly when asked about the basics. The new method gave students freedom.',
      'They prepared their own enzyme solutions and were encouraged to come up with their own methods. The result? Eighty-three percent of the free students gave the right answer to the simple question, "Where do enzymes occur in nature?" Just 23 percent of the cookbook group responded correctly.',
      'The new methods could help train students to better see and understand the beauty of science.',
    ],
  },
];

export const LISTENING_DICTATION_SENTENCES = [
  {
    title: 'WFD3482',
    sentence: 'Some historical events occurrences are questioned due to scant evidence.',
  },
  {
    title: 'WFD3518',
    sentence: 'Staff at the university will review feedback on evaluation forms.',
  },
  {
    title: 'WFD3670',
    sentence: 'We will discuss these two pictures in the next lecture.',
  },
];
