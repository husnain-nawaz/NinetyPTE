import { useState } from 'react';
import { DRAG_DROP_BANK } from './readingExamBank';

/**
 * Pearson Drag & Drop Reading blanks stage featuring inline rectangular drop boxes
 * and high-contrast Light/Dark inverted word tray. Supports both Drag-and-Drop and click-to-place.
 */
export default function PearsonDragDropBlanksStage({
  instruction,
  questionIndex,
  blankSelections = {},
  onChangeBlankSelections,
  darkMode = false,
}) {
  const item = DRAG_DROP_BANK[questionIndex % DRAG_DROP_BANK.length];
  const [dragWord, setDragWord] = useState(null);
  const [dragFromSlot, setDragFromSlot] = useState(null);

  const blankSlotIds = item.segments.filter((s) => typeof s !== 'string').map((s) => s.id);
  const usedWords = Object.values(blankSelections);
  const availableWords = item.wordBank.filter((w) => !usedWords.includes(w));

  const placeWordInSlot = (slotId, word) => {
    if (!word) return;
    const next = { ...blankSelections };
    // Remove word if previously placed in another slot
    Object.keys(next).forEach((k) => {
      if (next[k] === word) delete next[k];
    });
    next[slotId] = word;
    onChangeBlankSelections(next);
  };

  const returnWordToTray = (slotId) => {
    if (!blankSelections[slotId]) return;
    const next = { ...blankSelections };
    delete next[slotId];
    onChangeBlankSelections(next);
  };

  const handleClickAvailableTile = (word) => {
    const firstEmptySlot = blankSlotIds.find((id) => !blankSelections[id]);
    if (firstEmptySlot) {
      placeWordInSlot(firstEmptySlot, word);
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        {instruction}
      </p>

      {/* Passage with Rectangular Drop Boxes */}
      <div
        className={`text-xs sm:text-[14px] leading-[2.4] ${
          darkMode ? 'text-zinc-200' : 'text-slate-700'
        }`}
      >
        {item.segments.map((seg, idx) => {
          if (typeof seg === 'string') {
            return <span key={idx}>{seg}</span>;
          }

          const placedWord = blankSelections[seg.id] || '';
          return (
            <button
              key={seg.id}
              type="button"
              draggable={Boolean(placedWord)}
              onDragStart={() => {
                if (placedWord) {
                  setDragWord(placedWord);
                  setDragFromSlot(seg.id);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragWord) {
                  placeWordInSlot(seg.id, dragWord);
                  setDragWord(null);
                  setDragFromSlot(null);
                }
              }}
              onClick={() => {
                if (placedWord) returnWordToTray(seg.id);
              }}
              aria-label={placedWord ? `Remove ${placedWord} from blank` : `Empty blank ${seg.id}`}
              className={`inline-flex items-center justify-center align-middle mx-1 min-w-[116px] h-7 px-3 border text-xs font-medium transition ${
                darkMode
                  ? 'border-zinc-400 bg-[#3a3a3a] text-white'
                  : 'border-slate-400 bg-white text-slate-900'
              } ${placedWord ? 'cursor-pointer hover:opacity-85' : ''}`}
            >
              {placedWord}
            </button>
          );
        })}
      </div>

      {/* Inverted Contrast Word Bank Box */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (dragFromSlot) {
            returnWordToTray(dragFromSlot);
          }
          setDragWord(null);
          setDragFromSlot(null);
        }}
        className={`max-w-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 shadow-xs ${
          darkMode ? 'bg-white' : 'bg-[#424242]'
        }`}
      >
        {availableWords.map((word) => (
          <button
            key={word}
            type="button"
            draggable
            onDragStart={() => {
              setDragWord(word);
              setDragFromSlot(null);
            }}
            onClick={() => handleClickAvailableTile(word)}
            className={`px-3 py-1.5 text-xs font-medium text-center shadow-2xs cursor-grab transition ${
              darkMode
                ? 'bg-[#424242] text-white hover:bg-[#525252]'
                : 'bg-white text-slate-800 hover:bg-slate-100'
            }`}
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}
