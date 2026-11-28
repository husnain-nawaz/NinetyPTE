import { Router } from 'express';
import { asyncHandler, sendError, sendSuccess } from '../../shared/apiResponse.js';
import { requireAuth } from '../auth/auth.middleware.js';
import {
  ensurePromoTables,
  getOrCreateReferralProfile,
  submitInstituteLead,
  validatePromoCoupon,
} from './promo.model.js';

const promoRouter = Router();

promoRouter.get(
  '/referrals/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    await ensurePromoTables();
    const profile = await getOrCreateReferralProfile(req.user.id);
    return sendSuccess(res, profile, 'Loaded referral profile');
  })
);

promoRouter.post(
  '/coupons/validate',
  asyncHandler(async (req, res) => {
    const code = String(req.body?.code || '').trim();
    if (!code) {
      return sendError(res, 'Promo code is required.', 400);
    }
    await ensurePromoTables();
    const coupon = await validatePromoCoupon(code);
    if (!coupon) {
      return sendError(res, 'Invalid or expired promo code.', 404);
    }
    return sendSuccess(res, coupon, 'Valid promo code');
  })
);

promoRouter.post(
  '/institute-leads',
  asyncHandler(async (req, res) => {
    const { instituteName, contactName, email } = req.body || {};
    if (!instituteName || !contactName || !email) {
      return sendError(res, 'instituteName, contactName, and email are required.', 400);
    }
    await ensurePromoTables();
    const lead = await submitInstituteLead(req.body);
    return sendSuccess(res, lead, 'Submitted B2B institute inquiry', 201);
  })
);

export default promoRouter;
