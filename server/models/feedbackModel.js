import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    id: Number,
    feedback: String,
});

const Feedback = mongoose.model('Feedback' , feedbackSchema);

export default Feedback;