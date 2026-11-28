import mysql from 'mysql2/promise';
import { env } from './env.js';

let pool = null;

/**
 * Ensures the target MySQL schema exists before creating the connection pool.
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
 * Verifies live MySQL connectivity and returns server metadata.
 */
export async function verifyDatabaseConnection() {
  await ensureDatabaseExists();
  const activePool = getPool();
  const [rows] = await activePool.query(
    'SELECT DATABASE() AS databaseName, VERSION() AS mysqlVersion, NOW() AS serverTime'
  );
  return rows[0];
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
