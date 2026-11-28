export const USER_STORAGE_KEY = 'ninetypte_user';
export const SUPER_ADMIN_EMAIL = 'Husnain@gmail.com';
const SUPER_ADMIN_EMAIL_LOWER = SUPER_ADMIN_EMAIL.toLowerCase();
const GOOGLE_GSI_SCRIPT_ID = 'ninetypte-google-gsi';
const GOOGLE_GSI_SRC = 'https://accounts.google.com/gsi/client';

let googleScriptPromise = null;
let syncSessionPromise = null;

/**
 * Returns the currently signed-in user session object from localStorage, or null.
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
 * Returns the stored JWT token for Authorization headers, or empty string.
 */
export function getAuthToken() {
  return getStoredUser()?.token || '';
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
 * Saves an authenticated user & JWT token cleanly to localStorage.
 */
export function persistUserSession(user, token = null) {
  if (!user || typeof user !== 'object') return null;
  const previous = getStoredUser();
  const normalizedRole =
    String(user.email || '').trim().toLowerCase() === SUPER_ADMIN_EMAIL_LOWER
      ? 'superadmin'
      : user.role === 'superadmin'
        ? 'student'
        : user.role || 'student';

  const sessionPayload = {
    ...user,
    role: normalizedRole,
    token: token || previous?.token || null,
    isLoggedIn: true,
    loginTime: new Date().toISOString(),
  };

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionPayload));
  return sessionPayload;
}

/**
 * Clears the local auth session immediately and notifies the backend to clear the HTTP cookie.
 */
export function clearUserSession() {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch {
    // Ignore storage access errors
  }

  if (typeof fetch === 'function') {
    fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {});
  }
}

async function apiFetchJson(url, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url, {
      credentials: 'include',
      ...options,
      headers,
    });
  } catch {
    return {
      ok: false,
      status: 0,
      data: null,
      message: 'Unable to reach authentication server. Please verify your connection.',
    };
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  return {
    ok: response.ok && Boolean(payload?.success ?? response.ok),
    status: response.status,
    data: payload?.data ?? null,
    message: payload?.message || (response.ok ? 'Success' : 'Authentication request failed.'),
  };
}

/**
 * Loads public authentication config (e.g. whether Google Direct Auth is enabled and its Client ID).
 */
export async function fetchAuthConfig() {
  const fallbackClientId = String(import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim();
  const result = await apiFetchJson('/api/auth/config', { method: 'GET' });
  if (!result.ok || !result.data) {
    return {
      googleEnabled: Boolean(fallbackClientId),
      googleClientId: fallbackClientId,
      allowRegistration: true,
    };
  }

  const resolvedClientId = String(result.data.googleClientId || fallbackClientId).trim();
  return {
    googleEnabled: Boolean(resolvedClientId),
    googleClientId: resolvedClientId,
    allowRegistration:
      typeof result.data.allowRegistration === 'boolean' ? result.data.allowRegistration : true,
  };
}

/**
 * Registers a new student account in MySQL (`users`) via POST /api/auth/register.
 */
export async function registerUserAccount({
  name,
  email,
  phoneCode = '+92',
  phone = '',
  password,
  confirmPassword,
  rememberMe = true,
}) {
  const result = await apiFetchJson('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      phoneCode,
      phone,
      password,
      confirmPassword,
      rememberMe,
    }),
  });

  if (!result.ok || !result.data?.user) {
    return { error: result.message || 'Could not create account.' };
  }

  const session = persistUserSession(result.data.user, result.data.token);
  return {
    user: session,
    token: result.data.token,
    redirectPath: result.data.redirectPath || '/dashboard',
  };
}

/**
 * Signs an existing user (student or Super Admin) in via MySQL (`POST /api/auth/login`).
 */
export async function loginUserAccount({ email, password, rememberMe = true }) {
  const result = await apiFetchJson('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password, rememberMe }),
  });

  if (!result.ok || !result.data?.user) {
    return { error: result.message || 'Invalid email or password.' };
  }

  const session = persistUserSession(result.data.user, result.data.token);
  const redirectPath = isSuperAdmin(session)
    ? '/super-dashboard'
    : result.data.redirectPath || '/dashboard';

  return {
    user: session,
    token: result.data.token,
    redirectPath,
  };
}

/**
 * Unified email/password auth helper dispatching to Sign Up or Sign In endpoints.
 */
export async function authenticateUser({
  mode,
  email,
  password,
  confirmPassword,
  name,
  phoneCode,
  phone,
  rememberMe = true,
}) {
  if (mode === 'signup') {
    return registerUserAccount({
      name,
      email,
      phoneCode,
      phone,
      password,
      confirmPassword,
      rememberMe,
    });
  }
  return loginUserAccount({ email, password, rememberMe });
}

/**
 * Sends a verified Google ID token or OAuth2 Access Token to POST /api/auth/google.
 */
