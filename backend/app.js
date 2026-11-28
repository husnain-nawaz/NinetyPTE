import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import apiRouter from './modules/index.js';
import { errorHandler, notFoundHandler } from './shared/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FRONTEND_CANDIDATE_DIRS = [
  path.resolve(__dirname, 'public'),
  path.resolve(__dirname, '../frontend/dist'),
  path.resolve(process.cwd(), 'frontend/dist'),
  path.resolve(process.cwd(), 'backend/public'),
  path.resolve(process.cwd(), 'dist'),
];

function resolveFrontendDistDir() {
  return (
    FRONTEND_CANDIDATE_DIRS.find((dir) => fs.existsSync(path.join(dir, 'index.html'))) || null
  );
}

const allowedOrigins = (env.corsOrigin || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin) ||
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin) ||
        /^https:\/\/[a-z0-9-]+\.hostingersite\.com$/i.test(origin)
      ) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '5mb' }));

// Backend REST API routes
app.use('/api', apiRouter);
app.use('/api', notFoundHandler);

// Serve built React landing page & portal SPA from backend/public or frontend/dist
let cachedStaticDir = null;
let cachedStaticMiddleware = null;

function getStaticMiddleware() {
  const dir = resolveFrontendDistDir();
  if (!dir) return null;
  if (dir !== cachedStaticDir || !cachedStaticMiddleware) {
    cachedStaticDir = dir;
    cachedStaticMiddleware = express.static(dir);
  }
  return { dir, middleware: cachedStaticMiddleware };
}

app.use((req, res, next) => {
  const resolved = getStaticMiddleware();
  if (!resolved) return next();
  return resolved.middleware(req, res, next);
});

app.get('*', (req, res, next) => {
  const resolved = getStaticMiddleware();
  if (resolved) {
    return res.sendFile(path.join(resolved.dir, 'index.html'));
  }
  if (req.path === '/') {
    return res.status(503).json({
      success: false,
      message: 'Frontend build (dist/index.html) not found. Run "npm run build" to generate the UI bundle.',
    });
  }
  return next();
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
