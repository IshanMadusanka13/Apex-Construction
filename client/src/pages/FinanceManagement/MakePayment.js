import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, MenuItem, useTheme, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import axios from "axios";
import { GET_ALL_BANKS, MAKE_COMPANY_PAYMENT } from "../../EndPoints";
import { errorAlert, utilities, successAlert, months } from "../../utils.js";

function MakePayment() {

    const theme = useTheme();

    const [selectedValue, setSelectedValue] = useState();

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <Grid container>
            <Grid item md={12}>
                <Grid
                    container
                    spacing={2}
                    sx={theme.palette.gridBody}
                    noValidate
                >
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>
                            Make Payment
                        </Typography>
                    </Grid>
                    <Grid item md={12}>
                        <RadioGroup value={selectedValue} onChange={handleChange} row>
                            <FormControlLabel value="utility" control={<Radio />} label="Utility Bill" />
                            <FormControlLabel value="biller" control={<Radio />} label="Biller Payment" />
                            <FormControlLabel value="other" control={<Radio />} label="Other Payments" />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={12}>
                {selectedValue == "utility" && <UtilityBillPayment />}
            </Grid>
        </Grid>
    );

}

export default MakePayment;

function UtilityBillPayment() {

    const navigate = useNavigate();
    const theme = useTheme();

    const [paymentDetails, setPaymentDetails] = useState({
        payTo: "",
        payFrom: "",
        month: "",
        amount: "0",
        description: "",
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
                    Utility Bill Payment
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
                    {Object.values(utilities).map((type) => (
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
                Make Payment
            </Button>
        </Grid>
    );

}

function BillerPayment() {

}

function OtherPayment() {

}