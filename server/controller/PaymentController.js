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
            const bank = await Bank.findOne({ _id: req.params.id });
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

            logger.info(req);

            const {
                paymentType,
                payTo,
                payFrom,
                regarding,
                amount,
                description,
                bank,
                branch,
                accountNo
            } = req.body;

            const compbank = await Bank.findOne({ bankName: payFrom });
            if (!compbank) {
                logger.error("Bank not found");
                return res.status(404).json({ message: 'Bank not found' });
            }

            let compTransaction;
            if (paymentType == "Utility") {
                compTransaction = new CompanyTransaction({
                    paymentType,
                    payTo,
                    payFrom: compbank._id,
                    regarding,
                    amount,
                    description,
                });
            } else if (paymentType == "Biller") {
                compTransaction = new CompanyTransaction({
                    paymentType,
                    payTo,
                    payFrom: compbank._id,
                    regarding,
                    amount,
                    description,
                });
            } else if (paymentType == "Other") {
                compTransaction = new CompanyTransaction({
                    paymentType,
                    payTo,
                    payFrom: compbank._id,
                    regarding,
                    amount,
                    description,
                    bank,
                    branch,
                    accountNo,
                });
            } else {
                logger.error("Company Payment failed");
                res.status(400).json({ message: "Invalid Payment Type" });
            }

            await compTransaction.save();
            logger.info("Company Payment successful");
            res.status(201).json(compTransaction);

        } catch (error) {
            logger.error("Company Payment failed");
            res.status(400).json({ message: error.message });
        }
    },

    getPayments: async (req, res) => {
        try {
            if (!req.params.type || req.params.type == "all") {
                compTransaction = await CompanyTransaction.find();
            } else {
                compTransaction = await CompanyTransaction.find({ paymentType: req.params.type });
            }

            res.status(200).json(compTransaction);
        } catch (error) {
            logger.error("Error getting Payments by Type");
            res.status(500).json({ message: error.message });
        }
    },

}

export default PaymentController;