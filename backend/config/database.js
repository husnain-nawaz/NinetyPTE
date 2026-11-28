import mysql from 'mysql2/promise';
import { DB_DEFINITIONS, env } from './env.js';

const pools = new Map();

function resolveDbConfig(dbKey = 'auth') {
  const config = env.databases[dbKey];
  if (!config) {
    throw new Error(`Unknown database key "${dbKey}"`);
  }
  return config;
}

/**
 * Creates the target MySQL schema when missing on self-hosted/local MySQL instances.
 */
export async function ensureDatabaseExists(dbKey = 'auth') {
  const cfg = resolveDbConfig(dbKey);
  const bootstrapConn = await mysql.createConnection({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    multipleStatements: false,
  });

  try {
    const safeDbName = cfg.database.replace(/[^a-zA-Z0-9_]/g, '');
    await bootstrapConn.query(
      `CREATE DATABASE IF NOT EXISTS \`${safeDbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } finally {
    await bootstrapConn.end();
  }
}

/**
 * Returns the pooled MySQL/MariaDB client for a specific feature database key.
 */
export function getPool(dbKey = 'auth') {
  const cfg = resolveDbConfig(dbKey);
  if (!pools.has(dbKey)) {
    pools.set(
      dbKey,
      mysql.createPool({
        host: cfg.host,
        port: cfg.port,
        user: cfg.user,
        password: cfg.password,
        database: cfg.database,
        waitForConnections: true,
        connectionLimit: cfg.connectionLimit,
        queueLimit: 0,
        timezone: 'Z',
      })
    );
  }
  return pools.get(dbKey);
}

/**
 * Verifies live connectivity for one configured database key.
 */
export async function verifyDatabaseConnection(dbKey = 'auth') {
  const queryMetadata = async () => {
    const activePool = getPool(dbKey);
    const [rows] = await activePool.query(
      'SELECT DATABASE() AS databaseName, VERSION() AS mysqlVersion, NOW() AS serverTime'
    );
    return rows[0];
  };

  try {
    return await queryMetadata();
  } catch (err) {
    if (err.code === 'ER_BAD_DB_ERROR') {
      await ensureDatabaseExists(dbKey);
      await closeDatabasePool(dbKey);
      return queryMetadata();
    }
    throw err;
  }
}

/**
 * Checks connectivity for all 15 feature databases sequentially to stay friendly to shared connection caps.
 */
export async function verifyAllDatabaseConnections() {
  const results = [];
  for (const def of DB_DEFINITIONS) {
    const cfg = env.databases[def.key];
    try {
      const info = await verifyDatabaseConnection(def.key);
      results.push({
        key: def.key,
        label: def.label,
        database: info.databaseName,
        connected: true,
        version: info.mysqlVersion,
      });
    } catch (err) {
      results.push({
        key: def.key,
        label: def.label,
        database: cfg.database,
        connected: false,
        error: err.message,
      });
    }
  }
  return {
    total: results.length,
    connectedCount: results.filter((r) => r.connected).length,
    databases: results,
  };
}

/**
 * Closes one pool cleanly or all active pools during graceful shutdown.
 */
export async function closeDatabasePool(dbKey = null) {
  if (dbKey) {
    const existing = pools.get(dbKey);
    if (existing) {
      await existing.end();
      pools.delete(dbKey);
    }
    return;
  }

  for (const [key, pool] of pools.entries()) {
    await pool.end();
    pools.delete(key);
  }
}
