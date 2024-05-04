import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    }
});

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;