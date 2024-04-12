import express from 'express';
import BillerController from '../controller/BillerController.js';

const billerRouter = express.Router();

billerRouter.post('/create', BillerController.createBiller);
billerRouter.get('/getall', BillerController.getAllBillers);
billerRouter.get('/getid', BillerController.generateBillerId);
billerRouter.put('/update', BillerController.updateBiller);
billerRouter.delete('/delete/:id', BillerController.deleteBillerById);

export default billerRouter;
