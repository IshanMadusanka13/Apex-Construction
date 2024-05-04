import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { TextField, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Checkbox } from "@mui/material";
import axios from "axios";
import { SEARCH_EMPLOYEE } from "../../EndPoints";
import { errorAlert } from "../../utils.js";

export default function AttendanceView() {
    const theme = useTheme();
    const loggedUser = useSelector((state) => state.user);

    const [employeeDetails, setEmployeeDetails] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        attendance: [],
    });

    const [attendanceCount, setAttendanceCount] = useState(0);

    const [searchData, setSearchData] = useState({
        value: "",
        searchBy: "",
    });

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(SEARCH_EMPLOYEE + searchData.value + "/" + searchData.searchBy, {});
            setEmployeeDetails(response.data);
            fetchAttendanceCount(response.data.employeeId);
        } catch (error) {
            console.error('Error fetching employee details:', error);
            // Handle error
        }
    };

    const fetchAttendanceCount = async (employeeId) => {
        try {
            const response = await axios.get(`/api/attendance-count/:employeeId`);
            setAttendanceCount(response.data.count);
        } catch (error) {
            console.error('Error fetching attendance count:', error);
            // Handle error
        }
    };

    useEffect(() => {
        // Fetch employee details and attendance count when searchData changes
        if (searchData.value && searchData.searchBy) {
            fetchEmployeeDetails();
        }
    }, [searchData]);

    const handleChange = (field, value) => {
        setSearchData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchEmployeeDetails();
    };

    return (
        <Grid container spacing={3}>
            {/* Employee Details */}
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Employee Details
                </Typography>
            </Grid>
            {/* Search Form */}
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
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
                    <RadioGroup aria-label="searchBy" name="searchBy" onChange={(e) => handleChange('searchBy', e.target.value)}>
                        <FormControlLabel value="employeeId" control={<Radio />} label="Employee ID" />
                        <FormControlLabel value="email" control={<Radio />} label="Email" />
                    </RadioGroup>
                    <Button type="submit" variant="contained" fullWidth>
                        Search Employee
                    </Button>
                </form>
            </Grid>
            {/* Display Employee Details */}
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            required
                            disabled
                            fullWidth
                            id="employeeId"
                            label="Employee ID"
                            name="employeeId"
                            autoComplete="employeeId"
                            value={employeeDetails.employeeId}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            required
                            disabled
                            fullWidth
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            autoComplete="firstName"
                            value={employeeDetails.firstName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            required
                            disabled
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lastName"
                            value={employeeDetails.lastName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            required
                            disabled
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={employeeDetails.email}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {/* Display Attendance Records */}
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Attendance Records
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeDetails.attendance && employeeDetails.attendance.map((record, index) => (
                                <TableRow key={index}>
                                    <TableCell>{record.date}</TableCell>
                                    <TableCell>{record.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {/* Attendance Count */}
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Attendance Count This Month: {attendanceCount}
                </Typography>
            </Grid>
        </Grid>
    );
}
