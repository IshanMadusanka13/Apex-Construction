import StockRequest from '../models/StockRequest.js';

export const createStockRequest = async (req, res) => {
    try {
        const { requestItem, qty } = req.body;
        const stockRequest = new StockRequest({ requestItem, qty });
        await stockRequest.save();
        res.status(201).json({ message: 'Stock request created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create stock request', error: error.message });
    }
};
