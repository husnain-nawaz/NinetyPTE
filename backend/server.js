import app from './app.js';
import { closeDatabasePool } from './config/database.js';
import { env } from './config/env.js';
import { initializeDatabase } from './database/initDatabase.js';

let serverInstance = null;

async function startServer() {
  // Always bind HTTP server first so web hosts (Hostinger/Passenger/LiteSpeed) do not return 503 if MySQL credentials are still being configured.
  serverInstance = app.listen(env.port, () => {
    console.log(`[NinetyPTE API] Server listening at http://localhost:${env.port}`);
  });

  try {
    const dbInfo = await initializeDatabase();
    console.log(
      `[NinetyPTE DB] Connected to MySQL (${dbInfo.databaseName}, v${dbInfo.mysqlVersion}) at ${env.db.host}:${env.db.port}`
    );
  } catch (err) {
    console.error(
      `[NinetyPTE DB] MySQL not connected yet (${err.message}). Server stays online; verify DB_HOST/DB_USER/DB_PASSWORD/DB_NAME env vars.`
    );
  }
}

async function shutdown(signal) {
  console.log(`[NinetyPTE API] Received ${signal}, shutting down cleanly...`);
  if (serverInstance) {
    await new Promise((resolve) => serverInstance.close(resolve));
  }
  await closeDatabasePool();
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

startServer();
