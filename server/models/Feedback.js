import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Compliment', 'Complaint', 'Suggestion'],
        default: 'Compliment'
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    reply: {
        type: String,
        required: false
    }

});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;