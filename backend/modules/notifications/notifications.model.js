import { getPool } from '../../config/database.js';

const getNotifyPool = () => getPool('notify');

/**
 * Ensures notifications, contact messages, and support tickets tables exist in `u340392193_npte_notify`.
 */
export async function ensureNotificationTables() {
  const pool = getNotifyPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_notifications (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NULL,
      title VARCHAR(180) NOT NULL,
      body TEXT NOT NULL,
      category ENUM('system', 'subscription', 'score', 'promo') NOT NULL DEFAULT 'system',
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      KEY idx_notify_user (user_id, is_read)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL,
      subject VARCHAR(200) NOT NULL,
      message TEXT NOT NULL,
      status ENUM('new', 'replied') NOT NULL DEFAULT 'new',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS support_tickets (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      category VARCHAR(80) NOT NULL,
      subject VARCHAR(200) NOT NULL,
      description TEXT NOT NULL,
      status ENUM('open', 'in_progress', 'resolved') NOT NULL DEFAULT 'open',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function listUserNotifications(userId) {
  const pool = getNotifyPool();
  const [rows] = await pool.query(
    `SELECT id, user_id AS userId, title, body, category, is_read AS isRead, created_at AS createdAt
     FROM user_notifications
     WHERE user_id = ? OR user_id IS NULL
     ORDER BY id DESC LIMIT 50`,
    [userId]
  );
  return rows.map((row) => ({ ...row, isRead: Boolean(row.isRead) }));
}

export async function markNotificationRead(userId, notificationId) {
  const pool = getNotifyPool();
  await pool.query('UPDATE user_notifications SET is_read = 1 WHERE id = ? AND user_id = ?', [
    notificationId,
    userId,
  ]);
  return { updated: true };
}

export async function createContactMessage(payload) {
  const pool = getNotifyPool();
  const [res] = await pool.query(
    'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
    [payload.name, payload.email, payload.subject || 'Website Inquiry', payload.message]
  );
  return { messageId: res.insertId };
}

export async function createSupportTicket(userId, payload) {
  const pool = getNotifyPool();
  const [res] = await pool.query(
    'INSERT INTO support_tickets (user_id, category, subject, description) VALUES (?, ?, ?, ?)',
    [userId, payload.category || 'General', payload.subject || 'Support Request', payload.description]
  );
  return { ticketId: res.insertId };
}
