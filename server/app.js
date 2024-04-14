import express from "express";
import cors from "cors";
import "dotenv/config";
import customerRouter from './routes/CustomerRouter.js';
import userRouter from "./routes/UserRouter.js";
import employeeRouter from "./routes/EmployeeRouter.js";
import siteRouter from "./routes/SiteRouter.js";
import paymentRouter from "./routes/PaymentRouter.js";
import billerRouter from "./routes/BillerRouter.js";
import stockRouter from "./routes/StockRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

//Including Routers
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/site',siteRouter);
app.use('/finance', paymentRouter);
app.use('/biller', billerRouter);
app.use('/stock', stockRouter);

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

export default app;