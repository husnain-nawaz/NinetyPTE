import PearsonAudioClipPlayer from './PearsonAudioClipPlayer';
import PearsonWritingStage from './PearsonWritingStage';

const LISTENING_TYPED_BLANKS_PASSAGES = [
  {
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

const LISTENING_CHOICE_BANK = {
  'multiple-choice-multiple': [
    {
      instruction:
        'Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response.',
      stem: 'What reasons for studying the ancient Greeks does the lecturer mention?',
      speech:
        'Historians continue to study the ancient Greeks because their cultural ideas deeply shaped the Western world and introduced foundational institutions of civic government and law.',
      options: [
        { id: 'A', label: 'The ancient Greeks were very influential in the Western world.' },
        { id: 'B', label: 'The ancient Greeks created institutions of government and law.' },
        { id: 'C', label: 'The ancient Greeks are very interesting.' },
        { id: 'D', label: 'The ancient Greeks had good technological achievements.' },
        { id: 'E', label: 'The ancient Greeks provide for a subjective field of study.' },
      ],
    },
    {
      instruction:
        'Listen to the recording and answer the question by selecting all the correct responses. You will need to select more than one response.',
      stem: 'Which TWO points does the speaker emphasize regarding practical language acquisition?',
      speech:
        'Practical language research demonstrates that early immersion exposure builds grammatical accuracy while active conversational feedback improves listening comprehension speed.',
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
      speech:
        'Cosmology models indicate that the universe originated in the Big Bang approximately 13.8 billion years ago. While physical equations describe early expansion well, future cosmic developments remain partly inferred.',
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
      speech:
        'Modern education leaders need dynamic and entrepreneurial problem-solving skills beyond traditional administration. As a result, Schools of Education emphasize learning processes while Schools of Business concentrate on organizational management.',
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
      stem: 'What key observation does the speaker make regarding how literary genres develop over time?',
      speech:
        'Literary historians note that genre conventions rarely emerge suddenly; instead, writers gradually adapt earlier dramatic and poetic traditions for new audiences.',
      options: [
        { id: 'A', label: 'Genre conventions evolved gradually as writers adapted earlier forms for new audiences.' },
        { id: 'B', label: 'Contemporary novels abandoned all narrative techniques derived from classical drama.' },
        { id: 'C', label: 'Oral poetry had no measurable influence on printed prose fiction in Europe.' },
        { id: 'D', label: 'Literary critics classify every eighteenth-century essay strictly as lyric verse.' },
      ],
    },
    {
      stem: 'According to the lecturer, what most improves urban grid reliability during peak summer demand?',
      speech:
        'Grid engineers emphasize that distributed battery storage paired with automated demand response reduces blackouts far more effectively than building rarely used peaker plants.',
      options: [
        { id: 'A', label: 'Distributed battery storage combined with automated demand management.' },
        { id: 'B', label: 'Suspending residential solar installations in coastal cities.' },
        { id: 'C', label: 'Increasing flat-rate electricity billing throughout midnight hours.' },
        { id: 'D', label: 'Replacing municipal transformers exclusively during winter storms.' },
      ],
    },
  ],
  'select-missing-word': [
    {
      speech:
        'Acoustic laboratory instruments measure subtle sound pressure fluctuations before amplifying signals that reach and exceed our normal threshold of hearing.',
      options: [
        { id: 'A', label: 'exceeds our normal threshold of hearing' },
        { id: 'B', label: 'eliminates background static completely' },
        { id: 'C', label: 'reverses acoustic wave frequency' },
        { id: 'D', label: 'produces a permanent echo chamber' },
      ],
    },
    {
      speech:
        'When municipal planners integrate shaded tree corridors with permeable pavements, heavy summer storms drain rapidly and surface heat anomalies fall steadily.',
      options: [
        { id: 'A', label: 'cool surrounding city neighborhoods' },
        { id: 'B', label: 'halt underground subway schedules' },
        { id: 'C', label: 'expand highway concrete tolls' },
        { id: 'D', label: 'discourage pedestrian cycling routes' },
      ],
    },
  ],
};

const HIGHLIGHT_INCORRECT_WORDS_PASSAGES = [
  [
    'What does a bookworm have in common with a mulcted marmoset? They both like a little quiet. Or so say researchers in the Royal Society journal Biology Letters.',
    'As urban areas continue to expand, their human inhabitants spread all sorts of pollution: air pollution, light pollution, even noise pollution. Each of these environmental changes affects the survival and behavior of local wildlife. And monkeys are no exception.',
    'People in Brazil were enquiring how marmosets in a city park cope with ambient noise. And they found that the monkeys tend to settle down in every part of the park is most quiet. On weekdays, the marmosets steered clear of the roar of traffic, and on Sundays they shunned the clamor of visiting crowds. They dodged all the din, even when moving meant that they had to leave behind the places that offered them the most food.',
    'It could be that the monkeys are just skittish when it comes to disagreeable sounds. Or they can’t hear what their friends are saying when it gets too loud. Either way, next time you see a cute little marmoset, forget "oooh" or "awwww" or "ee-ee-ee." Try shhhh.',
  ],
  [
    "What's the best way for pupils to really learn basic science? New research just showed at the annual meeting of the American Federation for the Advancement of Science declares an answer: freedom. After years of watching nonscience majors struggle with biology courses, Steve Rissing of Ohio State University decided to see how the boring old cookbook method of learning stacked up against something new.",
    'The old way was to give students a big textbook to follow and dumb down experiments. Many students still scored poorly when asked about the basics. The new method gave students freedom.',
    'They prepared their own enzyme solutions and were encouraged to come up with their own methods. The result? Eighty-three percent of the free students gave the right answer to the simple question, "Where do enzymes occur in nature?" Just 23 percent of the cookbook group responded correctly.',
    'The new methods could help train students to better see and understand the beauty of science.',
  ],
];

const getChoiceLabelClass = (checked, darkMode) =>
  `flex items-center gap-2.5 px-2 py-1 text-xs sm:text-[13px] cursor-pointer transition w-fit max-w-full ${
    checked
      ? 'bg-[#fde047] text-slate-900'
      : darkMode
        ? 'text-zinc-200 hover:text-white'
        : 'text-slate-700 hover:text-slate-900'
  }`;

/**
 * Unified Pearson Listening exam stage supporting Summarize Spoken Text, Write from Dictation,
 * Inline Typed Blanks, Multi-Paragraph Highlight Incorrect Words, Highlight Correct Summary,
 * Select Missing Word, and two-column Listening MCQ (Single & Multiple) in Light and Dark mode.
 */
export default function PearsonListeningStage({
  taskMeta,
  question,
  questionIndex,
  savedAnswer,
  onSaveAnswer,
  onClipComplete,
  darkMode = false,
}) {
  const responseText = savedAnswer?.responseText || '';
  const blankSelections = savedAnswer?.blankSelections || {};
  const selectedChoices = savedAnswer?.selectedChoices || [];
  const highlightedWords = savedAnswer?.highlightedWords || [];

  const updateAnswer = (patch) => {
    onSaveAnswer({
      ...savedAnswer,
      ...patch,
    });
  };

  const isSummaryOrDictation =
    taskMeta.slug === 'summarize-spoken-text' || taskMeta.slug === 'write-from-dictation';
  const isTypedBlanks = Array.isArray(taskMeta.typedBlanksAnswers);
  const isHighlightWords = Boolean(taskMeta.highlightIncorrectWords);
  const isChoiceSideBySide = !isSummaryOrDictation && !isTypedBlanks && !isHighlightWords;
  const playDur = isSummaryOrDictation ? 7 : 5;

  const choiceBank = LISTENING_CHOICE_BANK[taskMeta.slug] || [];
  const pickedChoiceItem =
    choiceBank.length > 0 ? choiceBank[questionIndex % choiceBank.length] : null;
  const hiwParagraphs = isHighlightWords
    ? HIGHLIGHT_INCORRECT_WORDS_PASSAGES[questionIndex % HIGHLIGHT_INCORRECT_WORDS_PASSAGES.length]
    : [];

  const hiwGroups = hiwParagraphs.reduce((acc, para) => {
    const offset = acc.length > 0 ? acc[acc.length - 1].endOffset : 0;
    const words = para.split(/\s+/).filter(Boolean);
    acc.push({
      tokens: words.map((token, idx) => ({ token, tokenIdx: offset + idx })),
      endOffset: offset + words.length,
    });
    return acc;
  }, []);

  const speechPrompt =
    pickedChoiceItem?.speech ||
    (hiwParagraphs.length > 0 ? hiwParagraphs.join(' ') : null) ||
    question.contentSnippet ||
    taskMeta.promptText;

  const audioPlayerNode = (
    <PearsonAudioClipPlayer
      promptSpeechText={speechPrompt}
      delaySeconds={6}
      playDuration={playDur}
      initialCompleted={Boolean(savedAnswer?.clipPlayed)}
      onCompletePlayback={() => {
        updateAnswer({ clipPlayed: true });
        onClipComplete?.();
      }}
    />
  );

  if (isChoiceSideBySide) {
    const showStem =
      taskMeta.slug === 'multiple-choice-multiple' || taskMeta.slug === 'multiple-choice-single';
    const choiceInstruction = pickedChoiceItem?.instruction || taskMeta.instruction;
    const choiceStem = pickedChoiceItem?.stem || taskMeta.promptText;
    const choiceOptions = pickedChoiceItem?.options || taskMeta.mcqOptions || [];

    return (
      <div className="w-full space-y-6">
        <p
          className={`text-xs sm:text-[13px] font-bold leading-relaxed ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}
        >
          {choiceInstruction}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
          <div className="md:col-span-7 space-y-4">
            {showStem && (
              <p className={`text-xs sm:text-[13px] ${darkMode ? 'text-zinc-100' : 'text-slate-900'}`}>
                {choiceStem}
              </p>
            )}

            <div className="space-y-2.5">
              {choiceOptions.map((opt) => {
                const checked = selectedChoices.includes(opt.id);
                return (
                  <label key={opt.id} className={getChoiceLabelClass(checked, darkMode)}>
                    <input
                      type={taskMeta.singleChoice ? 'radio' : 'checkbox'}
                      name={taskMeta.singleChoice ? `lmcq-${questionIndex}` : undefined}
                      checked={checked}
                      onChange={() => {
                        const next = taskMeta.singleChoice
                          ? [opt.id]
                          : checked
                            ? selectedChoices.filter((id) => id !== opt.id)
                            : [...selectedChoices, opt.id];
                        updateAnswer({ selectedChoices: next, answered: next.length > 0 });
                      }}
                      className="accent-[#00738e] cursor-pointer shrink-0"
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            {audioPlayerNode}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <p
        className={`text-xs sm:text-[13px] font-bold leading-relaxed ${
          darkMode ? 'text-white' : 'text-slate-900'
        }`}
      >
        {taskMeta.instruction}
      </p>

      <div className="flex justify-center pt-1">{audioPlayerNode}</div>

      {isSummaryOrDictation ? (
        <PearsonWritingStage
          instruction=""
          promptPassage=""
          value={responseText}
          onChange={(nextText) =>
            updateAnswer({ responseText: nextText, answered: Boolean(nextText.trim()) })
          }
          darkMode={darkMode}
        />
      ) : isTypedBlanks ? (
        <div
          className={`text-xs sm:text-[14px] leading-[2.4] ${
            darkMode ? 'text-zinc-200' : 'text-slate-700'
          }`}
        >
          {LISTENING_TYPED_BLANKS_PASSAGES[questionIndex % LISTENING_TYPED_BLANKS_PASSAGES.length].segments.map(
            (seg, idx) => {
              if (typeof seg === 'string') {
                return <span key={idx}>{seg}</span>;
              }
              const val = blankSelections[seg.id] || '';
              return (
                <input
                  key={seg.id}
                  type="text"
                  value={val}
                  onChange={(e) => {
                    const updated = { ...blankSelections, [seg.id]: e.target.value };
                    const hasAny = Object.values(updated).some((v) => String(v || '').trim());
                    updateAnswer({ blankSelections: updated, answered: hasAny });
                  }}
                  aria-label={`Missing word ${seg.id}`}
                  className={`inline-block align-middle mx-1 w-32 h-7 px-2.5 border text-xs font-medium focus:outline-none focus:border-[#00738e] ${
                    darkMode
                      ? 'border-zinc-400 bg-[#3a3a3a] text-zinc-100'
                      : 'border-slate-300 bg-white text-slate-900'
                  }`}
                />
              );
            }
          )}
        </div>
      ) : (
        <div
          className={`space-y-4 text-xs sm:text-[13px] leading-[1.95] ${
            darkMode ? 'text-zinc-200' : 'text-slate-700'
          }`}
        >
          {hiwGroups.map((group, pIdx) => (
            <p key={pIdx}>
              {group.tokens.map(({ token, tokenIdx }, wIdx) => {
                const selected = highlightedWords.includes(tokenIdx);
                return (
                  <span key={tokenIdx}>
                    {wIdx > 0 && ' '}
                    <button
                      type="button"
                      onClick={() => {
                        const next = selected
                          ? highlightedWords.filter((i) => i !== tokenIdx)
                          : [...highlightedWords, tokenIdx];
                        updateAnswer({ highlightedWords: next, answered: next.length > 0 });
                      }}
                      className={`px-0.5 cursor-pointer transition ${
                        selected
                          ? 'bg-[#fde047] text-slate-900'
                          : darkMode
                            ? 'hover:bg-zinc-600/60'
                            : 'hover:bg-slate-200/70'
                      }`}
                    >
                      {token}
                    </button>
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
