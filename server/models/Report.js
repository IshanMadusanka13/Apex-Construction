import mongoose from "mongoose";

const monthlyReportSchema = new mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    unit: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

export default monthlyReportSchema;
