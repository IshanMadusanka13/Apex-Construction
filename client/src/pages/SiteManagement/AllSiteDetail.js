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
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AllsiteDetail() {

    const navigate = useNavigate();
    const theme = useTheme();
    const loggedUser = useSelector((state) => state.user);

    const [employeeDetails, setEmployeeDetails] = useState({
        EmployeeId: "",
        SiteID: "",
        
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
                    handleChange('EmployeeId', response.data)
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
                console.log("success response - ", response);
                timedSuccessAlert("Employee Created successfully");
            })
            .catch((error) => {
                console.log(error);
                //navigate("/error");
            });
    };

    function createRow(employeeId, siteId) {
        return { employeeId, siteId };
    }

    // Table rows
    const [rows, setRows] = useState([]);

    const handleAddRow = () => {
        setRows([...rows, createRow("", "")]);
    };

    const handleDeleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleUpdateRow = (index) => {
        const updatedRows = [...rows];
        updatedRows[index] = { ...employeeDetails };
        setRows(updatedRows);
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

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Site ID</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField
                                        value={row.cusId}
                                        onChange={(e) => {
                                            const updatedRows = [...rows];
                                            updatedRows[index].employeeId = e.target.value;
                                            setRows(updatedRows);
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.siteId}
                                        onChange={(e) => {
                                            const updatedRows = [...rows];
                                            updatedRows[index].siteId = e.target.value;
                                            setRows(updatedRows);
                                            
                        
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleUpdateRow(index)}>View</Button>
                                    <Button onClick={() => handleUpdateRow(index)}>Update</Button>
                                    <Button onClick={() => handleDeleteRow(index)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button type="button" variant="contained" onClick={handleAddRow} sx={{ mt: 3 }}>
                Add Row
            </Button>

            <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                Cancel
            </Button>

            <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                Confirm Site Details
            </Button>
        </Grid>
    );
}

export default AllsiteDetail;
