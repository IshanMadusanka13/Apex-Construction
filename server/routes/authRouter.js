import express from 'express';
import authController from '../controller/authController.js';

const authRouter = express.Router();

authRouter.get('/auths', authController.getAuth);
authRouter.post('/createauth', authController.addAuth);
authRouter.post('/updateauth', authController.updateAuth);
authRouter.post('/deleteauth', authController.deleteAuth);

export default authRouter;