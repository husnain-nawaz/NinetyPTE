import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import apiRouter from './modules/index.js';
import { errorHandler, notFoundHandler } from './shared/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  })
);
app.use(express.json({ limit: '5mb' }));

app.get('/', (_req, res) => {
  res.json({
    success: true,
    service: 'NinetyPTE Backend API',
    docsHint: '/api/health',
  });
});

app.use('/api', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
