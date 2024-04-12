import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    equipmentId: {
        type: Number,
        required: true,
    },
    
    name: {
        type: String,
        required: true,
    },

    value: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;