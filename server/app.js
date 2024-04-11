// app.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import customerRouter from './routes/CustomerRouter.js';
import userRouter from "./routes/UserRouter.js";
import employeeRouter from "./routes/EmployeeRouter.js";
const controller = require('./Controllers/controller');
const complaintController = require('./Controllers/complaintController');
const authController = require('./Controllers/authController');

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


app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
})

app.get('/users',(req,res) =>{
    controller.getUsers( (req,res,next) => {
       res.send();
    });
});

app.post('/createuser', (req,res) => {
    controller.addUser(req.body, (callack) =>{
      res.send();
    });
});


app.post('/updateuser', (req,res) => {
    controller.updateUser(req.body, (callack) =>{
      res.send(callack);
    });
});

app.post('/deleteuser', (req,res) => {
    controller.deleteUser(req.body, (callack) =>{
      res.send(callack);
    });
});


app.get('/complaints',(req,res)=>{
  complaintController.getComplaint((req,res,next) => {
     res.send();
  });
});

app.post('/createcomplaint', (req,res) => {
  complaintController.addComplaint(req.body, (callack) =>{
    res.send();
  });
});

app.post('/updatecomplaint', (req,res) => {
  complaintController.updateComplaint(req.body, (callack) =>{
    res.send(callack);
  });
});

app.post('/deletecomplaint', (req,res) => {
  complaintController.deleteComplaint(req.body, (callack) =>{
    res.send(callack);
  });
});

app.get('/auths',(req,res)=>{
  authController.getAuth((req,res,next) => {
     res.send();
  });
});

app.post('/createauth', (req,res) => {
  authController.addAuth(req.body, (callack) =>{
    res.send();
  });
});

app.post('/updateauth', (req,res) => {
  authController.updateAuth(req.body, (callack) =>{
    res.send(callack);
  });
});

app.post('/deleteauth', (req,res) => {
  authController.deleteAuth(req.body, (callack) =>{
    res.send(callack);
  });
});



module.exports = app;



export default app;
