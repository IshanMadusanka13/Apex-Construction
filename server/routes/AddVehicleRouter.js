import express from 'express';
import AddVehiclecontroller from '../controller/AddVehiclecontroller.js';

const AddVehicleRouter = express.Router();

AddVehicleRouter.get('/search', AddVehiclecontroller.getAddVehicles);
AddVehicleRouter.post('/create', AddVehiclecontroller.addAddVehicle);
AddVehicleRouter.put('/update', AddVehiclecontroller.updateAddVehicle);
AddVehicleRouter.delete('/delete/:ChassisNo', AddVehiclecontroller.deleteAddVehicle);

export default AddVehicleRouter;
