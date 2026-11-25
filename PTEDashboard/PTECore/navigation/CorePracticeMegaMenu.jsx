import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

/**
 * Placeholder Practice Mega Menu rendered when PTE Core dashboard track is active.
 * Ready to be populated with PTE Core specific tasks in upcoming prompts.
 */
export default function CorePracticeMegaMenu({ onClose }) {
  return (
    <div className="absolute left-0 right-0 top-full bg-[#f8fafc] border-b border-slate-200 shadow-xl z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-8 text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-cyan-50 text-[#0c4a7e] flex items-center justify-center mx-auto">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-800">
            PTE Core Practice Menu
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            The dedicated PTE Core portal navigation is blank and ready for your custom Core modules.
          </p>
          <div className="pt-2">
            <Link
              to="/pte-core"
              onClick={onClose}
              className="inline-block rounded-full bg-[#0d5488] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#093e66]"
            >
              View Public PTE Core Overview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
