import mongoose from 'mongoose';

const attendanceGenerateSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    code: {
        type: String,
        required: true
    },
    validity: {
        type: Boolean,
        default: true,
    }
});

const AttendanceGenerate = mongoose.model('AttendanceGenerate', attendanceGenerateSchema);

export default AttendanceGenerate;