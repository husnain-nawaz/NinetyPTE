import { verifyAllDatabaseConnections } from '../../config/database.js';
import { initializeDatabase } from '../../database/initDatabase.js';
import { sendSuccess } from '../../shared/apiResponse.js';
import { listUiControls } from '../ui-control/uiControl.model.js';

/**
 * GET /api/health — checks connectivity across all configured NinetyPTE MySQL/MariaDB databases.
 */
export async function getSystemHealth(_req, res) {
  try {
    const dbInfo = await initializeDatabase();
    const cluster = await verifyAllDatabaseConnections();
    const uiControls = await listUiControls().catch(() => []);
    const allConnected = cluster.connectedCount === cluster.total;

    return sendSuccess(
      res,
      {
        status: allConnected ? 'up' : 'partial',
        service: 'ninetypte-backend',
        database: {
          connected: cluster.connectedCount > 0,
          name: dbInfo.databaseName,
          mysqlVersion: dbInfo.mysqlVersion,
          serverTime: dbInfo.serverTime,
          connectedDatabases: cluster.connectedCount,
          totalDatabases: cluster.total,
          cluster: cluster.databases,
        },
        uiControlsCount: uiControls.length,
      },
      allConnected
        ? `All ${cluster.total} NinetyPTE databases and API server are connected`
        : `${cluster.connectedCount}/${cluster.total} NinetyPTE databases connected`
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
