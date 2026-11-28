import { Router } from 'express';
import { getSystemHealth } from './health.controller.js';

const healthRouter = Router();

healthRouter.get('/', getSystemHealth);

export default healthRouter;
