import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import axios from 'axios';
import { DISPLAY_QR, CREATE_QR } from "../../EndPoints";
import { errorAlert, successAlert } from "../../utils";
import moment from "moment";

function DisplayQR() {
    const [qrData, setQRData] = useState(null);
    const [currentDateTime, setCurrentDateTime] = useState(moment());
    const theme = useTheme();

    useEffect(() => {

        axios
            .get(DISPLAY_QR, {})
            .then((response) => {
                console.log(response);
                setQRData(response.data.code)
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(moment());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Grid container spacing={3} style={{ marginTop: 100, marginLeft: 60, minHeight: "40vh" }}>

            <Grid item md={6} sx={theme.palette.gridBody} align="center">
                <Typography variant="h2">
                    Scan To Mark Attendance
                </Typography>
                <Typography variant="h4">
                    {moment().format('MMMM Do, YYYY')}
                </Typography>
                <Typography variant="h4">
                    {currentDateTime.format('hh:mm:ss A')}
                </Typography>
            </Grid>

            <Grid item md={5} sx={theme.palette.gridBody} align="center">
                {qrData ? (
                    <img src={qrData} alt="QR Code" />
                ) : (
                    <Box>No valid QR code available</Box>
                )}
            </Grid>
        </Grid>
    );
}

export default DisplayQR;
