import { Router } from 'express';
import { asyncHandler, sendError, sendSuccess } from '../../shared/apiResponse.js';
import { requireAuth } from '../auth/auth.middleware.js';
import {
  createContactMessage,
  createSupportTicket,
  ensureNotificationTables,
  listUserNotifications,
  markNotificationRead,
} from './notifications.model.js';

const notificationsRouter = Router();

notificationsRouter.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureNotificationTables();
    const list = await listUserNotifications(req.user.id);
    return sendSuccess(res, list, 'Loaded user notifications');
  })
);

notificationsRouter.patch(
  '/:id/read',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureNotificationTables();
    const out = await markNotificationRead(req.user.id, req.params.id);
    return sendSuccess(res, out, 'Marked notification as read');
  })
);

notificationsRouter.post(
  '/contact',
  asyncHandler(async (req, res) => {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return sendError(res, 'name, email, and message are required.', 400);
    }
    await ensureNotificationTables();
    const created = await createContactMessage(req.body);
    return sendSuccess(res, created, 'Submitted contact inquiry', 201);
  })
);

notificationsRouter.post(
  '/tickets',
  requireAuth,
  asyncHandler(async (req, res) => {
    if (!req.body?.description) {
      return sendError(res, 'Ticket description is required.', 400);
    }
    await ensureNotificationTables();
    const ticket = await createSupportTicket(req.user.id, req.body);
    return sendSuccess(res, ticket, 'Created support ticket', 201);
  })
);

export default notificationsRouter;
