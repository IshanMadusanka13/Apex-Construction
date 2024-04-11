import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { errorAlert, successAlert, timedSuccessAlert, userTypes } from "../../utils.js";
import axios from 'axios';
function MonthlyReport() {

    const navigate = useNavigate();
    const theme = useTheme();


    

    // State to manage table rows
    const [rows, setRows] = useState([
        { desc: 'Stock Cost', qty: 0, unit: 0 },
        { desc: 'Transport Cost', qty: 0, unit: 0 },
        { desc: 'Salary Cost', qty: 0, unit: 0 },
        { desc: 'Utility Bill Cost', qty: 0, unit: 0 },
    ]);

    // Function to handle changes in table rows
    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    // Function to calculate subtotal
    const subtotal = () => {
        return rows.reduce((sum, row) => sum + (row.qty * row.unit), 0);
    };

    // Constants for tax rate and total calculation
    const TAX_RATE = 0.07;
    const invoiceSubtotal = subtotal();
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
       
        axios
        .post("http://localhost:3001/MonthlyReport/create",MonthlyReport )
        .then((response) => {
            console.log("sucess response - " + response);
            successAlert("Site Created successfully");
        })
        .catch((error) => {
            console.log(error);
            errorAlert(error.response.data.message);
        });
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
                    Monthly Report 
                </Typography>
            </Grid>
            <Grid item md={6}>
                {/* Input for custId */}
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="custId"
                    label="custId"
                    name="custId"
                    autoComplete="custId"
                    autoFocus
                />
            </Grid>

            {/* Table for bill details */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={4}>
                                Details
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Desc</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Unit</TableCell>
                            <TableCell align="left">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={row.desc}>
                                <TableCell>{row.desc}</TableCell>
                                <TableCell align="left">
                                    {/* Input for quantity */}
                                    <TextField
                                        fullWidth
                                        value={row.qty}
                                        onChange={(e) => handleChange(index, 'qty', parseInt(e.target.value, 10))}
                                    />
                                </TableCell>
                                <TableCell align="left"> 
                                    {/* Input for unit */}
                                    <TextField
                                        fullWidth
                                        value={row.unit}
                                        onChange={(e) => handleChange(index, 'unit', parseInt(e.target.value, 10))}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    {/* Display total */}
                                    {row.qty * row.unit}
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* Subtotal row */}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={3}>Subtotal</TableCell>
                            <TableCell align="left">{invoiceSubtotal}</TableCell>
                        </TableRow>
                        {/* Tax row */}
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="left">{(TAX_RATE * 100).toFixed(2)}</TableCell>
                            <TableCell align="left">{invoiceTaxes.toFixed(2)}</TableCell>
                            <TableCell />
                        </TableRow>
                        {/* Total row */}
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell align="left">{invoiceTotal.toFixed(2)}</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Buttons */}
            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Confirm
            </Button>
        </Grid>
    );
}

export default MonthlyReport;
