const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    }
}, { timestamps: true });

// Define the Leave model
const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;