import express from "express";
import cors from "cors";
import "dotenv/config";
import Fleetcontroller from "./controller/Fleetcontroller.js"; // Import Fleetcontroller
import customerRouter from './routes/CustomerRouter.js';
import userRouter from "./routes/UserRouter.js";
import employeeRouter from "./routes/EmployeeRouter.js";
import FleetRouter from "./routes/FleetRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

//Including Routers
app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/FleetDetail', FleetRouter);

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
});

app.get('/FleetDetails', (req, res) => {
    Fleetcontroller.getFleetDetails((callback) => { // Assuming getFleetDetails is a function provided by Fleetcontroller
        res.send(callback);
    });
});

app.post('/createFleetDetail', (req, res) => {
    Fleetcontroller.addFleetDetail(req.body, (callback) => { // Assuming addFleetDetail is a function provided by Fleetcontroller
        res.send(callback);
    });
});

app.post('/updateFleetDetail', (req, res) => {
    Fleetcontroller.updateFleetDetail(req.body, (callback) => { // Assuming updateFleetDetail is a function provided by Fleetcontroller
        res.send(callback);
    });
});

app.post('/deleteFleetDetail', (req, res) => {
    Fleetcontroller.deleteFleetDetail(req.body, (callback) => { // Assuming deleteFleetDetail is a function provided by Fleetcontroller
        res.send(callback);
    });
});

export default app;
