import express from 'express';
import { assignSalary } from '../controller/employeeSalaryController.js';


const employeeSalaryRouter = express.Router();

employeeSalaryRouter.post('/assign-salary', assignSalary);

export default employeeSalaryRouter;
