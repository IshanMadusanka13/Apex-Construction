import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
import axios from "axios";
import { CREATE_BILLER, CREATE_EMPLOYEE, GET_EMPLOYEE_ID } from "../../EndPoints";
import { errorAlert, successAlert, timedSuccessAlert, userTypes } from "../../utils.js";
import { useSelector } from 'react-redux';

function Biller() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [billerDetails, setBillerDetails] = useState({
        billerId: "",
        type: "",
        name: "",
        bank: "",
        branch: "",
        accountNo: "",
    });

    const handleChange = (field, value) => {
        setBillerDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(CREATE_BILLER, billerDetails)
            .then((response) => {
                successAlert("Biller Created Succesfully");
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
                    Add Biller
                </Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="billerId"
                    label="Biller Id"
                    name="billerId"
                    autoComplete="billerId"
                    value={billerDetails.billerId}
                    disabled
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="type"
                    label="Biller type"
                    name="type"
                    autoComplete="type"
                    autoFocus
                    onChange={(e) => handleChange('type', e.target.value)}
                >
                </TextField>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    onChange={(e) => handleChange('name', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="bank"
                    label="Bank"
                    name="bank"
                    autoComplete="bank"
                    onChange={(e) => handleChange('bank', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="branch"
                    label="Branch"
                    name="branch"
                    autoComplete="branch"
                    onChange={(e) => handleChange('branch', e.target.value)}
                />
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="accountNo"
                    label="Account Number"
                    name="accountNo"
                    autoComplete="accountNo"
                    onChange={(e) => handleChange('accountNo', e.target.value)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                Add Biller
            </Button>
        </Grid>
    );

}

export default Biller;