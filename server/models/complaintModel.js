const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    type: String,
    subject: String,
    complaint: String,
});

const Complaint = mongoose.model('Complaint' , complaintSchema);

module.exports = Complaint;