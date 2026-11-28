import { env } from '../config/env.js';

/**
 * Handles unmatched API routes cleanly.
 */
export function notFoundHandler(req, res) {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

/**
 * Centralized Express error middleware returning uniform JSON error payloads.
 */
export function errorHandler(err, _req, res, _next) {
  const statusCode = Number(err.statusCode) || 500;
  const payload = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  if (env.nodeEnv === 'development' && err.stack) {
    payload.stack = err.stack;
  }

  return res.status(statusCode).json(payload);
}
