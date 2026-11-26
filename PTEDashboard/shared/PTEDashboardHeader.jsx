import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  Calendar,
  Check,
  ChevronDown,
  Copy,
  Crown,
  Gift,
  Headphones,
  Info,
  Languages,
  LogOut,
  Menu,
  Moon,
  Pencil,
  ShieldCheck,
  Smartphone,
  User,
  X,
} from 'lucide-react';
import { clearUserSession, getStoredUser, isSuperAdmin } from '../../frontend/src/utils/auth';
import AcademicPracticeMegaMenu from '../PTEAcademic/navigation/AcademicPracticeMegaMenu';
import CorePracticeMegaMenu from '../PTECore/navigation/CorePracticeMegaMenu';
import LogoutConfirmModal from './profile/LogoutConfirmModal';
import NotificationsDrawer from './NotificationsDrawer';
import { INITIAL_NOTIFICATIONS } from './notificationsData';
import { usePortal } from './portalContext';

const PORTAL_DARK_MODE_KEY = 'ninetypte_portal_dark';

function readInitialDarkMode() {
  try {
    return localStorage.getItem(PORTAL_DARK_MODE_KEY) === 'true';
  } catch {
    return false;
  }
}

const EXAM_TRACK_OPTIONS = [
  { id: 'academic', label: 'PTE A / UKVI' },
  { id: 'core', label: 'PTE Core' },
];

/**
 * Shared announcement bar + white portal navbar across PTEAcademic and PTECore,
 * managing the exam track switcher (PTE A / UKVI vs PTE Core), notifications drawer, and profile menu.
 */
