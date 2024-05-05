import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { TextField, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme } from "@mui/material";
import axios from "axios";
import { DELETE_EMPLOYEE, SEARCH_EMPLOYEE, ASSIGN_SALARY } from "../../EndPoints.js";
import { errorAlert, successAlert } from "../../utils.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";

function EmployeeSalary() {

    const theme = useTheme();

    const loggedUser = useSelector((state) => state.user);
    const [employeeCount, setEmployeeCount] = useState("");
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
    });

    const [salaryDetails, setSalaryDetails] = useState({
        employeeId: "",
        basicSalary: "",
        allowance: "",
        performanceBasedSalary: ""
    });

    const handleSalaryChange = (field, value) => {
        // Validate for positive numbers
        if (isNaN(value) || value < 0) {
            errorAlert("Please enter a valid positive number.");
            return;
        }

        setSalaryDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };


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
                salaryDetails.employeeId = response.data.employeeId;
                setShowDeleteButton(true);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const handleDelete = () => {
        axios
            .get(DELETE_EMPLOYEE + employeeDetails.email + "/" + loggedUser.userType, {})
            .then((response) => {
                successAlert(response.data.message);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const handleAssignSalary = () => {

        axios.post(ASSIGN_SALARY, salaryDetails)
            .then((response) => {
                successAlert(response.data.message);
                generatePDFReport();
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        const tableHead = [
            ['Employee Id', 'Basic Salary', 'Allowance', 'Performance', 'Date'],
        ];
        const tableBody = [
            [
                salaryDetails.employeeId,
                salaryDetails.basicSalary,
                salaryDetails.allowance,
                salaryDetails.performanceBasedSalary,
                moment().format('MM-YYYY,')
            ]
        ];

        doc.text('Salary Report', 10, 15);
        doc.autoTable({
            head: tableHead,
            body: tableBody,
            startY: 20,
            columnWidths: [50, 50, 30, 30],
        });
        doc.save("Salary_report.pdf");
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
                            Search Employee
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

                            if (!["employeeId", "role", "firstName", "lastName"].includes(key)) {
                                return null;
                            }

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
                        })}

                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={3.5} sx={theme.palette.gridBody} textAlign="center">
                <Typography variant="h4" gutterBottom>
                    Assign Salary
                </Typography>
                <Grid item md={12} sx={{ mt: 3 }}>
                    {/* Basic Salary */}
                    <TextField
                        id="basic-salary"
                        label="Basic Salary රු."
                        variant="outlined"
                        value={salaryDetails.basicSalary}
                        onChange={(e) => handleSalaryChange('basicSalary', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {/* Allowance */}
                    <TextField
                        id="allowance"
                        label="Allowance රු."
                        variant="outlined"
                        value={salaryDetails.allowance}
                        onChange={(e) => handleSalaryChange('allowance', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {/* Performance Based Salary */}
                    <TextField
                        id="performance-salary"
                        label="Performance based Salary රු."
                        variant="outlined"
                        value={salaryDetails.performanceBasedSalary}
                        onChange={(e) => handleSalaryChange('performanceBasedSalary', e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    {/* Assign Salary Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, width: "50%" }}
                        onClick={handleAssignSalary}
                    >
                        Assign Salary
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );

}

export default EmployeeSalary;
