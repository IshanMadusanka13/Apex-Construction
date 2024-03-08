import User from '../models/User.js'
import logger from '../utils/logger.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )
}

const UserController = {

    createUser: async (email, password, userType) => {
        try {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                email,
                password: hashedPassword,
                userType
            });

            return user.save();
        } catch (error) {
            if (error instanceof MongoError && error.code === 11000) {
                logger.error(`Error creating user: Email '${email}' already exists`);
                throw new Error('Email already exists');
            } else {
                logger.error('Error creating user:', error);
                throw error;
            }
        }
    },

    loginUser: async (req, res) => {
        logger.info(req.body)

        const { email, password } = req.body

        const user = await User.findOne({ email: email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const userLogin = {
                user,
                token: generateToken(user._id)
            }
            res.status(200).json(userLogin)
        } else {
            res.status(400).json('invalid credenials');
        }
    },
}

export default UserController;