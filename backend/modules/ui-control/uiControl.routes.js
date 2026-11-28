import { Router } from 'express';
import { requireSuperAdmin } from '../auth/auth.middleware.js';
import {
  getAllUiControls,
  getUiControlByKey,
  saveUiControlByKey,
} from './uiControl.controller.js';

const uiControlRouter = Router();

uiControlRouter.get('/', getAllUiControls);
uiControlRouter.get('/:controlKey', getUiControlByKey);
uiControlRouter.put('/:controlKey', requireSuperAdmin, saveUiControlByKey);

export default uiControlRouter;
