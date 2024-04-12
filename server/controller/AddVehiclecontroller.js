import AddVehicle from '../models/AddVehicle.js';
import logger from '../utils/logger.js';

const AddVehiclecontroller = {

    getAddVehicles: async (req, res) => {
        AddVehicle.find()
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error getting Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    addAddVehicle: async (req, res) => {
        const addVehicle = new AddVehicle({
            ChassisNo: req.body.ChassisNo,
            Vehicleid: req.body.Vehicleid,
            VehicleType: req.body.VehicleType,
            VehicleManufachuredYear: req.body.VehicleManufachuredYear,
            VehicleBrand: req.body.VehicleBrand,
            VehicleNo: req.body.VehicleNo,
           
        });
        addVehicle.save()
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error Creating Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    updateAddVehicle: async (req, res) => {
        const { ChassisNo, Vehicleid, VehicleType, VehicleManufachuredYear, VehicleBrand, VehicleNo } = req.body;
        AddVehicle.updateOne({ ChassisNo: ChassisNo }, { $set: { Vehicleid: Vehicleid, VehicleType: VehicleType, VehicleManufachuredYear: VehicleManufachuredYear, VehicleBrand: VehicleBrand, VehicleNo: VehicleNo } })
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error updating Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    deleteAddVehicle: async (req, res) => {
        const ChassisNo = req.params.ChassisNo;
        AddVehicle.deleteOne({ ChassisNo: ChassisNo })
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error deleting Add Vehicle Detail");
                res.status(400).json({ message: error.message });
            });

    },
}

export default AddVehiclecontroller;

