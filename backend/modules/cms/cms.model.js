import { getPool } from '../../config/database.js';
import { parseJsonColumn, serializeJsonParam } from '../../shared/jsonUtils.js';

const getCmsPool = () => getPool('cms');

/**
 * Ensures CMS tables (`blog_posts`, `study_tools_items`, `strategy_videos`) exist in `u340392193_npte_cms`.
 */
export async function ensureCmsTables() {
  const pool = getCmsPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(160) NOT NULL UNIQUE,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(80) NOT NULL DEFAULT 'PTE Strategy',
      excerpt TEXT NULL,
      content_html LONGTEXT NULL,
      read_minutes TINYINT UNSIGNED NOT NULL DEFAULT 5,
      is_published TINYINT(1) NOT NULL DEFAULT 1,
      published_at DATETIME NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS study_tools_items (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      track ENUM('academic', 'core', 'both') NOT NULL DEFAULT 'both',
      tool_type ENUM('templates', 'collocations', 'materials', 'vocab', 'weightage', 'pattern') NOT NULL,
      title VARCHAR(200) NOT NULL,
      category VARCHAR(80) NULL,
      payload_json LONGTEXT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS strategy_videos (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      track ENUM('academic', 'core', 'both') NOT NULL DEFAULT 'both',
      category VARCHAR(80) NOT NULL DEFAULT 'Guide',
      title VARCHAR(220) NOT NULL,
      duration_label VARCHAR(24) NOT NULL DEFAULT '05:00',
      video_url VARCHAR(512) NOT NULL,
      thumbnail_url VARCHAR(512) NULL,
      sort_order INT NOT NULL DEFAULT 0,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function listBlogPosts() {
  const pool = getCmsPool();
  const [rows] = await pool.query(
    `SELECT id, slug, title, category, excerpt, content_html AS contentHtml,
            read_minutes AS readMinutes, published_at AS publishedAt, updated_at AS updatedAt
     FROM blog_posts WHERE is_published = 1 ORDER BY id DESC LIMIT 100`
  );
  return rows;
}

export async function listStudyTools({ track, toolType }) {
  const pool = getCmsPool();
  const filters = ['is_active = 1'];
  const params = [];
  if (track === 'academic' || track === 'core') {
    filters.push("(track = ? OR track = 'both')");
    params.push(track);
  }
  if (toolType) {
    filters.push('tool_type = ?');
    params.push(toolType);
  }
  const [rows] = await pool.query(
    `SELECT id, track, tool_type AS toolType, title, category, payload_json AS payload,
            sort_order AS sortOrder, updated_at AS updatedAt
     FROM study_tools_items
     WHERE ${filters.join(' AND ')}
     ORDER BY sort_order ASC, id DESC`,
    params
  );
  return rows.map((row) => ({ ...row, payload: parseJsonColumn(row.payload, {}) }));
}

export async function listStrategyVideos(track) {
  const pool = getCmsPool();
  const params = [];
  let where = 'WHERE is_active = 1';
  if (track === 'academic' || track === 'core') {
    where += " AND (track = ? OR track = 'both')";
    params.push(track);
  }
  const [rows] = await pool.query(
    `SELECT id, track, category, title, duration_label AS durationLabel, video_url AS videoUrl,
            thumbnail_url AS thumbnailUrl, sort_order AS sortOrder
     FROM strategy_videos ${where} ORDER BY sort_order ASC, id DESC`,
    params
  );
  return rows;
}

export async function upsertStudyToolItem(item) {
  const pool = getCmsPool();
  const [res] = await pool.query(
    `INSERT INTO study_tools_items (track, tool_type, title, category, payload_json, sort_order)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      item.track || 'both',
      item.toolType || 'templates',
      item.title,
      item.category || null,
      serializeJsonParam(item.payload, {}),
      Number(item.sortOrder) || 0,
    ]
  );
  return { id: res.insertId };
}
