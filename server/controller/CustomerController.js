import logger from '../utils/logger.js'
import Customer from '../models/Customer.js';
import UserController from './UserController.js';

const CustomerController = {

    createCustomer: async (req, res) => {
        try {

            logger.info(req.body)
            const {
                firstName,
                lastName,
                dateOfBirth,
                nic,
                no,
                street,
                city,
                companyName,
                businessType,
                email,
                mobileNo,
                password } = req.body;

            const newUser = await UserController.createUser(email, password, 'customer');

            const customer = new Customer({
                firstName,
                lastName,
                dateOfBirth,
                nic,
                no,
                street,
                city,
                companyName,
                businessType,
                email,
                mobileNo,
                user: newUser._id
            });

            await customer.save();
            res.status(201).json(customer);
            logger.info("Customer create successful");

        } catch (error) {
            res.status(400).json({ message: error.message });
            logger.error("Customer create failed");
        }
    },

    getCustomerByUser: async (req, res) => {
        try {
            logger.info(req.params.user);
            const customer = await Customer.findOne({ user: req.params.user });
            if (!customer) {
                logger.error("Customer not found");
                return res.status(404).json({ message: 'Customer not found' });
            }
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ message: error.message });
            logger.error("Error getting Customer");
            logger.error(error);
        }
    },

}

export default CustomerController;