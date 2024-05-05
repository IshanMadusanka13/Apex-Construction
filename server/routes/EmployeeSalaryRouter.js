import express from 'express';
import { assignSalary } from '../controller/employeeSalaryController';


const employeeSalaryRouter = express.Router();

router.post('/assign-salary', assignSalary);

export default employeeSalaryRouter;
