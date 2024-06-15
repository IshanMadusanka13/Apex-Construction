import React, { useState } from "react";
import { TextField, Typography, Button, Grid, useTheme, Paper, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import { CREATE_FFEDBACK } from '../../EndPoints';
import axios from 'axios';
import { errorAlert, successAlert } from "../../utils.js";

export default function Feedback() {

  const navigate = useNavigate();
  const theme = useTheme();

  const [feedbackDetails, setFeedbackDetails] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  const handleChange = (field, value) => {
    setFeedbackDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleRadioChange = (event) => {
    handleChange('type', event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(feedbackDetails.email)) {
      errorAlert("Please enter a valid email address.");
      return;
    }

    axios
      .post(CREATE_FFEDBACK, feedbackDetails)
      .then((response) => {
        successAlert("Your Feedback Has been Marked");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        errorAlert(error.response.data.message);
      });

  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: "url(img/login-side-img.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.main }}>
          {feedbackDetails.type == "Complaint" ? (<ErrorIcon />) : (<LightbulbIcon />)}
        </Avatar>
        <Typography component="h1" variant="h5">
          Provide Feedback
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Grid>
          <Grid item md={12}>
            <RadioGroup value={feedbackDetails.type} onChange={handleRadioChange} row>
              <FormControlLabel value="Compliment" control={<Radio />} label="Compliment" />
              <FormControlLabel value="Complaint" control={<Radio />} label="Complaint" />
              <FormControlLabel value="Suggestion" control={<Radio />} label="Suggestion" />
            </RadioGroup>
          </Grid>
          <Grid item md={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              minRows={4}
              id="message"
              label="Message"
              name="message"
              autoComplete="message"
              onChange={(e) => handleChange('message', e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, width: "50%" }}
        >
          Submit
        </Button>
      </Paper>
    </Grid>
  );
}
