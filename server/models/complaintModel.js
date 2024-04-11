import mongoose from "mongoose";
const { Schema } = mongoose;

const complaintSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    type: String,
    subject: String,
    complaint: String,
});

const Complaint = mongoose.model('Complaint' , complaintSchema);

export default Complaint;