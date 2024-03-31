import express from 'express';
import EmployeeController from '../controller/EmployeeController.js';
import authorizeUser from '../middleware/authorizeUser.js';
import requestLogging from '../middleware/requestLogging.js';

const employeeRouter = express.Router();

//userRouter.get('/', protect, UserController.getAllUsers);
employeeRouter.post('/create', requestLogging, authorizeUser, EmployeeController.createEmployee);
employeeRouter.get('/search/:value/:searchBy', requestLogging, authorizeUser, EmployeeController.getEmployeeByCriteria);
employeeRouter.get('/getid', requestLogging, authorizeUser, EmployeeController.generateEmployeeId);
employeeRouter.put('/update', requestLogging, authorizeUser, EmployeeController.updateEmployee);
employeeRouter.delete('/delete/:email/:userType', requestLogging, authorizeUser, EmployeeController.deleteEmployeeByEmail);
employeeRouter.get('/getcount', requestLogging, authorizeUser, EmployeeController.getEmployeeCount);

export default employeeRouter;
