import express from 'express';
import CustomerController from '../controller/CustomerController.js';
import authorizeUser from '../middleware/authorizeUser.js';
import requestLogging from '../middleware/requestLogging.js';

const customerRouter = express.Router();

//userRouter.get('/', protect, UserController.getAllUsers);
customerRouter.post('/create', requestLogging, authorizeUser, CustomerController.createCustomer);
customerRouter.get('/search/:user', requestLogging, authorizeUser, CustomerController.getCustomerByUser);
customerRouter.put('/update', requestLogging, authorizeUser, CustomerController.updateCustomer);
customerRouter.delete('/delete/:email', requestLogging, authorizeUser, CustomerController.deleteCustomerByEmail);

export default customerRouter;
