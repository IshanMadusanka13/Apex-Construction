import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, CircularProgress, LinearProgress, useTheme, Avatar } from "@mui/material";
import axios from "axios";
import { CREATE_EMPLOYEE, GET_EMPLOYEE_ID } from "../../EndPoints.js";
import { timedSuccessAlert, userTypes } from "../../utils.js";
import { useSelector } from 'react-redux';

function SiteProfile() {

    const navigate = useNavigate();
    const theme = useTheme();
    const loggedUser = useSelector((state) => state.user);

    const [employeeDetails, setEmployeeDetails] = useState({
        custId:"",
        siteId: "",
        dateOfBirth: "",
        siteState: "",
        start: "",
        PhoneNo: "",
        email:"",
    });

    // State for customer photo
    const [customerPhoto, setCustomerPhoto] = useState(null);

    // State for circular progress visibility
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setEmployeeDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        const loadEmployeeId = async () => {
            setLoading(true); // Start the loading indicator
            axios
                .get(GET_EMPLOYEE_ID, {})
                .then((response) => {
                    console.log(response);
                    handleChange('', response.data)
                })
                .catch((error) => {
                    console.log(error);
                    //navigate("/error");
                })
                .finally(() => {
                    setLoading(false); // Stop the loading indicator
                });
        };

        loadEmployeeId();
    }, [navigate]);

    const handlePhotoUpload = (event) => {
        const photo = event.target.files[0];
        setCustomerPhoto(photo);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // You need to handle photo upload here using customerPhoto state
        setLoading(true); // Start the loading indicator
        axios
            .post(CREATE_EMPLOYEE, employeeDetails)
            .then((response) => {
                console.log("success response - " + response);
                timedSuccessAlert("Employee Created successfully");
            })
            .catch((error) => {
                console.log(error);
                //navigate("/error");
            })
            .finally(() => {
                setLoading(false); // Stop the loading indicator
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
                    id=""
                    label="Employee Id"
                    name="employeeId"
                    autoComplete="employeeId"
                    value={employeeDetails.employeeId}
                    autoFocus
                    disabled
                />
            </Grid>
            <Grid item md={6}>
                <input
                    accept="image1/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    style={{ display: "none" }}
                    onChange={handlePhotoUpload}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                        Upload Customer Photo
                    </Button>
                </label>
                {customerPhoto && <Avatar alt="Customer Photo" src={URL.createObjectURL(customerPhoto)} />}
            </Grid>
            
            <Grid item md={6}>
                <input
                    accept="image2/*"
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
                {customerPhoto && <Avatar alt="Customer Photo" src={URL.createObjectURL(customerPhoto)} />}
            </Grid>

            {/* Add circular progress here */}
            {loading && (
                <Grid item xs={12}>
                    <CircularProgress />
                </Grid>
            )}
            
            {/* Add your other form fields and components here */}
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
