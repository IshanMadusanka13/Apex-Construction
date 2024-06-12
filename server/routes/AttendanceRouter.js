import express from 'express';
import { getAllAttendanceRecords, markAttendance } from '../controller/attendanceController.js';

const attendanceRouter = express.Router();

attendanceRouter.get('/getid/:id', getAllAttendanceRecords);
attendanceRouter.post('/mark', markAttendance);

export default attendanceRouter;