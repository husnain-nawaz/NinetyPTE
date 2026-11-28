import { getPool } from '../../config/database.js';
import { parseJsonColumn, serializeJsonParam } from '../../shared/jsonUtils.js';

const getAiPool = () => getPool('aiEval');

/**
 * Ensures AI scoring & feedback table exists inside `u340392193_npte_ai_eval`.
 */
export async function ensureAiEvaluationTables() {
  const pool = getAiPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS ai_evaluations (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      source_type ENUM('practice', 'mock') NOT NULL DEFAULT 'practice',
      source_ref_id VARCHAR(80) NOT NULL,
      track ENUM('academic', 'core') NOT NULL DEFAULT 'academic',
      skill ENUM('speaking', 'writing', 'reading', 'listening') NOT NULL,
      task_slug VARCHAR(80) NOT NULL,
      overall_score DECIMAL(5,2) NOT NULL DEFAULT 0,
      content_score DECIMAL(5,2) NULL,
      pronunciation_score DECIMAL(5,2) NULL,
      fluency_score DECIMAL(5,2) NULL,
      grammar_score DECIMAL(5,2) NULL,
      spelling_score DECIMAL(5,2) NULL,
      vocabulary_score DECIMAL(5,2) NULL,
      feedback_summary TEXT NULL,
      breakdown_json LONGTEXT NULL,
      model_version VARCHAR(48) NOT NULL DEFAULT 'ninetypte-v1',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      KEY idx_ai_eval_user (user_id, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function listUserAiEvaluations(userId) {
  const pool = getAiPool();
  const [rows] = await pool.query(
    `SELECT id, source_type AS sourceType, source_ref_id AS sourceRefId, track, skill,
            task_slug AS taskSlug, overall_score AS overallScore, content_score AS contentScore,
            pronunciation_score AS pronunciationScore, fluency_score AS fluencyScore,
            grammar_score AS grammarScore, spelling_score AS spellingScore,
            vocabulary_score AS vocabularyScore, feedback_summary AS feedbackSummary,
            breakdown_json AS breakdown, model_version AS modelVersion, created_at AS createdAt
     FROM ai_evaluations WHERE user_id = ? ORDER BY id DESC LIMIT 100`,
    [userId]
  );
  return rows.map((row) => ({ ...row, breakdown: parseJsonColumn(row.breakdown, null) }));
}

export async function saveAiEvaluation(userId, payload) {
  const pool = getAiPool();
  const [res] = await pool.query(
    `INSERT INTO ai_evaluations (user_id, source_type, source_ref_id, track, skill, task_slug, overall_score, content_score, pronunciation_score, fluency_score, grammar_score, spelling_score, vocabulary_score, feedback_summary, breakdown_json, model_version)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      payload.sourceType || 'practice',
      String(payload.sourceRefId || 'adhoc'),
      payload.track || 'academic',
      payload.skill,
      payload.taskSlug || 'general',
      Number(payload.overallScore) || 0,
      payload.contentScore ?? null,
      payload.pronunciationScore ?? null,
      payload.fluencyScore ?? null,
      payload.grammarScore ?? null,
      payload.spellingScore ?? null,
      payload.vocabularyScore ?? null,
      payload.feedbackSummary || null,
      payload.breakdown ? serializeJsonParam(payload.breakdown, null) : null,
      payload.modelVersion || 'ninetypte-v1',
    ]
  );
  return { evaluationId: res.insertId };
}
