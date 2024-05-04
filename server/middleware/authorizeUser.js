import { UserType } from "../utils/enums/UserEnums.js";
import logger from "../utils/logger.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authorizeUser = async (req, res, next) => {

    let token = req.headers.authorization;

    if (token) {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        const accessRules = {
            [UserType.ADMIN]: ['/user', '/employee', '/customer', '/site', '/package', '/finance', '/biller', '/stock', '/packageaddon', '/fleet', '/vehicle','/api/mark-attendance','/api/attendance-records','/api/attendance-count/:employeeId'],
            [UserType.HR_MANAGER]: ['/user', '/employee','/api/mark-attendance','/api/attendance-records','/api/attendance-count/:employeeId'],
            [UserType.SITE_MANAGER]: ['/user', '/employee/search', '/employee/update', '/site', '/package', '/customer/search', '/packageaddon','/stock/getall','/api/mark-attendance','/api/attendance-count/:employeeId'],
            [UserType.FINANCE_MANAGER]: ['/user', '/employee/search', '/employee/update', '/finance', '/biller', 'customer/search','/api/mark-attendance','/api/attendance-count/:employeeId'],
            [UserType.STOCK_MANAGER]: ['/user', '/employee/search', '/employee/update', '/stock','/api/mark-attendance','/api/attendance-count/:employeeId'],
            [UserType.FLEET_MANAGER]: ['/user', '/employee/search', '/employee/update', '/fleet', '/vehicle','/api/mark-attendance','/api/attendance-count/:employeeId'],
            [UserType.CUSTOMER_RELATIONSHIP_MANAGER]: ['/user', '/employee/search', '/employee/update','/api/mark-attendance','/api/attendance-count/:employeeId'],
            [UserType.CUSTOMER]: ['/user', '/customer', '/site/getall', '/site/getrequest', '/site/getstatus', '/package/get', '/package/getall', '/package/buy', '/package/boughts', '/packageaddon/getbyid', '/packageaddon/getall', '/finance/cuspay', '/finance/getall'],
            [UserType.WORKER]: ['/user', '/employee', '/customer', '/site', '/package', '/finance', '/biller', '/stock', '/packageaddon', '/fleet','/api/mark-attendance', '/vehicle','/api/attendance-count/:employeeId'],
        };

        const urlPrefix = "/" + req.originalUrl.split('/')[1];
        const urlPrefix2 = urlPrefix + "/" + req.originalUrl.split('/')[2];
        const hasAccess = accessRules[user.userType]?.includes(urlPrefix);
        const hasAccess2 = accessRules[user.userType]?.includes(urlPrefix2);

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