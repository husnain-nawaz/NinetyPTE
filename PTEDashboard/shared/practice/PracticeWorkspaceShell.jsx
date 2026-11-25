import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  Info,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import PTEDashboardHeader from '../PTEDashboardHeader';
import PTEDashboardTealFooter from '../PTEDashboardTealFooter';
import QuestionBankSidebarDrawer from './QuestionBankSidebarDrawer';
import { buildTaskQuestionList, resolvePracticeTask } from './practiceTaskCatalog';

/**
 * Unified student portal practice workspace for both PTE Academic and PTE Core tasks,
 * housing the shared Question Bank slide-out right sidebar across all task types.
 */
export default function PracticeWorkspaceShell({ skill, taskSlug, isCoreMode = false }) {
  const taskMeta = useMemo(
    () => resolvePracticeTask(skill, taskSlug, isCoreMode),
    [isCoreMode, skill, taskSlug]
  );

  const initialQuestions = useMemo(() => buildTaskQuestionList(taskMeta), [taskMeta]);

  const [questionsById, setQuestionsById] = useState({});
  const [selectedQuestion, setSelectedQuestion] = useState(() => initialQuestions[0]);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [responseText, setResponseText] = useState('');
  const [activeBottomTab, setActiveBottomTab] = useState('forum');
  const [submittedNotice, setSubmittedNotice] = useState('');
  const [difficultyVote, setDifficultyVote] = useState('');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [blankSelections, setBlankSelections] = useState({});
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [paragraphOrder, setParagraphOrder] = useState(() => taskMeta.reorderParagraphs || []);
  const [highlightedWords, setHighlightedWords] = useState([]);

  const questions = useMemo(
    () =>
      initialQuestions.map((q) => {
        const override = questionsById[q.id];
        return override ? { ...q, ...override } : q;
      }),
    [initialQuestions, questionsById]
  );

  const activeQuestion =
    questions.find((q) => q.id === selectedQuestion?.id) || selectedQuestion || questions[0];

  const handleToggleBookmark = (questionId) => {
    setQuestionsById((prev) => {
      const target = questions.find((q) => q.id === questionId);
      const nextBookmarked = !target?.bookmarked;
      return {
        ...prev,
        [questionId]: { ...prev[questionId], bookmarked: nextBookmarked },
      };
    });
  };

  const handleResetPractice = () => {
    const resetMap = {};
    for (const q of initialQuestions) {
      resetMap[q.id] = { practicedCount: 0, bookmarked: false };
    }
    setQuestionsById(resetMap);
    setResponseText('');
    setSubmittedNotice('Practice history cleared for this task.');
  };

  const handleSubmitAttempt = () => {
    if (!activeQuestion) return;
    setQuestionsById((prev) => ({
      ...prev,
      [activeQuestion.id]: {
        ...prev[activeQuestion.id],
        practicedCount: (activeQuestion.practicedCount || 0) + 1,
      },
    }));
    setSubmittedNotice(`Response submitted for #${activeQuestion.id}. AI score saved to My Score.`);
    setActiveBottomTab('my-score');
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans relative">
      <PTEDashboardHeader />

      {/* Right-Edge Question Sidebar Handle */}
      {!drawerOpen && (
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open question list sidebar"
          className="fixed right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-11 rounded-l-full bg-[#00b4c6] hover:bg-[#0097a7] text-white flex items-center justify-center shadow-lg cursor-pointer transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="w-9 h-9 rounded-full text-white text-xs font-extrabold flex items-center justify-center shadow-2xs"
              style={{ backgroundColor: taskMeta.badgeColor }}
            >
              {taskMeta.code}
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-[#0c4a7e]">
              {taskMeta.title}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-full bg-[#00b4c6] hover:bg-[#0097a7] px-4 py-2 text-xs font-bold text-white shadow-xs transition cursor-pointer"
          >
            All {taskMeta.totalQuestions} Questions
          </button>
        </div>

        <p className="text-xs sm:text-[13px] text-slate-600">{taskMeta.instruction}</p>

        {/* Active Question Banner */}
        <div className="rounded-xl bg-[#0d5488] text-white px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs sm:text-sm font-bold">
            #{activeQuestion.id} | {activeQuestion.title}
          </span>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
            <span className="rounded-full bg-white/15 px-2.5 py-0.5">{activeQuestion.difficulty}</span>
            {activeQuestion.prediction && (
              <span className="rounded-full bg-cyan-400/25 px-2.5 py-0.5 text-cyan-100">Prediction</span>
            )}
            <span className="rounded-full bg-white/15 px-2.5 py-0.5">
              Appeared ({activeQuestion.appearedCount})
            </span>
          </div>
        </div>

        {/* Interactive Prompt & Response Area */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs space-y-5">
          {taskMeta.hasAudioPrompt && (
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAudioPlaying((p) => !p)}
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

          {taskMeta.hasImagePrompt && (
            <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-5 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-end gap-3 h-28 px-4 pt-4 pb-2 border-l-2 border-b-2 border-slate-300">
                <div className="w-8 h-12 rounded-t bg-[#0d5488]" />
                <div className="w-8 h-20 rounded-t bg-[#00b4c6]" />
                <div className="w-8 h-16 rounded-t bg-[#eb8c44]" />
                <div className="w-8 h-24 rounded-t bg-[#22c55e]" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="inline-block rounded-full bg-[#e5f0fa] px-2.5 py-0.5 text-[11px] font-bold text-[#0c4a7e]">
                  {activeQuestion.imageType || 'Chart Visual'}
                </span>
                <h3 className="text-sm font-bold text-slate-800">{activeQuestion.title}</h3>
                <p className="text-xs text-slate-500 max-w-md">{taskMeta.promptText}</p>
              </div>
            </div>
          )}

          {((!taskMeta.hasAudioPrompt && !taskMeta.hasImagePrompt) || showAnswer) && (
            <p className="text-sm sm:text-[15px] leading-relaxed text-slate-700">
              {activeQuestion.contentSnippet || taskMeta.promptText}
            </p>
          )}

          {taskMeta.skill === 'speaking' ? (
            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-6 flex flex-col items-center gap-3 text-center">
              {(taskMeta.hasAudioPrompt || taskMeta.hasImagePrompt) && (
                <p className="text-xs font-semibold text-slate-500">Recording will start soon</p>
              )}
              <button
                type="button"
                onClick={handleSubmitAttempt}
                className="w-12 h-12 rounded-full bg-[#eb8c44] hover:bg-[#d97736] text-white flex items-center justify-center shadow transition cursor-pointer"
                aria-label="Start recording response"
              >
                <Mic className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-slate-600">00:00</span>
            </div>
          ) : taskMeta.hasDropdownBlanks ? (
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
                      setBlankSelections((prev) => ({ ...prev, [blankIdx]: e.target.value }))
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
                        setSelectedChoices((prev) =>
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
                          setParagraphOrder((prev) => {
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
                          setParagraphOrder((prev) => {
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
                        setBlankSelections((prev) => {
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
                            setBlankSelections((prev) => ({ ...prev, [s]: chip }));
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
                      setBlankSelections((prev) => ({ ...prev, [slotIdx]: e.target.value }))
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
                      setHighlightedWords((prev) =>
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
                onChange={(e) => setResponseText(e.target.value)}
                placeholder={
                  taskMeta.skill === 'writing' || taskMeta.hasEditorToolbar
                    ? 'Type your summary here...'
                    : `Enter your ${taskMeta.title} response here...`
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
                          setResponseText('');
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
                            if (clip) setResponseText((prev) => `${prev}${clip}`);
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

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <span className="text-slate-500 font-medium">How difficult was this question?</span>
              {['Easy', 'Medium', 'Difficult'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setDifficultyVote(lvl)}
                  className={`rounded-full border px-3 py-1 font-semibold transition cursor-pointer ${
                    difficultyVote === lvl
                      ? 'border-[#00b4c6] bg-cyan-50 text-[#0097a7]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleSubmitAttempt}
                className="rounded-full bg-[#0d5488] hover:bg-[#093e66] px-5 py-2 text-xs font-bold text-white transition cursor-pointer"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setResponseText('');
                  setBlankSelections({});
                  setSelectedChoices([]);
                  setParagraphOrder(taskMeta.reorderParagraphs || []);
                  setHighlightedWords([]);
                  setSubmittedNotice('');
                }}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Redo</span>
              </button>
              {(taskMeta.hasAudioPrompt ||
                taskMeta.hasImagePrompt ||
                taskMeta.hasDropdownBlanks ||
                Boolean(taskMeta.dragDropWordBank) ||
                Boolean(taskMeta.highlightIncorrectWords) ||
                Array.isArray(taskMeta.typedBlanksAnswers) ||
                Array.isArray(taskMeta.mcqOptions) ||
                Array.isArray(taskMeta.reorderParagraphs)) && (
                <button
                  type="button"
                  onClick={() => setShowAnswer((prev) => !prev)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-[#0c4a7e] hover:bg-slate-50 transition cursor-pointer"
                >
                  {showAnswer ? 'Hide Answer' : 'Answer'}
                </button>
              )}
            </div>
          </div>

          {submittedNotice && (
            <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-700">
              {submittedNotice}
            </p>
          )}

          <div className="space-y-1.5 text-xs text-slate-500 border-t border-slate-100 pt-4">
            <p className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#00b4c6] shrink-0" />
              <span>AI Scoring is available once you submit your response.</span>
            </p>
            <p className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#00b4c6] shrink-0" />
              <span>Are you using headsets? Always use headsets with a boom microphone for accurate scoring.</span>
            </p>
          </div>
        </section>

        {/* Forum / My Score Footer Panel */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-6 border-b border-slate-100 pb-2 text-xs sm:text-sm font-bold">
            {[
              { id: 'forum', label: 'Forum' },
              { id: 'my-score', label: 'My Score' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveBottomTab(tab.id)}
                className={`pb-1 transition cursor-pointer ${
                  activeBottomTab === tab.id
                    ? 'text-[#0c4a7e] border-b-2 border-[#00b4c6]'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            {activeBottomTab === 'forum'
              ? `Discuss strategy and notes for #${activeQuestion.id} (${activeQuestion.title}).`
              : `Practiced attempts for #${activeQuestion.id}: ${activeQuestion.practicedCount || 0}.`}
          </p>
        </section>
      </main>

      <PTEDashboardTealFooter />

      <QuestionBankSidebarDrawer
        key={`${taskMeta.skill}-${taskMeta.slug}`}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        taskMeta={taskMeta}
        questions={questions}
        activeQuestionId={activeQuestion.id}
        onSelectQuestion={setSelectedQuestion}
        onToggleBookmark={handleToggleBookmark}
        onResetPractice={handleResetPractice}
      />
    </div>
  );
}
