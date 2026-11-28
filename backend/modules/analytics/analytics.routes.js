import { Router } from 'express';
import { asyncHandler, sendSuccess } from '../../shared/apiResponse.js';
import { requireAuth } from '../auth/auth.middleware.js';
import { ensureStatsTables, getUserDashboardStats, recordDailyProgress } from './analytics.model.js';

const analyticsRouter = Router();

analyticsRouter.get(
  '/dashboard',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureStatsTables();
    const summary = await getUserDashboardStats(req.user.id, req.query.track);
    return sendSuccess(res, summary, 'Loaded dashboard progress analytics');
  })
);

analyticsRouter.post(
  '/record',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureStatsTables();
    const saved = await recordDailyProgress(req.user.id, req.body || {});
    return sendSuccess(res, saved, 'Recorded analytics progress', 201);
  })
);

export default analyticsRouter;
