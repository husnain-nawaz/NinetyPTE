import PearsonAudioClipPlayer from './PearsonAudioClipPlayer';
import PearsonWritingStage from './PearsonWritingStage';
import {
  HIGHLIGHT_INCORRECT_WORDS_PASSAGES,
  LISTENING_CHOICE_BANK,
  LISTENING_DICTATION_SENTENCES,
  LISTENING_TYPED_BLANKS_PASSAGES,
} from './listeningExamBank';

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
  const hiwEntry = isHighlightWords
    ? HIGHLIGHT_INCORRECT_WORDS_PASSAGES[questionIndex % HIGHLIGHT_INCORRECT_WORDS_PASSAGES.length]
    : null;
  const hiwParagraphs = hiwEntry?.paragraphs || [];

  const hiwGroups = hiwParagraphs.reduce((acc, para) => {
    const offset = acc.length > 0 ? acc[acc.length - 1].endOffset : 0;
    const words = para.split(/\s+/).filter(Boolean);
    acc.push({
      tokens: words.map((token, idx) => ({ token, tokenIdx: offset + idx })),
      endOffset: offset + words.length,
    });
    return acc;
  }, []);

  const wfdItem =
    taskMeta.slug === 'write-from-dictation'
      ? LISTENING_DICTATION_SENTENCES[questionIndex % LISTENING_DICTATION_SENTENCES.length]
      : null;

  const speechPrompt =
    wfdItem?.sentence ||
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
