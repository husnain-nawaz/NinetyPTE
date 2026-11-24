export const USER_STORAGE_KEY = 'ninetypte_user';
export const SUPER_ADMIN_EMAIL = 'Husnain@gmail.com';
const SUPER_ADMIN_EMAIL_LOWER = SUPER_ADMIN_EMAIL.toLowerCase();

/**
 * Reads and validates the persisted user session object from localStorage.
 * Returns null when missing, malformed, or logged out.
 */
export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.isLoggedIn) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Returns true strictly for an authenticated Super Admin session (Husnain@gmail.com).
 */
export function isSuperAdmin(user = getStoredUser()) {
  if (!user || !user.isLoggedIn || user.role !== 'superadmin') {
    return false;
  }
  return (
    typeof user.email === 'string' &&
    user.email.trim().toLowerCase() === SUPER_ADMIN_EMAIL_LOWER
  );
}

/**
 * Authenticates sign-in or sign-up form submissions.
 * Enforces password verification for the reserved Super Admin account.
 */
export function authenticateUser({ mode, email, password, name }) {
  const normalizedEmail = (email || '').trim().toLowerCase();
  const isReservedSuperAdmin = normalizedEmail === SUPER_ADMIN_EMAIL_LOWER;

  if (isReservedSuperAdmin) {
    if (mode === 'signup') {
      return {
        error: 'This email is reserved for Super Admin. Please switch to Sign In.',
      };
    }

    if (password !== '12345678') {
      return {
        error: 'Invalid password for Super Admin account.',
      };
    }

    const userSession = {
      email: SUPER_ADMIN_EMAIL,
      name: 'Husnain',
      role: 'superadmin',
      isLoggedIn: true,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userSession));
    return { user: userSession, redirectPath: '/super-dashboard' };
  }

  const trimmedEmail = (email || '').trim();
  const fallbackName = trimmedEmail.split('@')[0] || 'Student';
  const userSession = {
    email: trimmedEmail || 'student@ninetypte.com',
    name: (name || '').trim() || fallbackName,
    role: 'student',
    isLoggedIn: true,
    loginTime: new Date().toISOString(),
  };
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userSession));
  return { user: userSession, redirectPath: '/dashboard' };
}

/**
 * Clears the active user session from localStorage.
 */
export function clearUserSession() {
  localStorage.removeItem(USER_STORAGE_KEY);
}
