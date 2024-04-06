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
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function MonthlyBill() {

    const navigate = useNavigate();
    const theme = useTheme();
    const loggedUser = useSelector((state) => state.user);

    const [employeeDetails, setEmployeeDetails] = useState({
        custId: "",
        siteId: "",
        dateOfBirth: "",
        siteState: "",
        start: "",
        PhoneNo: "",
        email: "",
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
                    handleChange('', response.data)
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
                console.log("sucess response - " + response);
                timedSuccessAlert("Employee Created successfully");
            })
            .catch((error) => {
                console.log(error);
                //navigate("/error");
            });
    };


    function TotalRow(qty, unit) {
        return qty * unit;
    }

    function createRow(desc, qty, unit) {
        return { desc, qty, unit, Total: qty * unit, textfield: '' };
    }

    function subtotal(items) {
        return items.map(({ Total }) => Total).reduce((sum, i) => sum + i, 0);
    }

    // Table data
    const rows = [
        createRow('Stock Cost',"",""),
        createRow('Transport Cost',"",""),
        createRow('Salary Cost',"","" ),
        createRow('Utility Bill Cost',"",""),
    ];
    const TAX_RATE = 0.07;
    const invoiceSubtotal = subtotal(rows);
    const invoiceTaxes = TAX_RATE * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

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
                    Monthly Bill
                </Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id=""
                    label="Employee Id"
                    name="employeeId"
                    autoComplete="employeeId"
                    value={employeeDetails.employeeId}
                    autoFocus
                    disabled
                />
            </Grid>

            <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="custId"
                    label="custId"
                    name="custId"
                    autoComplete="custId"
                    autoFocus
                    onChange={(e) => handleChange('custId', e.target.value)}
                />
            </Grid>


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
                            <TableCell align="left">unit</TableCell>
                            <TableCell align="left">Total</TableCell>
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.desc}>
                                <TableCell>{row.desc}</TableCell>
                                <TableCell align="left">
                                <TextField
                                        fullWidth
                                        value={row.Qty}
                                        onChange={(e) => handleChange('Qty', e.target.value)}
                                    />
                                </TableCell>
                                <TableCell align="left"> 
                                <TextField
                                        fullWidth
                                        value={row.unit}
                                        onChange={(e) => handleChange('unit', e.target.value)}
                                    />
                                </TableCell>
                                
                                <TableCell align="left">
                                <TextField
                                        fullWidth
                                        value={row.Total}
                                        onChange={(e) => handleChange('Total', e.target.value)}
                                    />

                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={3}>Subtotal</TableCell>
                            <TableCell align="left">{invoiceSubtotal}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Tax</TableCell>
                            <TableCell align="left">{TAX_RATE * 100}</TableCell>
                            <TableCell align="left">{invoiceTaxes}</TableCell>
                            <TableCell />
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell align="left">{invoiceTotal}</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>



            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Cancel
            </Button>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Conform 
            </Button>
        </Grid>
    );

}

export default MonthlyBill;
