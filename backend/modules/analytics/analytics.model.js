import { getPool } from '../../config/database.js';
import { parseJsonColumn, serializeJsonParam } from '../../shared/jsonUtils.js';

const getStatsPool = () => getPool('stats');

/**
 * Ensures analytics & daily progress snapshot tables exist inside `u340392193_npte_stats`.
 */
export async function ensureStatsTables() {
  const pool = getStatsPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS daily_progress_stats (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      stat_date DATE NOT NULL,
      track ENUM('academic', 'core') NOT NULL DEFAULT 'academic',
      speaking_count INT UNSIGNED NOT NULL DEFAULT 0,
      speaking_seconds INT UNSIGNED NOT NULL DEFAULT 0,
      speaking_avg DECIMAL(5,2) NOT NULL DEFAULT 0,
      writing_count INT UNSIGNED NOT NULL DEFAULT 0,
      writing_seconds INT UNSIGNED NOT NULL DEFAULT 0,
      writing_avg DECIMAL(5,2) NOT NULL DEFAULT 0,
      reading_count INT UNSIGNED NOT NULL DEFAULT 0,
      reading_seconds INT UNSIGNED NOT NULL DEFAULT 0,
      reading_avg DECIMAL(5,2) NOT NULL DEFAULT 0,
      listening_count INT UNSIGNED NOT NULL DEFAULT 0,
      listening_seconds INT UNSIGNED NOT NULL DEFAULT 0,
      listening_avg DECIMAL(5,2) NOT NULL DEFAULT 0,
      total_avg_score DECIMAL(5,2) NOT NULL DEFAULT 0,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uq_user_date_track (user_id, stat_date, track)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS skill_analytics_snapshots (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      track ENUM('academic', 'core') NOT NULL DEFAULT 'academic',
      period_key VARCHAR(32) NOT NULL,
      metrics_json LONGTEXT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uq_user_track_period (user_id, track, period_key)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function getUserDashboardStats(userId, track = 'academic') {
  const pool = getStatsPool();
  const safeTrack = track === 'core' ? 'core' : 'academic';
  const [dailyRows] = await pool.query(
    `SELECT stat_date AS statDate, speaking_count AS speakingCount, speaking_seconds AS speakingSeconds, speaking_avg AS speakingAvg,
            writing_count AS writingCount, writing_seconds AS writingSeconds, writing_avg AS writingAvg,
            reading_count AS readingCount, reading_seconds AS readingSeconds, reading_avg AS readingAvg,
            listening_count AS listeningCount, listening_seconds AS listeningSeconds, listening_avg AS listeningAvg,
            total_avg_score AS totalAvgScore, updated_at AS updatedAt
     FROM daily_progress_stats
     WHERE user_id = ? AND track = ?
     ORDER BY stat_date DESC
     LIMIT 30`,
    [userId, safeTrack]
  );

  const [snapshots] = await pool.query(
    `SELECT period_key AS periodKey, metrics_json AS metrics, updated_at AS updatedAt
     FROM skill_analytics_snapshots
     WHERE user_id = ? AND track = ?`,
    [userId, safeTrack]
  );

  return {
    track: safeTrack,
    dailyProgress: dailyRows,
    snapshots: snapshots.map((row) => ({ ...row, metrics: parseJsonColumn(row.metrics, {}) })),
  };
}

export async function recordDailyProgress(userId, payload) {
  const pool = getStatsPool();
  const statDate = payload.statDate || new Date().toISOString().slice(0, 10);
  const track = payload.track === 'core' ? 'core' : 'academic';

  await pool.query(
    `INSERT INTO daily_progress_stats (user_id, stat_date, track, speaking_count, speaking_seconds, speaking_avg, writing_count, writing_seconds, writing_avg, reading_count, reading_seconds, reading_avg, listening_count, listening_seconds, listening_avg, total_avg_score)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       speaking_count = VALUES(speaking_count),
       speaking_seconds = VALUES(speaking_seconds),
       speaking_avg = VALUES(speaking_avg),
       writing_count = VALUES(writing_count),
       writing_seconds = VALUES(writing_seconds),
       writing_avg = VALUES(writing_avg),
       reading_count = VALUES(reading_count),
       reading_seconds = VALUES(reading_seconds),
       reading_avg = VALUES(reading_avg),
       listening_count = VALUES(listening_count),
       listening_seconds = VALUES(listening_seconds),
       listening_avg = VALUES(listening_avg),
       total_avg_score = VALUES(total_avg_score)`,
    [
      userId,
      statDate,
      track,
      Number(payload.speakingCount) || 0,
      Number(payload.speakingSeconds) || 0,
      Number(payload.speakingAvg) || 0,
      Number(payload.writingCount) || 0,
      Number(payload.writingSeconds) || 0,
      Number(payload.writingAvg) || 0,
      Number(payload.readingCount) || 0,
      Number(payload.readingSeconds) || 0,
      Number(payload.readingAvg) || 0,
      Number(payload.listeningCount) || 0,
      Number(payload.listeningSeconds) || 0,
      Number(payload.listeningAvg) || 0,
      Number(payload.totalAvgScore) || 0,
    ]
  );

  if (payload.metrics) {
    await pool.query(
      `INSERT INTO skill_analytics_snapshots (user_id, track, period_key, metrics_json)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE metrics_json = VALUES(metrics_json)`,
      [userId, track, payload.periodKey || 'all_time', serializeJsonParam(payload.metrics, {})]
    );
  }

  return { statDate, track };
}
