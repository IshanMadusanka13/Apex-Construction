import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, TextField, Button, useTheme, tableCellClasses, styled, Paper, TableContainer, Table, TableHead, TableBody, TablePagination, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CREATE_LEAVE, DELETE_LEAVE, GET_LEAVES_BY_EMPLOYEE_ID, SEARCH_EMPLOYEE } from "../../EndPoints.js"
import { errorAlert, successAlert } from "../../utils";

function LeaveRequest() {

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

    const navigate = useNavigate();
    const theme = useTheme();
    const loggedUser = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        employeeId: "",
        date: "",
        reason: "",
    });

    const [leaveRequests, setLeaveRequests] = useState([]);

    const handleChange = (field, value) => {
        setFormData((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        axios
            .get(SEARCH_EMPLOYEE + loggedUser._id + "/userId", {})
            .then((response) => {
                handleChange('employeeId', response.data.employeeId)
                getLeaveRequests(response.data.employeeId);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    }, [navigate]);

    const getLeaveRequests = (employeeId) => {
        axios
            .get(GET_LEAVES_BY_EMPLOYEE_ID + employeeId)
            .then((response) => {
                setLeaveRequests(response.data)
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(CREATE_LEAVE, formData)
            .then((response) => {
                getLeaveRequests(formData.employeeId);
                setFormData({
                    date: "",
                    reason: "",
                });
                successAlert("Leave Requested");
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const handleDelete = (row) => {
        axios
            .delete(DELETE_LEAVE + row._id)
            .then((response) => {
                successAlert("Leave Cancelled");
                getLeaveRequests(row.employeeId);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    return (
        <Grid container spacing={2}>
            <Grid item md={12}>
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
                            Request leave
                        </Typography>
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            fullWidth
                            id="employeeId"
                            name="employeeId"
                            label="Employee Id"
                            required
                            value={formData.employeeId}
                            disabled
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            type="date"
                            fullWidth
                            required
                            id="date"
                            name="date"
                            label="Date"
                            value={formData.date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => handleChange('date', moment(e.target.value).format('YYYY-MM-DD'))}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            fullWidth
                            name="reason"
                            id="reason"
                            label="Reason"
                            required
                            multiline
                            minRows={4}
                            value={formData.reason}
                            onChange={(e) => handleChange('reason', e.target.value)}
                        />
                    </Grid>

                    <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                        Submit
                    </Button>
                </Grid>
            </Grid>

            <Grid item md={12}>
                <Grid container sx={theme.palette.gridBody}>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            My leaves
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                            <Table>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell>Reason</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell>Action</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {leaveRequests.length > 0 ? leaveRequests
                                        .map(row => (
                                            <StyledTableRow key={row._id}>
                                                <StyledTableCell>{moment(row.date).format('YYYY-MM-DD')}</StyledTableCell>
                                                <StyledTableCell>{row.reason}</StyledTableCell>
                                                <StyledTableCell>{row.status.toUpperCase()}</StyledTableCell>
                                                <StyledTableCell>
                                                    {moment(row.date).isAfter(moment()) && (
                                                        <Button onClick={() => handleDelete(row)}>Cancel</Button>
                                                    )}
                                                </StyledTableCell>
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
                                count={leaveRequests.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default LeaveRequest;
