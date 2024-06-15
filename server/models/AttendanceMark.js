import mongoose from 'mongoose';

const attendanceMarkSchema = new mongoose.Schema({
    date: { 
        type: Date, 
        default: Date.now, 
    },
    employeeId: { 
        type: String, 
        required: true 
    },
    CheckInTime: { 
        type: Date, 
        default: Date.now, 
    },
    CheckOutTime: { 
        type: Date, 
        default: Date.now, 
    },
    status: { 
        type: Boolean, 
        default: true, 
    }
});

const AttendanceMark = mongoose.model('AttendanceMark', attendanceMarkSchema);

export default AttendanceMark;