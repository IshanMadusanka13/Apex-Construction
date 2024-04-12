import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const stockRequestSchema = new Schema({
    requestItem: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});

const StockRequest = model('StockRequest', stockRequestSchema);

export default StockRequest;