import { verifyDatabaseConnection } from '../../config/database.js';
import { asyncHandler, sendSuccess } from '../../shared/apiResponse.js';
import { listUiControls } from '../ui-control/uiControl.model.js';

/**
 * GET /api/health — confirms live API & MySQL database status.
 */
export const getSystemHealth = asyncHandler(async (_req, res) => {
  const dbInfo = await verifyDatabaseConnection();
  const uiControls = await listUiControls();

  return sendSuccess(
    res,
    {
      status: 'up',
      service: 'ninetypte-backend',
      database: {
        connected: true,
        name: dbInfo.databaseName,
        mysqlVersion: dbInfo.mysqlVersion,
        serverTime: dbInfo.serverTime,
      },
      uiControlsCount: uiControls.length,
    },
    'Database and API server are connected'
  );
});
