import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dbPassword = process.env.DB_PASSWORD ?? process.env.MYSQL_PASSWORD ?? '';
const dbName = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'ninetypte';

/**
 * Validated runtime, Auth & MySQL configuration loaded from backend/.env or host environment variables.
 */
export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  jwtSecret:
    process.env.JWT_SECRET ||
    `ninetypte:${dbName}:${dbPassword || 'fallback'}:session-key`,
  googleClientId: (process.env.GOOGLE_CLIENT_ID || '').trim(),
  db: {
    host: process.env.DB_HOST || process.env.MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || process.env.MYSQL_PORT) || 3306,
    user: process.env.DB_USER || process.env.MYSQL_USER || 'root',
    password: dbPassword,
    database: dbName,
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  },
};
