import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { TextField, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme, Divider, Box } from "@mui/material";
import axios from "axios";
import { DELETE_EMPLOYEE, GET_EMPLOYEE_COUNT, SEARCH_EMPLOYEE } from "../../EndPoints";
import { errorAlert, successAlert } from "../../utils.js";
import moment from "moment";
import { useNavigate } from "react-router";

function ViewEmployee() {

    const theme = useTheme();
    const navigate = useNavigate();

    const loggedUser = useSelector((state) => state.user);
    const [totalEmployeeCount, setTotalEmployeeCount] = useState("");
    const [seperateEmployeeCount, setSeperateEmployeeCount] = useState("");
    const [showDeleteButton, setShowDeleteButton] = useState(false);
    const [searchData, setsearchData] = useState({
        value: "",
        searchBy: "",
    });

    const [employeeDetails, setEmployeeDetails] = useState({
        employeeId: "",
        role: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        nic: "",
        no: "",
        street: "",
        city: "",
        mobileNo: "",
        email: "",
    });

    useEffect(() => {
        getCount();
    }, [navigate]);

    const getCount = () => {
        axios
            .get(GET_EMPLOYEE_COUNT, {})
            .then((response) => {
                setTotalEmployeeCount(response.data.totalCount);
                setSeperateEmployeeCount(response.data.seperateCount);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    }

    const handleChange = (field, value) => {
        setsearchData((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .get(SEARCH_EMPLOYEE + searchData.value + "/" + searchData.searchBy, {})
            .then((response) => {
                setEmployeeDetails(response.data);
                setShowDeleteButton(true);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const handleDelete = () => {
        axios
            .delete(DELETE_EMPLOYEE + employeeDetails.email + "/" + loggedUser.userType, {})
            .then((response) => {
                setEmployeeDetails({
                    employeeId: "",
                    role: "",
                    firstName: "",
                    lastName: "",
                    dateOfBirth: "",
                    gender: "",
                    nic: "",
                    no: "",
                    street: "",
                    city: "",
                    mobileNo: "",
                    email: "",
                })
                getCount();
                successAlert(response.data.message);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    return (
        <Grid container>
            <Grid item md={8}>
                <Grid
                    item md={12}
                    spacing={2}
                    component="form"
                    sx={theme.palette.gridBody}
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Grid item md={12}>
                        <Typography variant="h5" gutterBottom>
                            View Employee
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="search"
                            label="Search"
                            name="search"
                            autoComplete="search"
                            autoFocus
                            onChange={(e) => handleChange('value', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RadioGroup aria-label="searchBy" name="searchBy" onChange={(e) => handleChange('searchBy', e.target.value)}>
                            <FormControlLabel value="employeeId" control={<Radio />} label="Employee ID" />
                            <FormControlLabel value="email" control={<Radio />} label="Email" />
                        </RadioGroup>
                    </Grid>

                    <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                        Search Employee
                    </Button>
                    {showDeleteButton && (
                        <Button variant="contained" sx={{ mt: 3, ml: 2 }} onClick={handleDelete}>
                            Delete Employee
                        </Button>
                    )}
                </Grid>
                <Grid item md={12} sx={theme.palette.gridBody}>
                    <Grid container columnSpacing={4} rowSpacing={1}>
                        {Object.keys(employeeDetails).map((key) => {

                            if (!["employeeId", "role", "firstName", "lastName", "dateOfBirth", "gender", "nic", "no", "street", "city", "mobileNo", "email"].includes(key)) {
                                return null;
                            }

                            if (key == "dateOfBirth") {
                                return (
                                    <Grid item md={6} key={key}>
                                        {key.toUpperCase()}
                                        <TextField
                                            margin="normal"
                                            required
                                            disabled
                                            fullWidth
                                            id={key}
                                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                                            name={key}
                                            autoComplete={key}
                                            value={moment(employeeDetails[key]).format('YYYY-MM-DD')}
                                        />
                                    </Grid>
                                );
                            } else {
                                return (
                                    <Grid item md={6} key={key}>
                                        {key.toUpperCase()}
                                        <TextField
                                            margin="normal"
                                            required
                                            disabled
                                            fullWidth
                                            id={key}
                                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                                            name={key}
                                            autoComplete={key}
                                            value={employeeDetails[key]}
                                        />
                                    </Grid>
                                );
                            }
                        })}

                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={3} sx={theme.palette.gridBody} textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Total Employees
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {totalEmployeeCount}
                </Typography>

                {seperateEmployeeCount.length > 0 ? seperateEmployeeCount.map(count => (
                    <Box>
                        <Divider /><Divider />

                        <Typography variant="h5" gutterBottom>
                            {count._id.toUpperCase()}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {count.count}
                        </Typography>

                    </Box>
                )) : (
                    <Box></Box>
                )}

            </Grid>
        </Grid>
    );

}

export default ViewEmployee;