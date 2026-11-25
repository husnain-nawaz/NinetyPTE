import { useEffect, useState } from 'react';
import { Trash2, X } from 'lucide-react';

/**
 * Right-side slide-over Notifications drawer with All/Unread tabs,
 * single-item delete, Delete All, and Read All controls.
 */
export default function NotificationsDrawer({
  isOpen,
  onClose,
  notifications,
  onDeleteOne,
  onDeleteAll,
  onMarkOneRead,
  onReadAll,
}) {
  const [filterTab, setFilterTab] = useState('all');

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const visibleItems =
    filterTab === 'unread'
      ? notifications.filter((item) => item.unread)
      : notifications;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/45 backdrop-blur-[1px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Notifications"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[430px] sm:max-w-[460px] h-full bg-white shadow-2xl flex flex-col"
      >
        <div className="px-6 pt-5 pb-3.5 flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-extrabold text-[#47d1c6]">
            Notifications
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notifications drawer"
            className="w-6 h-6 rounded-full bg-[#47d1c6] hover:bg-[#32bfb4] text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        <div className="px-6 pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterTab('all')}
              className={`rounded-full px-4 py-1 text-xs font-semibold border transition cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-[#47d1c6] border-[#47d1c6] text-white'
                  : 'bg-white border-[#47d1c6] text-[#47d1c6] hover:bg-teal-50/50'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilterTab('unread')}
              className={`rounded-full px-4 py-1 text-xs font-semibold border transition cursor-pointer ${
                filterTab === 'unread'
                  ? 'bg-[#47d1c6] border-[#47d1c6] text-white'
                  : 'bg-white border-[#47d1c6] text-[#47d1c6] hover:bg-teal-50/50'
              }`}
            >
              Unread
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDeleteAll}
              disabled={notifications.length === 0}
              className="rounded-full border border-rose-500 text-rose-500 hover:bg-rose-50 px-3.5 py-1 text-xs font-semibold transition disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              Delete All
            </button>
            <button
              type="button"
              onClick={onReadAll}
              disabled={notifications.every((n) => !n.unread)}
              className="rounded-full border border-slate-600 text-slate-700 hover:bg-slate-50 px-3.5 py-1 text-xs font-semibold transition disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              Read All
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {visibleItems.length > 0 ? (
            visibleItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onMarkOneRead(item.id)}
                className={`group rounded-xl p-2 -mx-2 transition flex items-start justify-between gap-3 cursor-pointer ${
                  item.unread ? 'hover:bg-slate-50' : 'opacity-80 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                    {item.avatarInitials}
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <p className="text-xs sm:text-[13px] font-medium text-slate-700 leading-snug">
                      {item.title}
                    </p>
                    <p
                      className={`text-xs leading-snug ${
                        item.unread
                          ? 'font-bold text-slate-900'
                          : 'font-normal text-slate-500'
                      }`}
                    >
                      {item.message}
                    </p>
                    <p className="text-[11px] text-slate-400 pt-0.5">{item.date}</p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label={`Delete notification: ${item.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteOne(item.id);
                  }}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-600 shrink-0 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-1">
              <p className="text-sm font-semibold text-slate-500">
                {filterTab === 'unread' ? 'No unread notifications' : 'No notifications'}
              </p>
              <p className="text-xs text-slate-400">
                You&apos;re all caught up on portal alerts.
              </p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
