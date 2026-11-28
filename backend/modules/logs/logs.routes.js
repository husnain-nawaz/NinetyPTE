import { Router } from 'express';
import { asyncHandler, sendSuccess } from '../../shared/apiResponse.js';
import { requireSuperAdmin } from '../auth/auth.middleware.js';
import { ensureLogTables, listRecentLogs } from './logs.model.js';

const logsRouter = Router();

logsRouter.get(
  '/:logType',
  requireSuperAdmin,
  asyncHandler(async (req, res) => {
    await ensureLogTables();
    const rows = await listRecentLogs(req.params.logType);
    return sendSuccess(res, rows, `Loaded recent ${req.params.logType} logs`);
  })
);

export default logsRouter;
