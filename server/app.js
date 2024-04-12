// app.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import customerRouter from './routes/CustomerRouter.js';
import userRouter from "./routes/UserRouter.js";
import employeeRouter from "./routes/EmployeeRouter.js";
import authRouter from "./routes/AuthRouter.js";
import complaintRouter from "./routes/ComplaintRouter.js";
import feedbackRouter from "./routes/FeedbackRouter.js";

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
app.use('/auth', authRouter);

export default app;
