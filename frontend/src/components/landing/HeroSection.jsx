import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Flame } from 'lucide-react';
import { getStoredUser, isSuperAdmin } from '../../utils/auth';

export default function HeroSection() {
  const currentUser = getStoredUser();
  const dashboardPath = isSuperAdmin(currentUser) ? '/super-dashboard' : '/dashboard';
  return (
    <section className="relative overflow-hidden pt-4 pb-28 lg:pb-36">
      {/* Background Slanted Gradient Mesh */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#6832db] via-[#4d40c6] to-[#01c4cb]"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 86%, 0 100%)'
        }}
      />

      {/* Decorative ambient blurred radial spots */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-40 right-20 w-[500px] h-[500px] rounded-full bg-cyan-300/20 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 text-white space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight leading-[1.18] text-white">
              Free <span className="text-white underline decoration-cyan-300 decoration-wavy decoration-2">PTE</span> Practice Test Online with Instant AI Scoring
            </h1>

            <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-lg font-normal">
              Unlock your potential with NinetyPTE, the leading practice platform for PTE Academic / UKVI, and PTE Core preparation. Join our global community of over a million users and begin your journey to achieving your desired scores today!
            </p>

            <div>
              {currentUser ? (
                <Link
                  to={dashboardPath}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-extrabold text-xs tracking-wide shadow-lg shadow-cyan-500/30 transition transform hover:-translate-y-0.5"
                >
                  <span>Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-extrabold text-xs tracking-wide shadow-lg shadow-cyan-500/30 transition transform hover:-translate-y-0.5"
                >
                  <span>Start Free Trial</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              )}
            </div>
          </div>

          {/* Right Visual Column (Mobile Phone & Tablet/Desktop Mockup Overlap) */}
          <div className="lg:col-span-7 relative flex justify-center items-center">
            
            {/* Desktop Dashboard Screen (Background) */}
            <div className="w-full max-w-[540px] bg-white rounded-2xl shadow-2xl border border-white/60 p-4 sm:p-5 text-slate-800 scale-95 sm:scale-100 transform translate-x-4">
              {/* Top Tabs */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-[10px] font-bold rounded-md">
                    Practice Progress
                  </span>
                  <span className="px-3 py-1 text-slate-400 text-[10px] font-semibold hover:text-slate-600">
                    Performance Progress
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-black text-[10px]">
                    79+ Target
                  </span>
                </div>
              </div>

              {/* 4 Module Progress Counters */}
              <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                <div className="bg-amber-50/70 p-2 rounded-xl border border-amber-100">
                  <div className="text-amber-700 font-extrabold text-xs">4854</div>
                  <div className="text-[9px] text-slate-500">Speaking</div>
                </div>
                <div className="bg-blue-50/70 p-2 rounded-xl border border-blue-100">
                  <div className="text-blue-700 font-extrabold text-xs">577</div>
                  <div className="text-[9px] text-slate-500">Writing</div>
                </div>
                <div className="bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
                  <div className="text-emerald-700 font-extrabold text-xs">1761</div>
                  <div className="text-[9px] text-slate-500">Reading</div>
                </div>
                <div className="bg-purple-50/70 p-2 rounded-xl border border-purple-100">
                  <div className="text-purple-700 font-extrabold text-xs">2952</div>
                  <div className="text-[9px] text-slate-500">Listening</div>
                </div>
              </div>

              {/* Study Plan Calendar Simulation */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-700 mb-2">
                  <span>Study Plan — May 2026</span>
                  <span className="text-cyan-600 font-semibold">12 Days Streak</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-slate-500">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <span key={i} className="font-bold text-slate-400">{d}</span>
                  ))}
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <span key={num} className={`py-1 rounded ${num === 4 ? 'bg-cyan-500 text-white font-bold' : num < 4 ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600'}`}>
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile App Screen (Foreground Overlap with Real Time Countdown) */}
            <div className="absolute -left-4 sm:left-4 bottom-[-20px] w-52 sm:w-60 bg-slate-900 rounded-[28px] p-2.5 shadow-2xl border-4 border-slate-800 text-white z-20 transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="bg-slate-950 rounded-[20px] p-3 text-xs space-y-3">
                {/* Mobile Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-black flex items-center justify-center">
                      90
                    </div>
                    <span className="text-[10px] font-bold">NinetyPTE User</span>
                  </div>
                  <span className="text-[8px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
                    VIP
                  </span>
                </div>

                {/* Exam Countdown Box */}
                <div className="bg-gradient-to-r from-cyan-600 to-teal-500 rounded-xl p-2.5 text-center shadow-xs">
                  <div className="text-[9px] font-medium text-cyan-100 mb-0.5 flex items-center justify-center gap-1">
                    <Clock className="w-2.5 h-2.5" /> Exam Countdown
                  </div>
                  <div className="font-mono font-black text-xs text-white tracking-wider">
                    02d 15h 15m 15s
                  </div>
                </div>

                {/* Predicted Question Pill */}
                <div className="bg-slate-800/80 rounded-xl p-2 flex items-center justify-between text-[10px] border border-slate-700/60">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>1517 Predicted Questions</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </div>

                {/* Practice Modules 2x2 Grid */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="bg-amber-500/20 border border-amber-500/30 p-2 rounded-xl text-center">
                    <span className="text-[9px] font-bold text-amber-300 block">Speaking</span>
                    <span className="text-[8px] text-slate-400">1420 Qs</span>
                  </div>
                  <div className="bg-blue-500/20 border border-blue-500/30 p-2 rounded-xl text-center">
                    <span className="text-[9px] font-bold text-blue-300 block">Writing</span>
                    <span className="text-[8px] text-slate-400">320 Qs</span>
                  </div>
                  <div className="bg-emerald-500/20 border border-emerald-500/30 p-2 rounded-xl text-center">
                    <span className="text-[9px] font-bold text-emerald-300 block">Reading</span>
                    <span className="text-[8px] text-slate-400">1850 Qs</span>
                  </div>
                  <div className="bg-purple-500/20 border border-purple-500/30 p-2 rounded-xl text-center">
                    <span className="text-[9px] font-bold text-purple-300 block">Listening</span>
                    <span className="text-[8px] text-slate-400">1680 Qs</span>
                  </div>
                </div>

                {/* Full Mock Test Bar */}
                <div className="bg-slate-800/60 rounded-xl p-2 space-y-1">
                  <div className="flex justify-between text-[9px] text-slate-300 font-medium">
                    <span>Full Mock Tests</span>
                    <span className="text-cyan-400 font-bold">78% Completed</span>
                  </div>
                  <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
