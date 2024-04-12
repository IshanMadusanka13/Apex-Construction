// app.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import customerRouter from './routes/CustomerRouter.js';
import userRouter from "./routes/UserRouter.js";
import employeeRouter from "./routes/EmployeeRouter.js";
import authRouter from "./routes/authRouter.js";
import complaintRouter from "./routes/complaintRouter.js";
import feedbackRouter from "./routes/feedbackRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);


//Including Routers
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/auth', authRouter);
app.use('/complaint', complaintRouter);
app.use('/feedback', feedbackRouter);

export default app;
