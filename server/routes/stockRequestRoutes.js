
const express = require('express');
const router = express.Router();
const stockRequestController = require('../controllers/StockRequestController');

// Route for creating a new stock request
router.post('/create', stockRequestController.createStockRequest);

module.exports = router;
