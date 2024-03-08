import express from 'express';
import UserController from '../controller/UserController.js';

const userRouter = express.Router();

//userRouter.get('/', protect, UserController.getAllUsers);
userRouter.post('/login', UserController.loginUser);

export default userRouter;
