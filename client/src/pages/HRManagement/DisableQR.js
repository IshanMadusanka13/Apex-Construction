import React, { useState } from "react";
import axios from "axios";
import { Typography, Grid, TextField, Button, useTheme } from "@mui/material";
import moment from "moment";
import { DISABLE_QR } from "../../EndPoints.js"
import { errorAlert, successAlert } from "../../utils";

function DisableQR() {

    const theme = useTheme();

    const [formData, setFormData] = useState({
        date: "",
        reason: "",
    });

    const handleChange = (field, value) => {
        setFormData((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(DISABLE_QR, formData)
            .then((response) => {
                setFormData({
                    date: "",
                    reason: "",
                });
                successAlert("QR Disabled Successfully");
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
                <Grid
                    container
                    spacing={2}
                    component="form"
                    sx={theme.palette.gridBody}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Disable QR
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            type="date"
                            fullWidth
                            required
                            id="date"
                            name="date"
                            label="Date"
                            value={formData.date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => handleChange('date', moment(e.target.value).format('YYYY-MM-DD'))}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            name="reason"
                            id="reason"
                            label="Reason"
                            required
                            multiline
                            minRows={4}
                            value={formData.reason}
                            onChange={(e) => handleChange('reason', e.target.value)}
                        />
                    </Grid>

                    <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default DisableQR;
