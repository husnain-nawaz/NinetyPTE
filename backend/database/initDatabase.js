import { verifyDatabaseConnection } from '../config/database.js';
import { ensureUiControlsTable } from '../modules/ui-control/uiControl.model.js';

/**
 * Runs idempotent schema and table initialization on server startup.
 */
export async function initializeDatabase() {
  const dbInfo = await verifyDatabaseConnection();
  await ensureUiControlsTable();
  return dbInfo;
}
