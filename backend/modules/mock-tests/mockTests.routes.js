import { Router } from 'express';
import { asyncHandler, sendError, sendSuccess } from '../../shared/apiResponse.js';
import { requireAuth, requireSuperAdmin } from '../auth/auth.middleware.js';
import {
  createUserMockAttempt,
  deleteUserMockAttempt,
  ensureMockTestTables,
  listMockBlueprints,
  listUserMockAttempts,
  saveMockBlueprint,
  submitMockIssueReport,
} from './mockTests.model.js';

const mockTestsRouter = Router();

mockTestsRouter.get(
  '/blueprints',
  asyncHandler(async (req, res) => {
    await ensureMockTestTables();
    const blueprints = await listMockBlueprints(req.query.track);
    return sendSuccess(res, blueprints, 'Loaded mock test blueprints');
  })
);

mockTestsRouter.post(
  '/blueprints',
  requireSuperAdmin,
  asyncHandler(async (req, res) => {
    const { blueprintCode, title } = req.body || {};
    if (!blueprintCode || !title) {
      return sendError(res, 'blueprintCode and title are required.', 400);
    }
    await ensureMockTestTables();
    const saved = await saveMockBlueprint(req.body);
    return sendSuccess(res, saved, 'Saved mock blueprint', 201);
  })
);

mockTestsRouter.get(
  '/attempts',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureMockTestTables();
    const attempts = await listUserMockAttempts(req.user.id, req.query.track);
    return sendSuccess(res, attempts, 'Loaded user mock test attempts');
  })
);

mockTestsRouter.post(
  '/attempts',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureMockTestTables();
    const created = await createUserMockAttempt(req.user.id, req.body || {});
    return sendSuccess(res, created, 'Saved mock test attempt and score report', 201);
  })
);

mockTestsRouter.delete(
  '/attempts/:id',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureMockTestTables();
    const deleted = await deleteUserMockAttempt(req.user.id, req.params.id);
    if (!deleted) {
      return sendError(res, 'Mock test attempt not found.', 404);
    }
    return sendSuccess(res, { deleted: true }, 'Deleted mock test attempt');
  })
);

mockTestsRouter.post(
  '/reports',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.body?.description) {
      return sendError(res, 'Issue description is required.', 400);
    }
    await ensureMockTestTables();
    const report = await submitMockIssueReport(req.user.id, req.body);
    return sendSuccess(res, report, 'Submitted mock test issue report', 201);
  })
);

export default mockTestsRouter;
