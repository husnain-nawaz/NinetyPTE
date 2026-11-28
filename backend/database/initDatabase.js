import { verifyDatabaseConnection } from '../config/database.js';
import { ensureAiEvaluationTables } from '../modules/ai-evaluation/aiEvaluation.model.js';
import { ensureStatsTables } from '../modules/analytics/analytics.model.js';
import { ensureUsersTable } from '../modules/auth/auth.model.js';
import { ensureBillingTables } from '../modules/billing/billing.model.js';
import { ensureCmsTables } from '../modules/cms/cms.model.js';
import { ensureLogTables } from '../modules/logs/logs.model.js';
import { ensureMediaTables } from '../modules/media/media.model.js';
import { ensureMockTestTables } from '../modules/mock-tests/mockTests.model.js';
import { ensureNotificationTables } from '../modules/notifications/notifications.model.js';
import { ensurePracticeTables } from '../modules/practice/practice.model.js';
import { ensurePromoTables } from '../modules/promo/promo.model.js';
import { ensureQuestionBankTables } from '../modules/question-bank/questionBank.model.js';
import { ensureUiControlsTable } from '../modules/ui-control/uiControl.model.js';

let initPromise = null;

/**
 * Runs idempotent schema initialization across all 15 feature databases sequentially on server startup.
 */
export async function initializeDatabase({ force = false } = {}) {
  if (initPromise && !force) {
    return initPromise;
  }

  initPromise = (async () => {
    const dbInfo = await verifyDatabaseConnection('auth');

    const initializers = [
      ['auth', ensureUsersTable],
      ['admin', ensureUiControlsTable],
      ['mockCatalog+mocks', ensureMockTestTables],
      ['qAcad+qCore', ensureQuestionBankTables],
      ['practice', ensurePracticeTables],
      ['aiEval', ensureAiEvaluationTables],
      ['stats', ensureStatsTables],
      ['cms', ensureCmsTables],
      ['media', ensureMediaTables],
      ['billing', ensureBillingTables],
      ['promo', ensurePromoTables],
      ['notify', ensureNotificationTables],
      ['logs', ensureLogTables],
    ];

    for (const [label, fn] of initializers) {
      try {
        await fn();
      } catch (err) {
        console.error(`[NinetyPTE DB] Schema init failed for "${label}": ${err.message}`);
      }
    }

    return dbInfo;
  })();

  try {
    return await initPromise;
  } catch (err) {
    initPromise = null;
    throw err;
  }
}
