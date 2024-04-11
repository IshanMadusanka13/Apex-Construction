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
import StockRequest from "../../../../server/models/StockRequest.js";
import { errorAlert, successAlert,timedSuccessAlert, userTypes } from "../../utils.js";


function StockReq() {

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
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:3001/StockReques/create", StockRequest )
            .then((response) => {
                console.log("sucess response - " + response);
                successAlert("Site Created successfully");
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };


    function priceRow(qty, unit) {
        return qty * unit;
      }
      
      function createRow(RequestItem, qty, unit) {
        const price = priceRow(qty, unit);
        return { RequestItem, qty, unit, price };
      }
      function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
      }

      
    //table eke danata rows tika
    const rows = [
        createRow(1, '', ''),
        createRow(2, '', ''),
        createRow(3, '', ''),
        createRow(4, '', ''),
        createRow(5, '', ''),
        createRow(6, '', ''),
        createRow(7, '', ''),
        createRow(8, '', ''),
        createRow(9, '', ''),
    ];
  

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
                    Need Item
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
                            <TableCell align="center" colSpan={3}>
                                Need Details Form
                            </TableCell>
                          
                        </TableRow>
                        <TableRow>
                            <TableCell>RequestItem</TableCell>        
                          <TableCell align="right">Quantity</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
  {rows.map((row, index) => (
    <TableRow key={index}>
      <TableCell>
        <TextField
          value={row.requestItem}
          onChange={(e) => handleChange(`requestItem${index}`, e.target.value)}
          label="Request Item"
          fullWidth
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          value={row.qty}
          onChange={(e) => handleChange(`qty${index}`, e.target.value)}
          label="Quantity"
          type="number"
          fullWidth
        />
      </TableCell>
     
    </TableRow>
  ))}
</TableBody>
                </Table>
            </TableContainer>



            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Cancel
            </Button>

            <Button type="submit" variant="contained" sx={{ mt: 3, width: "20%" }}>
                Conform Site 
            </Button>
        </Grid>
    );

}

export default StockReq;