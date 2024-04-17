import Fleet from '../models/Fleet.js';
import logger from '../utils/logger.js';

const Fleetcontroller = {

    getFleets: async (req, res) => {
        Fleet.find()
            .then(response => {
                logger.info("Successfully got Fleet Detail");
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error getting Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    addFleet: async (req, res) => {
        const fleet = new Fleet({
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
                logger.info("Successfully added Fleet Detail");
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error Creating Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    updateFleet: async (req, res) => {
        const { VehicleType, VehicleNo, DriverId, TransportMaterials, DriverMobileNo, TransportLocation, TransportRoot, EstimatedTime } = req.body;
        Fleet.updateOne({ VehicleNo: VehicleNo }, { $set: { VehicleType: VehicleType, DriverId: DriverId, TransportMaterials: TransportMaterials, DriverMobileNo: DriverMobileNo, TransportLocation: TransportLocation, TransportRoot: TransportRoot, EstimatedTime: EstimatedTime } })
            .then(response => {
                logger.info("Successfully updated Fleet Detail");
                res.status(201).json(response);
            })
            .catch(error => {
                logger.error("Error updating Fleet Detail");
                res.status(400).json({ message: error.message });
            });
    },

    deleteFleet: async (req, res) => {
        const VehicleNo = req.params.VehicleNo;
        Fleet.deleteOne({ VehicleNo: VehicleNo })
            .then(response => {
                logger.info("Successfully deleted Fleet Detail with VehicleNo " + VehicleNo);
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
          const fleetDetails = await Fleet.findOne({ DriverId: driverId });
          logger.info("Successfully got Fleet Detail by driver ID " + driverId);
          res.status(200).json(fleetDetails);
        } catch (error) {
            logger.error('Error searching fleet by driver ID: ' + driverId);
          res.status(500).json({ message: 'Failed to search fleet details by driver ID' });
        }
      },
    
}

export default Fleetcontroller;
