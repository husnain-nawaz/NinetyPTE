import { asyncHandler, sendError, sendSuccess } from '../../shared/apiResponse.js';
import { writeAdminAuditLog } from '../logs/logs.model.js';
import {
  findUiControlByKey,
  listUiControls,
  upsertUiControl,
} from './uiControl.model.js';

/**
 * GET /api/ui-control — returns all UI control records from MySQL.
 */
export const getAllUiControls = asyncHandler(async (_req, res) => {
  const controls = await listUiControls();
  return sendSuccess(res, controls, 'Loaded UI controls from database');
});

/**
 * GET /api/ui-control/:controlKey — returns one UI control entry by key.
 */
export const getUiControlByKey = asyncHandler(async (req, res) => {
  const control = await findUiControlByKey(req.params.controlKey);
  if (!control) {
    return sendError(res, `UI control "${req.params.controlKey}" not found`, 404);
  }
  return sendSuccess(res, control, 'Loaded UI control record');
});

/**
 * PUT /api/ui-control/:controlKey — creates or updates a real-time UI control row.
 */
export const saveUiControlByKey = asyncHandler(async (req, res) => {
  const { featureGroup, label, isEnabled, config } = req.body || {};
  const updated = await upsertUiControl({
    controlKey: req.params.controlKey,
    featureGroup: featureGroup || 'general',
    label: label || req.params.controlKey,
    isEnabled: isEnabled !== undefined ? Boolean(isEnabled) : true,
    config: config && typeof config === 'object' ? config : {},
  });
  writeAdminAuditLog({
    adminUserId: req.user?.id || null,
    action: 'upsert_ui_control',
    targetType: 'ui_controls',
    targetKey: req.params.controlKey,
    details: { featureGroup: featureGroup || 'general', isEnabled: updated?.isEnabled },
    ipAddress: req.ip,
  }).catch(() => {});
  return sendSuccess(res, updated, 'Saved UI control record');
});