export async function authenticateWithGoogle({ credential, accessToken, rememberMe = true }) {
  const result = await apiFetchJson('/api/auth/google', {
    method: 'POST',
    body: JSON.stringify({ credential, accessToken, rememberMe }),
  });

  if (!result.ok || !result.data?.user) {
    return { error: result.message || 'Google Sign-In failed.' };
  }

  const session = persistUserSession(result.data.user, result.data.token);
  const redirectPath = isSuperAdmin(session)
    ? '/super-dashboard'
    : result.data.redirectPath || '/dashboard';

  return {
    user: session,
    token: result.data.token,
    redirectPath,
  };
}

/**
 * Sends a password recovery request to POST /api/auth/forgot-password.
 */
export async function requestPasswordResetEmail(email) {
  const result = await apiFetchJson('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  if (!result.ok) {
    return { error: result.message || 'Could not process password recovery request.' };
  }
  return { message: result.message };
}

/**
 * Syncs an existing client session against MySQL (`/api/auth/me`) without triggering
 * unauthenticated 401 errors for anonymous visitors or duplicate StrictMode calls.
 */
export async function syncAuthSessionWithServer() {
  const existing = getStoredUser();
  if (!existing) return null;

  // Clear legacy pre-database localStorage sessions cleanly without spurious 401 requests
  if (!existing.token) {
    clearUserSession();
    return null;
  }

  if (syncSessionPromise) {
    return syncSessionPromise;
  }

  syncSessionPromise = apiFetchJson('/api/auth/me', { method: 'GET' })
    .then((result) => {
      if (result.status === 401) {
        clearUserSession();
        return null;
      }
      if (result.ok && result.data?.user) {
        return persistUserSession(result.data.user, existing.token);
      }
      return existing;
    })
    .finally(() => {
      syncSessionPromise = null;
    });

  return syncSessionPromise;
}

/**
 * Loads Google Identity Services client (`https://accounts.google.com/gsi/client`) cleanly once.
 */
export function loadGoogleIdentityScript() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(new Error('Google Sign-In is only available in the browser.'));
  }

  if (window.google?.accounts?.oauth2) {
    return Promise.resolve(window.google);
  }

  if (googleScriptPromise) {
    return googleScriptPromise;
  }

  googleScriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(GOOGLE_GSI_SCRIPT_ID);
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google), { once: true });
      existing.addEventListener(
        'error',
        () => {
          googleScriptPromise = null;
          reject(new Error('Failed to load Google Identity script.'));
        },
        { once: true }
      );
      return;
    }

    const script = document.createElement('script');
    script.id = GOOGLE_GSI_SCRIPT_ID;
    script.src = GOOGLE_GSI_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.accounts?.oauth2) {
        resolve(window.google);
      } else {
        googleScriptPromise = null;
        reject(new Error('Google Identity OAuth client did not initialize.'));
      }
    };
    script.onerror = () => {
      googleScriptPromise = null;
      reject(new Error('Unable to load Google Sign-In script. Check network or ad blockers.'));
    };
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

/**
 * Triggers Google Direct Auth OAuth2 token popup and exchanges the token on the backend.
 * Call `loadGoogleIdentityScript()` beforehand so `requestAccessToken` runs inside the click gesture.
 */
export async function startGoogleDirectLogin({ googleClientId, rememberMe = true } = {}) {
  const clientId = String(googleClientId || import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim();
  if (!clientId) {
    return {
      error:
        'Google Direct Auth is not configured yet. Add GOOGLE_CLIENT_ID to backend/.env or Hostinger environment variables.',
    };
  }

  let googleApi = typeof window !== 'undefined' ? window.google : null;
  if (!googleApi?.accounts?.oauth2) {
    try {
      googleApi = await loadGoogleIdentityScript();
    } catch (err) {
      return { error: err.message || 'Unable to load Google Sign-In.' };
    }
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = (outcome) => {
      if (settled) return;
      settled = true;
      resolve(outcome);
    };

    try {
      const tokenClient = googleApi.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'openid email profile',
        callback: async (tokenResponse) => {
          if (tokenResponse?.error || !tokenResponse?.access_token) {
            finish({
              error: tokenResponse?.error_description || 'Google Sign-In was cancelled or failed.',
            });
            return;
          }
          const authResult = await authenticateWithGoogle({
            accessToken: tokenResponse.access_token,
            rememberMe,
          });
          finish(authResult);
        },
        error_callback: (err) => {
          if (err?.type === 'popup_closed') {
            finish({ error: 'Google Sign-In popup was closed before completing.' });
            return;
          }
          finish({
            error:
              'Google Sign-In popup could not open. Please allow popups for this site and verify your authorized origins.',
          });
        },
      });

      tokenClient.requestAccessToken({ prompt: 'select_account' });
    } catch (err) {
      finish({ error: err.message || 'Unable to start Google Sign-In.' });
    }
  });
}
