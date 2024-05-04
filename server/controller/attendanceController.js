import Attendance from '../models/Attendance.js';
import logger from '../utils/logger.js';

export const getAllAttendanceRecords = async (req, res) => {
    try {

        const attendanceRecords = await Attendance.find({ employeeId: req.params.id });
        logger.info("Got Attendance by Employee Id");
        res.status(200).json(attendanceRecords);

    } catch (error) {
        logger.error("Getting Attendance by Employee Id failed");
        res.status(400).json({ message: error.message });
    }
};

export const markAttendance = async (req, res) => {
    try {
        const { employeeId } = req.body;

        const attendance = new Attendance({ employeeId });
        await attendance.save();

        logger.info("Marked Attendance");
        res.status(200).json(attendance);

    } catch (error) {
        logger.error("Marking Attendance Failed");
        res.status(400).json({ message: error.message });
    }
};
