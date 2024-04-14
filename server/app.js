import express from "express";
import cors from "cors";
import "dotenv/config";
import customerRouter from './routes/CustomerRouter.js';
import userRouter from "./routes/UserRouter.js";
import employeeRouter from "./routes/EmployeeRouter.js";
import packagesRouter from "./routes/PackagesRouter.js";
import packageAddOnRouter from "./routes/packageAddOnsRouter.js";
import cusBuyPackageRouter from "./routes/CusBuyPackageRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

//Including Routers
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/package', packagesRouter);
app.use('/packageaddon', packageAddOnRouter);
app.use('/cuspackagebuy', cusBuyPackageRouter);

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

export default app;