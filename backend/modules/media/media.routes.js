import { Router } from 'express';
import { asyncHandler, sendError, sendSuccess } from '../../shared/apiResponse.js';
import { requireAuth } from '../auth/auth.middleware.js';
import { ensureMediaTables, listUserMediaAssets, registerMediaAsset } from './media.model.js';

const mediaRouter = Router();

mediaRouter.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureMediaTables();
    const assets = await listUserMediaAssets(req.user.id);
    return sendSuccess(res, assets, 'Loaded user media asset metadata');
  })
);

mediaRouter.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.body?.fileUrl) {
      return sendError(res, 'fileUrl is required.', 400);
    }
    await ensureMediaTables();
    const saved = await registerMediaAsset(req.user.id, req.body);
    return sendSuccess(res, saved, 'Registered media asset metadata', 201);
  })
);

export default mediaRouter;
