import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bell,
  Calendar,
  ChevronDown,
  Crown,
  Gift,
  Globe,
  Info,
  Languages,
  LogOut,
  Menu,
  ShieldCheck,
  User,
  X,
} from 'lucide-react';
import { clearUserSession, getStoredUser, isSuperAdmin } from '../frontend/src/utils/auth';

const PRACTICE_DROPDOWN_LINKS = {
  academic: [
    { label: 'Speaking Practice', to: '/pte-speaking-practice' },
    { label: 'Writing Practice', to: '/pte-writing-practice' },
    { label: 'Reading Practice', to: '/pte-reading-practice' },
    { label: 'Listening Practice', to: '/pte-listening-practice' },
  ],
  core: [
    { label: 'Core Speaking Practice', to: '/pte-core-speaking-practice' },
    { label: 'Core Writing Practice', to: '/pte-core-writing-practice' },
    { label: 'Core Reading Practice', to: '/pte-core-reading-practice' },
    { label: 'Core Listening Practice', to: '/pte-core-listening-practice' },
  ],
};

/**
 * Top announcement ribbon + student portal header isolated from the public marketing navbar.
 */
export default function PTEDashboardHeader({
  examVariant,
  onChangeExamVariant,
  onOpenReferModal,
}) {
  const navigate = useNavigate();
  const user = getStoredUser() || {};
  const superAdmin = isSuperAdmin(user);

  const [practiceOpen, setPracticeOpen] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const practiceItems =
    examVariant === 'core' ? PRACTICE_DROPDOWN_LINKS.core : PRACTICE_DROPDOWN_LINKS.academic;

  const handleLogout = () => {
    clearUserSession();
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-40">
      {/* Top Announcement Bar */}
      <div className="bg-[#0d5488] text-white px-4 py-2.5 text-xs sm:text-[13px] font-medium flex items-center justify-center gap-2 text-center">
        <Info className="w-4 h-4 shrink-0 text-cyan-200" />
        <span>
          <span className="text-[#3ee4f0] font-bold">Local Payments</span> Now Available ! Pay easily with no extra charges, transaction fees, or hidden costs!
        </span>
      </div>

      {/* Main Portal Header */}
      <header className="bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto h-[72px] flex items-center justify-between gap-4">
        <div className="flex items-center gap-7">
          {/* NinetyPTE Portal Wordmark */}
          <Link to="/dashboard" className="inline-flex items-center gap-0.5 shrink-0">
            <span className="text-[26px] font-black tracking-tighter text-[#0f3554]">
              ninety<span className="text-[#00b4c6]">pte</span>
            </span>
          </Link>

          {/* Portal Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link to="/dashboard" className="text-[#00b4c6] font-semibold">
              Home
            </Link>

            <div className="relative">
              <button
                type="button"
                onClick={() => setPracticeOpen((prev) => !prev)}
                className="flex items-center gap-1 hover:text-[#00b4c6] transition cursor-pointer"
              >
                <span>Practice</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {practiceOpen && (
                <div
                  onMouseLeave={() => setPracticeOpen(false)}
                  className="absolute left-0 top-full mt-2.5 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-lg z-50"
                >
                  {practiceItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setPracticeOpen(false)}
                      className="block px-4 py-2.5 text-xs sm:text-[13px] font-medium text-slate-700 hover:bg-cyan-50 hover:text-[#0097a7]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to={examVariant === 'core' ? '/pte-core-mock-test' : '/mock-tests'}
              className="hover:text-[#00b4c6] transition"
            >
              Mock Tests
            </Link>

            <Link to="/pricing" className="hover:text-[#00b4c6] transition">
              Buy
            </Link>

            <Link
              to="/book-exam"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-3.5 pr-2 py-1.5 hover:border-cyan-400 transition shadow-2xs"
            >
              <Calendar className="w-4 h-4 text-[#0d5488]" />
              <span className="text-xs sm:text-[13px] font-semibold text-slate-700">Book Exam</span>
              <span className="rounded-full bg-[#e53935] px-2.5 py-0.5 text-[11px] font-bold text-white">
                Save Rs 7,100
              </span>
            </Link>
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          <button
            type="button"
            title="Portal Language: English"
            className="hidden sm:inline-flex p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
          >
            <Languages className="w-[18px] h-[18px]" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen((prev) => !prev)}
              aria-label="Notifications"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative cursor-pointer"
            >
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-lg z-50 text-xs sm:text-[13px]">
                <p className="font-bold text-slate-800 pb-2 border-b border-slate-100">Notifications</p>
                <p className="pt-2.5 text-slate-500 leading-relaxed">
                  Your Premium practice access is active. Keep practising daily to build your streak!
                </p>
              </div>
            )}
          </div>

          {/* PTE Exam Variant Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setVariantOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-[13px] font-semibold text-slate-700 hover:border-cyan-400 cursor-pointer"
            >
              <span>{examVariant === 'core' ? 'PTE Core' : 'PTE A / UKVI'}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            {variantOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-40 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg z-50 text-xs sm:text-[13px]">
                <button
                  type="button"
                  onClick={() => {
                    onChangeExamVariant('academic');
                    setVariantOpen(false);
                  }}
                  className={`block w-full px-3.5 py-2 text-left font-medium hover:bg-cyan-50 ${
                    examVariant === 'academic' ? 'text-[#0097a7] font-bold' : 'text-slate-700'
                  }`}
                >
                  PTE A / UKVI
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeExamVariant('core');
                    setVariantOpen(false);
                  }}
                  className={`block w-full px-3.5 py-2 text-left font-medium hover:bg-cyan-50 ${
                    examVariant === 'core' ? 'text-[#0097a7] font-bold' : 'text-slate-700'
                  }`}
                >
                  PTE Core
                </button>
              </div>
            )}
          </div>

          {/* Refer & Earn Pill */}
          <button
            type="button"
            onClick={onOpenReferModal}
            className="hidden md:inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs sm:text-[13px] font-semibold text-slate-700 hover:border-cyan-400 cursor-pointer"
          >
            <span>Refer &amp; Earn</span>
            <Gift className="w-4 h-4 text-slate-500" />
            <span className="font-bold text-slate-800">0</span>
          </button>

          {/* Student ID + Premium + Avatar Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2.5 rounded-full pl-2 pr-1 py-1 hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="hidden sm:block text-right leading-tight">
                <div className="text-xs font-bold text-slate-800">#002087161</div>
                <div className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-500 tracking-wide">
                  <Crown className="w-3 h-3 fill-amber-400" />
                  PREMIUM
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white border-2 border-purple-500/70 flex items-center justify-center font-bold text-sm shadow-xs">
                {(user.name || user.email || 'U').charAt(0).toUpperCase()}
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-slate-200 bg-white py-2 shadow-xl z-50 text-xs sm:text-[13px]">
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <p className="font-bold text-slate-900 truncate">{user.name || 'Student'}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>

                {superAdmin && (
                  <Link
                    to="/super-dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 font-semibold text-slate-800 hover:bg-cyan-50 hover:text-[#0097a7]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#00a8bd]" />
                    <span>Super Dashboard</span>
                  </Link>
                )}

                <Link
                  to="/"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:bg-slate-50"
                >
                  <Globe className="w-4 h-4" />
                  <span>View Main Website</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle portal menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-2.5 text-xs font-semibold text-slate-700 shadow-md">
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-[#00b4c6]">
            Home
          </Link>
          <Link
            to={examVariant === 'core' ? '/pte-core-speaking-practice' : '/pte-speaking-practice'}
            onClick={() => setMobileMenuOpen(false)}
            className="block"
          >
            Speaking Practice
          </Link>
          <Link
            to={examVariant === 'core' ? '/pte-core-mock-test' : '/mock-tests'}
            onClick={() => setMobileMenuOpen(false)}
            className="block"
          >
            Mock Tests
          </Link>
          <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="block">
            Buy Subscription
          </Link>
          <Link to="/book-exam" onClick={() => setMobileMenuOpen(false)} className="block text-[#0d5488]">
            Book Exam (Save Rs 7,100)
          </Link>
          {superAdmin && (
            <Link to="/super-dashboard" onClick={() => setMobileMenuOpen(false)} className="block text-slate-900">
              Super Dashboard
            </Link>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-rose-600 pt-1"
          >
            <User className="w-3.5 h-3.5" />
            Logout ({user.email})
          </button>
        </div>
      )}
    </div>
  );
}
