import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MARK_ATTENDANCE, SEARCH_EMPLOYEE } from "../../EndPoints";
import { errorAlert, successAlert } from "../../utils";
import { Html5QrcodeScanner } from 'html5-qrcode';
import moment from 'moment';

function Attendance() {
    const loggedUser = useSelector((state) => state.user);

    const handleSubmit = () => {

        const scanner = new Html5QrcodeScanner(
            'reader',
            { fps: 10, qrbox: 250 },
            false
        );

        scanner.render(
            (decodedText) => {
                console.log(`QR Code detected: ${decodedText}`);
                getEmployeeIdAndMarkAttendance(decodedText);
                scanner.clear();
            },
            (error) => {
                console.error(`QR Code scan error: ${error}`);
            }
        );

        return () => {
            scanner.clear();
        };
    };

    const getEmployeeIdAndMarkAttendance = (decodedText) => {

        let parsedData, dateValue, timeValue;
        try {
            parsedData = JSON.parse(decodedText);
            if (parsedData.name === "Apex Construction" && parsedData.type === "Daily Attendance QR") {
                dateValue = moment(parsedData.date).format('YYYY-MM-DD');
                timeValue = moment(parsedData.date).format('hh:mm:ss A');
            } else {
                errorAlert("Invalid QR");
                return false;
            }
        } catch (error) {
            errorAlert("Invalid QR");
            return false;
        }

        axios
            .get(SEARCH_EMPLOYEE + loggedUser._id + "/userId", {})
            .then((response) => {
                handleMarkAttendance(dateValue, timeValue, response.data.employeeId);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    }

    const handleMarkAttendance = (dateValue, timeValue, employeeId) => {
        axios
            .post(MARK_ATTENDANCE, { employeeId: employeeId, markedDate: dateValue, markedTime: timeValue })
            .then((response) => {
                successAlert(response.data.message);
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
                <Grid item md={12}>
                    <Box id="reader" width="100%"></Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Attendance;
