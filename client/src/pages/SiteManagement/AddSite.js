import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, useTheme } from "@mui/material";
import axios from "axios";
import { CREATE_SITE, GENERATE_SITE_ID } from "../../EndPoints.js";
import { errorAlert, successAlert } from "../../utils.js";

function AddSite() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [siteDetails, setSiteDetails] = useState({
        siteId: "",
        customerId: "",
        location: "",
        notes: "",
        start: "",
        end: "",
        lastUpdate: "Initiated",
        completeStatus: 0,
    });

    const handleChange = (field, value) => {
        setSiteDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const loadSiteId = async () => {
        axios
            .get(GENERATE_SITE_ID, {})
            .then((response) => {
                console.log(response);
                handleChange('siteId', response.data)
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    useEffect(() => {
        loadSiteId();
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(CREATE_SITE, siteDetails)
            .then((response) => {
                setSiteDetails({
                    siteId: "",
                    customerId: "",
                    location: "",
                    notes: "",
                    start: "",
                    end: "",
                    lastUpdate: "Initiated",
                    completeStatus: 0,
                });
                loadSiteId();
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
                    disabled
                    value={siteDetails.siteId}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="custId"
                    label="Customer Id"
                    name="custId"
                    autoComplete="custId"
                    autoFocus
                    value={siteDetails.customerId}
                    onChange={(e) => handleChange('customerId', e.target.value)}
                />
            </Grid>

            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    autoComplete="location"
                    value={siteDetails.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                />
            </Grid>

            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    id="start"
                    label="Start Date"
                    name="start"
                    autoComplete="start"
                    value={siteDetails.start}
                    onChange={(e) => handleChange('start', e.target.value)}
                />
            </Grid>

            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    id="end"
                    label="Assumed End Date"
                    name="end"
                    autoComplete="end"
                    value={siteDetails.end}
                    onChange={(e) => handleChange('end', e.target.value)}
                />
            </Grid>

            <Grid item md={12}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="notes"
                    label="Notes"
                    name="notes"
                    autoComplete="notes"
                    value={siteDetails.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lUpdate"
                    label="Last Update"
                    name="lUpdate"
                    autoComplete="lUpdate"
                    value={siteDetails.lastUpdate}
                    disabled
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    id="cStatus"
                    label="Complete Status"
                    name="cStatus"
                    autoComplete="cStatus"
                    value={siteDetails.completeStatus}
                    disabled
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 2, width: "20%", borderRadius: "5" }}>
                Add Site
            </Button>
        </Grid>
    );

}

export default AddSite;