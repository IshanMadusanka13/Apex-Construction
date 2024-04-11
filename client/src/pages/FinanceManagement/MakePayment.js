import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
import axios from "axios";
import { GET_ALL_BANKS, MAKE_COMPANY_PAYMENT } from "../../EndPoints";
import { errorAlert, timedSuccessAlert, billers, successAlert } from "../../utils.js";

function MakePayment() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [paymentDetails, setPaymentDetails] = useState({
        payTo: billers.ELECTRICITY,
        payFrom: "",
        amount: "0",
    });
    const [banks, setBanks] = useState([]);

    const handleChange = (field, value) => {
        setPaymentDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };

    useEffect(() => {
        const loadBank = async () => {
            axios
                .get(GET_ALL_BANKS, {})
                .then((response) => {
                    const bankNames = response.data.map((bank) => bank.bankName);
                    setBanks(bankNames);
                })
                .catch((error) => {
                    console.log(error);
                    errorAlert(error.response.data.message);
                });
        };

        loadBank();
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post(MAKE_COMPANY_PAYMENT, paymentDetails)
            .then((response) => {
                successAlert("Employee Created successfully");
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
                    Make Payment
                </Typography>
            </Grid>
            <Grid item md={6}>
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    id="payTo"
                    label="Pay To"
                    name="payTo"
                    autoComplete="payTo"
                    autoFocus
                    onChange={(e) => handleChange('payTo', e.target.value)}
                >
                    {Object.values(billers).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item md={6}>
                <TextField
                    select
                    margin="normal"
                    required
                    fullWidth
                    id="payFrom"
                    label="Pay From"
                    name="payFrom"
                    autoComplete="payFrom"
                    autoFocus
                    onChange={(e) => handleChange('payFrom', e.target.value)}
                >
                    {Object.values(banks).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
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



            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                Make Payment
            </Button>
        </Grid>
    );

}

export default MakePayment;