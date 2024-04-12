import express from 'express';
import stockRequestController from '../controllers/StockRequestController.js';

const router = express.Router();

router.post('/create', stockRequestController.createStockRequest);

export default router;

