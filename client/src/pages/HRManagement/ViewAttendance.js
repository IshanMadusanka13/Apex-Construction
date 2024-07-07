import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Checkbox, Box, tableCellClasses, styled, TablePagination, Paper } from "@mui/material";
import axios from "axios";
import { GET_ATTENDANCE_BY_ID, GET_WORKING_DAYS_BY_MONTH, SEARCH_EMPLOYEE } from "../../EndPoints";
import { errorAlert, userTypes } from "../../utils.js";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from "moment";

export default function ViewAttendance() {
    const theme = useTheme();
    const navigate = useNavigate();
    const loggedUser = useSelector((state) => state.user);

    //--------------------------Table Functions------------------------------
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.default,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.mainOpacity,
        },
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.primary.mainOpacity2,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    //--------------------------Table Functions end------------------------------

    const [employeeDetails, setEmployeeDetails] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        email: "",
        attendance: [],
    });

    const [attendanceCount, setAttendanceCount] = useState([]);
    const [attendanceDetails, setAttendanceDetails] = useState([]);

    const [searchData, setSearchData] = useState({
        value: "",
        searchBy: "",
    });

    const handleChange = (field, value) => {
        setSearchData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };

    useEffect(() => {
        console.log(loggedUser)
        if (loggedUser.userType != userTypes.ADMIN && loggedUser.userType != userTypes.HR_MANAGER) {
            axios
                .get(SEARCH_EMPLOYEE + loggedUser.email + "/email", {})
                .then((response) => {
                    setEmployeeDetails(response.data);
                    getAttendances(response.data.employeeId);
                })
                .catch((error) => {
                    console.log(error);
                    errorAlert(error.response.data.message);
                });
        }

    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .get(SEARCH_EMPLOYEE + searchData.value + "/" + searchData.searchBy, {})
            .then((response) => {
                setEmployeeDetails(response.data);
                getAttendances(response.data.employeeId);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const getAttendances = (employeeId) => {
        axios
            .get(GET_ATTENDANCE_BY_ID + employeeId)
            .then(response => {
                const attendanceRecords = response.data;
                console.log(attendanceRecords);
                setAttendanceDetails(attendanceRecords);
                getStatsforMonth(new Date());

            })
            .catch(error => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const localizer = momentLocalizer(moment);
    const events = attendanceDetails.map((record) => {
        const title = record.status ? 'Present' : 'Absent';
        const start = new Date(record.date);
        const end = new Date(record.date);
        const backgroundColor = record.status ? 'green' : 'red';

        return { title, start, end, style: { backgroundColor } };
    });
    const eventPropGetter = (event) => {
        const backgroundColor = event.title === 'Present' ? 'green' : 'red';
        return { style: { backgroundColor } };
    };

    const getStatsforMonth = (date) => {
        setAttendanceCount([]);
        const currentMonth = date.getMonth() + 1;
        const currentYear = date.getFullYear();
        axios
            .get(GET_WORKING_DAYS_BY_MONTH + "/" + currentMonth + "/" + currentYear)
            .then(response => {
                var workingDays = response.data;

                const attendanceCountByMonthYear = {};
                attendanceDetails.map((record) => {
                    const recDdate = moment(record.date);
                    if (parseInt(recDdate.format('MM'), 10) === currentMonth && parseInt(recDdate.format('YYYY'), 10) === currentYear) {
                        const monthYear = `${recDdate.format('YYYY')} ${recDdate.format('MMMM')}`;
                        if (!attendanceCountByMonthYear[monthYear]) {
                            attendanceCountByMonthYear[monthYear] = { month: monthYear, workingDays: workingDays, present: 0, absent: 0 };
                        }
                        if (record.status) {
                            attendanceCountByMonthYear[monthYear].present++;
                        }
                        attendanceCountByMonthYear[monthYear].absent = attendanceCountByMonthYear[monthYear].workingDays - attendanceCountByMonthYear[monthYear].present;
                        setAttendanceCount(attendanceCountByMonthYear)
                    }
                });
            })
            .catch(error => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    return (

        <Grid container spacing={2}>
            {(loggedUser.userType === userTypes.ADMIN || loggedUser.userType === userTypes.HR_MANAGER) && (
                <Grid item md={6} >
                    <Grid
                        container
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

                        <Grid item md={6}>
                            <RadioGroup aria-label="searchBy" name="searchBy" onChange={(e) => handleChange('searchBy', e.target.value)}>
                                <FormControlLabel value="employeeId" control={<Radio />} label="Employee ID" />
                                <FormControlLabel value="email" control={<Radio />} label="Email" />
                            </RadioGroup>
                        </Grid>

                        <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                            Search Employee
                        </Button>
                    </Grid>
                </Grid>
            )}
            {(loggedUser.userType === userTypes.ADMIN || loggedUser.userType === userTypes.HR_MANAGER) && (
                <Grid item md={6}>
                    <Grid container sx={theme.palette.gridBody} spacing={2}>
                        <Grid item md={6}>
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
                        <Grid item md={6}>
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
                        <Grid item md={6}>
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
                        <Grid item md={6}>
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
                    </Grid>
                </Grid>
            )}

            {employeeDetails.firstName != "" && (
                <Grid item md={12}>
                    <Grid container sx={theme.palette.gridBody} spacing={2}>
                        <Grid item md={8}>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                eventPropGetter={eventPropGetter}
                                startAccessor="start"
                                endAccessor="end"
                                view={['month']}
                                views={['month']}
                                defaultView="month"
                                onNavigate={(date) => {
                                    getStatsforMonth(date)
                                }}
                                style={{
                                    height: 500,
                                    width: '90%',
                                    overflow: 'hidden',
                                    border: '1px solid #ddd',
                                    borderRadius: 6,
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </Grid>
                        <Grid item md={4}>
                            {Object.keys(attendanceCount).length > 0 ? Object.entries(attendanceCount)
                                .map(([monthYear, attendanceCount]) => (

                                    <Box>
                                        <Typography variant="h5" gutterBottom>{monthYear}</Typography>
                                        <Typography variant="h6" gutterBottom>Total Days Worked : {attendanceCount.workingDays}</Typography>
                                        <Typography variant="h6" gutterBottom>Present Count : {attendanceCount.present}</Typography>
                                        <Typography variant="h6" gutterBottom>Absent Count : {attendanceCount.absent}</Typography>
                                    </Box>
                                )
                                ) : (
                                <Box></Box>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}