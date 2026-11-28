import { sendError } from '../../shared/apiResponse.js';
import { findUserById } from './auth.model.js';
import { AUTH_COOKIE_NAME, verifyAuthToken } from './auth.service.js';

function parseCookies(cookieHeader) {
  const result = {};
  if (!cookieHeader || typeof cookieHeader !== 'string') return result;
  cookieHeader.split(';').forEach((part) => {
    const eqIdx = part.indexOf('=');
    if (eqIdx <= 0) return;
    const key = part.slice(0, eqIdx).trim();
    const val = part.slice(eqIdx + 1).trim();
    if (key) {
      result[key] = decodeURIComponent(val);
    }
  });
  return result;
}

export function extractTokenFromRequest(req) {
  const authHeader = req.headers.authorization || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  const cookies = parseCookies(req.headers.cookie);
  return cookies[AUTH_COOKIE_NAME] || null;
}

/**
 * Attaches `req.user` when a valid token is present without rejecting anonymous callers.
 */
export async function optionalAuth(req, _res, next) {
  try {
    const token = extractTokenFromRequest(req);
    const claims = verifyAuthToken(token);
    if (claims?.sub) {
      req.user = await findUserById(claims.sub);
    }
  } catch {
    req.user = null;
  }
  next();
}

/**
 * Enforces an authenticated MySQL user session on protected backend API routes.
 */
export async function requireAuth(req, res, next) {
  try {
    const token = extractTokenFromRequest(req);
    const claims = verifyAuthToken(token);
    if (!claims?.sub) {
      return sendError(res, 'Authentication required', 401);
    }
    const user = await findUserById(claims.sub);
    if (!user) {
      return sendError(res, 'User session is no longer valid', 401);
    }
    req.user = user;
    return next();
  } catch (err) {
    return sendError(res, err.message || 'Authentication failed', 401);
  }
}

/**
 * Restricts access strictly to authenticated Super Admin accounts.
 */
export async function requireSuperAdmin(req, res, next) {
  return requireAuth(req, res, () => {
    if (req.user?.role !== 'superadmin') {
      return sendError(res, 'Super Admin access required', 403);
    }
    return next();
  });
}
