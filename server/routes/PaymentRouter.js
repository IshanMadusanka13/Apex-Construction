import express from 'express';
import PaymentController from '../controller/PaymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/companypay', PaymentController.makeCompanyPayment);
paymentRouter.get('/getcomp/:type', PaymentController.getCompanyPayments);

paymentRouter.post('/cuspay', PaymentController.makeCustomerInstallment);
paymentRouter.get('/getall/:month', PaymentController.getAllPaymentsByMonth);

paymentRouter.get('/getbank/:id', PaymentController.getBank);
paymentRouter.get('/getbanks', PaymentController.getAllBanks);

export default paymentRouter;
