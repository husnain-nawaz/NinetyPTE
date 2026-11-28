import crypto from 'node:crypto';
import { env } from '../../config/env.js';

export const AUTH_COOKIE_NAME = 'ninetypte_token';

export const SUPER_ADMIN_EMAIL = 'Husnain@gmail.com';
export const SUPER_ADMIN_EMAIL_LOWER = SUPER_ADMIN_EMAIL.toLowerCase();

function toBase64Url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function fromBase64Url(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(str.length / 4) * 4, '=');
  return Buffer.from(padded, 'base64').toString('utf8');
}

/**
 * Hashes a plain password with a random 16-byte salt using Node native scrypt.
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

/**
 * Verifies a plain password against a `salt:derivedHex` scrypt hash in constant time.
 */
export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false;
  const [salt, keyHex] = storedHash.split(':');
  if (!salt || !keyHex) return false;
  const keyBuf = Buffer.from(keyHex, 'hex');
  const derivedBuf = crypto.scryptSync(String(password), salt, keyBuf.length);
  if (keyBuf.length !== derivedBuf.length) return false;
  return crypto.timingSafeEqual(keyBuf, derivedBuf);
}

/**
 * Signs an HS256 JWT containing user identity and role.
 */
export function signAuthToken(user, expiresInSeconds = 60 * 60 * 24 * 7) {
  const now = Math.floor(Date.now() / 1000);
  const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = toBase64Url(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: now,
      exp: now + expiresInSeconds,
    })
  );
  const signingInput = `${header}.${payload}`;
  const sig = crypto
    .createHmac('sha256', env.jwtSecret)
    .update(signingInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `${signingInput}.${sig}`;
}

/**
 * Verifies an HS256 JWT and returns decoded claims, or null when invalid/expired.
 */
export function verifyAuthToken(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [headerB64, payloadB64, sigB64] = parts;
  const signingInput = `${headerB64}.${payloadB64}`;
  const expectedSig = crypto
    .createHmac('sha256', env.jwtSecret)
    .update(signingInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const sigBuf = Buffer.from(sigB64);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const claims = JSON.parse(fromBase64Url(payloadB64));
    const now = Math.floor(Date.now() / 1000);
    if (!claims.sub || (claims.exp && claims.exp < now)) {
      return null;
    }
    return claims;
  } catch {
    return null;
  }
}

/**
 * Verifies a Google ID Token (`credential`) or OAuth2 Access Token (`accessToken`) directly with Google APIs.
 */
export async function verifyGoogleToken({ credential, accessToken, expectedClientId }) {
  if (credential) {
    const resp = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
    );
    if (!resp.ok) {
      throw new Error('Invalid or expired Google credential token.');
    }
    const info = await resp.json();
    if (expectedClientId && info.aud && info.aud !== expectedClientId) {
      throw new Error('Google token client ID mismatch.');
    }
    if (!info.email || (info.email_verified !== 'true' && info.email_verified !== true)) {
      throw new Error('Google account email is not verified.');
    }
    return {
      googleId: String(info.sub),
      email: info.email.trim(),
      name: (info.name || info.email.split('@')[0] || 'Student').trim(),
      avatarUrl: info.picture || null,
    };
  }

  if (accessToken) {
    const [tokenInfoResp, userInfoResp] = await Promise.all([
      fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(accessToken)}`),
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    if (!tokenInfoResp.ok || !userInfoResp.ok) {
      throw new Error('Invalid or expired Google access token.');
    }

    const tokenInfo = await tokenInfoResp.json();
    if (expectedClientId && tokenInfo.aud && tokenInfo.aud !== expectedClientId) {
      throw new Error('Google access token audience mismatch.');
    }

    const profile = await userInfoResp.json();
    if (!profile.email || profile.email_verified === false) {
      throw new Error('Google account email is not verified.');
    }

    return {
      googleId: String(profile.sub),
      email: profile.email.trim(),
      name: (profile.name || profile.given_name || profile.email.split('@')[0] || 'Student').trim(),
      avatarUrl: profile.picture || null,
    };
  }

  throw new Error('Google credential or accessToken is required.');
}

/**
 * Formats cookie header options cleanly for localhost vs HTTPS production hosts.
 */
export function buildAuthCookieOptions(maxAgeMs) {
  const isProd = env.nodeEnv === 'production';
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: isProd,
    path: '/',
    maxAge: maxAgeMs,
  };
}
