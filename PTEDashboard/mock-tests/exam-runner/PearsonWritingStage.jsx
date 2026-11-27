import { useRef, useState } from 'react';
import { ClipboardPaste, Copy, Redo2, Scissors, Undo2 } from 'lucide-react';

/**
 * Pearson-authentic Writing stage used for Summarize Written Text, Write Essay,
 * Write Email, and Summarize Spoken Text with Cut/Copy/Paste/Undo/Redo toolbar
 * and bottom teal Word Count bar in Light and Dark modes.
 */
export default function PearsonWritingStage({
  instruction,
  promptPassage,
  value = '',
  onChange,
  darkMode = false,
}) {
  const [history, setHistory] = useState([value]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const textareaRef = useRef(null);

  const commitChange = (nextVal) => {
    const sliced = history.slice(0, historyIdx + 1);
    const updated = [...sliced, nextVal];
    setHistory(updated);
    setHistoryIdx(updated.length - 1);
    onChange(nextVal);
  };

  const handleCut = () => {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? 0;
    const end = el?.selectionEnd ?? value.length;
    const hasSelection = end > start;
    const targetText = hasSelection ? value.slice(start, end) : value;
    try {
      navigator.clipboard?.writeText(targetText);
    } catch {
      // Ignore clipboard failures
    }
    const remaining = hasSelection
      ? `${value.slice(0, start)}${value.slice(end)}`
      : '';
    commitChange(remaining);
  };

  const handleCopy = () => {
    const el = textareaRef.current;
    const start = el?.selectionStart ?? 0;
    const end = el?.selectionEnd ?? value.length;
    const targetText = end > start ? value.slice(start, end) : value;
    try {
      navigator.clipboard?.writeText(targetText);
    } catch {
      // Ignore clipboard failures
    }
  };

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard?.readText();
      if (!clip) return;
      const el = textareaRef.current;
      const start = el?.selectionStart ?? value.length;
      const end = el?.selectionEnd ?? value.length;
      commitChange(`${value.slice(0, start)}${clip}${value.slice(end)}`);
    } catch {
      // Ignore clipboard permission failures
    }
  };

  const handleUndo = () => {
    if (historyIdx <= 0) return;
    const nextIdx = historyIdx - 1;
    setHistoryIdx(nextIdx);
    onChange(history[nextIdx]);
  };

  const handleRedo = () => {
    if (historyIdx >= history.length - 1) return;
    const nextIdx = historyIdx + 1;
    setHistoryIdx(nextIdx);
    onChange(history[nextIdx]);
  };

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-5xl space-y-5">
      <p className={`text-xs sm:text-[13px] font-bold leading-relaxed ${darkMode ? 'text-white' : 'text-slate-900'}`}>
        {instruction}
      </p>

      <div
        className={`text-xs sm:text-[13px] leading-relaxed space-y-3 whitespace-pre-line ${
          darkMode ? 'text-zinc-200' : 'text-slate-700'
        }`}
      >
        {promptPassage}
      </div>

      {/* Classic Pearson Teal-Framed Textarea with Toolbar & Word Count Bar */}
      <div className="border-2 border-[#007a96] overflow-hidden shadow-2xs">
        <div className="bg-[#007a96] text-white px-4 py-2 flex flex-wrap items-center gap-6 text-xs font-medium">
          <button
            type="button"
            onClick={handleCut}
            className="inline-flex items-center gap-1.5 hover:opacity-85 cursor-pointer transition"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Cut</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 hover:opacity-85 cursor-pointer transition"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy</span>
          </button>
          <button
            type="button"
            onClick={handlePaste}
            className="inline-flex items-center gap-1.5 hover:opacity-85 cursor-pointer transition"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            <span>Paste</span>
          </button>
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyIdx <= 0}
            className="inline-flex items-center gap-1.5 hover:opacity-85 disabled:opacity-45 cursor-pointer transition"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={historyIdx >= history.length - 1}
            className="inline-flex items-center gap-1.5 hover:opacity-85 disabled:opacity-45 cursor-pointer transition"
          >
            <Redo2 className="w-3.5 h-3.5" />
            <span>Redo</span>
          </button>
        </div>

        <textarea
          ref={textareaRef}
          rows={8}
          value={value}
          onChange={(e) => commitChange(e.target.value)}
          aria-label="Writing response editor"
          className={`w-full p-4 text-xs sm:text-sm focus:outline-none resize-y block ${
            darkMode
              ? 'bg-[#333333] text-zinc-100 placeholder:text-zinc-500'
              : 'bg-white text-slate-800 placeholder:text-slate-400'
          }`}
        />

        <div className="bg-[#007a96] text-white px-4 py-2 text-xs font-medium">
          Word Count: {wordCount}
        </div>
      </div>
    </div>
  );
}
