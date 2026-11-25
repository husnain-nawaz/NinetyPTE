import { useEffect } from 'react';
import PTEDashboardHeader from '../../shared/PTEDashboardHeader';
import { usePortal } from '../../shared/portalContext';

/**
 * Blank PTE Core student dashboard container isolated cleanly inside PTEDashboard/PTECore.
 * Switch between PTE Core and PTE A / UKVI via the top portal selector.
 */
export default function CoreDashboardPage() {
  const { portalMode, setPortalMode } = usePortal();

  useEffect(() => {
    if (portalMode !== 'core') {
      setPortalMode('core');
    }
  }, [portalMode, setPortalMode]);
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="min-h-[460px] rounded-2xl border-2 border-dashed border-slate-300 bg-white/70 flex flex-col items-center justify-center p-8 text-center">
          <span className="rounded-full bg-[#e6f7fa] px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0c4a7e] mb-3">
            PTE Core Portal
          </span>
          <h1 className="text-lg font-extrabold text-slate-800">
            PTECore Dashboard is ready.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-md">
            This dedicated workspace under <code className="text-[#0c4a7e] font-semibold">PTEDashboard/PTECore/</code> is intentionally blank so you can build out the PTE Core portal separately from PTE Academic.
          </p>
        </div>
      </main>
    </div>
  );
}
