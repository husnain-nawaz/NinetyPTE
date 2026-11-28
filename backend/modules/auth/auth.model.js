import crypto from 'node:crypto';
import { getPool } from '../../config/database.js';
import {
  hashPassword,
  SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_EMAIL_LOWER,
} from './auth.service.js';

function sanitizePublicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phoneCode: row.phoneCode || '+92',
    phone: row.phone || '',
    avatarUrl: row.avatarUrl || null,
    authProvider: row.authProvider || 'local',
    role: row.role || 'student',
    emailVerified: Boolean(row.emailVerified),
    lastLoginAt: row.lastLoginAt || null,
    createdAt: row.createdAt || null,
  };
}

const getAuthPool = () => getPool('auth');

/**
 * Creates `users`, `user_profiles`, and `password_resets` tables in the Auth DB and ensures Super Admin exists.
 */
export async function ensureUsersTable() {
  const pool = getAuthPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL UNIQUE,
      phone_code VARCHAR(16) NULL,
      phone VARCHAR(40) NULL,
      password_hash VARCHAR(255) NULL,
      auth_provider ENUM('local', 'google', 'both') NOT NULL DEFAULT 'local',
      google_id VARCHAR(128) NULL UNIQUE,
      avatar_url VARCHAR(512) NULL,
      role ENUM('student', 'superadmin') NOT NULL DEFAULT 'student',
      email_verified TINYINT(1) NOT NULL DEFAULT 0,
      last_login_at TIMESTAMP NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id INT UNSIGNED NOT NULL PRIMARY KEY,
      active_track ENUM('academic', 'core') NOT NULL DEFAULT 'academic',
      target_score VARCHAR(32) NOT NULL DEFAULT '69 - 88',
      exam_countdown_at DATETIME NULL,
      preferred_language VARCHAR(24) NOT NULL DEFAULT 'en',
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_user_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS password_resets (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      reset_token VARCHAR(128) NOT NULL UNIQUE,
      expires_at DATETIME NOT NULL,
      used_at DATETIME NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_password_resets_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const [existingAdmin] = await pool.query(
    'SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1',
    [SUPER_ADMIN_EMAIL_LOWER]
  );

  if (existingAdmin.length === 0) {
    await pool.query(
      `INSERT INTO users (name, email, password_hash, auth_provider, role, email_verified)
       VALUES (?, ?, ?, 'local', 'superadmin', 1)`,
      ['Husnain', SUPER_ADMIN_EMAIL, hashPassword('12345678')]
    );
  }
}

export async function findUserByEmailWithSecret(email) {
  const pool = getAuthPool();
  const [rows] = await pool.query(
    `SELECT id, name, email, phone_code AS phoneCode, phone, password_hash AS passwordHash,
            auth_provider AS authProvider, google_id AS googleId, avatar_url AS avatarUrl,
            role, email_verified AS emailVerified, last_login_at AS lastLoginAt, created_at AS createdAt
     FROM users
     WHERE LOWER(email) = ?
     LIMIT 1`,
    [String(email || '').trim().toLowerCase()]
  );
  return rows[0] || null;
}

export async function findUserById(userId) {
  const pool = getAuthPool();
  const [rows] = await pool.query(
    `SELECT id, name, email, phone_code AS phoneCode, phone,
            auth_provider AS authProvider, avatar_url AS avatarUrl,
            role, email_verified AS emailVerified, last_login_at AS lastLoginAt, created_at AS createdAt
     FROM users
     WHERE id = ?
     LIMIT 1`,
    [userId]
  );
  return sanitizePublicUser(rows[0]);
}

export async function createLocalUser({ name, email, phoneCode = '+92', phone = '', passwordHash }) {
  const pool = getAuthPool();
  const [result] = await pool.query(
    `INSERT INTO users (name, email, phone_code, phone, password_hash, auth_provider, role, email_verified, last_login_at)
     VALUES (?, ?, ?, ?, ?, 'local', 'student', 1, CURRENT_TIMESTAMP)`,
    [name.trim(), email.trim(), phoneCode || '+92', phone.trim(), passwordHash]
  );
  return findUserById(result.insertId);
}

export async function upsertGoogleUser({ googleId, email, name, avatarUrl }) {
  const pool = getAuthPool();
  const normalizedLower = email.trim().toLowerCase();

  const [existingRows] = await pool.query(
    'SELECT id, name, auth_provider AS authProvider, role FROM users WHERE google_id = ? OR LOWER(email) = ? LIMIT 1',
    [googleId, normalizedLower]
  );

  if (existingRows.length > 0) {
    const existing = existingRows[0];
    const nextProvider =
      existing.authProvider === 'local' ? 'both' : existing.authProvider || 'google';
    await pool.query(
      `UPDATE users
       SET google_id = ?,
           avatar_url = COALESCE(?, avatar_url),
           name = COALESCE(NULLIF(?, ''), name),
           auth_provider = ?,
           email_verified = 1,
           last_login_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [googleId, avatarUrl, name, nextProvider, existing.id]
    );
    return findUserById(existing.id);
  }

  const assignedRole = normalizedLower === SUPER_ADMIN_EMAIL_LOWER ? 'superadmin' : 'student';
  const [inserted] = await pool.query(
    `INSERT INTO users (name, email, google_id, avatar_url, auth_provider, role, email_verified, last_login_at)
     VALUES (?, ?, ?, ?, 'google', ?, 1, CURRENT_TIMESTAMP)`,
    [name.trim(), email.trim(), googleId, avatarUrl, assignedRole]
  );
  return findUserById(inserted.insertId);
}

export async function markUserLastLogin(userId) {
  const pool = getAuthPool();
  await pool.query('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?', [userId]);
}

export async function createPasswordResetRequest(userId) {
  const pool = getAuthPool();
  const resetToken = crypto.randomBytes(32).toString('hex');
  await pool.query(
    `INSERT INTO password_resets (user_id, reset_token, expires_at)
     VALUES (?, ?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR))`,
    [userId, resetToken]
  );
  return resetToken;
}

export { sanitizePublicUser };
