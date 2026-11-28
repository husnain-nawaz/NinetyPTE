import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const defaultHost = process.env.DB_HOST || process.env.MYSQL_HOST || '127.0.0.1';
const defaultPort = Number(process.env.DB_PORT || process.env.MYSQL_PORT) || 3306;
const defaultUser = process.env.DB_USER || process.env.MYSQL_USER || 'root';
const defaultPassword = process.env.DB_PASSWORD ?? process.env.MYSQL_PASSWORD ?? '';
const legacySingleDb = process.env.DB_NAME || process.env.MYSQL_DATABASE || '';
const useDbNameAsUser = String(process.env.DB_USE_DB_NAME_AS_USER || '').toLowerCase() === 'true';
const dbConnectionLimit = Number(process.env.DB_CONNECTION_LIMIT) || 2;

/**
 * Registry of dedicated NinetyPTE feature databases (supporting 15 isolated Hostinger DBs).
 */
export const DB_DEFINITIONS = [
  { key: 'auth', envPrefix: 'DB_AUTH', defaultName: 'ninetypte', label: 'Authentication & Users' },
  { key: 'admin', envPrefix: 'DB_ADMIN', defaultName: 'ninetypte', label: 'Admin & UI Controls' },
  { key: 'mockCatalog', envPrefix: 'DB_MOCK_CATALOG', defaultName: 'ninetypte', label: 'Mock Test Blueprints' },
  { key: 'mocks', envPrefix: 'DB_MOCKS', defaultName: 'ninetypte', label: 'Mock Test Attempts & Scores' },
  { key: 'qAcad', envPrefix: 'DB_Q_ACAD', defaultName: 'ninetypte', label: 'PTE Academic Question Bank' },
  { key: 'qCore', envPrefix: 'DB_Q_CORE', defaultName: 'ninetypte', label: 'PTE Core Question Bank' },
  { key: 'practice', envPrefix: 'DB_PRACTICE', defaultName: 'ninetypte', label: 'Practice Arena & Community' },
  { key: 'aiEval', envPrefix: 'DB_AI_EVAL', defaultName: 'ninetypte', label: 'AI Scoring Evaluations' },
  { key: 'stats', envPrefix: 'DB_STATS', defaultName: 'ninetypte', label: 'Analytics & Progress Stats' },
  { key: 'cms', envPrefix: 'DB_CMS', defaultName: 'ninetypte', label: 'CMS, Study Tools & Blogs' },
  { key: 'media', envPrefix: 'DB_MEDIA', defaultName: 'ninetypte', label: 'Media Assets Metadata' },
  { key: 'billing', envPrefix: 'DB_BILLING', defaultName: 'ninetypte', label: 'Billing, Plans & Vouchers' },
  { key: 'promo', envPrefix: 'DB_PROMO', defaultName: 'ninetypte', label: 'Promos, Referrals & Leads' },
  { key: 'notify', envPrefix: 'DB_NOTIFY', defaultName: 'ninetypte', label: 'Notifications & Support' },
  { key: 'logs', envPrefix: 'DB_LOGS', defaultName: 'ninetypte', label: 'Audit & System Logs' },
];

const databases = {};
for (const def of DB_DEFINITIONS) {
  const database =
    (process.env[`${def.envPrefix}_NAME`] || '').trim() ||
    legacySingleDb ||
    def.defaultName;
  const user =
    (process.env[`${def.envPrefix}_USER`] || '').trim() ||
    (useDbNameAsUser ? database : defaultUser);
  const password = process.env[`${def.envPrefix}_PASSWORD`] ?? defaultPassword;
  const host = (process.env[`${def.envPrefix}_HOST`] || '').trim() || defaultHost;
  const port = Number(process.env[`${def.envPrefix}_PORT`] || defaultPort);

  databases[def.key] = {
    key: def.key,
    label: def.label,
    host,
    port,
    user,
    password,
    database,
    connectionLimit: dbConnectionLimit,
  };
}

/**
 * Validated runtime, Auth & multi-database configuration loaded from backend/.env or host env vars.
 */
export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  jwtSecret:
    process.env.JWT_SECRET ||
    `ninetypte:${databases.auth.database}:${defaultPassword || 'fallback'}:session-key`,
  googleClientId: (process.env.GOOGLE_CLIENT_ID || '').trim(),
  dbConnectionLimit,
  db: databases.auth,
  databases,
};
