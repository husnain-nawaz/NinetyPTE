import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  ClipboardList,
  FilePenLine,
  Gift,
  History,
  Info,
  Settings,
  Trash2,
  User,
} from 'lucide-react';
import { clearUserSession } from '../../../frontend/src/utils/auth';
import PTEDashboardHeader from '../PTEDashboardHeader';
import PTEDashboardTealFooter from '../PTEDashboardTealFooter';
import LogoutConfirmModal from './LogoutConfirmModal';
import {
  ProfileDeleteSection,
  ProfileDetailsSection,
  ProfileNotificationSection,
  ProfilePaymentHistorySection,
  ProfilePlanInfoSection,
  ProfileResetSection,
  ProfileSettingsSection,
} from './ProfileSections';
import ProfileSidebar from './ProfileSidebar';
import ShareAndEarnSection from './ShareAndEarnSection';

const PROFILE_META = {
  'my-profile': { title: 'Profile Details', Icon: User },
  notification: { title: 'Notification', Icon: Bell },
  'plan-info': { title: 'Plan Information', Icon: ClipboardList },
  'payment-history': { title: 'Payment History', Icon: History },
  'share-and-earn': { title: 'Share and Earn', Icon: Gift, showInfo: true, showGuide: true },
  settings: { title: 'Settings', Icon: Settings },
  reset: { title: 'Reset Profile', Icon: FilePenLine },
  delete: { title: 'Delete Profile', Icon: Trash2 },
};

const SECTION_COMPONENTS = {
  'my-profile': ProfileDetailsSection,
  notification: ProfileNotificationSection,
  'plan-info': ProfilePlanInfoSection,
  'payment-history': ProfilePaymentHistorySection,
  'share-and-earn': ShareAndEarnSection,
  settings: ProfileSettingsSection,
  reset: ProfileResetSection,
  delete: ProfileDeleteSection,
};

/**
 * Unified student profile & account workspace supporting all /v1/profile/* pages.
 */
export default function PortalProfilePage({ defaultSection = 'my-profile' }) {
  const { section } = useParams();
  const navigate = useNavigate();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [showShareInfo, setShowShareInfo] = useState(false);

  const activeSection = PROFILE_META[section] ? section : defaultSection;
  const meta = PROFILE_META[activeSection] || PROFILE_META['my-profile'];
  const ActiveSectionComponent = SECTION_COMPONENTS[activeSection] || ProfileDetailsSection;
  const TitleIcon = meta.Icon;

  const handleConfirmLogout = () => {
    clearUserSession();
    setLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-800 flex flex-col font-sans">
      <PTEDashboardHeader />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-[#e5f0fa] text-[#0c4a7e] flex items-center justify-center shadow-2xs">
              <TitleIcon className="w-4 h-4" />
            </span>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold text-[#0c4a7e]">{meta.title}</h1>
              {meta.showInfo && (
                <button
                  type="button"
                  onClick={() => setShowShareInfo((prev) => !prev)}
                  aria-label="About Share and Earn"
                  className="text-[#0c4a7e]/75 hover:text-[#0097a7] cursor-pointer"
                >
                  <Info className="w-4 h-4" />
                </button>
              )}
            </div>

            {showShareInfo && meta.showInfo && (
              <div className="absolute left-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white p-3.5 text-xs text-slate-600 shadow-lg z-30">
                Invite friends to NinetyPTE with your referral link to earn free credit points on every plan purchase.
              </div>
            )}
          </div>

          {meta.showGuide && (
            <Link
              to="/v1/youtube-videos/1"
              className="inline-flex items-center gap-2 rounded-lg bg-[#0d5488] hover:bg-[#093e66] px-4 py-2 text-xs sm:text-[13px] font-bold text-white shadow-xs transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>Guide</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-3">
            <ProfileSidebar
              activeSection={activeSection}
              onOpenLogout={() => setLogoutModalOpen(true)}
            />
          </div>

          <div className="lg:col-span-9">
            <ActiveSectionComponent />
          </div>
        </div>
      </main>

      <PTEDashboardTealFooter />

      <LogoutConfirmModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
