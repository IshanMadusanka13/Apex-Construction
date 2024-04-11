import express from 'express';
import Fleetcontroller from '../controller/Fleetcontroller.js';

const FleetRouter = express.Router();

FleetRouter.get('/search', Fleetcontroller.getFleets);
FleetRouter.post('/create', Fleetcontroller.addFleet);
FleetRouter.put('/update', Fleetcontroller.updateFleet);
FleetRouter.delete('/delete/:vehicleid', Fleetcontroller.deleteFleet);
FleetRouter.get('/search/:driverId', Fleetcontroller.searchFleetByDriverId);



  
export default FleetRouter;
