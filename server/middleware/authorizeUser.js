import { UserType } from "../utils/enums/UserEnums.js";
import logger from "../utils/logger.js";

const authorizeUser = async (req, res, next) => {
logger.info("In");
    if (req.headers.usertype) {
        const accessRules = {
            [UserType.HR_MANAGER]: ['/user','/employee'],
            [UserType.CUSTOMER]: ['/user','/customer'],
        };

        const hasAccess = accessRules[req.headers.usertype]?.includes(req.originalUrl);
        const urlPrefix = "/"+req.originalUrl.split('/')[1];
        const hasAccess2 = accessRules[req.headers.usertype]?.some(rule => urlPrefix.startsWith(rule));

        if (hasAccess || hasAccess2) {
            next();
        } else {
            logger.info("User Access Revoked");
            res.status(403).json({ message: 'Unauthorized' });
        }
    }else{
        next();
    }
}

export default authorizeUser;