import { Link, useNavigate } from 'react-router-dom';
import { Globe, LogOut, ShieldCheck } from 'lucide-react';
import { clearUserSession, getStoredUser } from '../frontend/src/utils/auth';

/**
 * SuperDashboard — dedicated Super Admin workspace for managing the upper public
 * website pages and layout (separate from the student PTEDashboard portal).
 * Intentionally blank scaffold ready to be molded to requirements.
 */
export default function SuperDashboard() {
  const navigate = useNavigate();
  const user = getStoredUser() || {};

  const handleLogout = () => {
    clearUserSession();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Super Admin Topbar */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="text-xl font-black tracking-tight text-slate-900">
            ninety<span className="text-cyan-500 font-extrabold">pte</span>
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] bg-slate-900 text-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Super Admin
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-cyan-700 hover:border-cyan-200 hover:bg-cyan-50 text-xs font-semibold transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>View Website</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-cyan-300 flex items-center justify-center font-bold">
              H
            </div>
            <span className="font-semibold text-slate-800 hidden sm:inline">
              {user.email}
            </span>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-xs font-semibold transition cursor-pointer"
            title="Log out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Blank Workspace for SuperDashboard */}
      <main className="flex-1 p-6 sm:p-10">
        <div className="max-w-7xl mx-auto h-full min-h-[420px] rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-11 h-11 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center mb-3 shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <p className="text-sm font-bold text-slate-700">SuperDashboard is ready.</p>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            Exclusive control workspace for the upper public website pages (outside PTEDashboard). Only accessible to Super Admin.
          </p>
        </div>
      </main>
    </div>
  );
}
