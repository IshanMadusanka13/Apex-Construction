import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { TextField, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme,TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import axios from "axios";
import { GET_EMPLOYEE_COUNT, SEARCH_EMPLOYEE } from "../../EndPoints";
import { errorAlert, successAlert } from "../../utils.js";

export default function AttendanceView(){

    const theme = useTheme();

    const todayAttendedEmployees = [
        { id: 1, name: 'John Doe', role: 'Developer' },
        { id: 2, name: 'Jane Smith', role: 'Manager' },
        // Add more data as needed
    ];

    const loggedUser = useSelector((state) => state.user);
    const [employeeCount, setEmployeeCount] = useState("");

    const [searchData, setsearchData] = useState({
        value: "",
        searchBy: "",
    });

    const [employeeDetails, setEmployeeDetails] = useState({
        employeeId: "",
        role: "",
        firstName: "",
        lastName: "",
        email: "",
    });

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
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };




    return(
        <Grid container>
        <Grid item md={8}>
            <Grid
                item md={5}
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

            </Grid>
            <Grid item md={12} sx={theme.palette.gridBody}>
                <Grid container columnSpacing={4} rowSpacing={1}>
                    {Object.keys(employeeDetails).map((key) => {

                        if (!["employeeId", "role", "firstName", "lastName","email"].includes(key)) {
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
        
        <Grid container spacing={3}>
        <Grid item md={8} sx={theme.palette.gridBody} textAlign="center">
        <Typography variant="h5" gutterBottom>
            Today's Attended Employees
        </Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Map through your attended employee data and display each row */}
                    {todayAttendedEmployees.map(employee => (
                        <TableRow key={employee.id}>S
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>{employee.name}</TableCell>
                            <TableCell>{employee.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Grid>
</Grid>

    </Grid>
    </Grid>
    );
}