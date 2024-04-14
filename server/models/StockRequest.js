import mongoose from 'mongoose';
const { Schema } = mongoose;

const stockRequestSchema = new Schema({
    siteId: {
        type: Schema.Types.ObjectId,
        ref: 'Site'
    },
    equipments: [{
        equipmentId: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: Boolean,
        required: true
    }
});

const StockRequest = mongoose.model('StockRequest', stockRequestSchema);

export default StockRequest;