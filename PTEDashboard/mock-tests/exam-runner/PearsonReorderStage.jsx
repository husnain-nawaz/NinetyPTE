import { useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

const REORDER_CARD_BANK = [
  [
    { id: 'r1', text: 'As a result, an orchard’s productivity and profitability largely depend on these initial choices.' },
    { id: 'r2', text: 'They are meticulously organized for efficient growth and harvesting.' },
    { id: 'r3', text: 'Fruit orchards are specialized plantations dedicated to the cultivation of fruit trees.' },
    { id: 'r4', text: 'The selection of fruit varieties is crucial, considering factors like climate, soil type, and market demand.' },
  ],
  [
    { id: 'r1', text: 'They provide a sense of connection between the artists and the audience.' },
    { id: 'r2', text: 'Additionally, live concerts often create a communal atmosphere, bringing people together through shared musical experiences.' },
    { id: 'r3', text: 'Live music performances offer an experience that recorded music cannot replicate.' },
    { id: 'r4', text: 'Conversely, the accessibility of live performances can be limited by factors such as location and cost.' },
  ],
];

/**
 * Pearson two-panel Re-order Paragraphs stage (Source & Target) supporting HTML5 Drag-and-Drop
 * and circular Left/Right/Up/Down controls in Light and Dark mode.
 */
export default function PearsonReorderStage({
  instruction,
  questionIndex,
  targetIds = [],
  onChangeTargetIds,
  darkMode = false,
}) {
  const allCards = REORDER_CARD_BANK[questionIndex % REORDER_CARD_BANK.length];
  const [selectedId, setSelectedId] = useState(null);
  const [draggedId, setDraggedId] = useState(null);

  const sourceCards = allCards.filter((c) => !targetIds.includes(c.id));
  const targetCards = targetIds
    .map((id) => allCards.find((c) => c.id === id))
    .filter(Boolean);

  const selectedInSource = Boolean(sourceCards.find((c) => c.id === selectedId));
  const selectedTargetIdx = targetCards.findIndex((c) => c.id === selectedId);
  const selectedInTarget = selectedTargetIdx >= 0;

  const moveToTarget = (id) => {
    if (!id || targetIds.includes(id)) return;
    onChangeTargetIds([...targetIds, id]);
    setSelectedId(id);
  };

  const moveToSource = (id) => {
    if (!id || !targetIds.includes(id)) return;
    onChangeTargetIds(targetIds.filter((item) => item !== id));
    setSelectedId(id);
  };

  const shiftTarget = (delta) => {
    if (!selectedInTarget) return;
    const nextIdx = selectedTargetIdx + delta;
    if (nextIdx < 0 || nextIdx >= targetIds.length) return;
    const copy = [...targetIds];
    [copy[selectedTargetIdx], copy[nextIdx]] = [copy[nextIdx], copy[selectedTargetIdx]];
    onChangeTargetIds(copy);
  };

  const panelBorderClass = darkMode ? 'border-zinc-300 bg-[#333333]' : 'border-black bg-white';
  const cardBaseClass = (isSelected) =>
    `rounded-xs px-3 py-2.5 text-xs leading-relaxed cursor-grab transition select-none ${
      isSelected
        ? darkMode
          ? 'border-2 border-[#38bdf8] bg-zinc-700/60 text-white'
          : 'border-2 border-[#0284c7] bg-white text-slate-900 shadow-xs'
        : darkMode
          ? 'border border-dashed border-zinc-400 text-zinc-200 hover:border-zinc-200'
          : 'border border-dashed border-slate-500 text-slate-700 hover:border-slate-800'
    }`;

  const arrowBtnClass = (enabled) =>
    `w-7 h-7 rounded-full border-2 flex items-center justify-center transition ${
      enabled
        ? 'border-[#0284c7] text-[#0284c7] hover:bg-sky-50/20 cursor-pointer'
        : 'border-zinc-400 text-zinc-400 cursor-not-allowed opacity-70'
    }`;

  return (
    <div className="max-w-5xl space-y-5">
      <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        {instruction}
      </p>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Source Panel */}
        <div className="flex-1 space-y-1.5">
          <p className={`text-center text-sm font-semibold ${darkMode ? 'text-zinc-100' : 'text-slate-800'}`}>
            Source
          </p>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedId) {
                moveToSource(draggedId);
                setDraggedId(null);
              }
            }}
            className={`min-h-[300px] border-2 p-2.5 space-y-2 ${panelBorderClass}`}
          >
            {sourceCards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => {
                  setDraggedId(card.id);
                  setSelectedId(card.id);
                }}
                onClick={() => setSelectedId(card.id)}
                onDoubleClick={() => moveToTarget(card.id)}
                className={cardBaseClass(selectedId === card.id)}
              >
                {card.text}
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Buttons */}
        <div className="flex md:flex-col items-center justify-center gap-2 py-2">
          <button
            type="button"
            disabled={!selectedInTarget}
            onClick={() => moveToSource(selectedId)}
            aria-label="Move paragraph back to Source"
            className={arrowBtnClass(selectedInTarget)}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={!selectedInSource}
            onClick={() => moveToTarget(selectedId)}
            aria-label="Move paragraph to Target"
            className={arrowBtnClass(selectedInSource)}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Target Panel */}
        <div className="flex-1 space-y-1.5">
          <p className={`text-center text-sm font-semibold ${darkMode ? 'text-zinc-100' : 'text-slate-800'}`}>
            Target
          </p>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedId) {
                moveToTarget(draggedId);
                setDraggedId(null);
              }
            }}
            className={`min-h-[300px] border-2 p-2.5 space-y-2 ${panelBorderClass}`}
          >
            {targetCards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={() => {
                  setDraggedId(card.id);
                  setSelectedId(card.id);
                }}
                onClick={() => setSelectedId(card.id)}
                onDoubleClick={() => moveToSource(card.id)}
                className={cardBaseClass(selectedId === card.id)}
              >
                {card.text}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Ordering Buttons */}
        <div className="flex md:flex-col items-center justify-center gap-2 py-2">
          <button
            type="button"
            disabled={!selectedInTarget || selectedTargetIdx === 0}
            onClick={() => shiftTarget(-1)}
            aria-label="Move selected target paragraph up"
            className={arrowBtnClass(selectedInTarget && selectedTargetIdx > 0)}
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={!selectedInTarget || selectedTargetIdx === targetCards.length - 1}
            onClick={() => shiftTarget(1)}
            aria-label="Move selected target paragraph down"
            className={arrowBtnClass(selectedInTarget && selectedTargetIdx < targetCards.length - 1)}
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
