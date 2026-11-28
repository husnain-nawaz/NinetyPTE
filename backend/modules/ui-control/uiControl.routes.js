import { Router } from 'express';
import {
  getAllUiControls,
  getUiControlByKey,
  saveUiControlByKey,
} from './uiControl.controller.js';

const uiControlRouter = Router();

uiControlRouter.get('/', getAllUiControls);
uiControlRouter.get('/:controlKey', getUiControlByKey);
uiControlRouter.put('/:controlKey', saveUiControlByKey);

export default uiControlRouter;
