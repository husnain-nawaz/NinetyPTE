import crypto from 'node:crypto';
import { getPool } from '../../config/database.js';

const getPromoPool = () => getPool('promo');

/**
 * Ensures referrals, promo coupons, and B2B institute sales lead tables exist in `u340392193_npte_promo`.
 */
export async function ensurePromoTables() {
  const pool = getPromoPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS referral_profiles (
      user_id INT UNSIGNED NOT NULL PRIMARY KEY,
      referral_code VARCHAR(32) NOT NULL UNIQUE,
      points_balance INT UNSIGNED NOT NULL DEFAULT 0,
      total_invited INT UNSIGNED NOT NULL DEFAULT 0,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS referral_events (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      referrer_user_id INT UNSIGNED NOT NULL,
      referred_user_id INT UNSIGNED NOT NULL,
      points_awarded INT UNSIGNED NOT NULL DEFAULT 4,
      status ENUM('pending', 'credited') NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS promo_coupons (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      code VARCHAR(48) NOT NULL UNIQUE,
      discount_type ENUM('percent', 'fixed') NOT NULL DEFAULT 'percent',
      discount_value DECIMAL(8,2) NOT NULL DEFAULT 10,
      max_uses INT UNSIGNED NULL,
      used_count INT UNSIGNED NOT NULL DEFAULT 0,
      expires_at DATETIME NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS institute_sales_leads (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      institute_name VARCHAR(180) NOT NULL,
      contact_name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(48) NULL,
      seats_requested INT UNSIGNED NOT NULL DEFAULT 25,
      notes TEXT NULL,
      status ENUM('new', 'contacted', 'closed') NOT NULL DEFAULT 'new',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function getOrCreateReferralProfile(userId) {
  const pool = getPromoPool();
  const [rows] = await pool.query(
    `SELECT user_id AS userId, referral_code AS referralCode, points_balance AS pointsBalance, total_invited AS totalInvited
     FROM referral_profiles WHERE user_id = ? LIMIT 1`,
    [userId]
  );
  if (rows[0]) return rows[0];

  const generatedCode = `NPTE${String(userId)}${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
  await pool.query(
    'INSERT IGNORE INTO referral_profiles (user_id, referral_code) VALUES (?, ?)',
    [userId, generatedCode]
  );
  const [created] = await pool.query(
    `SELECT user_id AS userId, referral_code AS referralCode, points_balance AS pointsBalance, total_invited AS totalInvited
     FROM referral_profiles WHERE user_id = ? LIMIT 1`,
    [userId]
  );
  return created[0];
}

export async function validatePromoCoupon(code) {
  const pool = getPromoPool();
  const [rows] = await pool.query(
    `SELECT code, discount_type AS discountType, discount_value AS discountValue, max_uses AS maxUses, used_count AS usedCount, expires_at AS expiresAt
     FROM promo_coupons WHERE UPPER(code) = UPPER(?) AND is_active = 1 LIMIT 1`,
    [String(code || '').trim()]
  );
  return rows[0] || null;
}

export async function submitInstituteLead(payload) {
  const pool = getPromoPool();
  const [res] = await pool.query(
    `INSERT INTO institute_sales_leads (institute_name, contact_name, email, phone, seats_requested, notes)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      payload.instituteName,
      payload.contactName,
      payload.email,
      payload.phone || null,
      Number(payload.seatsRequested) || 25,
      payload.notes || null,
    ]
  );
  return { leadId: res.insertId };
}
