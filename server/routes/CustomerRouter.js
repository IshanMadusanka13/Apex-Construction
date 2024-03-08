import express from 'express';
import CustomerController from '../controller/CustomerController.js';

const customerRouter = express.Router();

//userRouter.get('/', protect, UserController.getAllUsers);
customerRouter.post('/create', CustomerController.createCustomer);
customerRouter.get('/search/:user', CustomerController.getCustomerByUser);

export default customerRouter;
