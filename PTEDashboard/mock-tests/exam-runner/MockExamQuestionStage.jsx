import AudioPromptSpeakingStage from './AudioPromptSpeakingStage';
import { DESCRIBE_IMAGE_URLS } from './mockTestSessionStore';
import PearsonDragDropBlanksStage from './PearsonDragDropBlanksStage';
import PearsonDropdownBlanksStage from './PearsonDropdownBlanksStage';
import PearsonListeningStage from './PearsonListeningStage';
import PearsonMcqStage from './PearsonMcqStage';
import PearsonReorderStage from './PearsonReorderStage';
import PearsonWritingStage from './PearsonWritingStage';
import SpeakingRecorderWidget from './SpeakingRecorderWidget';

/**
 * Renders the live active exam question stage (Describe Image side-by-side embedded photo,
 * Audio Prompt blue player + Ready/Recording transition, Read Aloud passage + recorder,
 * or shared Writing/Reading/Listening response widgets) and the post-submission Scorecard.
 */
export function MockExamQuestionStage({
  activeItem,
  savedAnswer,
  onSaveAnswer,
  onSpeakingPhaseChange,
  darkMode,
}) {
  const { taskMeta, question, skillGroup } = activeItem;
  const isSpeaking = skillGroup === 'Speaking';

  const responseText = savedAnswer?.responseText || '';
  const blankSelections = savedAnswer?.blankSelections || {};
  const selectedChoices = savedAnswer?.selectedChoices || [];

  const updateAnswer = (patch) => {
    onSaveAnswer({
      ...savedAnswer,
      ...patch,
    });
  };

  if (isSpeaking) {
    if (taskMeta.slug === 'describe-image') {
      const pickedImg =
        DESCRIBE_IMAGE_URLS[activeItem.index % DESCRIBE_IMAGE_URLS.length] || DESCRIBE_IMAGE_URLS[0];

      return (
        <div className="max-w-5xl space-y-8">
          <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {taskMeta.instruction}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 pt-2">
            <div className="md:col-span-6 flex justify-center md:justify-start">
              <div
                className={`p-2 rounded-xs ${
                  darkMode ? 'bg-white' : 'bg-white'
                } shadow-sm border border-slate-200/70`}
              >
                <img
                  src={pickedImg.src}
                  alt={pickedImg.alt || question.title}
                  className="w-full max-w-[440px] max-h-[300px] object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-6 flex justify-center">
              <SpeakingRecorderWidget
                prepSeconds={25}
                recordSeconds={40}
                darkMode={darkMode}
                initialCompleted={Boolean(savedAnswer?.recorded)}
                onPhaseChange={onSpeakingPhaseChange}
                onCompleteRecording={() => updateAnswer({ recorded: true, answered: true })}
              />
            </div>
          </div>
        </div>
      );
    }

    if (taskMeta.hasAudioPrompt) {
      const isDiscussion = taskMeta.slug === 'summarize-group-discussion';
      const isSituation = taskMeta.slug === 'respond-to-a-situation';
      const recDuration =
        isDiscussion
          ? 120
          : taskMeta.slug === 'repeat-sentence'
            ? 15
            : taskMeta.slug === 'answer-short-question'
              ? 10
              : 40;
      const playDuration = isDiscussion ? 7 : taskMeta.slug === 'retell-lecture' ? 6 : 4;
      const postPrepSec =
        isDiscussion || isSituation || taskMeta.slug === 'retell-lecture' ? 10 : 0;

      const sideImg = isDiscussion
        ? {
            src: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Talk-icon_Wikipedians.svg',
            alt: 'Three people having a group discussion',
            isIcon: true,
          }
        : taskMeta.slug === 'retell-lecture' && activeItem.index % 2 === 1
          ? DESCRIBE_IMAGE_URLS[activeItem.index % DESCRIBE_IMAGE_URLS.length]
          : null;

      return (
        <div className="max-w-5xl space-y-6">
          <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {taskMeta.instruction}
          </p>

          {isSituation && (
            <p className={`text-xs sm:text-[13px] leading-relaxed ${darkMode ? 'text-zinc-200' : 'text-slate-600'}`}>
              {question.contentSnippet || taskMeta.promptText}
            </p>
          )}

          <div className="pt-2">
            <AudioPromptSpeakingStage
              promptSpeechText={question.contentSnippet || taskMeta.promptText}
              playDuration={playDuration}
              postClipPrepSeconds={postPrepSec}
              recordSeconds={recDuration}
              sideImage={sideImg}
              darkMode={darkMode}
              initialCompleted={Boolean(savedAnswer?.recorded)}
              onPhaseChange={onSpeakingPhaseChange}
              onCompleteRecording={() => updateAnswer({ recorded: true, answered: true })}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-5xl space-y-8">
        <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {taskMeta.instruction}
        </p>

        <SpeakingRecorderWidget
          prepSeconds={12}
          recordSeconds={35}
          darkMode={darkMode}
          initialCompleted={Boolean(savedAnswer?.recorded)}
          onPhaseChange={onSpeakingPhaseChange}
          onCompleteRecording={() => updateAnswer({ recorded: true, answered: true })}
        />

        <p
          className={`text-xs sm:text-[13px] leading-relaxed ${
            darkMode ? 'text-zinc-100' : 'text-slate-700'
          }`}
        >
          {question.contentSnippet || taskMeta.promptText}
        </p>
      </div>
    );
  }

  if (skillGroup === 'Writing') {
    return (
      <PearsonWritingStage
        instruction={taskMeta.instruction}
        promptPassage={question.contentSnippet || taskMeta.promptText}
        value={responseText}
        onChange={(nextText) => updateAnswer({ responseText: nextText, answered: Boolean(nextText.trim()) })}
        darkMode={darkMode}
      />
    );
  }

  if (taskMeta.hasDropdownBlanks) {
    return (
      <PearsonDropdownBlanksStage
        instruction={taskMeta.instruction}
        questionIndex={activeItem.index}
        blankSelections={blankSelections}
        onSelectBlank={(blankId, word) => {
          const updated = { ...blankSelections, [blankId]: word };
          updateAnswer({ blankSelections: updated, answered: true });
        }}
        darkMode={darkMode}
      />
    );
  }

  if (skillGroup === 'Reading' && Array.isArray(taskMeta.mcqOptions)) {
    return (
      <PearsonMcqStage
        instruction={taskMeta.instruction}
        questionIndex={activeItem.index}
        singleChoice={Boolean(taskMeta.singleChoice)}
        selectedChoices={selectedChoices}
        onChangeSelectedChoices={(nextChoices) =>
          updateAnswer({ selectedChoices: nextChoices, answered: nextChoices.length > 0 })
        }
        darkMode={darkMode}
      />
    );
  }

  if (skillGroup === 'Reading' && Array.isArray(taskMeta.reorderParagraphs)) {
    return (
      <PearsonReorderStage
        instruction={taskMeta.instruction}
        questionIndex={activeItem.index}
        targetIds={savedAnswer?.reorderTargetIds || []}
        onChangeTargetIds={(nextIds) =>
          updateAnswer({ reorderTargetIds: nextIds, answered: nextIds.length > 0 })
        }
        darkMode={darkMode}
      />
    );
  }

  if (skillGroup === 'Reading' && taskMeta.dragDropWordBank) {
    return (
      <PearsonDragDropBlanksStage
        instruction={taskMeta.instruction}
        questionIndex={activeItem.index}
        blankSelections={blankSelections}
        onChangeBlankSelections={(nextBlanks) =>
          updateAnswer({
            blankSelections: nextBlanks,
            answered: Object.keys(nextBlanks).length > 0,
          })
        }
        darkMode={darkMode}
      />
    );
  }

  return (
    <PearsonListeningStage
      taskMeta={taskMeta}
      question={question}
      questionIndex={activeItem.index}
      savedAnswer={savedAnswer}
      onSaveAnswer={onSaveAnswer}
      darkMode={darkMode}
    />
  );
}

/**
 * Pearson end-of-mock-test completion screen rendered inside the exam shell
 * with Continue (to View Score) and Report an Issue actions in Light & Dark mode.
 */
export function MockExamCompletedScreen({ onContinue, onOpenReport, darkMode }) {
  return (
    <div className="max-w-4xl space-y-5 pt-2">
      <div
        className={`space-y-4 text-xs sm:text-[13px] leading-relaxed ${
          darkMode ? 'text-zinc-200' : 'text-slate-700'
        }`}
      >
        <p>You have now reached the end of this mock test.</p>
        <p>The scorecard is being processed &amp; will be available in a few minutes.</p>
        <p>
          Scorecards can be seen from the{' '}
          <strong className={darkMode ? 'text-white' : 'text-slate-900'}>View Score</strong> Screen.
        </p>
        <p>Click on Continue to go there.</p>
      </div>

      <div className="pt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onContinue}
          className="rounded-xs bg-[#00738e] hover:bg-[#005f75] px-5 py-2 text-xs font-semibold text-white cursor-pointer transition"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onOpenReport}
          className="rounded-xs bg-[#00738e] hover:bg-[#005f75] px-5 py-2 text-xs font-semibold text-white cursor-pointer transition"
        >
          Report an Issue
        </button>
      </div>
    </div>
  );
}
