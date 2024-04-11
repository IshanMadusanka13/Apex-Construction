import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, CircularProgress, useTheme, Avatar } from "@mui/material";
import axios from "axios";
import { CREATE_EMPLOYEE, GET_EMPLOYEE_ID } from "../../EndPoints.js";
import { timedSuccessAlert } from "../../utils.js";
import { useSelector } from 'react-redux';

function SiteProfile() {
    const navigate = useNavigate();
    const theme = useTheme();
    const loggedUser = useSelector((state) => state.user);

    const [siteDetails, setSiteDetails] = useState({
        siteId: "",
        siteName: "",
        siteLocation: "",
        siteProgress: "",
    });

    const [sitePhoto, setSitePhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setSiteDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handlePhotoUpload = (event) => {
        const photo = event.target.files[0];
        setSitePhoto(photo);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        // Upload site photo logic here using sitePhoto state

        axios
            .post(CREATE_EMPLOYEE, siteDetails)
            .then((response) => {
                console.log("success response - " + response);
                timedSuccessAlert("Site Created successfully");
            })
            .catch((error) => {
                console.log(error);
                //navigate("/error");
            })
            .finally(() => {
                setLoading(false);
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
                    label="Site ID"
                    name="siteId"
                    autoComplete="siteId"
                    value={siteDetails.siteId}
                    onChange={(e) => handleChange('siteId', e.target.value)}
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="siteName"
                    label="Site Name"
                    name="siteName"
                    autoComplete="siteName"
                    value={siteDetails.siteName}
                    onChange={(e) => handleChange('siteName', e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="siteLocation"
                    label="Site Location"
                    name="siteLocation"
                    autoComplete="siteLocation"
                    value={siteDetails.siteLocation}
                    onChange={(e) => handleChange('siteLocation', e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="siteProgress"
                    label="Site Progress"
                    name="siteProgress"
                    autoComplete="siteProgress"
                    value={siteDetails.siteProgress}
                    onChange={(e) => handleChange('siteProgress', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: "none" }}
                    onChange={handlePhotoUpload}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                        Upload Site Photo
                    </Button>
                </label>
                {sitePhoto && <Avatar alt="Site Photo" src={URL.createObjectURL(sitePhoto)} />}
            </Grid>

            {/* Add circular progress here */}
            {loading && (
                <Grid item xs={12}>
                    <CircularProgress />
                </Grid>
            )}
            
            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Confirm 
            </Button>
        </Grid>
    );
}

export default SiteProfile;
