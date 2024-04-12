import Fleet from '../models/Fleet.js';
import logger from '../utils/logger.js';


const Fleetcontroller = {

    getFleets: async (req, res) => {
        Fleet.find()
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error getting Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    addFleet: async (req, res) => {
        const fleet = new Fleet({
            Vehicleid: req.body.Vehicleid,
            VehicleType: req.body.VehicleType,
            VehicleNo: req.body.VehicleNo,
            DriverId: req.body.DriverId,
            TransportMaterials: req.body.TransportMaterials,
            DriverMobileNo: req.body.DriverMobileNo,
            TransportLocation: req.body.TransportLocation,
            TransportRoot: req.body.TransportRoot,
            EstimatedTime: req.body.EstimatedTime,
        });
        fleet.save()
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error Creating Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    updateFleet: async (req, res) => {
        const { Vehicleid, VehicleType, VehicleNo, DriverId, TransportMaterials, DriverMobileNo, TransportLocation, TransportRoot, EstimatedTime } = req.body;
        Fleet.updateOne({ Vehicleid: Vehicleid }, { $set: { VehicleType: VehicleType, VehicleNo: VehicleNo, DriverId: DriverId, TransportMaterials: TransportMaterials, DriverMobileNo: DriverMobileNo, TransportLocation: TransportLocation, TransportRoot: TransportRoot, EstimatedTime: EstimatedTime } })
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error updating Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    deleteFleet: async (req, res) => {
        const Vehicleid = req.params.vehicleid;
        Fleet.deleteOne({ Vehicleid: Vehicleid })
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error deleting Fleet Detail");
                res.status(400).json({ message: error.message });
            });

    },

    searchFleetByDriverId: async (req, res) => {
        try {
          const { driverId } = req.params;
          const fleetDetails = await Fleet.findOne({ DriverId: driverId }, 'Vehicleid VehicleType VehicleNo DriverId TransportMaterials DriverMobileNo TransportLocation TransportRoot EstimatedTime');
          res.status(200).json(fleetDetails);
        } catch (error) {
          console.error('Error searching fleet by driver ID:', error);
          res.status(500).json({ message: 'Failed to search fleet details by driver ID' });
        }
      },
    
}

export default Fleetcontroller;

