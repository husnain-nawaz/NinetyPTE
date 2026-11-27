import { X } from 'lucide-react';

function DialogShell({ onClose, darkMode, children }) {
  return (
    <div
      className="fixed inset-0 z-70 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full max-w-[460px] shadow-2xl border overflow-hidden ${
          darkMode
            ? 'bg-[#121212] border-zinc-700 text-zinc-100'
            : 'bg-white border-slate-300 text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`h-8 px-3 flex items-center justify-end border-b ${
            darkMode ? 'bg-[#d9d9d9] border-zinc-600 text-zinc-800' : 'bg-[#dedede] border-slate-300 text-slate-700'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close popup"
            className="p-0.5 hover:opacity-70 cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-6 space-y-6">{children}</div>
      </div>
    </div>
  );
}

function GreenGlossBadge({ symbol }) {
  return (
    <span className="w-8 h-8 rounded-full bg-linear-to-b from-[#6fd43f] to-[#2d8a0f] border border-[#24720b] text-white font-serif font-bold italic text-lg flex items-center justify-center shrink-0 shadow-xs">
      {symbol}
    </span>
  );
}

/**
 * Information alert popup used inside the mock exam runner (e.g. writing style required
 * or unfinished question notice).
 */
export function ExamNoticeDialog({ message, onClose, darkMode }) {
  const btnClass = darkMode
    ? 'min-w-[68px] border border-zinc-300 bg-transparent hover:bg-zinc-800 px-4 py-1 text-xs font-medium text-white cursor-pointer'
    : 'min-w-[68px] border border-slate-500 bg-white hover:bg-slate-50 px-4 py-1 text-xs font-medium text-slate-800 cursor-pointer';

  return (
    <DialogShell onClose={onClose} darkMode={darkMode}>
      <div className="flex items-start gap-4">
        <GreenGlossBadge symbol="i" />
        <p className="text-xs sm:text-[13px] leading-relaxed pt-1">{message}</p>
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={onClose} className={btnClass}>
          Close
        </button>
      </div>
    </DialogShell>
  );
}

/**
 * Confirmation popup shown before advancing to the next mock test question.
 */
export function ExamNextConfirmDialog({
  message = 'Are you sure you want to move on to the next question?',
  onClose,
  onConfirmNext,
  darkMode,
}) {
  const btnClass = darkMode
    ? 'min-w-[68px] border border-zinc-300 bg-transparent hover:bg-zinc-800 px-4 py-1 text-xs font-medium text-white cursor-pointer'
    : 'min-w-[68px] border border-slate-500 bg-white hover:bg-slate-50 px-4 py-1 text-xs font-medium text-slate-800 cursor-pointer';

  return (
    <DialogShell onClose={onClose} darkMode={darkMode}>
      <div className="flex items-start gap-4">
        <GreenGlossBadge symbol="?" />
        <p className="text-xs sm:text-[13px] leading-relaxed pt-1">{message}</p>
      </div>
      <div className="flex justify-end gap-2.5">
        <button type="button" onClick={onClose} className={btnClass}>
          Close
        </button>
        <button type="button" onClick={onConfirmNext} className={btnClass}>
          Next
        </button>
      </div>
    </DialogShell>
  );
}
