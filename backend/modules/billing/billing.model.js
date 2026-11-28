import { getPool } from '../../config/database.js';
import { parseJsonColumn, serializeJsonParam } from '../../shared/jsonUtils.js';

const getBillingPool = () => getPool('billing');

/**
 * Ensures subscription plans, active user memberships, transactions, and exam vouchers exist in `u340392193_npte_billing`.
 */
export async function ensureBillingTables() {
  const pool = getBillingPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS subscription_plans (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      plan_code VARCHAR(64) NOT NULL UNIQUE,
      name VARCHAR(120) NOT NULL,
      duration_days INT UNSIGNED NOT NULL DEFAULT 30,
      price_pkr INT UNSIGNED NOT NULL DEFAULT 0,
      price_usd DECIMAL(8,2) NOT NULL DEFAULT 0,
      features_json LONGTEXT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_subscriptions (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      plan_code VARCHAR(64) NOT NULL,
      status ENUM('active', 'expired', 'cancelled') NOT NULL DEFAULT 'active',
      starts_at DATETIME NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      KEY idx_sub_user (user_id, expires_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS payment_transactions (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      plan_code VARCHAR(64) NOT NULL,
      provider VARCHAR(48) NOT NULL DEFAULT 'local',
      provider_ref VARCHAR(120) NULL,
      amount DECIMAL(10,2) NOT NULL DEFAULT 0,
      currency VARCHAR(12) NOT NULL DEFAULT 'PKR',
      status ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
      metadata_json LONGTEXT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      KEY idx_tx_user (user_id, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS exam_voucher_orders (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      exam_type VARCHAR(64) NOT NULL DEFAULT 'PTE Academic',
      country_code VARCHAR(16) NOT NULL DEFAULT 'PK',
      voucher_code VARCHAR(80) NULL,
      discount_pkr INT UNSIGNED NOT NULL DEFAULT 7100,
      status ENUM('pending', 'issued', 'used', 'cancelled') NOT NULL DEFAULT 'pending',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const starterPlans = [
    ['plan_10d', '10 Days Sprint Plan', 10, 2900, 12.0, ['AI Scoring', 'Unlimited Practice', '3 Full Mock Tests']],
    ['plan_30d', '30 Days Pro Plan', 30, 5500, 22.0, ['AI Scoring', 'Unlimited Practice', '15 Full Mock Tests', 'Weekly Predictions']],
    ['plan_60d', '60 Days Premium Plan', 60, 8900, 35.0, ['AI Scoring', 'Unlimited Practice', '30 Full Mock Tests', 'Weekly Predictions']],
    ['plan_90d', '90 Days Ultimate Plan', 90, 11900, 46.0, ['All Features', '50 Full Mock Tests', 'Priority Support']],
  ];

  await Promise.all(
    starterPlans.map(([code, name, days, pkr, usd, features]) =>
      pool.query(
        `INSERT IGNORE INTO subscription_plans (plan_code, name, duration_days, price_pkr, price_usd, features_json)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [code, name, days, pkr, usd, serializeJsonParam(features, [])]
      )
    )
  );
}

export async function listSubscriptionPlans() {
  const pool = getBillingPool();
  const [rows] = await pool.query(
    `SELECT id, plan_code AS planCode, name, duration_days AS durationDays,
            price_pkr AS pricePkr, price_usd AS priceUsd, features_json AS features
     FROM subscription_plans WHERE is_active = 1 ORDER BY duration_days ASC`
  );
  return rows.map((row) => ({ ...row, features: parseJsonColumn(row.features, []) }));
}

export async function getUserActiveSubscription(userId) {
  const pool = getBillingPool();
  const [rows] = await pool.query(
    `SELECT id, plan_code AS planCode, status, starts_at AS startsAt, expires_at AS expiresAt, created_at AS createdAt
     FROM user_subscriptions WHERE user_id = ? ORDER BY id DESC LIMIT 1`,
    [userId]
  );
  return rows[0] || null;
}

export async function createPaymentOrder(userId, payload) {
  const pool = getBillingPool();
  const [res] = await pool.query(
    `INSERT INTO payment_transactions (user_id, plan_code, provider, provider_ref, amount, currency, status, metadata_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      payload.planCode || 'plan_30d',
      payload.provider || 'local',
      payload.providerRef || null,
      Number(payload.amount) || 0,
      payload.currency || 'PKR',
      'pending',
      serializeJsonParam(payload.metadata, {}),
    ]
  );
  return { transactionId: res.insertId };
}
