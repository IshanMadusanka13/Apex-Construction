// routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Attendance = require('../models/Attendance');

// POST /api/attendance/mark
router.post('/mark', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;

        // Create new attendance record
        const attendance = new Attendance({
            employee: req.employee.id,
            status
        });
        await attendance.save();

        res.json({ message: 'Attendance marked successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;
