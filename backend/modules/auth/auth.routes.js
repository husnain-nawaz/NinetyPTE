import { Router } from 'express';
import {
  getAuthConfig,
  getCurrentUser,
  googleDirectAuth,
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
} from './auth.controller.js';
import { requireAuth } from './auth.middleware.js';

const authRouter = Router();

authRouter.get('/config', getAuthConfig);
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/google', googleDirectAuth);
authRouter.post('/forgot-password', requestPasswordReset);
authRouter.get('/me', requireAuth, getCurrentUser);
authRouter.post('/logout', logoutUser);

export default authRouter;
