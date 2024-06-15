import express from 'express';
import AttendanceController from '../controller/AttendanceController.js';

const attendanceRouter = express.Router();

attendanceRouter.get('/getid/:id', AttendanceController.getAllAttendanceRecords);
attendanceRouter.get('/getQR', AttendanceController.displayQR);
attendanceRouter.post('/createQR', AttendanceController.generateQR);
attendanceRouter.post('/mark', AttendanceController.markAttendance);

export default attendanceRouter;