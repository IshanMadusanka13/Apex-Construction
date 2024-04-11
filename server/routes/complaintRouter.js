import express from 'express';
import complaintController from '../controller/complaintController.js';

const complaintRouter = express.Router();

complaintRouter.get('/complaints', complaintController.getComplaint);
complaintRouter.post('/createcomplaint', complaintController.addComplaint);
complaintRouter.post('/updatecomplaint', complaintController.updateComplaint);
complaintRouter.post('/deletecomplaint', complaintController.deleteComplaint);

export default complaintRouter;