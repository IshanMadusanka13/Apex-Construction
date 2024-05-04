import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now, },
    employeeId: { type: String, required: true },
    status: { type: Boolean, default: true, }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;