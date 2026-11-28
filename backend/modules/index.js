import { Router } from 'express';
import healthRouter from './health/health.routes.js';
import uiControlRouter from './ui-control/uiControl.routes.js';

const apiRouter = Router();

/**
 * Feature module mounts inside `backend/modules/`.
 * Add each new feature folder's route file right here as features are migrated to MySQL.
 */
apiRouter.use('/health', healthRouter);
apiRouter.use('/ui-control', uiControlRouter);

export default apiRouter;
