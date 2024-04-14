import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { TextField, Typography, Button, Grid, MenuItem, styled, TableCell, tableCellClasses, TableRow, TableContainer, Table, TableHead, TableBody, TablePagination, useTheme, Box, Paper, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useSelector } from 'react-redux';
import { errorAlert, successAlert, userTypes } from "../../utils.js";
import { CALCULATE_SITE_STATUS, DELETE_SITE, GET_ALL_SITES, UPDATE_SITE } from "../../EndPoints.js";
import moment from "moment";

function ViewAllSites() {
    const theme = useTheme();
    const navigate = useNavigate();
    const loggedUser = useSelector((state) => state.user);
    const loggedUserId = useSelector((state) => state.id);

    //----------------------Table Functions-----------------------------------
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
    //----------------------Table Functions End-----------------------------------

    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [viewUpdate, setViewUpdate] = useState(false);
    const [showView, setShowView] = useState(false);
    const [searchData, setsearchData] = useState({
        value: "",
        searchBy: "",
    });

    const loadAllSites = async () => {
        Axios
            .get(GET_ALL_SITES, {})
            .then((response) => {
                setRows(response.data);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    useEffect(() => {
        loadAllSites();
        if (loggedUser.userType != userTypes.CUSTOMER) {
            setsearchData({
                value: loggedUserId,
                searchBy: "customerId",
            });
            FilterRows();
        }
    }, [viewUpdate]);

    const handleChange = (field, value) => {
        setsearchData((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    const handleView = (row) => {
        setShowView(true);
        setSelectedRow(row);
    };

    const handleUpdate = (row) => {
        setViewUpdate(true);
        setSelectedRow(row);
        setFilteredRows([]);
    };

    const handleDelete = (siteId) => {
        Axios.delete(DELETE_SITE + siteId)
            .then((response) => {
                loadAllSites();
                successAlert("Site Deleted Succesfully");
            })
            .catch(error => {
                errorAlert("Axios Error :", error);
            });
    };

    const FilterRows = () => {

        const filteredRows = rows.filter(row => {
            if (searchData.searchBy === "siteId") {
                if (row.siteId == searchData.value) {
                    return row;
                }
            } else if (searchData.searchBy === "customerId") {
                if (row.customerId == searchData.value) {
                    return row;
                }
            }
            return;
        });
        setFilteredRows(filteredRows);
    };

    const handleFilter = (event) => {
        event.preventDefault();
        FilterRows();
    };

    return (
        <Grid container>
            {(loggedUser.userType != userTypes.CUSTOMER) &&
                <Grid
                    item md={12}
                    spacing={2}
                    component="form"
                    sx={theme.palette.gridBody}
                    noValidate
                    onSubmit={handleFilter}
                >
                    <Grid item md={12}>
                        <Typography variant="h5" gutterBottom>
                            Search Site
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
                            <FormControlLabel value="siteId" control={<Radio />} label="Site Id" />
                            <FormControlLabel value="customerId" control={<Radio />} label="Customer Id" />
                        </RadioGroup>
                    </Grid>

                    <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                        Search Site
                    </Button>
                </Grid>
            }
            <Grid item md={12} sx={theme.palette.gridBody}>
                <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Site Id</StyledTableCell>
                                <StyledTableCell>Customer Id</StyledTableCell>
                                <StyledTableCell>Start Date</StyledTableCell>
                                <StyledTableCell>End Date</StyledTableCell>
                                <StyledTableCell>Last Update</StyledTableCell>
                                <StyledTableCell>Complete Status</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 ? (
                                filteredRows == 0 ? (rows.map(row => (
                                    <StyledTableRow>
                                        <StyledTableCell>{row.siteId}</StyledTableCell>
                                        <StyledTableCell>{row.customerId}</StyledTableCell>
                                        <StyledTableCell>{moment(row.start).format('YYYY-MM-DD')}</StyledTableCell>
                                        <StyledTableCell>{moment(row.end).format('YYYY-MM-DD')}</StyledTableCell>
                                        <StyledTableCell>{row.lastUpdate}</StyledTableCell>
                                        <StyledTableCell>{row.completeStatus}</StyledTableCell>

                                        <StyledTableCell>
                                            <Button sx={{ margin: '0px 10px' }} onClick={() => handleView(row)}>View</Button>
                                            <Button sx={{ margin: '0px 10px' }} onClick={() => handleUpdate(row)}>Update</Button>
                                            <Button sx={{ margin: '0px 10px' }} onClick={() => handleDelete(row.siteId)}>Delete</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))) : (
                                    filteredRows.map(row => (
                                        <StyledTableRow>
                                            <StyledTableCell>{row.siteId}</StyledTableCell>
                                            <StyledTableCell>{row.customerId}</StyledTableCell>
                                            <StyledTableCell>{moment(row.start).format('YYYY-MM-DD')}</StyledTableCell>
                                            <StyledTableCell>{moment(row.end).format('YYYY-MM-DD')}</StyledTableCell>
                                            <StyledTableCell>{row.lastUpdate}</StyledTableCell>
                                            <StyledTableCell>{row.completeStatus}</StyledTableCell>

                                            <StyledTableCell>
                                                <Button sx={{ margin: '0px 10px' }} onClick={() => handleView(row)}>View</Button>
                                                {(loggedUser.userType != userTypes.CUSTOMER) && <Button sx={{ margin: '0px 10px' }} onClick={() => handleUpdate(row)}>Update</Button>}
                                                {(loggedUser.userType != userTypes.CUSTOMER) && <Button sx={{ margin: '0px 10px' }} onClick={() => handleDelete(row.siteId)}>Delete</Button>}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
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
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>
            {viewUpdate &&
                <Grid item md={12} sx={theme.palette.gridBody}>
                    <UpdateSiteDetails values={selectedRow} submitted={setViewUpdate} />
                </Grid>
            }
            {showView &&
                <Grid item md={12} sx={theme.palette.gridBody}>
                    <ViewSite values={selectedRow} />
                </Grid>
            }
        </Grid>
    );
}

export default ViewAllSites;

function UpdateSiteDetails({ values, submitted }) {

    const [siteDetails, setSiteDetails] = useState({
        siteId: "",
        customerId: "",
        location: "",
        notes: "",
        start: "",
        end: "",
        lastUpdate: "Initiated",
        completeStatus: 0,
    });

    const handleChange = (field, value) => {
        setSiteDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        handleChange('siteId', values.siteId);
        handleChange('customerId', values.customerId);
        handleChange('location', values.location);
        handleChange('start', moment(values.start).format('YYYY-MM-DD'));
        handleChange('end', moment(values.start).format('YYYY-MM-DD'));
        handleChange('notes', values.notes);
        handleChange('lastUpdate', values.lastUpdate);
        handleChange('completeStatus', values.completeStatus);
    }, [values]);

    const handleSubmit = (event) => {
        event.preventDefault();

        Axios
            .put(UPDATE_SITE, siteDetails)
            .then((response) => {
                setSiteDetails({
                    siteId: "",
                    customerId: "",
                    location: "",
                    notes: "",
                    start: "",
                    end: "",
                    lastUpdate: "Initiated",
                    completeStatus: 0,
                });
                submitted(false);
                successAlert("Site Updated successfully");
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error);
            });
    };

    return (
        <Grid
            container
            spacing={2}
            component="form"
            noValidate
            onSubmit={handleSubmit}
        >
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Update Site Details
                </Typography>
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="siteId"
                    name="siteId"
                    label="Site Id"
                    autoComplete="siteId"
                    disabled
                    value={siteDetails.siteId}
                    onChange={(e) => handleChange('siteId', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="custId"
                    label="Customer Id"
                    name="custId"
                    autoComplete="custId"
                    autoFocus
                    value={siteDetails.customerId}
                    disabled
                    onChange={(e) => handleChange('customerId', e.target.value)}
                />
            </Grid>

            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="location"
                    label="Location"
                    name="location"
                    autoComplete="location"
                    value={siteDetails.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                />
            </Grid>

            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    id="start"
                    label="Start Date"
                    name="start"
                    autoComplete="start"
                    value={siteDetails.start}
                    disabled
                    onChange={(e) => handleChange('start', e.target.value)}
                />
            </Grid>

            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="date"
                    id="end"
                    label="Assumed End Date"
                    name="end"
                    autoComplete="end"
                    value={siteDetails.end}
                    disabled
                    onChange={(e) => handleChange('end', e.target.value)}
                />
            </Grid>

            <Grid item md={12}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="notes"
                    label="Notes"
                    name="notes"
                    autoComplete="notes"
                    value={siteDetails.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lUpdate"
                    label="Last Update"
                    name="lUpdate"
                    autoComplete="lUpdate"
                    value={siteDetails.lastUpdate}
                    onChange={(e) => handleChange('lastUpdate', e.target.value)}
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    id="cStatus"
                    label="Complete Status"
                    name="cStatus"
                    autoComplete="cStatus"
                    value={siteDetails.completeStatus}
                    onChange={(e) => handleChange('completeStatus', e.target.value)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ mt: 2, width: "20%", borderRadius: "5" }}>
                Update Site
            </Button>
        </Grid>
    );

}

function ViewSite({ values }) {

    const [siteDetails, setSiteDetails] = useState({
        siteId: "",
        customerId: "",
        location: "",
        notes: "",
        start: "",
        end: "",
        lastUpdate: "Initiated",
        completeStatus: 1,
        calculatedStatus: 0,
    });

    const loadCalculatedStatus = () => {
        Axios
            .get(CALCULATE_SITE_STATUS + values.siteId)
            .then((response) => {
                setSiteDetails((prevDetails) => ({
                    ...prevDetails,
                    calculatedStatus: response.data,
                }));
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    }

    useEffect(() => {
        setSiteDetails({
            siteId: values.siteId,
            customerId: values.customerId,
            location: values.location,
            notes: values.notes,
            start: moment(values.start).format('YYYY-MM-DD'),
            end: moment(values.end).format('YYYY-MM-DD'),
            lastUpdate: values.lastUpdate,
            completeStatus: values.completeStatus,
        });
        loadCalculatedStatus();
    }, [values]);

    return (
        <Grid container spacing={2}>
            {Object.keys(siteDetails).map((key) => {
                if (!["siteId", "customerId", "location", "notes", "start", "end", "lastUpdate", "completeStatus", "calculatedStatus"].includes(key)) {
                    return null;
                }

                return (
                    <Grid item md={12} key={key}>
                        <Grid container spacing={2}>
                            <Grid item md={6}>
                                <Typography variant="h5" gutterBottom>{key.toUpperCase()}</Typography>
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    disabled
                                    fullWidth
                                    id={key}
                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                    name={key}
                                    autoComplete={key}
                                    value={siteDetails[key]}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                );
            })}
        </Grid>
    );

}