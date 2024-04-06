import { UserType } from "../utils/enums/UserEnums.js";
import logger from "../utils/logger.js";
import User from "../models/User.js";
import jwt  from "jsonwebtoken";

const authorizeUser = async (req, res, next) => {

    let token = req.headers.authorization;

    if (token) {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        const accessRules = {
            [UserType.HR_MANAGER]: ['/user', '/employee'],
            [UserType.CUSTOMER]: ['/user', '/customer'],
        };

        const hasAccess = accessRules[user.userType]?.includes(req.originalUrl);
        const urlPrefix = "/" + req.originalUrl.split('/')[1];
        const hasAccess2 = accessRules[user.userType]?.some(rule => urlPrefix.startsWith(rule));

        if (hasAccess || hasAccess2) {
            logger.info(`[${user._id}]: [${req.method}] [${req.originalUrl}] Request Received`);
            next();
        } else {
            logger.info("User Access Revoked");
            res.status(403).json({ message: 'Unauthorized' });
        }
    } else {
        logger.info("User Access Revoked");
        res.status(403).json({ message: 'Unauthorized1' });
    }
}

export default authorizeUser;