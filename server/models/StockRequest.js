import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockRequestSchema = new Schema({
    siteId: {
        type: Schema.Types.ObjectId,
        ref: 'Site'
    },
    equipmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Stock'
    },
    qty: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
});

const StockRequest = model('StockRequest', stockRequestSchema);

export default StockRequest;