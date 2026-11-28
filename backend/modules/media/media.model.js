import crypto from 'node:crypto';
import { getPool } from '../../config/database.js';

const getMediaPool = () => getPool('media');

/**
 * Ensures media asset metadata registry exists in `u340392193_npte_media`.
 */
export async function ensureMediaTables() {
  const pool = getMediaPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS media_assets (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      asset_key VARCHAR(96) NOT NULL UNIQUE,
      owner_user_id INT UNSIGNED NULL,
      purpose ENUM('question_audio', 'user_recording', 'video', 'image') NOT NULL DEFAULT 'user_recording',
      storage_provider ENUM('local', 'r2', 's3', 'external') NOT NULL DEFAULT 'local',
      file_url VARCHAR(512) NOT NULL,
      mime_type VARCHAR(96) NULL,
      byte_size BIGINT UNSIGNED NOT NULL DEFAULT 0,
      duration_ms INT UNSIGNED NULL,
      transcript_text LONGTEXT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      KEY idx_media_owner (owner_user_id, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function listUserMediaAssets(userId) {
  const pool = getMediaPool();
  const [rows] = await pool.query(
    `SELECT id, asset_key AS assetKey, owner_user_id AS ownerUserId, purpose, storage_provider AS storageProvider,
            file_url AS fileUrl, mime_type AS mimeType, byte_size AS byteSize,
            duration_ms AS durationMs, transcript_text AS transcriptText, created_at AS createdAt
     FROM media_assets WHERE owner_user_id = ? ORDER BY id DESC LIMIT 100`,
    [userId]
  );
  return rows;
}

export async function registerMediaAsset(userId, payload) {
  const pool = getMediaPool();
  const assetKey = payload.assetKey || `asset_${crypto.randomBytes(12).toString('hex')}`;
  const [res] = await pool.query(
    `INSERT INTO media_assets (asset_key, owner_user_id, purpose, storage_provider, file_url, mime_type, byte_size, duration_ms, transcript_text)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      assetKey,
      userId || null,
      payload.purpose || 'user_recording',
      payload.storageProvider || 'local',
      payload.fileUrl,
      payload.mimeType || null,
      Number(payload.byteSize) || 0,
      payload.durationMs ?? null,
      payload.transcriptText || null,
    ]
  );
  return { id: res.insertId, assetKey };
}
