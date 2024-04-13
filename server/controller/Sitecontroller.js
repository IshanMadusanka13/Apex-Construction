import Site from "../models/Site.js";
import StockRequest from "../models/StockRequest.js";
import logger from "../utils/logger.js";

const SiteController = {

    createSite: async (req, res) => {
        const { siteId, location, start, end, notes, customerId } = req.body;
        const newSite = new Site({
            customerId: customerId,
            siteId: siteId,
            location: location,
            start: start,
            end: end,
            notes: notes,
        });
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
        const { location, siteId, siteState } = req.body;
        Site
            .updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        location: location,
                        siteId: siteId,
                        siteState: siteState,
                    }
                }
            )
            .then((result) => {
                logger.info("Site " + req.params.id + " Updated Successfully");
                res.send(result);
            })
            .catch((err) => {
                logger.error("Error Updating Site " + req.params.id);
                res.status(500).json({ message: "Error updating site" });
            });
    },

    deleteSite: async (req, res) => {
        Site
            .deleteOne({ _id: req.params.id })
            .then((result) => {
                logger.info("Site " + req.params.id + " Deleted Successfully");
                res.send(result);
            })
            .catch((err) => {
                logger.error("Site " + req.params.id + " deleted Failed");
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
                res.send(result);
            })
            .catch((err) => {
                logger.error("Site Fetching Failed by id " + req.params.id);
                res.status(500).json({ message: "Error getting sites" });
            });
    },

    generateSiteId: async (req, res) => {
        try {

            const count = await Site.countDocuments();
            let siteCount = count + 1000;
            let siteId = "S" + siteCount;
            res.status(200).json(siteId);

        } catch (error) {
            logger.error("Error getting EmployeeId");
            res.status(500).json({ message: error.message });
        }
    },

    stockRequest: async (req, res) => {
        const { siteId, equipmentId, qty } = req.body;

        const stockRequest = new StockRequest({
            siteId: siteId,
            equipmentId: equipmentId,
            qty: qty,
            status: false
        });

        stockRequest
            .save()
            .then((result) => {
                logger.info("Stock Requested Successfully");
                res.send(result);
            })
            .catch((err) => {
                logger.error("Error Requesting Stock");
                res.status(500).json({ message: "Error Requesting Stock" });
            });
    },
}

export default SiteController;

/*
//get completed days for site / all days as a percentage by siteId
export function getCompletedDays(req, res) {

    //get site by id
    Site
        .findOne({ siteId: req.params.id })
        .then((result) => {
            //calculate percentage
            const completedDays = Math.round(
                ((new Date() - result.start) / (result.end - result.start)) * 100
            );
            res.send({ completedDays: completedDays });
        })
        .catch((err) => {
            res.status(500).json({ message: "Error getting site" });
        });
}
*/






















































































