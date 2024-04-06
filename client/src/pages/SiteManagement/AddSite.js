import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
import axios from "axios";
import { CREATE_EMPLOYEE, GET_EMPLOYEE_ID } from "../../EndPoints.js";
import { errorAlert, successAlert, timedSuccessAlert, userTypes } from "../../utils.js";
import { useSelector } from 'react-redux';

function AddSiteDetails() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [siteDetails, setSiteDetails] = useState({
        custId: "",
        siteId: "",
        location: "",
        notes: "",
        start: "",
        end: "",
    });

    const handleChange = (field, value) => {
        setSiteDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:3001/site/create", siteDetails)
            .then((response) => {
                console.log("sucess response - " + response);
                successAlert("Site Created successfully");
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    return (
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
                    Add Site Details
                </Typography>
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="siteId"
                    name="siteId"
                    label="Site Id"
                    autoComplete="siteId"
                    onChange={(e) => handleChange('siteId', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="custId"
                    label="custId"
                    name="custId"
                    autoComplete="custId"
                    autoFocus
                    onChange={(e) => handleChange('custId', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    autoComplete="location"
                    onChange={(e) => handleChange('location', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id=" notes"
                    label="Notes"
                    name=" notes"
                    autoComplete=" notes"
                    onChange={(e) => handleChange('notes', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    id="start"
                    label="Start"
                    name="start"
                    autoComplete="start"
                    onChange={(e) => handleChange('start', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    id="end"
                    label="End"
                    name="end"
                    autoComplete="end"
                    onChange={(e) => handleChange('end', e.target.value)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 2, width: "20%", borderRadius: "5" }}>
                Confirm
            </Button>
        </Grid>
    );

}

export default AddSiteDetails;