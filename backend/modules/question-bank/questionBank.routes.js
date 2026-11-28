import { Router } from 'express';
import { asyncHandler, sendError, sendSuccess } from '../../shared/apiResponse.js';
import { requireSuperAdmin } from '../auth/auth.middleware.js';
import { ensureQuestionBankTables, listQuestionsByTrack, upsertQuestionInTrack } from './questionBank.model.js';

const questionBankRouter = Router();

questionBankRouter.get(
  '/:track',
  asyncHandler(async (req, res) => {
    const { track } = req.params;
    if (track !== 'academic' && track !== 'core') {
      return sendError(res, 'Track must be "academic" or "core".', 400);
    }
    await ensureQuestionBankTables();
    const items = await listQuestionsByTrack({
      track,
      skill: req.query.skill,
      taskSlug: req.query.taskType,
      predictionOnly: req.query.predictionOnly === 'true',
      limit: req.query.limit,
    });
    return sendSuccess(res, items, `Loaded ${track} question bank items`);
  })
);

questionBankRouter.post(
  '/:track',
  requireSuperAdmin,
  asyncHandler(async (req, res) => {
    const { track } = req.params;
    if (track !== 'academic' && track !== 'core') {
      return sendError(res, 'Track must be "academic" or "core".', 400);
    }
    const { questionCode, skill, taskSlug, title } = req.body || {};
    if (!questionCode || !skill || !taskSlug || !title) {
      return sendError(res, 'questionCode, skill, taskSlug, and title are required.', 400);
    }
    await ensureQuestionBankTables();
    const saved = await upsertQuestionInTrack(track, req.body);
    return sendSuccess(res, saved, 'Saved question to dedicated track database', 201);
  })
);

export default questionBankRouter;
