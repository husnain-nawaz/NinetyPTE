import { X } from 'lucide-react';

/**
 * Confirmation modal shown when starting a new mock test while another mock test
 * is currently saved mid-way in unfinished/in-progress state.
 */
export default function ConfirmStartNewMockModal({
  unfinishedTitle,
  pendingTitle,
  onConfirmYes,
  onCancelNo,
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onCancelNo}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-new-mock-heading"
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white px-7 py-8 shadow-2xl text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onCancelNo}
          aria-label="Close confirmation dialog"
          className="absolute right-4 top-4 w-7 h-7 rounded-full border border-[#0b4a7b]/50 text-[#0b4a7b] hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="mx-auto w-14 h-14 rounded-full bg-[#e9f8f7] flex items-center justify-center">
          <span className="w-8 h-8 rounded-full bg-[#3dc8c1] text-white font-extrabold text-base flex items-center justify-center">
            ?
          </span>
        </div>

        <div className="space-y-2">
          <h3 id="confirm-new-mock-heading" className="text-lg font-extrabold text-[#0b4a7b]">
            Are You Sure?
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-xs mx-auto">
            Do you want to end the unfinished mock tests &amp; start this new one?
          </p>
          {unfinishedTitle && pendingTitle && (
            <p className="text-[11px] text-slate-400">
              Leaving <strong>{unfinishedTitle}</strong> to begin <strong>{pendingTitle}</strong>
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={onConfirmYes}
            className="min-w-[112px] rounded-full border border-[#0b4a7b] bg-white hover:bg-slate-50 px-6 py-2 text-xs font-bold text-[#0b4a7b] transition cursor-pointer"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={onCancelNo}
            className="min-w-[112px] rounded-full bg-[#0b4a7b] hover:bg-[#08385f] px-6 py-2 text-xs font-bold text-white shadow-2xs transition cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
