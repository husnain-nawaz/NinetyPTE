import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import apiRouter from './modules/index.js';
import { errorHandler, notFoundHandler } from './shared/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDistDir = path.resolve(__dirname, '../frontend/dist');
const frontendIndexHtml = path.join(frontendDistDir, 'index.html');

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

// Serve built React frontend in production (or when frontend/dist exists)
if (fs.existsSync(frontendIndexHtml)) {
  app.use(express.static(frontendDistDir));
  app.get('*', (_req, res) => {
    res.sendFile(frontendIndexHtml);
  });
} else {
  app.get('/', (_req, res) => {
    res.json({
      success: true,
      service: 'NinetyPTE Backend API',
      healthEndpoint: '/api/health',
    });
  });
  app.use(notFoundHandler);
}

app.use(errorHandler);

export default app;
