import Leave from "../models/Leave.js"
import logger from "../utils/logger.js";

const LeaveController = {

    getLeaveRequests: async (req, res) => {
        try {

            const leaveRequests = await Leave.find();

            logger.info("Getting leave requests succesfull");
            res.status(200).json(leaveRequests);

        } catch (error) {
            logger.error("Getting leave requests failed");
            res.status(400).json({ message: error.message });
        }
    },

    getLeaveRequestsByEmployeeId: async (req, res) => {
        try {

            const leaveRequests = await Leave.find({ employeeId: req.params.id });

            logger.info("Getting leave requests by empId succesfull");
            res.status(200).json(leaveRequests);

        } catch (error) {
            logger.error("Getting leave requests by empId failed");
            res.status(400).json({ message: error.message });
        }
    },

    createLeaveRequest: async (req, res) => {
        const { employeeId, reason, date } = req.body;
        try {

            const leave = new Leave({
                employeeId: employeeId,
                reason: reason,
                date: date,
            });

            await leave.save();

            logger.info("Leave request Created succesfull");
            res.status(200).json(leave);

        } catch (error) {
            logger.error("Leave request Creation failed");
            res.status(400).json({ message: error.message });
        }
    },

    updateLeaveRequest: async (req, res) => {
        const { id, status } = req.body;
        try {

            const leaveRequest = await Leave.updateOne(
                { _id: id },
                {
                    $set: {
                        status: status,
                    }
                },
                { new: true }
            );
            if (!leaveRequest) {
                return res.status(404).json({ message: 'Leave request not found' });
            }

            logger.info("Leave request Update succesfull");
            res.status(200).json(leaveRequest);

        } catch (error) {
            logger.error("Leave request Update failed");
            res.status(400).json({ message: error.message });
        }
    },

    deleteLeave: async (req, res) => {
        Leave
            .deleteOne({ _id: req.params.id })
            .then((result) => {
                logger.info("Leave Deleted Successfully");
                res.send(result);
            })
            .catch((err) => {
                logger.error("Leave Deleted Failed");
                res.status(500).json({ message: "Error deleting Leave" });
            });
    },
}

export default LeaveController;