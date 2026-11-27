import { useState } from 'react';
import { BarChart3, CheckCircle2, Mic, Play, Square, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import TaskResponseInputs from '../../practice-arena/TaskResponseInputs';

/**
 * Renders the live active exam question stage (Speaking recorder box or shared Writing/Reading/Listening input)
 * as well as the post-submission Scorecard summary screen.
 */
export function MockExamQuestionStage({
  activeItem,
  savedAnswer,
  onSaveAnswer,
  darkMode,
}) {
  const { taskMeta, question, skillGroup } = activeItem;
  const isSpeaking = skillGroup === 'Speaking';

  const [speakingState, setSpeakingState] = useState(
    savedAnswer?.recorded ? 'recorded' : 'ready'
  );
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

  const handleToggleSpeaking = () => {
    if (speakingState === 'recording') {
      setSpeakingState('recorded');
      updateAnswer({ recorded: true, answered: true });
      return;
    }
    setSpeakingState('recording');
    updateAnswer({ started: true });
  };

  if (isSpeaking) {
    return (
      <div className="max-w-4xl space-y-6">
        <div className="space-y-2">
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

        {taskMeta.hasAudioPrompt && (
          <div className="w-full max-w-[300px] rounded-xs bg-[#3792b5] text-white px-5 py-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span>Status</span>
              <span>{promptPlaying ? 'Playing Audio' : 'Ready to Play'}</span>
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

        {taskMeta.slug === 'describe-image' && (
          <div
            className={`rounded-lg border p-5 max-w-lg space-y-3 ${
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
          <div
            className={`rounded-lg border p-5 text-sm sm:text-[15px] leading-relaxed ${
              darkMode
                ? 'border-zinc-600 bg-[#2a2a2a] text-zinc-100'
                : 'border-slate-200 bg-white text-slate-800 shadow-2xs'
            }`}
          >
            {question.contentSnippet || taskMeta.promptText}
          </div>
        )}

        <div
          className={`max-w-md rounded-xs border p-4 space-y-3 ${
            darkMode ? 'border-zinc-600 bg-[#2a2a2a]' : 'border-slate-300 bg-[#f6f6f6]'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold">
            <span className={darkMode ? 'text-zinc-200' : 'text-slate-800'}>Recorded Answer</span>
            <span
              className={
                speakingState === 'recording'
                  ? 'text-rose-500'
                  : speakingState === 'recorded'
                    ? 'text-emerald-500'
                    : darkMode
                      ? 'text-zinc-400'
                      : 'text-slate-500'
              }
            >
              {speakingState === 'recording'
                ? 'Recording...'
                : speakingState === 'recorded'
                  ? 'Completed'
                  : 'Current Status: Ready'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleSpeaking}
              className={`inline-flex items-center gap-2 rounded-xs px-4 py-2 text-xs font-bold text-white cursor-pointer transition ${
                speakingState === 'recording'
                  ? 'bg-rose-600 hover:bg-rose-700'
                  : 'bg-[#3792b5] hover:bg-[#2a7999]'
              }`}
            >
              {speakingState === 'recording' ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-white" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5" />
                  <span>{speakingState === 'recorded' ? 'Re-record Answer' : 'Start Recording'}</span>
                </>
              )}
            </button>

            <div className={`h-2 flex-1 rounded-full overflow-hidden ${darkMode ? 'bg-zinc-600' : 'bg-slate-300'}`}>
              <div
                className={`h-full transition-all duration-300 ${
                  speakingState === 'recording'
                    ? 'w-2/3 bg-rose-500 animate-pulse'
                    : speakingState === 'recorded'
                      ? 'w-full bg-emerald-500'
                      : 'w-0'
                }`}
              />
            </div>
          </div>
        </div>
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
