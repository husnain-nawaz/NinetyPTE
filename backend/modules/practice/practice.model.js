import { getPool } from '../../config/database.js';

const getPracticePool = () => getPool('practice');

/**
 * Ensures Practice Arena attempts, notes, community answers, and issue reports exist in `u340392193_npte_practice`.
 */
export async function ensurePracticeTables() {
  const pool = getPracticePool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS practice_attempts (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      track ENUM('academic', 'core') NOT NULL DEFAULT 'academic',
      skill ENUM('speaking', 'writing', 'reading', 'listening') NOT NULL,
      task_slug VARCHAR(80) NOT NULL,
      question_code VARCHAR(64) NOT NULL,
      response_text LONGTEXT NULL,
      audio_media_id INT UNSIGNED NULL,
      duration_seconds INT UNSIGNED NOT NULL DEFAULT 0,
      score_obtained DECIMAL(5,2) NOT NULL DEFAULT 0,
      score_max DECIMAL(5,2) NOT NULL DEFAULT 90,
      is_ai_scored TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      KEY idx_practice_user_date (user_id, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS practice_notes (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      question_code VARCHAR(64) NOT NULL,
      note_text TEXT NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uq_user_question_note (user_id, question_code)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS community_answers (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      user_name VARCHAR(120) NOT NULL,
      question_code VARCHAR(64) NOT NULL,
      answer_text TEXT NOT NULL,
      likes_count INT UNSIGNED NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      KEY idx_community_qcode (question_code, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS question_issue_reports (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      question_code VARCHAR(64) NOT NULL,
      reason VARCHAR(160) NOT NULL,
      status ENUM('open', 'resolved') NOT NULL DEFAULT 'open',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function listPracticeAttempts(userId, skill) {
  const pool = getPracticePool();
  const params = [userId];
  let sql = `SELECT id, track, skill, task_slug AS taskSlug, question_code AS questionCode,
                    response_text AS responseText, audio_media_id AS audioMediaId,
                    duration_seconds AS durationSeconds, score_obtained AS scoreObtained,
                    score_max AS scoreMax, is_ai_scored AS isAiScored, created_at AS createdAt
             FROM practice_attempts WHERE user_id = ?`;
  if (skill) {
    sql += ' AND skill = ?';
    params.push(skill);
  }
  sql += ' ORDER BY id DESC LIMIT 100';
  const [rows] = await pool.query(sql, params);
  return rows.map((row) => ({ ...row, isAiScored: Boolean(row.isAiScored) }));
}

export async function savePracticeAttempt(userId, payload) {
  const pool = getPracticePool();
  const [res] = await pool.query(
    `INSERT INTO practice_attempts (user_id, track, skill, task_slug, question_code, response_text, audio_media_id, duration_seconds, score_obtained, score_max, is_ai_scored)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      payload.track || 'academic',
      payload.skill,
      payload.taskSlug,
      payload.questionCode,
      payload.responseText || null,
      payload.audioMediaId || null,
      Number(payload.durationSeconds) || 0,
      Number(payload.scoreObtained) || 0,
      Number(payload.scoreMax) || 90,
      payload.isAiScored === false ? 0 : 1,
    ]
  );
  return { attemptId: res.insertId };
}

export async function listCommunityAnswers(questionCode) {
  const pool = getPracticePool();
  const [rows] = await pool.query(
    `SELECT id, user_id AS userId, user_name AS userName, question_code AS questionCode,
            answer_text AS answerText, likes_count AS likesCount, created_at AS createdAt
     FROM community_answers WHERE question_code = ? ORDER BY id DESC LIMIT 50`,
    [questionCode]
  );
  return rows;
}

export async function createCommunityAnswer(user, questionCode, answerText) {
  const pool = getPracticePool();
  const [res] = await pool.query(
    `INSERT INTO community_answers (user_id, user_name, question_code, answer_text)
     VALUES (?, ?, ?, ?)`,
    [user.id, user.name || 'NinetyPTE Student', questionCode, answerText]
  );
  return { id: res.insertId };
}
