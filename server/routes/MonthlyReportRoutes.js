import express from 'express';
import { createMonthlyReport,seachcusId, updatecusId ,deletecusId} from '../controller/MonthlyReportController.js';

const MonthlyReportRouter = express.Router();

MonthlyReportRouter.post("/create", createMonthlyReport);
MonthlyReportRouter.get('/search/:Id',seachcusId );
MonthlyReportRouter.put('/update/:Id', updatecusId);
MonthlyReportRouter.delete('/delete/:Id',deletecusId );

export default MonthlyReportRouter
