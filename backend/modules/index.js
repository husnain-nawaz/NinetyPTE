import { Router } from 'express';
import aiEvaluationRouter from './ai-evaluation/aiEvaluation.routes.js';
import analyticsRouter from './analytics/analytics.routes.js';
import { authRouter } from './auth/index.js';
import billingRouter from './billing/billing.routes.js';
import cmsRouter from './cms/cms.routes.js';
import healthRouter from './health/health.routes.js';
import logsRouter from './logs/logs.routes.js';
import mediaRouter from './media/media.routes.js';
import mockTestsRouter from './mock-tests/mockTests.routes.js';
import notificationsRouter from './notifications/notifications.routes.js';
import practiceRouter from './practice/practice.routes.js';
import promoRouter from './promo/promo.routes.js';
import questionBankRouter from './question-bank/questionBank.routes.js';
import uiControlRouter from './ui-control/uiControl.routes.js';

const apiRouter = Router();

/**
 * Feature module mounts inside `backend/modules/`, backed by their dedicated MySQL databases.
 */
apiRouter.use('/auth', authRouter);
apiRouter.use('/health', healthRouter);
apiRouter.use('/ui-control', uiControlRouter);
apiRouter.use('/mock-tests', mockTestsRouter);
apiRouter.use('/questions', questionBankRouter);
apiRouter.use('/practice', practiceRouter);
apiRouter.use('/ai-eval', aiEvaluationRouter);
apiRouter.use('/stats', analyticsRouter);
apiRouter.use('/cms', cmsRouter);
apiRouter.use('/media', mediaRouter);
apiRouter.use('/billing', billingRouter);
apiRouter.use('/promo', promoRouter);
apiRouter.use('/notifications', notificationsRouter);
apiRouter.use('/logs', logsRouter);

export default apiRouter;
