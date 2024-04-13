import Stock from "../models/Stock.js";
import logger from '../utils/logger.js'

const StockController = {

    generateStockId: async (req, res) => {
        try {
            const latestDocument = await Stock.findOne().sort({ _id: -1 });
            const lastId = latestDocument ? latestDocument.equipmentId : 1000;
            const stockId = lastId + 1;
            res.status(200).json(stockId);

        } catch (error) {
            logger.error("Error getting StockId");
            res.status(500).json({ message: error.message });
        }
    },

    createStock: async (req, res) => {

        const { equipmentId, equipmentName, value, description, qty, minimumQty } = req.body;
        const stock = new Stock({
            equipmentId: equipmentId,
            name: equipmentName,
            value: value,
            description: description,
            qty: qty,
            minimumQty: minimumQty,
        });
        stock
            .save()
            .then((result) => {
                logger.info("Stock create successful");
                res.status(201).json(result);
            })
            .catch((error) => {
                logger.error("Stock create failed");
                logger.error(error);
                res.status(400).json({ message: error.message });
            });
    },

    updateStock: async (req, res) => {

        const { equipmentId, equipmentName, value, description, qty, minimumQty } = req.body;

        Stock
            .updateOne(
                { equipmentId: equipmentId },
                {
                    $set: {
                        name: equipmentName,
                        value: value,
                        description: description,
                        qty: qty,
                        minimumQty: minimumQty,
                    },
                }
            )
            .then((result) => {
                logger.info("Stock update successful");
                res.status(200).json(result);
            })
            .catch((error) => {
                logger.error("Stock update failed");
                logger.error(error);
                res.status(400).json({ message: error.message });
            });
    },

    deleteStock: async (req, res) => {

        Stock
            .findOneAndDelete(
                { equipmentId: req.params.equipmentId }
            )
            .then((result) => {
                logger.info(result);
                logger.info("Stock " + req.params.equipmentId + " deleted successfully");
                res.status(200).json({ message: 'Stock deleted' });
            })
            .catch((error) => {
                logger.error(error);
                logger.error("Stock " + req.params.equipmentId + " delete Failed");
                res.status(400).json({ message: error.message });
            });
    },

    getAllStock: async (req, res) => {

        Stock
            .find()
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                logger.error(error);
                logger.error("Error getting Stock");
                res.status(500).json({ message: error.message });
            });
    },

    getStockById: async (req, res) => {

        Stock
            .find({ equipmentId: req.body.equipmentId })
            .then((result) => {
                res.send(result);
            })
            .catch((error) => {
                logger.error("Error getting Stock");
                res.status(500).json({ message: error.message });
            });
    },

    requestStock: async (req, res) => {
        try {
            const { equipmentId, qty } = req.body;

            const existingStock = await Stock.findOne({ equipmentId });
            if (!existingStock) {
                return res.status(404).json({ message: 'Stock not found' });
            }

            if (qty > existingStock.qty) {
                return res.status(400).json({ message: 'Not Enough Stock' });
            }

            const newQty = existingStock.qty - qty;
            existingStock.qty = newQty;

            const updatedStock = await existingStock.save();

            res.status(200).json(updatedStock);
        } catch (error) {
            logger.error("Error processing stock request");
            res.status(500).json({ message: error.message });
        }
    },


}

export default StockController;