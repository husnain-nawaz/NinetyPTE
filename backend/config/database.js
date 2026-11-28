import mysql from 'mysql2/promise';
import { env } from './env.js';

let pool = null;

/**
 * Creates the target MySQL schema when missing on self-hosted/local MySQL instances.
 */
export async function ensureDatabaseExists() {
  const bootstrapConn = await mysql.createConnection({
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    multipleStatements: false,
  });

  try {
    const safeDbName = env.db.database.replace(/[^a-zA-Z0-9_]/g, '');
    await bootstrapConn.query(
      `CREATE DATABASE IF NOT EXISTS \`${safeDbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } finally {
    await bootstrapConn.end();
  }
}

/**
 * Returns the shared MySQL2 connection pool for the NinetyPTE database.
 */
export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: env.db.host,
      port: env.db.port,
      user: env.db.user,
      password: env.db.password,
      database: env.db.database,
      waitForConnections: true,
      connectionLimit: env.db.connectionLimit,
      queueLimit: 0,
      timezone: 'Z',
    });
  }
  return pool;
}

/**
 * Verifies live MySQL connectivity; only attempts CREATE DATABASE when schema is missing.
 */
export async function verifyDatabaseConnection() {
  const queryMetadata = async () => {
    const activePool = getPool();
    const [rows] = await activePool.query(
      'SELECT DATABASE() AS databaseName, VERSION() AS mysqlVersion, NOW() AS serverTime'
    );
    return rows[0];
  };

  try {
    return await queryMetadata();
  } catch (err) {
    if (err.code === 'ER_BAD_DB_ERROR') {
      await ensureDatabaseExists();
      await closeDatabasePool();
      return queryMetadata();
    }
    throw err;
  }
}

/**
 * Gracefully drains and closes the shared MySQL pool during shutdown.
 */
export async function closeDatabasePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
