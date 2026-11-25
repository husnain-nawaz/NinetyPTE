import { Link } from 'react-router-dom';
import {
  Bell,
  ChevronRight,
  ClipboardList,
  FilePenLine,
  Gift,
  History,
  LogOut,
  Settings,
  Trash2,
  User,
} from 'lucide-react';

const SIDEBAR_ITEMS = [
  { id: 'my-profile', label: 'Profile Details', to: '/v1/profile/my-profile', Icon: User },
  { id: 'notification', label: 'Notification', to: '/v1/profile/notification', Icon: Bell },
  { id: 'plan-info', label: 'Plan Information', to: '/v1/profile/plan-info', Icon: ClipboardList },
  { id: 'payment-history', label: 'Payment History', to: '/v1/profile/payment-history', Icon: History },
  { id: 'share-and-earn', label: 'Share and Earn', to: '/v1/profile/share-and-earn', Icon: Gift },
  { id: 'settings', label: 'Settings', to: '/v1/profile/settings', Icon: Settings },
  { id: 'reset', label: 'Reset Profile', to: '/v1/profile/reset', Icon: FilePenLine },
  { id: 'delete', label: 'Delete Profile', to: '/v1/profile/delete', Icon: Trash2 },
];

/**
 * Left vertical sidebar for all student profile & account subpages.
 */
export default function ProfileSidebar({ activeSection, onOpenLogout }) {
  return (
    <aside className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-2xs">
      <nav aria-label="Profile navigation" className="divide-y divide-slate-100">
        {SIDEBAR_ITEMS.map(({ id, label, to, Icon }) => {
          const isActive = activeSection === id;
          return (
            <Link
              key={id}
              to={to}
              className={`flex items-center justify-between px-3 py-3.5 text-xs sm:text-[13px] transition rounded-lg ${
                isActive
                  ? 'text-[#00b4c6] font-bold bg-[#f1fbfc]'
                  : 'text-slate-600 font-medium hover:text-[#0c4a7e] hover:bg-slate-50/70'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
            </Link>
          );
        })}

        <button
          type="button"
          onClick={onOpenLogout}
          className="w-full flex items-center justify-between px-3 py-3.5 text-xs sm:text-[13px] text-slate-600 font-medium hover:text-rose-600 hover:bg-rose-50/60 rounded-lg transition cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </span>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
        </button>
      </nav>
    </aside>
  );
}
