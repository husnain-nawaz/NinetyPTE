import { initializeDatabase } from '../../database/initDatabase.js';
import { sendSuccess } from '../../shared/apiResponse.js';
import { listUiControls } from '../ui-control/uiControl.model.js';

/**
 * GET /api/health — confirms live API status and reports MySQL readiness without crashing the server.
 */
export async function getSystemHealth(_req, res) {
  try {
    const dbInfo = await initializeDatabase();
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
  } catch (err) {
    return sendSuccess(
      res,
      {
        status: 'degraded',
        service: 'ninetypte-backend',
        database: {
          connected: false,
          error: err.message,
        },
        uiControlsCount: 0,
      },
      'API server is running, waiting for MySQL connection'
    );
  }
}
