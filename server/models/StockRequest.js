

const mongoose = require('mongoose');

const stockRequestSchema = new mongoose.Schema({
    requestItem: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});

const StockRequest = mongoose.model('StockRequest', stockRequestSchema);

module.exports = StockRequest;
