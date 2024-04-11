import express from 'express';
import PaymentController from '../controller/PaymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/companypay', PaymentController.makeCompanyPayment);
paymentRouter.get('/getbank/:name', PaymentController.getBank);
paymentRouter.get('/getbanks', PaymentController.getAllBanks);
paymentRouter.post('/addbank', PaymentController.addBanks);

export default paymentRouter;
