import express from "express";
import cors from "cors";
import "dotenv/config";
import customerRouter from './routes/CustomerRouter.js';
import userRouter from "./routes/UserRouter.js";
import employeeRouter from "./routes/EmployeeRouter.js";
import paymentRouter from "./routes/PaymentRouter.js";
import billerRouter from "./routes/BillerRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

//Including Routers
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/finance', paymentRouter);
app.use('/biller', billerRouter);

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

export default app;