import logger from '../utils/logger.js'
import Bank from '../models/Bank.js';
import CompanyTransaction from '../models/CompanyTransaction.js';

const PaymentController = {

    getAllBanks: async (req, res) => {
        try {
            const banks = await Bank.find();
            res.status(200).json(banks);
        } catch (error) {
            logger.error("Error getting Bank Details");
            res.status(500).json({ message: error.message });
        }
    },

    getBank: async (req, res) => {
        try {
            const bank = await Bank.findOne({ bankName: req.params.name });
            if (!bank) {
                logger.error("Bank not found");
                return res.status(404).json({ message: 'Bank not found' });
            }
            res.status(200).json(bank);
        } catch (error) {
            logger.error("Error getting Bank");
            res.status(500).json({ message: error.message });
        }
    },

    makeCompanyPayment: async (req, res) => {
        try {
            const {
                payTo,
                payFrom,
                month,
                amount,
                description,
            } = req.body;

            const bank = await Bank.findOne({ bankName: payFrom });
            if (!bank) {
                logger.error("Bank not found");
                return res.status(404).json({ message: 'Bank not found' });
            }

            const payment = new CompanyTransaction({
                payTo,
                payFrom: bank._id,
                month,
                amount,
                description,
            });

            await payment.save();
            logger.info("Company Payment successful");
            res.status(201).json(payment);

        } catch (error) {
            logger.error("Company Payment failed");
            res.status(400).json({ message: error.message });
        }
    },

}

export default PaymentController;