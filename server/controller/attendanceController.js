const Attendance = require('../models/Attendance.js');

exports.getAttendanceByEmployeeId = async (req, res) => {
    const { employeeId } = req.params;
    try {
        const attendance = await Attendance.find({ employeeId });
        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

