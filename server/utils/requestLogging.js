import logger from "./logger.js";

const requestLogging = async (req, res, next) => {
    let token;

    if(req.headers.userid) {
        try {
            logger.info(`(${req.headers.userid}): [${req.method}] [${req.url}] Request Received`);
            next()
        } catch(err) {
            logger.error('Error ' + err.message);
        }
    }
}

export default requestLogging;