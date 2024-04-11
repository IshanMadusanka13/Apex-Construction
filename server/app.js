import express from "express";
import cors from "cors";
import "dotenv/config";
import customerRouter from './routes/CustomerRouter.js';
import userRouter from "./routes/UserRouter.js";
import employeeRouter from "./routes/EmployeeRouter.js";
import siteRouter from "./routes/SiteRouter.js";
import monthlyReportRouter from "./routes/MonthlyReportRouter.js";
import StockRequest from "./models/StockRequest.js";
import StockReq from "../client/src/pages/SiteManagement/StockReq.js";

const app = express();

app.use(cors());
app.use(express.json());

//Including Routers
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/site',siteRouter);
app.use('/monthly-report', MonthlyReportRouter);
app.use('/stockRequest',StockRequestRouter);
app.use.apply('/Siteprofile',SiteProfileRouter);

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

export default app;