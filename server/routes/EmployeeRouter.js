import express from 'express';
import EmployeeController from '../controller/EmployeeController.js';
import requestLogging from '../utils/requestLogging.js';

const employeeRouter = express.Router();

//userRouter.get('/', protect, UserController.getAllUsers);
employeeRouter.post('/create', requestLogging,EmployeeController.createEmployee);
employeeRouter.get('/search/:value/:searchBy', requestLogging,EmployeeController.getEmployeeByCriteria);
employeeRouter.get('/getid', requestLogging,EmployeeController.generateEmployeeId);
employeeRouter.put('/update', requestLogging,EmployeeController.updateEmployee);
employeeRouter.delete('/delete/:email/:userType', requestLogging,EmployeeController.deleteEmployeeByEmail);
employeeRouter.get('/getcount', requestLogging,EmployeeController.getEmployeeCount);

export default employeeRouter;
