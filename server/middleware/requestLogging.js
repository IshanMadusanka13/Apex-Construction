import logger from "../utils/logger.js";

const requestLogging = async (req, res, next) => {
    let token;

    if(req.headers.userid) {
        try {
            logger.info(`[${req.headers.userid}]: [${req.method}] [${req.originalUrl}] Request Received`);
            next()
        } catch(err) {
            logger.error('Error ' + err.message);
        }
    }else{
        next();
    }
}

export default requestLogging;