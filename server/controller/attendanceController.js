import { Attendance } from '../models/attendanceModel.js';
import Employee from '../models/Employee.js';

export const getAllAttendanceRecords = async (req, res) => {
    try {
        var employee;
            switch (req.params.searchBy) {
                case "userId":
                    employee = await Employee.findOne({ user: req.params.value });
                    break;
                case "employeeId":
                    employee = await Employee.findOne({ employeeId: req.params.value });
                    break;
                case "email":
                    employee = await Employee.findOne({ email: req.params.value });
                    break;
                default:
                    return res.status(400).json({ message: "Invalid Criteria" });
            }
        const attendanceRecords = await Attendance.find();
        res.json(attendanceRecords);

    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to mark attendance
export const markAttendance = async (req, res) => {
    try {
        const { date, employeeId, status } = req.body;

        // Assuming the employeeId is passed from frontend
        // You may need to handle authentication and get the employeeId from the logged-in user

        // Create a new attendance record
        const newAttendance = new Attendance({
            date,
            employeeId,
            status
        });

        await newAttendance.save();
        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAttendanceCountThisMonth = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const count = await Attendance.attendanceCountThisMonth(employeeId);
        res.json({ count });
    } catch (error) {
        console.error('Error fetching attendance count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
