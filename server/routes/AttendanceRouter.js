import express from 'express';
import AttendanceController from '../controller/AttendanceController.js';

const attendanceRouter = express.Router();

attendanceRouter.get('/getid/:id', AttendanceController.getAllAttendanceRecords);
attendanceRouter.get('/getworkingdays/:month/:year', AttendanceController.getAllWorkingDaysForMonth);
attendanceRouter.get('/getQR', AttendanceController.displayQR);
attendanceRouter.post('/createQR', AttendanceController.generateQR);
attendanceRouter.post('/disableQR', AttendanceController.disableQR);
attendanceRouter.post('/mark', AttendanceController.markAttendance);

export default attendanceRouter;