import app from "./app.js";
import logger from "./utils/logger.js";
import connectDatabase from "./utils/database.js";
import scheduleQR from "./utils/automateQR.js";

const PORT = process.env.PORT || 3001;
const HOST = '192.168.43.26';

app.listen(PORT,HOST,  () => {
    logger.info(`Server has started and running on PORT ${PORT}`);
    connectDatabase();
    scheduleQR();
  });