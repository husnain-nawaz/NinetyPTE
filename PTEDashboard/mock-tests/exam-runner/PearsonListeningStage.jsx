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

const getChoiceLabelClass = (checked, darkMode) =>
  `flex items-start gap-2.5 px-2 py-1 text-xs sm:text-[13px] cursor-pointer transition w-fit max-w-full ${
    checked
      ? 'bg-[#fef08a] text-slate-900'
      : darkMode
        ? 'text-zinc-200 hover:text-white'
        : 'text-slate-700 hover:text-slate-900'
  }`;

/**
 * Unified Pearson Listening exam stage supporting Summarize Spoken Text, Write from Dictation,
 * Inline Typed Blanks, Highlight Incorrect Words, Highlight Correct Summary, Select Missing Word,
 * and two-column Listening MCQ (Single & Multiple) in Light and Dark mode.
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

  const audioPlayerNode = (
    <PearsonAudioClipPlayer
      promptSpeechText={question.contentSnippet || taskMeta.promptText}
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
    const showStem = taskMeta.slug !== 'select-missing-word';
    return (
      <div className="max-w-6xl space-y-6">
        <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {taskMeta.instruction}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-2">
          <div className="md:col-span-7 space-y-4">
            {showStem && (
              <p className={`text-xs sm:text-[13px] font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {taskMeta.promptText}
              </p>
            )}

            <div className="space-y-2.5">
              {(taskMeta.mcqOptions || []).map((opt) => {
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
                      className="mt-1 accent-[#00738e] cursor-pointer shrink-0"
                    />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            {audioPlayerNode}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
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
          className={`text-xs sm:text-[14px] leading-[2.1] flex flex-wrap items-center gap-x-1 gap-y-1.5 ${
            darkMode ? 'text-zinc-200' : 'text-slate-700'
          }`}
        >
          {taskMeta.highlightIncorrectWords.text.split(/\s+/).map((token, idx) => {
            const selected = highlightedWords.includes(idx);
            return (
              <button
                key={`${idx}-${token}`}
                type="button"
                onClick={() => {
                  const next = selected
                    ? highlightedWords.filter((i) => i !== idx)
                    : [...highlightedWords, idx];
                  updateAnswer({ highlightedWords: next, answered: next.length > 0 });
                }}
                className={`rounded-xs px-1 py-0.5 cursor-pointer transition ${
                  selected
                    ? 'bg-[#fef08a] text-slate-900 font-semibold'
                    : darkMode
                      ? 'hover:bg-zinc-700'
                      : 'hover:bg-slate-100'
                }`}
              >
                {token}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
