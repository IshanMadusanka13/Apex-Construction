const Leave = require('../models/leaveModel');

class LeaveController {
    async getLeaveRequests(req, res) {
        try {
            const leaveRequests = await Leave.find();
            res.json(leaveRequests);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async acceptLeaveRequest(req, res) {
        const { id } = req.params;
        try {
            const leaveRequest = await Leave.findById(id);
            if (!leaveRequest) {
                return res.status(404).json({ message: 'Leave request not found' });
            }
            leaveRequest.status = 'accepted';
            await leaveRequest.save();
            res.json({ message: 'Leave request accepted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async declineLeaveRequest(req, res) {
        const { id } = req.params;
        try {
            const leaveRequest = await Leave.findById(id);
            if (!leaveRequest) {
                return res.status(404).json({ message: 'Leave request not found' });
            }
            leaveRequest.status = 'declined';
            await leaveRequest.save();
            res.json({ message: 'Leave request declined' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new LeaveController();
