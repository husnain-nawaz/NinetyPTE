import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DROPDOWN_PASSAGE_BANK } from './readingExamBank';

/**
 * Inline passage dropdown blanks widget for Reading Fill in the Blanks (Dropdown),
 * supporting Light and Dark mode floating menus.
 */
export default function PearsonDropdownBlanksStage({
  instruction,
  questionIndex,
  blankSelections = {},
  onSelectBlank,
  darkMode = false,
}) {
  const [openBlankId, setOpenBlankId] = useState(null);
  const passage = DROPDOWN_PASSAGE_BANK[questionIndex % DROPDOWN_PASSAGE_BANK.length];

  return (
    <div className="max-w-5xl space-y-6">
      <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        {instruction}
      </p>

      {openBlankId && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpenBlankId(null)}
          aria-hidden="true"
        />
      )}

      <div
        className={`text-xs sm:text-[14px] leading-[2.3] ${
          darkMode ? 'text-zinc-200' : 'text-slate-700'
        }`}
      >
        {passage.segments.map((seg, idx) => {
          if (typeof seg === 'string') {
            return <span key={idx}>{seg}</span>;
          }

          const chosen = blankSelections[seg.id] || '';
          const isOpen = openBlankId === seg.id;

          return (
            <span key={seg.id} className="relative inline-block mx-1 align-middle">
              <button
                type="button"
                onClick={() => setOpenBlankId((prev) => (prev === seg.id ? null : seg.id))}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className={`min-w-[145px] inline-flex items-center justify-between gap-3 rounded-xs border px-3 py-1 text-xs font-medium transition cursor-pointer ${
                  darkMode
                    ? 'border-zinc-500 bg-[#3a3a3a] text-zinc-100 hover:border-zinc-300'
                    : 'border-slate-300 bg-white text-slate-800 hover:border-slate-400'
                }`}
              >
                <span className="truncate">{chosen || 'Select...'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 opacity-70 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  role="listbox"
                  className={`absolute left-0 top-full mt-1 w-full min-w-[155px] rounded-xs border shadow-xl z-20 py-1 ${
                    darkMode
                      ? 'border-zinc-600 bg-[#2b2b2b] text-zinc-100'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {seg.options.map((opt) => {
                    const active = chosen === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          onSelectBlank(seg.id, opt);
                          setOpenBlankId(null);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs transition cursor-pointer ${
                          active
                            ? darkMode
                              ? 'bg-zinc-700 font-bold text-white'
                              : 'bg-sky-50 font-bold text-[#0b4a7b]'
                            : darkMode
                              ? 'hover:bg-zinc-700/70'
                              : 'hover:bg-slate-50'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
