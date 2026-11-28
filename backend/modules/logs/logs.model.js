import { getPool } from '../../config/database.js';
import { parseJsonColumn, serializeJsonParam } from '../../shared/jsonUtils.js';

const getLogsPool = () => getPool('logs');

/**
 * Ensures audit, security, and webhook logging tables exist in `u340392193_npte_logs`.
 */
export async function ensureLogTables() {
  const pool = getLogsPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_audit_logs (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      admin_user_id INT UNSIGNED NULL,
      action VARCHAR(120) NOT NULL,
      target_type VARCHAR(80) NOT NULL,
      target_key VARCHAR(120) NULL,
      details_json LONGTEXT NULL,
      ip_address VARCHAR(64) NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS auth_security_logs (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(190) NULL,
      event_type VARCHAR(80) NOT NULL,
      ip_address VARCHAR(64) NULL,
      user_agent VARCHAR(255) NULL,
      details_json LONGTEXT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS api_webhook_logs (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      source VARCHAR(80) NOT NULL,
      endpoint VARCHAR(180) NOT NULL,
      status_code SMALLINT UNSIGNED NOT NULL DEFAULT 200,
      payload_json LONGTEXT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function writeAuthSecurityLog({ email = null, eventType, ipAddress = null, userAgent = null, details = {} }) {
  const pool = getLogsPool();
  await pool.query(
    `INSERT INTO auth_security_logs (email, event_type, ip_address, user_agent, details_json)
     VALUES (?, ?, ?, ?, ?)`,
    [email, eventType, ipAddress, String(userAgent || '').slice(0, 255) || null, serializeJsonParam(details, {})]
  );
}

export async function writeAdminAuditLog({ adminUserId = null, action, targetType, targetKey = null, details = {}, ipAddress = null }) {
  const pool = getLogsPool();
  await pool.query(
    `INSERT INTO admin_audit_logs (admin_user_id, action, target_type, target_key, details_json, ip_address)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [adminUserId, action, targetType, targetKey, serializeJsonParam(details, {}), ipAddress]
  );
}

const LOG_TABLE_MAP = {
  admin: 'admin_audit_logs',
  security: 'auth_security_logs',
  webhooks: 'api_webhook_logs',
};

export async function listRecentLogs(logType = 'security') {
  const tableName = LOG_TABLE_MAP[logType] || 'auth_security_logs';
  const pool = getLogsPool();
  const [rows] = await pool.query(`SELECT * FROM \`${tableName}\` ORDER BY id DESC LIMIT 100`);
  return rows.map((row) => ({
    ...row,
    details: row.details_json ? parseJsonColumn(row.details_json, null) : undefined,
    payload: row.payload_json ? parseJsonColumn(row.payload_json, null) : undefined,
  }));
}
