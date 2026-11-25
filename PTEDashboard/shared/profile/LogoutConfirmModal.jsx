import { LogOut, X } from 'lucide-react';

/**
 * Confirmation dialog shown before logging out from the student portal.
 */
export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/55 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl text-center space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close logout confirmation"
          className="absolute right-4 top-4 w-7 h-7 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div className="mx-auto w-11 h-11 rounded-xl bg-[#e6f6f8] text-[#00a8bd] flex items-center justify-center">
          <LogOut className="w-5 h-5" />
        </div>

        <h3 className="text-base sm:text-lg font-extrabold text-[#0c4a7e]">
          Are you sure you want to log out?
        </h3>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white py-2.5 text-xs sm:text-sm font-semibold text-[#0c4a7e] hover:bg-slate-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-[#0d5488] hover:bg-[#093e66] py-2.5 text-xs sm:text-sm font-bold text-white transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
