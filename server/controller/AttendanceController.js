import logger from '../utils/logger.js';
import QRCode from 'qrcode';
import AttendanceGenerate from '../models/AttendanceGenerate.js';
import AttendanceMark from '../models/AttendanceMark.js';
import moment from 'moment';

const AttendanceController = {

    generateQR: async (req, res) => {
        try {

            AttendanceGenerate
                .updateOne(
                    { validity: true },
                    {
                        $set: {
                            validity: false,
                        }
                    }
                )

            logger.info("Old QR Disabled");

            let QRData = {
                "name": "Apex Construction",
                "type": "Daily Attendance QR",
                "date": new Date(),
            }

            const qrCodeString = await QRCode.toDataURL(JSON.stringify(QRData));

            const attendanceGenerate = new AttendanceGenerate({ code: qrCodeString });
            await attendanceGenerate.save();

            logger.info("New QR Generated");
            res.status(200).json("Done");

        } catch (error) {
            logger.error("Generating QR Failed");
            res.status(400).json({ message: error.message });
        }
    },

    displayQR: async (req, res) => {
        try {

            const attendanceQR = await AttendanceGenerate.findOne({ validity: true });
            logger.info("Got QR Details");
            res.status(200).json(attendanceQR);

        } catch (error) {
            logger.error("Getting QR failed");
            res.status(400).json({ message: error.message });
        }
    },

    getAllAttendanceRecords: async (req, res) => {
        try {

            const attendanceRecords = await Attendance.find({ employeeId: req.params.id });
            logger.info("Got Attendance by Employee Id");
            res.status(200).json(attendanceRecords);

        } catch (error) {
            logger.error("Getting Attendance by Employee Id failed");
            res.status(400).json({ message: error.message });
        }
    },

    markAttendance: async (req, res) => {
        try {
            const { employeeId, markedDate, markedTime } = req.body;
            const markedTimeDate = moment(markedTime, 'hh:mm:ss A').toDate();
            let msg;

            let attendanceRecord = await AttendanceMark.findOne({
                employeeId,
                date: markedDate
            });

            if (!attendanceRecord) {

                attendanceRecord = new AttendanceMark({
                    employeeId,
                    date: markedDate,
                    CheckInTime: markedTimeDate,
                    status: true
                });
                msg = "In Time Marked as "+ markedTime +". Good Day!!"

            } else {

                AttendanceMark.updateOne(
                    { employeeId, date: markedDate },
                    { $set: { CheckOutTime: markedTimeDate } }
                )
                msg = "Out Time Marked as "+ markedTime +". Good Bye!!"
            }

            await attendanceRecord.save();

            logger.info("Attendance Marked Successfully");
            res.status(200).json({ message: msg });

        } catch (error) {
            logger.error("Marking Attendance Failed");
            res.status(400).json({ message: error.message });
        }
    },
}

export default AttendanceController;