import { Router } from 'express';
import { asyncHandler, sendError, sendSuccess } from '../../shared/apiResponse.js';
import { requireSuperAdmin } from '../auth/auth.middleware.js';
import {
  ensureCmsTables,
  listBlogPosts,
  listStrategyVideos,
  listStudyTools,
  upsertStudyToolItem,
} from './cms.model.js';

const cmsRouter = Router();

cmsRouter.get(
  '/blogs',
  asyncHandler(async (_req, res) => {
    await ensureCmsTables();
    const posts = await listBlogPosts();
    return sendSuccess(res, posts, 'Loaded blog posts');
  })
);

cmsRouter.get(
  '/study-tools',
  asyncHandler(async (req, res) => {
    await ensureCmsTables();
    const items = await listStudyTools({ track: req.query.track, toolType: req.query.type });
    return sendSuccess(res, items, 'Loaded study tools');
  })
);

cmsRouter.get(
  '/videos',
  asyncHandler(async (req, res) => {
    await ensureCmsTables();
    const videos = await listStrategyVideos(req.query.track);
    return sendSuccess(res, videos, 'Loaded strategy videos');
  })
);

cmsRouter.post(
  '/study-tools',
  requireSuperAdmin,
  asyncHandler(async (req, res) => {
    if (!req.body?.title) {
      return sendError(res, 'title is required.', 400);
    }
    await ensureCmsTables();
    const saved = await upsertStudyToolItem(req.body);
    return sendSuccess(res, saved, 'Saved study tool item', 201);
  })
);

export default cmsRouter;
