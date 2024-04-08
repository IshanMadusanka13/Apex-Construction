import { response } from './app.js';
import FleetDetail from '../models/FleetDetail.js';



const getFleetDetails = (req, res, next) => {
    FleetDetail.find()
     .then(response => {
        res.json({ response })
     })
      .catch(error => {
        res.json({  error})
      });
};

const addFleetDetail = (req,res,next) =>{
    const FleetDetail = new FleetDetail ({
        Vehicleid: req.body.Vehicleid,
        VehicleType: req.body.VehicleType,
        VehicleNo: req.body.VehicleNo,
        DriverId: req.body.DriverId,
        TransportMaterials: req.body.TransportMaterials,
        DriverMobileNo: req.body.DriverMobileNo,
        TransportLocation:req.body.TransportLocation,
        TransportRoot:req.body.TransportRoot,
        EstimatedTime:req.body.EstimatedTime,
    });
    FleetDetail.save()
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
};

const updateFleetDetail = (req, res, next) => {
    const { Vehicleid, VehicleType, VehicleNo, DriverId,TransportMaterials,DriverMobileNo,TransportLocation,TransportRoot,EstimatedTime } = req.body;
    FleetDetail.updateOne({ Vehicleid: Vehicleid}, { $set: {VehicleType: VehicleType, VehicleNo: VehicleNo, DriverId: DriverId,TransportMaterials:TransportMaterials,DriverMobileNo:DriverMobileNo,TransportLocation:TransportLocation,TransportRoot:TransportRoot,EstimatedTime:EstimatedTime}})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
}

const deleteFleetDetail = (req, res, next) => {
    const Vehicleid = req.body.Vehicleid;
    FleetDetail.deleteOne({Vehicleid: Vehicleid})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
     
}



exports.getFleetDetails  = getFleetDetails ;
exports.addFleetDetail  = addFleetDetail ;
exports.updateFleetDetail  = updateFleetDetail ;
exports.deleteFleetDetail  = deleteFleetDetail ;

export default Fleetcontroller;

