import express from 'express';
import leaveController from '../controller/leaveController.js';

const leaveRouter = express.Router();

leaveRouter.get('/getall', leaveController.getLeaveRequests);
leaveRouter.get('/get/:id', leaveController.getLeaveRequestsByEmployeeId);
leaveRouter.post('/create', leaveController.createLeaveRequest);
leaveRouter.put('/update', leaveController.updateLeaveRequest);
leaveRouter.delete('/delete/:id', leaveController.deleteLeave);

export default leaveRouter;
