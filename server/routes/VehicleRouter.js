import express from 'express';
import VehicleController from '../controller/VehicleController.js';

const vehicleRouter = express.Router();

vehicleRouter.get('/search', VehicleController.getVehicles);
vehicleRouter.post('/create', VehicleController.addVehicle);
vehicleRouter.put('/update', VehicleController.updateAddVehicle);
vehicleRouter.delete('/delete/:ChassisNo', VehicleController.deleteVehicle);

export default vehicleRouter;
