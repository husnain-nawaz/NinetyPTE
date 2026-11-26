import { useState } from 'react';
import { ArrowDown, ArrowUp, Pause, Play, Volume2 } from 'lucide-react';

/**
 * Shared response widgets for non-speaking practice tasks (Writing editor, Reading MCQ,
 * Re-order Paragraphs, Dropdown Blanks, Drag & Drop Blanks, Typed Blanks, and Highlight Incorrect Words).
 */
export default function TaskResponseInputs({
  taskMeta,
  activeQuestion,
  showAnswer,
  responseText,
  onChangeResponseText,
  blankSelections,
  onChangeBlankSelections,
  selectedChoices,
  onChangeSelectedChoices,
  paragraphOrder,
  onChangeParagraphOrder,
  highlightedWords,
  onChangeHighlightedWords,
}) {
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handleAudioToggle = () => {
    setAudioPlaying((prev) => !prev);
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
      {taskMeta.hasAudioPrompt && (
        <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={handleAudioToggle}
            aria-label={audioPlaying ? 'Pause prompt audio' : 'Play prompt audio'}
            className="w-8 h-8 rounded-full bg-[#0d5488] hover:bg-[#093e66] text-white flex items-center justify-center shrink-0 cursor-pointer"
          >
            {audioPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <span className="text-[11px] font-mono font-semibold text-slate-600 shrink-0">00:00</span>
          <div className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden">
            <div className={`h-full rounded-full bg-[#00b4c6] transition-all ${audioPlaying ? 'w-1/2' : 'w-0'}`} />
          </div>
          <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
        </div>
      )}

      {(!taskMeta.hasAudioPrompt || showAnswer) && (
        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-700">
          {activeQuestion.contentSnippet || taskMeta.promptText}
        </p>
      )}

      {taskMeta.hasDropdownBlanks ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-700">
          <span className="font-semibold text-[#0c4a7e]">Select blanks:</span>
          {['develop', 'expanding'].map((answerWord, blankIdx) => {
            const options = [answerWord, 'restrict', 'observe', 'decline'];
            const chosen = showAnswer ? answerWord : blankSelections[blankIdx] || '';
            return (
              <select
                key={answerWord}
                value={chosen}
                onChange={(e) =>
                  onChangeBlankSelections((prev) => ({ ...prev, [blankIdx]: e.target.value }))
                }
                aria-label={`Blank ${blankIdx + 1}`}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#0c4a7e] focus:outline-none focus:border-[#00b4c6]"
              >
                <option value="">-- Blank {blankIdx + 1} --</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            );
          })}
        </div>
      ) : Array.isArray(taskMeta.mcqOptions) ? (
        <div className="space-y-2.5">
          {taskMeta.mcqOptions.map((opt) => {
            const checked = selectedChoices.includes(opt.id);
            const highlightCorrect = showAnswer && opt.correct;
            return (
              <label
                key={opt.id}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-xs sm:text-sm cursor-pointer transition ${
                  highlightCorrect
                    ? 'border-emerald-400 bg-emerald-50/70 text-emerald-900'
                    : checked
                    ? 'border-[#00b4c6] bg-cyan-50/50 text-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <input
                  type={taskMeta.singleChoice ? 'radio' : 'checkbox'}
                  name={taskMeta.singleChoice ? 'mcq-single-choice' : undefined}
                  checked={checked}
                  onChange={() =>
                    onChangeSelectedChoices((prev) =>
                      taskMeta.singleChoice
                        ? [opt.id]
                        : prev.includes(opt.id)
                        ? prev.filter((item) => item !== opt.id)
                        : [...prev, opt.id]
                    )
                  }
                  className="mt-0.5 rounded border-slate-300 text-[#00b4c6] focus:ring-[#00b4c6]"
                />
                <span>
                  <strong className="mr-1.5">{opt.id}.</strong>
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      ) : Array.isArray(taskMeta.reorderParagraphs) ? (
        <div className="space-y-2.5">
          {(showAnswer
            ? [...paragraphOrder].sort((a, b) => a.correctOrder - b.correctOrder)
            : paragraphOrder
          ).map((item, idx) => (
            <div
              key={item.id}
              className={`rounded-xl border px-4 py-3 flex items-center justify-between gap-3 text-xs sm:text-sm ${
                showAnswer
                  ? 'border-emerald-400 bg-emerald-50/70 text-emerald-900'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-[#eef6fd] text-[#0c4a7e] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {showAnswer ? item.correctOrder : item.id}
                </span>
                <span>{item.text}</span>
              </div>

              {!showAnswer && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() =>
                      onChangeParagraphOrder((prev) => {
                        const next = [...prev];
                        [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                        return next;
                      })
                    }
                    aria-label="Move paragraph up"
                    className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-35 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === paragraphOrder.length - 1}
                    onClick={() =>
                      onChangeParagraphOrder((prev) => {
                        const next = [...prev];
                        [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
                        return next;
                      })
                    }
                    aria-label="Move paragraph down"
                    className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-35 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : taskMeta.dragDropWordBank ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
            <span className="font-semibold text-[#0c4a7e]">Fill blanks:</span>
            {taskMeta.dragDropWordBank.answers.map((answerWord, slotIdx) => {
              const placedWord = showAnswer ? answerWord : blankSelections[slotIdx];
              return (
                <button
                  key={answerWord}
                  type="button"
                  onClick={() => {
                    if (showAnswer || !placedWord) return;
                    onChangeBlankSelections((prev) => {
                      const next = { ...prev };
                      delete next[slotIdx];
                      return next;
                    });
                  }}
                  className={`min-w-[84px] rounded-lg border px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    showAnswer
                      ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                      : placedWord
                      ? 'border-[#00b4c6] bg-cyan-50 text-[#0c4a7e]'
                      : 'border-dashed border-slate-300 bg-white text-slate-400'
                  }`}
                >
                  {placedWord || `Blank ${slotIdx + 1}`}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {taskMeta.dragDropWordBank.choices.map((chip) => {
              const alreadyUsed = Object.values(blankSelections).includes(chip);
              return (
                <button
                  key={chip}
                  type="button"
                  disabled={showAnswer || alreadyUsed}
                  onClick={() => {
                    const totalSlots = taskMeta.dragDropWordBank.answers.length;
                    for (let s = 0; s < totalSlots; s += 1) {
                      if (!blankSelections[s]) {
                        onChangeBlankSelections((prev) => ({ ...prev, [s]: chip }));
                        break;
                      }
                    }
                  }}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                    alreadyUsed
                      ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'border-slate-200 bg-white text-[#0c4a7e] hover:border-[#00b4c6] hover:bg-cyan-50 cursor-pointer'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      ) : Array.isArray(taskMeta.typedBlanksAnswers) ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
          <span className="font-semibold text-[#0c4a7e]">Missing words:</span>
          {taskMeta.typedBlanksAnswers.map((answerWord, slotIdx) => {
            const value = showAnswer ? answerWord : blankSelections[slotIdx] || '';
            return (
              <input
                key={answerWord}
                type="text"
                value={value}
                readOnly={showAnswer}
                onChange={(e) =>
                  onChangeBlankSelections((prev) => ({ ...prev, [slotIdx]: e.target.value }))
                }
                placeholder={`Blank ${slotIdx + 1}`}
                aria-label={`Missing word ${slotIdx + 1}`}
                className={`w-32 rounded-lg border px-3 py-1.5 text-xs font-semibold focus:outline-none ${
                  showAnswer
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                    : 'border-slate-300 bg-white text-[#0c4a7e] focus:border-[#00b4c6]'
                }`}
              />
            );
          })}
        </div>
      ) : taskMeta.highlightIncorrectWords ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs sm:text-sm leading-relaxed text-slate-700">
          {taskMeta.highlightIncorrectWords.text.split(/\s+/).map((token, idx) => {
            const cleanWord = token.replace(/^[^a-zA-Z0-9']+|[^a-zA-Z0-9']+$/g, '');
            const isAnswerWord = taskMeta.highlightIncorrectWords.incorrect.includes(cleanWord);
            const isSelected = highlightedWords.includes(idx);
            return (
              <button
                key={`${idx}-${token}`}
                type="button"
                onClick={() =>
                  onChangeHighlightedWords((prev) =>
                    prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
                  )
                }
                className={`rounded px-1.5 py-0.5 transition cursor-pointer ${
                  showAnswer && isAnswerWord
                    ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-300'
                    : isSelected
                    ? 'bg-amber-200/80 text-amber-950 font-semibold border border-amber-300'
                    : 'hover:bg-cyan-50 hover:text-[#0c4a7e]'
                }`}
              >
                {token}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          <textarea
            rows={5}
            value={responseText}
            onChange={(e) => onChangeResponseText(e.target.value)}
            placeholder={
              taskMeta.placeholder ||
              (taskMeta.skill === 'writing' || taskMeta.hasEditorToolbar
                ? 'Type your summary here...'
                : `Enter your ${taskMeta.title} response here...`)
            }
            className="w-full rounded-xl border border-slate-200 p-4 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#00b4c6]"
          />

          {(taskMeta.skill === 'writing' || taskMeta.hasEditorToolbar) && (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {[
                  {
                    label: 'Cut',
                    onClick: () => {
                      try {
                        navigator.clipboard?.writeText(responseText);
                      } catch {
                        // Ignore clipboard failures
                      }
                      onChangeResponseText('');
                    },
                  },
                  {
                    label: 'Copy',
                    onClick: () => {
                      try {
                        navigator.clipboard?.writeText(responseText);
                      } catch {
                        // Ignore clipboard failures
                      }
                    },
                  },
                  {
                    label: 'Paste',
                    onClick: async () => {
                      try {
                        const clip = await navigator.clipboard?.readText();
                        if (clip) onChangeResponseText((prev) => `${prev}${clip}`);
                      } catch {
                        // Ignore clipboard failures
                      }
                    },
                  },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={btn.onClick}
                    className="rounded-full bg-[#155e75] hover:bg-[#0e4456] px-4 py-1 text-xs font-bold text-white transition cursor-pointer"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              <span className="text-xs font-semibold text-slate-500">
                Word Count: {responseText.trim() ? responseText.trim().split(/\s+/).length : 0}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
