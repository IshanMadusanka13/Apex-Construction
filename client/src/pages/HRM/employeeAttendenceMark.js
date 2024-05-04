import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MARK_ATTENDANCE, ATTENDANCE_RECORDS } from "../../EndPoints";

function Attendance() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const loggedUser = useSelector((state) => state.user);

    useEffect(() => {
        fetchAttendanceRecords();
    }, []);

    const fetchAttendanceRecords = async () => {
        try {
            const response = await axios.get(ATTENDANCE_RECORDS.replace(':employeeId', loggedUser.employeeId)); // Replace :employeeId with actual employeeId
            setAttendanceRecords(response.data);
        } catch (error) {
            console.error('Error fetching attendance records:', error);
        }
    };

    const handleMarkAttendance = async () => {
        try {
            const response = await axios.post(MARK_ATTENDANCE.replace(':employeeId', loggedUser.employeeId), {
                date: new Date().toISOString().split('T')[0], 
                status: true 
            });
            console.log('Attendance marked successfully:', response.data);
            fetchAttendanceRecords();
        } catch (error) {
            console.error('Error marking attendance:', error);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: "100%",
                height: "auto",
                padding: "2em",
            }}
        >
            <Typography variant="h2" align="center" gutterBottom>
                Attendance
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 5 }}>
                <Grid item xs={12} md={6}>
                    <Button
                        variant="contained"
                        onClick={handleMarkAttendance}
                        sx={{
                            width: "100%",
                        }}
                    >
                        Mark Today’s Attendance
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 5 }}>
                <Grid item xs={12} md={8}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attendanceRecords.map((record) => (
                                    <TableRow key={record.id}>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>{record.status ? "true" : "false"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Attendance;
