import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, Grid, TextField, Button, Snackbar } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateField } from '@mui/x-date-pickers';

function LeaveRequest() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        date: null, // Initialize with null to avoid warning
        message: "",
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Check if date is selected
            if (!formData.date) {
                console.error('Please select a date');
                return;
            }

            // Format the selected date
            const formattedDate = dayjs(formData.date).format('YYYY-MM-DD');

            // Include the formatted date in the form data
            const dataToSend = {
                ...formData,
                date: formattedDate
            };

            // Send the form data to the backend
            await axios.post('/api/leave-request', dataToSend);
            console.log('Form data submitted successfully');
            setOpenSnackbar(true);

            // Reset the form fields
            setFormData({
                name: "",
                email: "",
                date: null, // Reset the selected date
                message: "",
            });
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const tomorrow = dayjs().add(1, 'day');

    const isGmail = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._-]+@gmail.com$/;
        return gmailRegex.test(email);
    };

    return (
        <Box sx={{ backgroundColor: "rgba(240,240,240,.5)", borderRadius: 6, paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5 }}>
            <Typography variant="h2" align="center" sx={{ fontStyle: 'poppins' }} gutterBottom>
                Leave Request
            </Typography>
            <Typography variant="h5" align="center" sx={{ fontStyle: 'poppins' }} paragraph>
                Please fill out the form below to apply for your leave request.
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 5 }}>
                <Grid item xs={12} md={8} sx={{ padding: 5 }}>
                    <form name="sentMessage" noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    variant="outlined"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!isGmail(formData.email)}
                                    helperText={!isGmail(formData.email) ? "Please enter a valid Gmail address" : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateField 
                                        id="date"
                                        name="date"
                                        label="Date"
                                        value={formData.date}
                                        onChange={(newValue) => setFormData((prevData) => ({ ...prevData, date: newValue }))} 
                                        disableFuture 
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>

                        <TextField
                            fullWidth
                            name="message"
                            id="message"
                            aria-label="Message"
                            placeholder="Employee ID: ***** Job Role: ********* I'm requesting a leave for the day and will assign my work to (person name with employee ID)"
                            variant="outlined"
                            required
                            multiline
                            minRows={4}
                            value={formData.message}
                            onChange={handleChange}
                            sx={{ marginTop: 5 }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                bg: 'primary.main',
                                p: "0px 32px",
                                color: "#fff",
                                align:"center",
                                fontFamily: "Roboto, sans-serif",
                                fontSize: "12px",
                                fontWeight: "500",
                                lineHeight: "44px",
                                textAlign: "center",
                                border: "1px solid",
                                borderColor: 'primary.main',
                                cursor: "pointer",
                                textTransform: "uppercase",
                                transition: "all 300ms linear 0s",
                                borderRadius: "5px",
                                mt: "4em",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                },
                            }}
                        >
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Form submitted successfully"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    );
}

export default LeaveRequest;
