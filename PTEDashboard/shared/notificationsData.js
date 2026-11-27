export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-reply-1',
    title: "You: replied on nc's post",
    refTag: 'RA #1001648',
    date: '27 November, 2026',
    kind: 'reply',
    unread: true,
    avatarInitials: 'NP',
  },
  {
    id: 'notif-reply-2',
    title: "You: replied on Kamya Gupta's post for APPEARED",
    refTag: 'RA #1001648',
    date: '27 November, 2026',
    kind: 'alert-chat',
    unread: true,
    avatarInitials: 'NP',
  },
  {
    id: 'notif-reply-3',
    title: "You: replied on Jacobs Chow's post for APPEARED",
    refTag: 'RA #1001648',
    date: '27 November, 2026',
    kind: 'alert-chat',
    unread: true,
    avatarInitials: 'NP',
  },
  {
    id: 'notif-error-1',
    title: 'You: reported an ERROR',
    refTag: 'RA #1001648',
    date: '27 November, 2026',
    kind: 'alert-chat',
    unread: true,
    avatarInitials: 'NP',
  },
  {
    id: 'notif-like-1',
    title: 'You: liked your score',
    refTag: 'RA #1001648',
    date: '27 November, 2026',
    kind: 'like',
    unread: true,
    avatarInitials: 'NP',
  },
  {
    id: 'notif-expiry-1d',
    title: 'Premium subscription expires in 1 days',
    message: 'Your Premium subscription is about to expire in 1 days.',
    date: '27 November, 2026',
    kind: 'system',
    unread: true,
    avatarInitials: 'NP',
  },
];

export function emitPortalNotification({ title, refTag = '', message = '', kind = 'reply' }) {
  if (typeof window === 'undefined') return;
  const date = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  window.dispatchEvent(
    new CustomEvent('ninetypte-notification', {
      detail: {
        id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        refTag,
        message,
        date,
        kind,
        unread: true,
        avatarInitials: 'NP',
      },
    })
  );
}
