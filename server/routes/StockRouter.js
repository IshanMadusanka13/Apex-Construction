import express from 'express';
import StockController from '../controller/StockController.js';

const stockRouter = express.Router();

stockRouter.get('/getid', StockController.generateStockId);
stockRouter.post('/create', StockController.createStock);
stockRouter.get('/get/:equipmentId', StockController.getStockById);
stockRouter.get('/getall', StockController.getAllStock);
stockRouter.put('/update', StockController.updateStock);
stockRouter.delete('/delete/:equipmentId', StockController.deleteStock);

stockRouter.post('/buy', StockController.buyStock);
stockRouter.get('/getbought/:month', StockController.getBoughtStockDetailsByMonth);

export default stockRouter;
