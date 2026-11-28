import { Router } from 'express';
import { asyncHandler, sendError, sendSuccess } from '../../shared/apiResponse.js';
import { requireAuth } from '../auth/auth.middleware.js';
import {
  createCommunityAnswer,
  ensurePracticeTables,
  listCommunityAnswers,
  listPracticeAttempts,
  savePracticeAttempt,
} from './practice.model.js';

const practiceRouter = Router();

practiceRouter.get(
  '/attempts',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensurePracticeTables();
    const attempts = await listPracticeAttempts(req.user.id, req.query.skill);
    return sendSuccess(res, attempts, 'Loaded practice attempts');
  })
);

practiceRouter.post(
  '/attempts',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { skill, taskSlug, questionCode } = req.body || {};
    if (!skill || !taskSlug || !questionCode) {
      return sendError(res, 'skill, taskSlug, and questionCode are required.', 400);
    }
    await ensurePracticeTables();
    const saved = await savePracticeAttempt(req.user.id, req.body);
    return sendSuccess(res, saved, 'Saved practice attempt', 201);
  })
);

practiceRouter.get(
  '/community/:questionCode',
  asyncHandler(async (req, res) => {
    await ensurePracticeTables();
    const posts = await listCommunityAnswers(req.params.questionCode);
    return sendSuccess(res, posts, 'Loaded community answers');
  })
);

practiceRouter.post(
  '/community/:questionCode',
  requireAuth,
  asyncHandler(async (req, res) => {
    const answerText = String(req.body?.answerText || '').trim();
    if (!answerText) {
      return sendError(res, 'answerText is required.', 400);
    }
    await ensurePracticeTables();
    const created = await createCommunityAnswer(req.user, req.params.questionCode, answerText);
    return sendSuccess(res, created, 'Posted community answer', 201);
  })
);

export default practiceRouter;
