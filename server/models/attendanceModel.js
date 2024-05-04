import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    employeeId: { type: String, required: true }, 
    status: { type: String}
});

attendanceSchema.statics.attendanceCountThisMonth = async function(employeeId) {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const count = await this.countDocuments({
        employeeId,
        date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
        status: true
    });

    return count;
};

export const Attendance = mongoose.model('Attendance', attendanceSchema);




