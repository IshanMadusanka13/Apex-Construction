import express from 'express';
import UserController from '../controller/UserController.js';
import authorizeUser from '../middleware/authorizeUser.js';
import requestLogging from '../middleware/requestLogging.js';

const userRouter = express.Router();

//userRouter.get('/', protect, UserController.getAllUsers);
userRouter.post('/login', requestLogging, authorizeUser, UserController.loginUser);
userRouter.put('/changepassword', requestLogging, authorizeUser, UserController.changePassword);

export default userRouter;
