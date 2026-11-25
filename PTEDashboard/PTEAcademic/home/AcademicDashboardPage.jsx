import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Play, X } from 'lucide-react';
import PTEDashboardHeader from '../../shared/PTEDashboardHeader';
import HomeMainSections from './HomeMainSections';
import HomeRightRail from './HomeRightRail';

/**
 * NinetyPTE PTE Academic Student Portal Home Page (/dashboard, /v1/dashboard).
 */
export default function AcademicDashboardPage() {
  const [showExpiryToast, setShowExpiryToast] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [showReferModal, setShowReferModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader onOpenReferModal={() => setShowReferModal(true)} />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <HomeMainSections onSelectVideo={setActiveVideo} />
          </div>

          <div className="lg:col-span-4">
            <HomeRightRail onSelectVideo={setActiveVideo} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 px-6 py-6 mt-10">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-slate-500">
          <div className="flex items-center gap-3.5">
            <Link to="/dashboard" className="text-2xl font-black tracking-tighter text-[#0f3554]">
              ninety<span className="text-[#00b4c6]">pte</span>
            </Link>
            <span>All rights reserved &copy; NinetyPTE Education, 2026</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 font-medium text-slate-600">
            <Link to="/contact" className="hover:text-[#0097a7] transition">
              Contact
            </Link>
            <Link to="/disclaimer" className="hover:text-[#0097a7] transition">
              Disclaimer
            </Link>
            <Link to="/refund-policy" className="hover:text-[#0097a7] transition">
              Refund &amp; Cancellation Policy
            </Link>
            <Link to="/privacy-policy" className="hover:text-[#0097a7] transition">
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-[#0097a7] transition">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </footer>

      {showExpiryToast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-40 max-w-md rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#9333ea] text-white px-5 py-3.5 shadow-xl flex items-center gap-3.5"
        >
          <Clock className="w-5 h-5 shrink-0 text-white/90" />
          <p className="text-xs font-semibold leading-snug">
            Your Premium subscription is about to expire in 3 days.
          </p>
          <Link
            to="/pricing"
            className="shrink-0 rounded-lg bg-white text-[#7e22ce] px-3.5 py-1.5 text-xs font-bold hover:bg-purple-50 transition"
          >
            Renew
          </Link>
          <button
            type="button"
            onClick={() => setShowExpiryToast(false)}
            aria-label="Dismiss expiry reminder"
            className="p-0.5 rounded hover:bg-white/20 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-52 bg-gradient-to-br ${activeVideo.bg} p-6 flex flex-col justify-between text-white relative`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wide text-cyan-300 uppercase">
                  NinetyPTE Video Guide · {activeVideo.duration}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close video modal"
                  className="p-1 rounded-full bg-black/30 hover:bg-black/50 text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </span>
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${activeVideo.badgeBg}`}>
                    {activeVideo.tagHighlight}
                  </span>
                  <h3 className="mt-1 text-base font-extrabold leading-snug">{activeVideo.title}</h3>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">{activeVideo.summary}</p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="rounded-lg border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Close
                </button>
                <Link
                  to="/v1/youtube-videos/1"
                  className="rounded-lg bg-[#0d5488] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#093e66]"
                >
                  Open Full Video Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReferModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowReferModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#d97736]">NinetyPTE Refer &amp; Earn</h3>
              <button
                type="button"
                onClick={() => setShowReferModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Share your unique student code <strong className="text-slate-900">#002087161</strong> with friends preparing for PTE. Once they join a paid plan, free mock test credits are added to your balance.
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowReferModal(false)}
                className="rounded-lg bg-[#0d5488] px-4 py-2 text-xs font-bold text-white cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
