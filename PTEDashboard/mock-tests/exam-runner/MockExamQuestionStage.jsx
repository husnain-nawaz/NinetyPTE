import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import TaskResponseInputs from '../../practice-arena/TaskResponseInputs';
import AudioPromptSpeakingStage from './AudioPromptSpeakingStage';
import SpeakingRecorderWidget from './SpeakingRecorderWidget';

const DESCRIBE_IMAGE_URLS = [
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    alt: 'Data visualization and analytics chart',
  },
  {
    src: 'https://images.unsplash.com/photo-1661548306911-7821c3b64be3?auto=format&fit=crop&w=900&q=80',
    alt: 'Mother and child together in the kitchen',
  },
  {
    src: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80',
    alt: 'Statistical market and trend line chart',
  },
  {
    src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
    alt: 'Family preparing meal together at kitchen counter',
  },
  {
    src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=900&q=80',
    alt: 'Business performance charts and graphs',
  },
  {
    src: 'https://images.unsplash.com/photo-1477959858617-67f30bc47b82?auto=format&fit=crop&w=900&q=80',
    alt: 'Modern city skyline architecture view',
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    alt: 'Dashboard metrics and visual reports',
  },
  {
    src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80',
    alt: 'Urban city skyline and bridge view',
  },
];

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
  const paragraphOrder = savedAnswer?.paragraphOrder || taskMeta.reorderParagraphs || [];
  const highlightedWords = savedAnswer?.highlightedWords || [];

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
      const recDuration =
        taskMeta.slug === 'repeat-sentence' ? 15 : taskMeta.slug === 'answer-short-question' ? 10 : 40;

      return (
        <div className="max-w-5xl space-y-8">
          <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {taskMeta.instruction}
          </p>

          <AudioPromptSpeakingStage
            promptSpeechText={question.contentSnippet || taskMeta.promptText}
            recordSeconds={recDuration}
            darkMode={darkMode}
            initialCompleted={Boolean(savedAnswer?.recorded)}
            onPhaseChange={onSpeakingPhaseChange}
            onCompleteRecording={() => updateAnswer({ recorded: true, answered: true })}
          />
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

  return (
    <div className="max-w-4xl space-y-5">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-[#00738e] px-2.5 py-0.5 text-[11px] font-bold text-white">
            {taskMeta.code}
          </span>
          <h2 className={`text-sm sm:text-base font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {taskMeta.title}
          </h2>
        </div>
        <p className={`text-xs sm:text-[13px] italic ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
          {taskMeta.instruction}
        </p>
      </div>

      <TaskResponseInputs
        taskMeta={taskMeta}
        activeQuestion={question}
        showAnswer={false}
        darkMode={darkMode}
        responseText={responseText}
        onChangeResponseText={(val) =>
          updateAnswer({
            responseText: typeof val === 'function' ? val(responseText) : val,
            answered: true,
          })
        }
        blankSelections={blankSelections}
        onChangeBlankSelections={(val) =>
          updateAnswer({
            blankSelections: typeof val === 'function' ? val(blankSelections) : val,
            answered: true,
          })
        }
        selectedChoices={selectedChoices}
        onChangeSelectedChoices={(val) =>
          updateAnswer({
            selectedChoices: typeof val === 'function' ? val(selectedChoices) : val,
            answered: true,
          })
        }
        paragraphOrder={paragraphOrder}
        onChangeParagraphOrder={(val) =>
          updateAnswer({
            paragraphOrder: typeof val === 'function' ? val(paragraphOrder) : val,
            answered: true,
          })
        }
        highlightedWords={highlightedWords}
        onChangeHighlightedWords={(val) =>
          updateAnswer({
            highlightedWords: typeof val === 'function' ? val(highlightedWords) : val,
            answered: true,
          })
        }
      />
    </div>
  );
}

/**
 * AI Scorecard view shown once all questions of the mock test have been submitted.
 */
export function MockExamCompletedScreen({ scorePayload, scoreHistoryRoute, onExit, darkMode }) {
  const skillScores = [
    { label: 'Speaking', value: scorePayload.speaking },
    { label: 'Writing', value: scorePayload.writing },
    { label: 'Reading', value: scorePayload.reading },
    { label: 'Listening', value: scorePayload.listening },
  ].filter((item) => item.value !== null && item.value !== undefined);

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-[#e5f8f6] text-[#1ea7a1] flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h2 className={`text-xl font-extrabold ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
          Mock Test Completed
        </h2>
        <p className={`text-xs sm:text-sm ${darkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
          {scorePayload.title} ({scorePayload.writingStyle}) has been scored and saved to Score History.
        </p>
      </div>

      <div
        className={`rounded-2xl border p-6 space-y-5 ${
          darkMode ? 'border-zinc-600 bg-[#2a2a2a]' : 'border-slate-200 bg-slate-50/70'
        }`}
      >
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Overall Score
          </p>
          <p className="text-4xl font-extrabold text-[#1ea7a1] mt-1">
            {scorePayload.overall} <span className="text-base font-semibold">/ 90</span>
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200/30">
          {skillScores.map((s) => (
            <div
              key={s.label}
              className={`rounded-xl p-3 border ${
                darkMode ? 'border-zinc-600 bg-[#1f1f1f]' : 'border-slate-200 bg-white'
              }`}
            >
              <p className={`text-[11px] font-medium ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                {s.label}
              </p>
              <p className={`text-base font-extrabold mt-0.5 ${darkMode ? 'text-white' : 'text-[#0b4a7b]'}`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onExit}
          className="rounded-full border border-[#0b4a7b] bg-white hover:bg-slate-50 px-6 py-2 text-xs font-bold text-[#0b4a7b] cursor-pointer"
        >
          Back to Mock Tests
        </button>
        <Link
          to={scoreHistoryRoute}
          className="rounded-full bg-[#0b4a7b] hover:bg-[#08385f] px-6 py-2 text-xs font-bold text-white"
        >
          View Score History
        </Link>
      </div>
    </div>
  );
}