export default function PTEDashboardHeader({ onOpenReferModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { portalMode, setPortalMode } = usePortal();
  const user = getStoredUser() || {};
  const superAdmin = isSuperAdmin(user);
  const closeTimeoutRef = useRef(null);

  const [practiceOpen, setPracticeOpen] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [idCopied, setIdCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(readInitialDarkMode);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const unreadCount = notifications.filter((item) => item.unread).length;
  const isCoreMode = portalMode === 'core';
  const activeTrackLabel = isCoreMode ? 'PTE Core' : 'PTE A / UKVI';

  const handleCopyUserId = () => {
    try {
      navigator.clipboard?.writeText('#002087161');
    } catch {
      // Ignore clipboard failures
    }
    setIdCopied(true);
    setTimeout(() => setIdCopied(false), 1800);
  };

  const handleToggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    try {
      localStorage.setItem(PORTAL_DARK_MODE_KEY, String(next));
    } catch {
      // Ignore storage failures
    }
  };

  const isHomeRoute =
    location.pathname === '/dashboard' ||
    location.pathname === '/v1/dashboard' ||
    location.pathname === '/pte-dashboard' ||
    location.pathname === '/v1/core/dashboard' ||
    location.pathname === '/core-dashboard';

  const homePath = isCoreMode ? '/v1/core/dashboard' : '/dashboard';
  const buyPath = isCoreMode ? '/v1/core/buy-subscription' : '/v1/buy-subscription';
  const isBuyRoute = location.pathname.includes('buy-subscription');

  const openPracticeMenu = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setPracticeOpen(true);
  };

  const scheduleClosePracticeMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setPracticeOpen(false);
    }, 150);
  };

  const handleSelectTrack = (nextTrack) => {
    setPortalMode(nextTrack);
    setVariantOpen(false);
    setPracticeOpen(false);
    setMobileMenuOpen(false);
    navigate(nextTrack === 'core' ? '/v1/core/dashboard' : '/dashboard');
  };

  const handleLogout = () => {
    clearUserSession();
    navigate('/login');
  };

  return (
    <>
      <div className="sticky top-0 z-40">
        {/* Top Announcement Bar */}
        <div className="bg-[#0d5488] text-white px-4 py-2.5 text-xs sm:text-[13px] font-medium flex items-center justify-center gap-2 text-center">
          <Info className="w-4 h-4 shrink-0 text-cyan-200" />
          <span>
            <span className="text-[#3ee4f0] font-bold">Local Payments</span> Now Available ! Pay easily with no extra charges, transaction fees, or hidden costs!
          </span>
        </div>

        {/* Main Portal Header */}
        <header className="relative bg-white border-b border-slate-200/90 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1440px] mx-auto h-[72px] flex items-center justify-between gap-4">
            <div className="flex items-center gap-7">
              <Link to={homePath} className="inline-flex items-center gap-0.5 shrink-0">
                <span className="text-[26px] font-black tracking-tighter text-[#0f3554]">
                  ninety<span className="text-[#00b4c6]">pte</span>
                </span>
              </Link>

              {/* Portal Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
                <Link
                  to={homePath}
                  className={isHomeRoute ? 'text-[#00b4c6] font-semibold' : 'hover:text-[#00b4c6] transition'}
                >
                  Home
                </Link>

                <div
                  onMouseEnter={openPracticeMenu}
                  onMouseLeave={scheduleClosePracticeMenu}
                  className="py-5"
                >
                  <button
                    type="button"
                    onClick={() => setPracticeOpen((prev) => !prev)}
                    aria-expanded={practiceOpen}
                    className={`flex items-center gap-1 transition cursor-pointer ${
                      practiceOpen ? 'text-[#00b4c6] font-semibold' : 'hover:text-[#00b4c6]'
                    }`}
                  >
                    <span>Practice</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${practiceOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>

                <Link
                  to={isCoreMode ? '/pte-core-mock-test' : '/mock-tests'}
                  className="hover:text-[#00b4c6] transition"
                >
                  Mock Tests
                </Link>

                <Link
                  to={buyPath}
                  className={isBuyRoute ? 'text-[#00b4c6] font-semibold' : 'hover:text-[#00b4c6] transition'}
                >
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

              {/* Notifications Bell */}
              <button
                type="button"
                onClick={() => setNotifOpen(true)}
                aria-label="Open notifications"
                className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative cursor-pointer"
              >
                <Bell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
                )}
              </button>

              {/* PTE A / UKVI vs PTE Core Switcher Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setVariantOpen((prev) => !prev)}
                  aria-expanded={variantOpen}
                  aria-label="Switch exam dashboard"
                  className="inline-flex items-center gap-2 rounded-full bg-[#eef7fc] hover:bg-[#e1f1fa] px-4 py-2 text-xs sm:text-[13px] font-semibold text-[#0c4a7e] transition cursor-pointer"
                >
                  <span>{activeTrackLabel}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${variantOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {variantOpen && (
                  <div
                    onMouseLeave={() => setVariantOpen(false)}
                    className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-slate-100 bg-white py-1.5 shadow-xl z-50 overflow-hidden"
                  >
                    {EXAM_TRACK_OPTIONS.map((option) => {
                      const selected = portalMode === option.id;
                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleSelectTrack(option.id)}
                          className={`block w-full px-4 py-2.5 text-center text-xs sm:text-[13px] transition cursor-pointer ${
                            selected
                              ? 'bg-[#e1f7f6] font-semibold text-slate-900'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Refer & Earn Pill */}
              <button
                type="button"
                onClick={onOpenReferModal || (() => navigate('/v1/profile/share-and-earn'))}
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
                  <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-2xl z-50 text-xs sm:text-[13px] space-y-2">
                    <div className="rounded-xl bg-slate-50/90 border border-slate-100 p-3 flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-2xs">
                          {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-extrabold text-slate-800 text-sm truncate">
                            {user.name || 'NinetyPTE Student'}
                          </p>
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                            <span>User #002087161</span>
                            <button
                              type="button"
                              onClick={handleCopyUserId}
                              aria-label="Copy student ID"
                              className="text-slate-400 hover:text-[#0c4a7e] cursor-pointer"
                            >
                              {idCopied ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/v1/profile/my-profile"
                        onClick={() => setProfileOpen(false)}
                        aria-label="Edit profile"
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-white hover:text-[#0c4a7e] transition shrink-0"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="divide-y divide-slate-100">
                      <Link
                        to="/mobile-app"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-2.5 py-2.5 text-slate-700 hover:text-[#0c4a7e] font-medium transition"
                      >
                        <Smartphone className="w-4 h-4 text-slate-500" />
                        <span>Mobile App</span>
                      </Link>

                      <Link
                        to="/contact"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-2.5 py-2.5 text-slate-700 hover:text-[#0c4a7e] font-medium transition"
                      >
                        <Headphones className="w-4 h-4 text-slate-500" />
                        <span>Help Desk</span>
                      </Link>

                      <div className="flex items-center justify-between px-2.5 py-2.5 text-slate-700 font-medium">
                        <span className="flex items-center gap-3">
                          <Moon className="w-4 h-4 text-slate-500" />
                          <span>Dark Mode</span>
                        </span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={darkMode}
                          aria-label="Toggle dark mode"
                          onClick={handleToggleDarkMode}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                            darkMode ? 'bg-[#0d5488]' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                              darkMode ? 'translate-x-4' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      {superAdmin && (
                        <Link
                          to="/super-dashboard"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-2.5 py-2.5 font-semibold text-slate-800 hover:text-[#0097a7] transition"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#00a8bd]" />
                          <span>Super Dashboard</span>
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          setLogoutModalOpen(true);
                        }}
                        className="flex w-full items-center gap-3 px-2.5 py-2.5 text-left font-medium text-slate-700 hover:text-rose-600 transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-slate-500" />
                        <span>Logout</span>
                      </button>
                    </div>
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

          {/* Full-Width Mega Menu matching active portal mode */}
          {practiceOpen && (
            <div onMouseEnter={openPracticeMenu} onMouseLeave={scheduleClosePracticeMenu}>
              {isCoreMode ? (
                <CorePracticeMegaMenu onClose={() => setPracticeOpen(false)} />
              ) : (
                <AcademicPracticeMegaMenu onClose={() => setPracticeOpen(false)} />
              )}
            </div>
          )}
        </header>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-2.5 text-xs font-semibold text-slate-700 shadow-md">
            <Link to={homePath} onClick={() => setMobileMenuOpen(false)} className="block text-[#00b4c6]">
              Home ({activeTrackLabel})
            </Link>
            <Link
              to={isCoreMode ? '/v1/core/practice/speaking/read-aloud' : '/v1/practice/speaking/read-aloud'}
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Speaking Practice
            </Link>
            <Link
              to={isCoreMode ? '/v1/core/practice/writing/write-email' : '/v1/practice/writing/write-essay'}
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Writing Practice
            </Link>
            <Link
              to={isCoreMode ? '/v1/core/practice/reading/reading-writing-fill-in-the-blanks' : '/v1/practice/reading/reading-writing-fill-in-the-blanks'}
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Reading Practice
            </Link>
            <Link
              to={isCoreMode ? '/v1/core/practice/listening/write-from-dictation' : '/v1/practice/listening/write-from-dictation'}
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Listening Practice
            </Link>
            <Link
              to={isCoreMode ? '/pte-core-mock-test' : '/mock-tests'}
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Mock Tests
            </Link>
            <Link to={buyPath} onClick={() => setMobileMenuOpen(false)} className="block">
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

      <NotificationsDrawer
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
        notifications={notifications}
        onDeleteOne={(id) =>
          setNotifications((prev) => prev.filter((item) => item.id !== id))
        }
        onDeleteAll={() => setNotifications([])}
        onMarkOneRead={(id) =>
          setNotifications((prev) =>
            prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
          )
        }
        onReadAll={() =>
          setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })))
        }
      />

      <LogoutConfirmModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
