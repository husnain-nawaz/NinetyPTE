const READING_MCQ_PASSAGES = [
  {
    passage:
      'The red telephone box, a public telephone kiosk designed by Sir Giles Gilbert Scott, was a once familiar sight on the streets of the United Kingdom. The first standard public telephone kiosk introduced by the United Kingdom Post Office was produced by Somerville S. Company in 1920 and designated K1. This design was not of the same family as the familiar red telephone boxes. After a 1924 competition won by Gilbert Scott, the Post Office requested cast iron instead of mild steel and slight door changes; this became K2 from 1927, deployed mainly in and around London. K3, designed in 1930 again by Gilbert Scott, was similar to K2 but constructed from concrete and intended for rural areas. In 1935, K6 was designed to commemorate the silver jubilee of King George V and became the first standard kiosk used throughout the country.',
    question: 'According to the text, which of the designs were almost the same?',
    multiOptions: [
      { id: 'A', label: 'K6' },
      { id: 'B', label: 'K3' },
      { id: 'C', label: 'K2' },
      { id: 'D', label: 'K4' },
    ],
    singleQuestion: 'Which model was the first standard kiosk rolled out nationwide?',
    singleOptions: [
      { id: 'A', label: 'K1 introduced in 1920' },
      { id: 'B', label: 'K2 made from cast iron' },
      { id: 'C', label: 'K3 built with concrete for rural towns' },
      { id: 'D', label: 'K6 designed for King George V’s silver jubilee' },
    ],
  },
  {
    passage:
      'Marketing managers in television work with a relatively stable advertising medium. In many ways, television advertisements aired today are similar to those aired a few decades ago. However, the differing dynamics of the Internet pose distinctive challenges to advertisers, forcing them to transform their practices and methods on a regular basis. In the early days of Internet marketing, online advertisers employed banner and pop-up ads that generated leads at low cost. Over time, frustration among consumers grew, and web browsers began blocking image-based banner and pop-up ads. A major expansion in online marketing came with pay-per-click ads, which allowed companies to pay only when an interested prospective customer clicked on an ad.',
    question: 'Why do advertisers need to change their methods and strategies of advertising?',
    multiOptions: [
      { id: 'A', label: 'As consumers become more urbane and selective.' },
      { id: 'B', label: 'There was advancement in technology leading to new user preferences.' },
      { id: 'C', label: 'Traditional web banner formats became blocked by modern browsers.' },
      { id: 'D', label: 'Pay-per-click tools targeted interested prospective customers.' },
      { id: 'E', label: 'Print newspapers ceased carrying commercial advertisements.' },
    ],
    singleQuestion: 'Why did pay-per-click advertising gain popularity over banner ads?',
    singleOptions: [
      { id: 'A', label: 'Banner ads could never contain colorful graphics.' },
      { id: 'B', label: 'Companies paid only when prospective customers actually clicked.' },
      { id: 'C', label: 'Television advertising became illegal during daytime hours.' },
      { id: 'D', label: 'Consumers preferred unsolicited pop-up windows.' },
    ],
  },
];

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
                  className={`flex items-start gap-2.5 px-2 py-1 text-xs sm:text-[13px] cursor-pointer transition w-fit max-w-full ${
                    checked
                      ? 'bg-[#fef08a] text-slate-900'
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
                    className="mt-1 accent-[#00738e] cursor-pointer shrink-0"
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
