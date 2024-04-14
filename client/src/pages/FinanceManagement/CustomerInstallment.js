import React, { useState, useEffect } from "react";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
import { useNavigate } from 'react-router';
import axios from "axios";
import { errorAlert, successAlert, months } from "../../utils.js";

export default function CustomerInstallment() {

  const navigate = useNavigate();
  const theme = useTheme();

  const [paymentDetails, setPaymentDetails] = useState({
    customerId: "",
    siteId: "",
    month: "",
    amount: "0",
    description: "",
  });

  const handleChange = (field, value) => {
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
        .post('', paymentDetails)
        .then((response) => {
            successAlert(response.data.message);
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
          Pay Installment
        </Typography>
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="cusId"
          label="Customer Id"
          name="cusId"
          autoComplete="cusId"
          autoFocus
          onChange={(e) => handleChange('customerId', e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="siteId"
          label="Site Id"
          name="siteId"
          autoComplete="siteId"
          onChange={(e) => handleChange('siteId', e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          select
          margin="normal"
          required
          fullWidth
          id="month"
          label="Month"
          name="month"
          autoComplete="amount"
          onChange={(e) => handleChange('month', e.target.value)}
        >
          {months.map((month, index) => (
            <MenuItem key={index} value={month}>{month}</MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item md={6}>
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id="amount"
          label="Amount"
          name="amount"
          autoComplete="amount"
          onChange={(e) => handleChange('amount', e.target.value)}
        />
      </Grid>

      <Grid item md={12}>
        <TextField
          margin="normal"
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="description"
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </Grid>

      <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
        Add Employee
      </Button>
    </Grid>
  );
}