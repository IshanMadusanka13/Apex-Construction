import express from 'express';
import { getAllAttendanceRecords, markAttendance, getAttendanceCountThisMonth } from '../controller/attendanceController.js';
const router = express.Router();


router.get('/api/attendance-records/:employeeId', getAllAttendanceRecords);

router.post('/api/mark-attendance/:employeeId', markAttendance);

router.get('/api/attendance-count/:employeeId', getAttendanceCountThisMonth);

export default router;
