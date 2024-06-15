import cron from 'node-cron';
import AttendanceController from '../controller/AttendanceController.js';

export default function scheduleQR () {
    cron.schedule('0 3 * * 1-5', async () => {
        await AttendanceController.generateQR();
        logger.info("Scheduled QR generation executed at 3 AM.");
    });
}