import { Router } from 'express';
import { asyncHandler, sendSuccess } from '../../shared/apiResponse.js';
import { requireAuth } from '../auth/auth.middleware.js';
import {
  createPaymentOrder,
  ensureBillingTables,
  getUserActiveSubscription,
  listSubscriptionPlans,
} from './billing.model.js';

const billingRouter = Router();

billingRouter.get(
  '/plans',
  asyncHandler(async (_req, res) => {
    await ensureBillingTables();
    const plans = await listSubscriptionPlans();
    return sendSuccess(res, plans, 'Loaded subscription plans');
  })
);

billingRouter.get(
  '/subscription',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureBillingTables();
    const subscription = await getUserActiveSubscription(req.user.id);
    return sendSuccess(res, { subscription }, 'Loaded user subscription status');
  })
);

billingRouter.post(
  '/orders',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensureBillingTables();
    const order = await createPaymentOrder(req.user.id, req.body || {});
    return sendSuccess(res, order, 'Created payment order record', 201);
  })
);

export default billingRouter;
