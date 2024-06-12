import React, { useState, useEffect } from "react";
import { Typography, Button, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, styled, tableCellClasses, TablePagination, useTheme, Paper } from "@mui/material";
import axios from "axios";
import { errorAlert, successAlert } from "../../utils.js";
import { GET_LEAVES, UPDATE_LEAVE } from "../../EndPoints.js";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function ResponseLeaveApplication() {

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

    const theme = useTheme();
    const navigate = useNavigate();
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        fetchLeaveRequests();
    }, [navigate]);

    const fetchLeaveRequests = () => {
        axios.get(GET_LEAVES)
            .then((response) => {
                setLeaveRequests(response.data);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const handleAction = (id, status) => {

        axios.put(UPDATE_LEAVE, { id: id, status: status })
            .then((response) => {
                fetchLeaveRequests();
                successAlert("Leave request updated successfully");
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });

    };

    return (
        <Grid container spacing={3} sx={theme.palette.gridBody}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Leave Requests
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Employee Id</StyledTableCell>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell>Reason</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {leaveRequests.length > 0 ? leaveRequests
                                .filter(row => row.status.toLowerCase().includes("pending"))
                                .map(row => (
                                    <StyledTableRow key={row._id}>
                                        <StyledTableCell>{row.employeeId}</StyledTableCell>
                                        <StyledTableCell>{moment(row.date).format('YYYY-MM-DD')}</StyledTableCell>
                                        <StyledTableCell>{row.reason}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button onClick={() => handleAction(row._id, "accepted")}>Accept</Button>
                                            <Button onClick={() => handleAction(row._id, "declined")}>Decline</Button>
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
    );
}
