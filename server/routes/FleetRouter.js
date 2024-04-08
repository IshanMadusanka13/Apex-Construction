import express from 'express';
const FleetRouter = express.Router();
import Fleetcontroller from '../controller/Fleetcontroller.js';


FleetRouter.get('/FleetDetails', Fleetcontroller.FleetDetails);
FleetRouter.post('/createFleetDetail', Fleetcontroller.addFleetDetail);
FleetRouter.post('/updateFleetDetail', Fleetcontroller.updateFleetDetail);
FleetRouter.post('/deleteFleetDetail', Fleetcontroller.deleteFleetDetail);

export default FleetRouter;
