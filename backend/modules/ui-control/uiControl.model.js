import { getPool } from '../../config/database.js';

/**
 * Ensures the `ui_controls` table exists in MySQL and seeds baseline UI switches if empty.
 */
export async function ensureUiControlsTable() {
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ui_controls (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      control_key VARCHAR(100) NOT NULL UNIQUE,
      feature_group VARCHAR(60) NOT NULL DEFAULT 'general',
      label VARCHAR(120) NOT NULL,
      is_enabled TINYINT(1) NOT NULL DEFAULT 1,
      config_json JSON NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const defaults = [
    [
      'platform_brand',
      'global',
      'NinetyPTE Brand & Track Defaults',
      1,
      JSON.stringify({ brandName: 'NinetyPTE', defaultTrack: 'academic', supportEmail: 'support@ninetypte.com' }),
    ],
    [
      'mock_tests_module',
      'mock-tests',
      'Mock Tests & Score History Controls',
      1,
      JSON.stringify({ enableTimedMode: true, enableSectionalMode: true, allowDeleteAttempt: true }),
    ],
    [
      'practice_arena_module',
      'practice',
      'Practice Arena AI Evaluation Controls',
      1,
      JSON.stringify({ enableAiScoring: true, defaultSpeakingTimerSec: 40 }),
    ],
    [
      'auth_settings',
      'auth',
      'Authentication & Google Direct Login Settings',
      1,
      JSON.stringify({ googleClientId: '', allowRegistration: true }),
    ],
  ];

  await Promise.all(
    defaults.map(([key, group, label, enabled, configJson]) =>
      pool.query(
        `INSERT IGNORE INTO ui_controls (control_key, feature_group, label, is_enabled, config_json)
         VALUES (?, ?, ?, ?, CAST(? AS JSON))`,
        [key, group, label, enabled, configJson]
      )
    )
  );
}

function normalizeControlRow(row) {
  if (!row) return null;
  return {
    ...row,
    isEnabled: Boolean(row.isEnabled),
  };
}

/**
 * Lists all UI control records ordered by feature group and key.
 */
export async function listUiControls() {
  const pool = getPool();
  const [rows] = await pool.query(
    `SELECT id, control_key AS controlKey, feature_group AS featureGroup, label,
            is_enabled AS isEnabled, config_json AS config, updated_at AS updatedAt
     FROM ui_controls
     ORDER BY feature_group ASC, control_key ASC`
  );
  return rows.map(normalizeControlRow);
}

/**
 * Retrieves a single UI control entry by its unique key.
 */
export async function findUiControlByKey(controlKey) {
  const pool = getPool();
  const [rows] = await pool.query(
    `SELECT id, control_key AS controlKey, feature_group AS featureGroup, label,
            is_enabled AS isEnabled, config_json AS config, updated_at AS updatedAt
     FROM ui_controls
     WHERE control_key = ?
     LIMIT 1`,
    [controlKey]
  );
  return normalizeControlRow(rows[0]);
}

/**
 * Creates or updates a UI control record in real time.
 */
export async function upsertUiControl({ controlKey, featureGroup = 'general', label, isEnabled = true, config = {} }) {
  const pool = getPool();
  await pool.query(
    `INSERT INTO ui_controls (control_key, feature_group, label, is_enabled, config_json)
     VALUES (?, ?, ?, ?, CAST(? AS JSON))
     ON DUPLICATE KEY UPDATE
       feature_group = VALUES(feature_group),
       label = VALUES(label),
       is_enabled = VALUES(is_enabled),
       config_json = VALUES(config_json)`,
    [controlKey, featureGroup, label || controlKey, isEnabled ? 1 : 0, JSON.stringify(config)]
  );
  return findUiControlByKey(controlKey);
}
