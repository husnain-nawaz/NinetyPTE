import { useState } from 'react';
import { BarChart3, CheckCircle2, Play, Square, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import TaskResponseInputs from '../../practice-arena/TaskResponseInputs';
import SpeakingRecorderWidget from './SpeakingRecorderWidget';

/**
 * Renders the live active exam question stage (Speaking countdown + waveform recorder
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
  const [promptPlaying, setPromptPlaying] = useState(false);

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
    const prepSec = taskMeta.slug === 'repeat-sentence' || taskMeta.slug === 'answer-short-question' ? 5 : 12;
    const recSec = taskMeta.slug === 'read-aloud' ? 35 : taskMeta.slug === 'describe-image' ? 40 : 25;

    return (
      <div className="max-w-5xl space-y-8">
        <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {taskMeta.instruction}
        </p>

        {taskMeta.hasAudioPrompt && (
          <div className="mx-auto w-full max-w-[300px] rounded-xs bg-[#3792b5] text-white px-5 py-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span>Status</span>
              <span>{promptPlaying ? 'Playing Audio' : 'Ready'}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPromptPlaying((p) => !p)}
                aria-label={promptPlaying ? 'Stop prompt audio' : 'Play prompt audio'}
                className="text-white hover:opacity-80 cursor-pointer shrink-0"
              >
                {promptPlaying ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
              <div className="h-2.5 flex-1 bg-white overflow-hidden">
                <div className={`h-full bg-[#0997d6] transition-all duration-500 ${promptPlaying ? 'w-3/4' : 'w-0'}`} />
              </div>
              <Volume2 className="w-4 h-4 shrink-0" />
            </div>
          </div>
        )}

        <SpeakingRecorderWidget
          prepSeconds={prepSec}
          recordSeconds={recSec}
          darkMode={darkMode}
          initialCompleted={Boolean(savedAnswer?.recorded)}
          onPhaseChange={onSpeakingPhaseChange}
          onCompleteRecording={() => updateAnswer({ recorded: true, answered: true })}
        />

        {taskMeta.slug === 'describe-image' && (
          <div
            className={`mx-auto rounded-lg border p-5 max-w-lg space-y-3 ${
              darkMode ? 'border-zinc-600 bg-[#2a2a2a]' : 'border-slate-200 bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#3792b5]">
              <BarChart3 className="w-4 h-4" />
              <span>{question.title}</span>
            </div>
            <div className="grid grid-cols-4 items-end gap-3 h-28 pt-2">
              {[42, 68, 86, 61].map((pct, i) => (
                <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-semibold">{pct}%</span>
                  <div className="w-8 rounded-t bg-[#3792b5]" style={{ height: `${pct}%` }} />
                  <span className={`text-[10px] ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    Q{i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!taskMeta.hasAudioPrompt && (
          <p
            className={`text-xs sm:text-[13px] leading-relaxed ${
              darkMode ? 'text-zinc-100' : 'text-slate-700'
            }`}
          >
            {question.contentSnippet || taskMeta.promptText}
          </p>
        )}
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
