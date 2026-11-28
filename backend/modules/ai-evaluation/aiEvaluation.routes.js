import { Router } from 'express';
import { asyncHandler, sendError, sendSuccess } from '../../shared/apiResponse.js';
import { requireAuth } from '../auth/auth.middleware.js';
import { ensureAiEvaluationTables, listUserAiEvaluations, saveAiEvaluation } from './aiEvaluation.model.js';

const aiEvaluationRouter = Router();

aiEvaluationRouter.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureAiEvaluationTables();
    const rows = await listUserAiEvaluations(req.user.id);
    return sendSuccess(res, rows, 'Loaded AI scoring evaluations');
  })
);

aiEvaluationRouter.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.body?.skill) {
      return sendError(res, 'skill is required for AI evaluation.', 400);
    }
    await ensureAiEvaluationTables();
    const saved = await saveAiEvaluation(req.user.id, req.body);
    return sendSuccess(res, saved, 'Saved AI scoring evaluation', 201);
  })
);

export default aiEvaluationRouter;
