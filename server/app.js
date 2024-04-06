import express from "express";
import cors from "cors";
import "dotenv/config";
import customerRouter from './routes/CustomerRouter.js';
import userRouter from "./routes/UserRouter.js";
import employeeRouter from "./routes/EmployeeRouter.js";
import AddSiteDetails from "../client/src/pages/SiteManagement/AddSite.js";
import siteRouter from "./routes/siteRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

//Including Routers
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/Addsite',siteRouter);

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

export default app;