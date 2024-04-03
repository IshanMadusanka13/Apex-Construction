import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
import axios from "axios";
import { CREATE_EMPLOYEE, GET_EMPLOYEE_ID } from "../../EndPoints.js";
import { timedSuccessAlert, userTypes } from "../../utils.js";
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function AllSite() {

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

    const handleChange = (field, value) => {
        setEmployeeDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        const loadEmployeeId = async () => {
            axios
                .get(GET_EMPLOYEE_ID, {})
                .then((response) => {
                    console.log(response);
                    handleChange('', response.data)
                })
                .catch((error) => {
                    console.log(error);
                    //navigate("/error");
                });
        };

        loadEmployeeId();
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(CREATE_EMPLOYEE, employeeDetails)
            .then((response) => {
                console.log("sucess response - " + response);
                timedSuccessAlert("Employee Created successfully");
            })
            .catch((error) => {
                console.log(error);
                //navigate("/error");
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
                    All Site Details
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



           
        
            
            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Cancel
            </Button>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Conform Site Details 
            </Button>
        </Grid>
    );

}

export default AllSite;