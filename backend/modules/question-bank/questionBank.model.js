import { getPool } from '../../config/database.js';
import { parseJsonColumn, serializeJsonParam } from '../../shared/jsonUtils.js';

const VALID_TRACKS = new Set(['academic', 'core']);

function resolveQuestionPool(track = 'academic') {
  return getPool(track === 'core' ? 'qCore' : 'qAcad');
}

async function ensureSingleQuestionBankSchema(dbKey) {
  const pool = getPool(dbKey);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS questions (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      question_code VARCHAR(64) NOT NULL UNIQUE,
      skill ENUM('speaking', 'writing', 'reading', 'listening') NOT NULL,
      task_slug VARCHAR(80) NOT NULL,
      title VARCHAR(255) NOT NULL,
      prompt_text LONGTEXT NULL,
      transcript_text LONGTEXT NULL,
      media_asset_id INT UNSIGNED NULL,
      model_answer_json LONGTEXT NULL,
      difficulty ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'medium',
      is_prediction TINYINT(1) NOT NULL DEFAULT 0,
      prediction_month VARCHAR(32) NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS question_bank_tags (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      question_id INT UNSIGNED NOT NULL,
      tag_name VARCHAR(64) NOT NULL,
      UNIQUE KEY uq_question_tag (question_id, tag_name),
      CONSTRAINT fk_qb_tag_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

/**
 * Ensures both PTE Academic (`u340392193_npte_q_acad`) and PTE Core (`u340392193_npte_q_core`) question banks exist.
 */
export async function ensureQuestionBankTables() {
  await ensureSingleQuestionBankSchema('qAcad');
  await ensureSingleQuestionBankSchema('qCore');
}

export async function listQuestionsByTrack({ track = 'academic', skill, taskSlug, predictionOnly = false, limit = 50 }) {
  const safeTrack = VALID_TRACKS.has(track) ? track : 'academic';
  const pool = resolveQuestionPool(safeTrack);
  const filters = ['is_active = 1'];
  const params = [];

  if (skill) {
    filters.push('skill = ?');
    params.push(skill);
  }
  if (taskSlug) {
    filters.push('task_slug = ?');
    params.push(taskSlug);
  }
  if (predictionOnly) {
    filters.push('is_prediction = 1');
  }

  params.push(Math.min(Math.max(Number(limit) || 50, 1), 200));
  const [rows] = await pool.query(
    `SELECT id, question_code AS questionCode, skill, task_slug AS taskSlug, title,
            prompt_text AS promptText, transcript_text AS transcriptText,
            media_asset_id AS mediaAssetId, model_answer_json AS modelAnswer,
            difficulty, is_prediction AS isPrediction, prediction_month AS predictionMonth,
            created_at AS createdAt
     FROM questions
     WHERE ${filters.join(' AND ')}
     ORDER BY id DESC
     LIMIT ?`,
    params
  );

  return rows.map((row) => ({
    ...row,
    track: safeTrack,
    isPrediction: Boolean(row.isPrediction),
    modelAnswer: parseJsonColumn(row.modelAnswer, null),
  }));
}

export async function upsertQuestionInTrack(track, item) {
  const safeTrack = VALID_TRACKS.has(track) ? track : 'academic';
  const pool = resolveQuestionPool(safeTrack);
  await pool.query(
    `INSERT INTO questions (question_code, skill, task_slug, title, prompt_text, transcript_text, media_asset_id, model_answer_json, difficulty, is_prediction, prediction_month)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       prompt_text = VALUES(prompt_text),
       transcript_text = VALUES(transcript_text),
       model_answer_json = VALUES(model_answer_json),
       difficulty = VALUES(difficulty),
       is_prediction = VALUES(is_prediction),
       prediction_month = VALUES(prediction_month)`,
    [
      item.questionCode,
      item.skill,
      item.taskSlug,
      item.title,
      item.promptText || null,
      item.transcriptText || null,
      item.mediaAssetId || null,
      item.modelAnswer ? serializeJsonParam(item.modelAnswer, null) : null,
      item.difficulty || 'medium',
      item.isPrediction ? 1 : 0,
      item.predictionMonth || null,
    ]
  );
  return { questionCode: item.questionCode, track: safeTrack };
}
