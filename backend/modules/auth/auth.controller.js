import { env } from '../../config/env.js';
import { asyncHandler, sendError, sendSuccess } from '../../shared/apiResponse.js';
import { ensureUsersTable, findUserByEmailWithSecret, createLocalUser, upsertGoogleUser, markUserLastLogin, createPasswordResetRequest, sanitizePublicUser } from './auth.model.js';
import { findUiControlByKey } from '../ui-control/uiControl.model.js';
import { writeAuthSecurityLog } from '../logs/logs.model.js';
import {
  AUTH_COOKIE_NAME,
  buildAuthCookieOptions,
  hashPassword,
  signAuthToken,
  SUPER_ADMIN_EMAIL_LOWER,
  verifyGoogleToken,
  verifyPassword,
} from './auth.service.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function resolveGoogleClientId() {
  if (env.googleClientId) return env.googleClientId;
  try {
    const ctrl = await findUiControlByKey('auth_settings');
    return String(ctrl?.config?.googleClientId || '').trim();
  } catch {
    return '';
  }
}

function attachSessionCookie(res, token, rememberMe = true) {
  const maxAgeMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  res.cookie(AUTH_COOKIE_NAME, token, buildAuthCookieOptions(maxAgeMs));
}

function resolveRedirectPath(user) {
  return user?.role === 'superadmin' ? '/super-dashboard' : '/dashboard';
}

function logAuthEvent(req, eventType, email, details = {}) {
  writeAuthSecurityLog({
    email: email || null,
    eventType,
    ipAddress: req.ip || null,
    userAgent: req.headers?.['user-agent'] || null,
    details,
  }).catch(() => {});
}

/**
 * GET /api/auth/config — exposes live public auth settings (e.g., Google OAuth client ID).
 */
export const getAuthConfig = asyncHandler(async (_req, res) => {
  const googleClientId = await resolveGoogleClientId();
  let allowRegistration = true;
  try {
    const ctrl = await findUiControlByKey('auth_settings');
    if (ctrl?.config && typeof ctrl.config.allowRegistration === 'boolean') {
      allowRegistration = ctrl.config.allowRegistration;
    }
  } catch {
    // Default open registration if UI controls table unavailable
  }

  return sendSuccess(
    res,
    {
      googleEnabled: Boolean(googleClientId),
      googleClientId,
      allowRegistration,
    },
    'Loaded authentication configuration'
  );
});

/**
 * POST /api/auth/register — creates a new student account in MySQL.
 */
export const registerUser = asyncHandler(async (req, res) => {
  await ensureUsersTable();
  const { name, email, phoneCode = '+92', phone = '', password, confirmPassword, rememberMe = true } = req.body || {};

  const trimmedName = String(name || '').trim();
  const trimmedEmail = String(email || '').trim();
  const normalizedLower = trimmedEmail.toLowerCase();

  if (trimmedName.length < 2) {
    return sendError(res, 'Please enter your full name (at least 2 characters).', 400);
  }
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return sendError(res, 'Please enter a valid email address.', 400);
  }
  if (normalizedLower === SUPER_ADMIN_EMAIL_LOWER) {
    return sendError(res, 'This email is reserved for Super Admin. Please switch to Sign In.', 403);
  }
  if (!password || String(password).length < 6) {
    return sendError(res, 'Password must be at least 6 characters long.', 400);
  }
  if (confirmPassword !== undefined && password !== confirmPassword) {
    return sendError(res, 'Passwords do not match.', 400);
  }

  const existing = await findUserByEmailWithSecret(trimmedEmail);
  if (existing) {
    return sendError(res, 'An account with this email already exists. Please Sign In.', 409);
  }

  const passwordHash = hashPassword(password);
  const user = await createLocalUser({
    name: trimmedName,
    email: trimmedEmail,
    phoneCode,
    phone,
    passwordHash,
  });

  const expiresInSec = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
  const token = signAuthToken(user, expiresInSec);
  attachSessionCookie(res, token, Boolean(rememberMe));
  logAuthEvent(req, 'register_success', user.email, { userId: user.id });

  return sendSuccess(
    res,
    { user, token, redirectPath: resolveRedirectPath(user) },
    'Account created successfully',
    201
  );
});

