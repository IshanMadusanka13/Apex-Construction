import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { TextField, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Checkbox, Box, tableCellClasses, styled, TablePagination, Paper } from "@mui/material";
import axios from "axios";
import { GET_ATTENDANCE_BY_ID, SEARCH_EMPLOYEE } from "../../EndPoints";
import { errorAlert } from "../../utils.js";
import moment from "moment";

export default function ViewAttendance() {
    const theme = useTheme();
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
                const attendanceCountByMonthYear = {};

                attendanceRecords.forEach(record => {
                    const date = moment(record.date);
                    const monthYear = `${date.format('YYYY')} ${date.format('MMMM')}`;
                    if (!attendanceCountByMonthYear[monthYear]) {
                        attendanceCountByMonthYear[monthYear] = { month: monthYear, present: 0, absent: 0 };
                    }
                    if (record.status) {
                        attendanceCountByMonthYear[monthYear].present++;
                    } else {
                        attendanceCountByMonthYear[monthYear].absent++;
                    }
                });

                setAttendanceCount(attendanceCountByMonthYear)
            })
            .catch(error => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    return (

        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
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
            {Object.keys(attendanceCount).length > 0 && (
                <Grid item md={10} sx={theme.palette.gridBody}>
                    <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Month</StyledTableCell>
                                    <StyledTableCell>Present</StyledTableCell>
                                    <StyledTableCell>Absent</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(attendanceCount).length > 0 ? Object.entries(attendanceCount)
                                    .map(([monthYear, attendanceCount]) => (
                                        <StyledTableRow key={monthYear}>
                                            <StyledTableCell>{monthYear}</StyledTableCell>
                                            <StyledTableCell>{attendanceCount.present}</StyledTableCell>
                                            <StyledTableCell>{attendanceCount.absent}</StyledTableCell>
                                        </StyledTableRow>
                                    )
                                    ) : (
                                    <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <StyledTableCell>No Data</StyledTableCell>
                                    </StyledTableRow>
                                )}

                            </TableBody>

                        </Table>
                        <TablePagination
                            sx={{ backgroundColor: theme.palette.primary.main, }}
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={attendanceCount.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </TableContainer>
                </Grid>
            )}
        </Grid>
    );
}