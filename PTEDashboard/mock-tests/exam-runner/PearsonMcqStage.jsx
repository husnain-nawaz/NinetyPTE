import { READING_MCQ_PASSAGES } from './readingExamBank';

/**
 * Pearson two-column Reading MCQ stage (Single & Multiple Answers) with yellow
 * highlight bars on selected items in Light and Dark mode.
 */
export default function PearsonMcqStage({
  instruction,
  questionIndex,
  singleChoice = false,
  selectedChoices = [],
  onChangeSelectedChoices,
  darkMode = false,
}) {
  const bankItem = READING_MCQ_PASSAGES[questionIndex % READING_MCQ_PASSAGES.length];
  const stem = singleChoice ? bankItem.singleQuestion : bankItem.question;
  const options = singleChoice ? bankItem.singleOptions : bankItem.multiOptions;

  const toggleChoice = (optId) => {
    if (singleChoice) {
      onChangeSelectedChoices([optId]);
      return;
    }
    const exists = selectedChoices.includes(optId);
    onChangeSelectedChoices(
      exists ? selectedChoices.filter((id) => id !== optId) : [...selectedChoices, optId]
    );
  };

  return (
    <div className="max-w-6xl space-y-6">
      <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        {instruction}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div
          className={`md:col-span-6 text-xs sm:text-[13px] leading-relaxed ${
            darkMode ? 'text-zinc-200' : 'text-slate-700'
          }`}
        >
          {bankItem.passage}
        </div>

        <div className="md:col-span-6 space-y-4">
          <p className={`text-xs sm:text-[13px] font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {stem}
          </p>

          <div className="space-y-2.5">
            {options.map((opt) => {
              const checked = selectedChoices.includes(opt.id);
              return (
                <label
                  key={opt.id}
                  className={`flex items-center gap-2.5 px-2 py-1 text-xs sm:text-[13px] cursor-pointer transition w-fit max-w-full ${
                    checked
                      ? 'bg-[#fde047] text-slate-900'
                      : darkMode
                        ? 'text-zinc-200 hover:text-white'
                        : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <input
                    type={singleChoice ? 'radio' : 'checkbox'}
                    name={singleChoice ? `mcq-${questionIndex}` : undefined}
                    checked={checked}
                    onChange={() => toggleChoice(opt.id)}
                    className="accent-[#00738e] cursor-pointer shrink-0"
                  />
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