/**
 * POST /api/auth/login — authenticates email & password against MySQL `users`.
 */
export const loginUser = asyncHandler(async (req, res) => {
  await ensureUsersTable();
  const { email, password, rememberMe = true } = req.body || {};

  const trimmedEmail = String(email || '').trim();
  if (!EMAIL_REGEX.test(trimmedEmail) || !password) {
    return sendError(res, 'Please enter your email address and password.', 400);
  }

  const userRecord = await findUserByEmailWithSecret(trimmedEmail);
  if (!userRecord) {
    logAuthEvent(req, 'login_failed', trimmedEmail, { reason: 'not_found' });
    return sendError(res, 'Invalid email or password.', 401);
  }

  if (!userRecord.passwordHash) {
    return sendError(
      res,
      'This account uses Google Sign-In. Please click "Continue With Google".',
      401
    );
  }

  const valid = verifyPassword(password, userRecord.passwordHash);
  if (!valid) {
    logAuthEvent(req, 'login_failed', trimmedEmail, { reason: 'invalid_password' });
    const isSuper = userRecord.role === 'superadmin';
    return sendError(
      res,
      isSuper ? 'Invalid password for Super Admin account.' : 'Invalid email or password.',
      401
    );
  }

  await markUserLastLogin(userRecord.id);
  const user = sanitizePublicUser({
    ...userRecord,
    lastLoginAt: new Date().toISOString(),
  });
  const expiresInSec = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
  const token = signAuthToken(user, expiresInSec);
  attachSessionCookie(res, token, Boolean(rememberMe));
  logAuthEvent(req, 'login_success', user.email, { userId: user.id, role: user.role });

  return sendSuccess(
    res,
    { user, token, redirectPath: resolveRedirectPath(user) },
    'Signed in successfully'
  );
});

/**
 * POST /api/auth/google — authenticates a verified Google ID token or Access Token directly.
 */
export const googleDirectAuth = asyncHandler(async (req, res) => {
  await ensureUsersTable();
  const { credential, accessToken, rememberMe = true } = req.body || {};

  if (!credential && !accessToken) {
    return sendError(res, 'Missing Google credential or access token.', 400);
  }

  const expectedClientId = await resolveGoogleClientId();
  let googleProfile;
  try {
    googleProfile = await verifyGoogleToken({ credential, accessToken, expectedClientId });
  } catch (err) {
    logAuthEvent(req, 'google_failed', null, { error: err.message });
    return sendError(res, err.message || 'Google verification failed.', 401);
  }

  const user = await upsertGoogleUser(googleProfile);
  const expiresInSec = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24;
  const token = signAuthToken(user, expiresInSec);
  attachSessionCookie(res, token, Boolean(rememberMe));
  logAuthEvent(req, 'google_success', user.email, { userId: user.id });

  return sendSuccess(
    res,
    { user, token, redirectPath: resolveRedirectPath(user) },
    'Google authentication successful'
  );
});

/**
 * GET /api/auth/me — returns the currently authenticated user from MySQL.
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  return sendSuccess(res, { user: req.user }, 'Authenticated user loaded');
});

/**
 * POST /api/auth/logout — clears the auth session cookie.
 */
export const logoutUser = asyncHandler(async (_req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, { path: '/' });
  return sendSuccess(res, { loggedOut: true }, 'Signed out successfully');
});

/**
 * POST /api/auth/forgot-password — records a reset request cleanly in MySQL.
 */
export const requestPasswordReset = asyncHandler(async (req, res) => {
  await ensureUsersTable();
  const email = String(req.body?.email || '').trim();
  if (!EMAIL_REGEX.test(email)) {
    return sendError(res, 'Please enter a valid email address.', 400);
  }

  const user = await findUserByEmailWithSecret(email);
  if (user && user.role !== 'superadmin') {
    await createPasswordResetRequest(user.id);
    logAuthEvent(req, 'password_reset_requested', email, { userId: user.id });
  }

  return sendSuccess(
    res,
    { requested: true },
    'If an account exists for that email, password recovery instructions have been generated.'
  );
});
