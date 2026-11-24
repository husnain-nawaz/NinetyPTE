import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { clearUserSession, getStoredUser } from '../frontend/src/utils/auth';

export default function PTEDashboard() {
  const navigate = useNavigate();
  const user = getStoredUser() || {};

  const handleLogout = () => {
    clearUserSession();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Dashboard Topbar */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-slate-900">
            ninety<span className="text-cyan-500 font-extrabold">pte</span>
          </span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider ml-2">
            Dashboard
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="w-7 h-7 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-800 hidden sm:inline">
              {user.email || 'Logged in User'}
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

      {/* Blank Workspace for PTEDashboard */}
      <main className="flex-1 p-6 sm:p-10">
        <div className="max-w-7xl mx-auto h-full min-h-[400px] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center text-slate-400">
          <p className="text-sm font-medium">PTEDashboard is ready.</p>
          <p className="text-xs text-slate-400 mt-1">This page is protected and only accessible when logged in.</p>
        </div>
      </main>
    </div>
  );
}
