import { getPool } from '../../config/database.js';
import { parseJsonColumn, serializeJsonParam } from '../../shared/jsonUtils.js';

const getCatalogPool = () => getPool('mockCatalog');
const getMocksPool = () => getPool('mocks');

/**
 * Ensures Mock Catalog tables (`u340392193_NinetyPteMock`) and Student Mock Attempt tables (`u340392193_npte_mocks`).
 */
export async function ensureMockTestTables() {
  const catalogPool = getCatalogPool();
  await catalogPool.query(`
    CREATE TABLE IF NOT EXISTS mock_blueprints (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      blueprint_code VARCHAR(80) NOT NULL UNIQUE,
      track ENUM('academic', 'core') NOT NULL DEFAULT 'academic',
      mode ENUM('full', 'sectional', 'timed_sectional', 'custom') NOT NULL DEFAULT 'full',
      skill_section ENUM('all', 'speaking', 'writing', 'reading', 'listening') NOT NULL DEFAULT 'all',
      title VARCHAR(180) NOT NULL,
      duration_minutes INT UNSIGNED NOT NULL DEFAULT 120,
      question_count INT UNSIGNED NOT NULL DEFAULT 0,
      sections_json LONGTEXT NULL,
      is_free TINYINT(1) NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const mocksPool = getMocksPool();
  await mocksPool.query(`
    CREATE TABLE IF NOT EXISTS mock_sessions (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      blueprint_code VARCHAR(80) NOT NULL,
      track ENUM('academic', 'core') NOT NULL DEFAULT 'academic',
      mode ENUM('full', 'sectional', 'timed_sectional', 'custom') NOT NULL DEFAULT 'full',
      skill_section ENUM('all', 'speaking', 'writing', 'reading', 'listening') NOT NULL DEFAULT 'all',
      title VARCHAR(180) NOT NULL,
      status ENUM('in_progress', 'completed', 'abandoned') NOT NULL DEFAULT 'in_progress',
      elapsed_seconds INT UNSIGNED NOT NULL DEFAULT 0,
      answers_json LONGTEXT NULL,
      started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME NULL,
      KEY idx_mock_sessions_user (user_id, completed_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await mocksPool.query(`
    CREATE TABLE IF NOT EXISTS mock_score_reports (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      session_id INT UNSIGNED NOT NULL,
      user_id INT UNSIGNED NOT NULL,
      overall_score TINYINT UNSIGNED NOT NULL DEFAULT 0,
      speaking_score TINYINT UNSIGNED NULL,
      writing_score TINYINT UNSIGNED NULL,
      reading_score TINYINT UNSIGNED NULL,
      listening_score TINYINT UNSIGNED NULL,
      enabling_skills_json LONGTEXT NULL,
      ai_feedback_json LONGTEXT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_mock_score_session FOREIGN KEY (session_id) REFERENCES mock_sessions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await mocksPool.query(`
    CREATE TABLE IF NOT EXISTS mock_issue_reports (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      session_id INT UNSIGNED NULL,
      blueprint_code VARCHAR(80) NOT NULL,
      issue_category VARCHAR(80) NOT NULL,
      description TEXT NOT NULL,
      status ENUM('open', 'resolved') NOT NULL DEFAULT 'open',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function listMockBlueprints(track) {
  const pool = getCatalogPool();
  const params = [];
  let where = 'WHERE is_active = 1';
  if (track === 'academic' || track === 'core') {
    where += ' AND track = ?';
    params.push(track);
  }
  const [rows] = await pool.query(
    `SELECT id, blueprint_code AS blueprintCode, track, mode, skill_section AS skillSection,
            title, duration_minutes AS durationMinutes, question_count AS questionCount,
            sections_json AS sections, is_free AS isFree, created_at AS createdAt
     FROM mock_blueprints ${where} ORDER BY id ASC`,
    params
  );
  return rows.map((row) => ({
    ...row,
    isFree: Boolean(row.isFree),
    sections: parseJsonColumn(row.sections, []),
  }));
}

export async function saveMockBlueprint(bp) {
  const pool = getCatalogPool();
  await pool.query(
    `INSERT INTO mock_blueprints (blueprint_code, track, mode, skill_section, title, duration_minutes, question_count, sections_json, is_free)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       title = VALUES(title),
       duration_minutes = VALUES(duration_minutes),
       question_count = VALUES(question_count),
       sections_json = VALUES(sections_json),
       is_free = VALUES(is_free)`,
    [
      bp.blueprintCode,
      bp.track || 'academic',
      bp.mode || 'full',
      bp.skillSection || 'all',
      bp.title,
      Number(bp.durationMinutes) || 120,
      Number(bp.questionCount) || 0,
      serializeJsonParam(bp.sections, []),
      bp.isFree ? 1 : 0,
    ]
  );
  return { blueprintCode: bp.blueprintCode };
}

export async function listUserMockAttempts(userId, track) {
  const pool = getMocksPool();
  const params = [userId];
  let trackSql = '';
  if (track === 'academic' || track === 'core') {
    trackSql = ' AND s.track = ?';
    params.push(track);
  }
  const [rows] = await pool.query(
    `SELECT s.id, s.blueprint_code AS blueprintCode, s.track, s.mode, s.skill_section AS skillSection,
            s.title, s.status, s.elapsed_seconds AS elapsedSeconds, s.answers_json AS answers,
            s.started_at AS startedAt, s.completed_at AS completedAt,
            r.overall_score AS overallScore, r.speaking_score AS speakingScore,
            r.writing_score AS writingScore, r.reading_score AS readingScore,
            r.listening_score AS listeningScore, r.enabling_skills_json AS enablingSkills,
            r.ai_feedback_json AS aiFeedback
     FROM mock_sessions s
     LEFT JOIN mock_score_reports r ON r.session_id = s.id
     WHERE s.user_id = ?${trackSql}
     ORDER BY s.id DESC
     LIMIT 100`,
    params
  );
  return rows.map((row) => ({
    ...row,
    answers: parseJsonColumn(row.answers, {}),
    enablingSkills: parseJsonColumn(row.enablingSkills, null),
    aiFeedback: parseJsonColumn(row.aiFeedback, null),
  }));
}

export async function createUserMockAttempt(userId, payload) {
  const pool = getMocksPool();
  const [inserted] = await pool.query(
    `INSERT INTO mock_sessions (user_id, blueprint_code, track, mode, skill_section, title, status, elapsed_seconds, answers_json, completed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      payload.blueprintCode || `custom-${Date.now()}`,
      payload.track || 'academic',
      payload.mode || 'full',
      payload.skillSection || 'all',
      payload.title || 'Mock Test',
      payload.status || 'completed',
      Number(payload.elapsedSeconds) || 0,
      serializeJsonParam(payload.answers, {}),
      payload.status === 'in_progress' ? null : new Date(),
    ]
  );

  if (payload.scores) {
    await pool.query(
      `INSERT INTO mock_score_reports (session_id, user_id, overall_score, speaking_score, writing_score, reading_score, listening_score, enabling_skills_json, ai_feedback_json)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        inserted.insertId,
        userId,
        Number(payload.scores.overall) || 0,
        payload.scores.speaking ?? null,
        payload.scores.writing ?? null,
        payload.scores.reading ?? null,
        payload.scores.listening ?? null,
        serializeJsonParam(payload.enablingSkills, null),
        serializeJsonParam(payload.aiFeedback, null),
      ]
    );
  }

  return { sessionId: inserted.insertId };
}

export async function deleteUserMockAttempt(userId, sessionId) {
  const pool = getMocksPool();
  const [res] = await pool.query('DELETE FROM mock_sessions WHERE id = ? AND user_id = ?', [sessionId, userId]);
  return res.affectedRows > 0;
}

export async function submitMockIssueReport(userId, payload) {
  const pool = getMocksPool();
  const [res] = await pool.query(
    `INSERT INTO mock_issue_reports (user_id, session_id, blueprint_code, issue_category, description)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, payload.sessionId || null, payload.blueprintCode || 'general', payload.issueCategory || 'other', payload.description]
  );
  return { reportId: res.insertId };
}
