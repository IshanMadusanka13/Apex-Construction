import cusPackageBuyModel from "../models/CusPackageBuy.js";
import Site from "../models/Site.js";
import StockRequest from "../models/StockRequest.js";
import logger from "../utils/logger.js";
import StockController from "./StockController.js";

const SiteController = {

    createSite: async (req, res) => {
        const { siteId, location, start, end, notes, customerId, lastUpdate, completeStatus, packageId } = req.body;
        const newSite = new Site({
            customerId: customerId,
            siteId: siteId,
            location: location,
            start: start,
            end: end,
            notes: notes,
            lastUpdate: lastUpdate,
            completeStatus: completeStatus,
            packageId: packageId,
        });

        const status = await cusPackageBuyModel.findOneAndUpdate(
            { _id: packageId },
            { $set: { isApproved: true } }
        );

        if (!status) {
            res.status(500).json({ message: "Error Updating package status" });
        }


        newSite
            .save()
            .then((result) => {
                logger.info("Site Created Successfully");
                res.send(result);
            })
            .catch((err) => {
                logger.error("Error Creating Sites");
                res.status(500).json({ message: "Error creating site" });
            });
    },

    updateSite: async (req, res) => {
        const { siteId, location, notes, lastUpdate, completeStatus } = req.body;
        Site
            .updateOne(
                { siteId: siteId },
                {
                    $set: {
                        location: location,
                        notes: notes,
                        lastUpdate: lastUpdate,
                        completeStatus: completeStatus,
                    }
                }
            )
            .then((result) => {
                logger.info("Site " + siteId + " Updated Successfully");
                res.send(result);
            })
            .catch((err) => {
                logger.error("Error Updating Site " + siteId);
                res.status(500).json({ message: "Error updating site" });
            });
    },

    deleteSite: async (req, res) => {
        Site
            .deleteOne({ siteId: req.params.id })
            .then((result) => {
                logger.info("Site " + req.params.id + " Deleted Successfully");
                res.send(result);
            })
            .catch((err) => {
                logger.error("Site " + req.params.id + " Deleted Failed");
                res.status(500).json({ message: "Error deleting site" });
            });
    },

    getAllSites: async (req, res) => {
        Site
            .find()
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                logger.error("Site Fetching Failed");
                res.status(500).json({ message: "Error getting sites" });
            });
    },

    getAllSitesByCustId: async (req, res) => {
        Site
            .find({ customerId: req.params.id })
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                logger.error("Site Fetching Failed by id " + req.params.id);
                res.status(500).json({ message: "Error getting sites" });
            });
    },

    generateSiteId: async (req, res) => {
        try {

            const latestDocument = await Site.findOne().sort({ _id: -1 });
            const lastId = latestDocument.siteId;
            const numericPart = parseInt(lastId.substring(1));
            const nextNumericPart = numericPart + 1;
            const siteId = "S" + nextNumericPart;
            res.status(200).json(siteId);

        } catch (error) {
            logger.error("Error getting SiteId");
            res.status(500).json({ message: error.message });
        }
    },

    calculateCompleteStatus: async (req, res) => {
        Site
            .findOne({ siteId: req.params.id })
            .then((result) => {
                const completedDays = Math.round(
                    ((new Date() - result.start) / (result.end - result.start)) * 100
                );
                res.status(200).json(completedDays);
            })
            .catch((err) => {
                logger.error("Error Calculating Complete Status");
                res.status(500).json({ message: "Error getting site" });
            });
    },

    stockRequest: async (req, res) => {
        try {
            const { siteId, equipments } = req.body;
            logger.info(req.body);

            equipments.forEach(equipment => {
                StockController.updateQty(equipment.equipmentId, (equipment.existingQty - equipment.qty));
            });

            const stockRequest = new StockRequest({
                siteId: siteId,
                equipments: equipments,
                status: false
            });

            const result = await stockRequest.save();
            logger.info("Stock Requested Successfully");
            res.send(result);
        } catch (err) {
            logger.error("Error Requesting Stock");
            res.status(500).json({ message: "Error Requesting Stock" });
        }
    },

    getStockRequests: async (req, res) => {
        StockRequest
            .find({ siteId: req.params.id })
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                logger.error("Stock Requests Fetching Failed");
                res.status(500).json({ message: "Error getting Stock Requests" });
            });
    },

}

export default SiteController;