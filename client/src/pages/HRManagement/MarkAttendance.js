import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MARK_ATTENDANCE, ATTENDANCE_RECORDS, SEARCH_EMPLOYEE } from "../../EndPoints";
import { errorAlert, successAlert } from "../../utils";

function Attendance() {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const loggedUser = useSelector((state) => state.user);

    const handleSubmit = () => {
        axios
            .get(SEARCH_EMPLOYEE + loggedUser._id + "/userId", {})
            .then((response) => {
                handleMarkAttendance(response.data.employeeId);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    }

    const handleMarkAttendance = (employeeId) => {
        console.log(loggedUser._id);
        console.log(employeeId);
        axios
            .post(MARK_ATTENDANCE, { employeeId: employeeId })
            .then((response) => {
                successAlert("Attendance marked successfully");
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
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
                        onClick={handleSubmit}
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
