import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import storage from "../../Apis/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
import { errorAlert, packageTypes, successAlert, timedSuccessAlert, userTypes } from "../../utils.js";
import { useSelector } from 'react-redux';
import VisuallyHiddenInput from '../../components/VisuallyHiddenInput.js';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



const AddAddOns = () => {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const navigate = useNavigate();

  const theme = useTheme();
  const loggedUser = useSelector((state) => state.user);

  const [error, seterror] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/packageaddon/add", {
        
        price: price,
        description: description,
        duration: duration,
      })
      .then((res) => {
        console.log(res);
        successAlert("AddOns Created");
        navigate('/userDashboard')
      })
      .catch((error) => {
        console.log("Error while adding a new add ons:", error);
        errorAlert("An error occurred while adding the add ons. Please try again.");
      });
  };


  return (
    <Grid
      container
      spacing={2}
      component="form"
      sx={theme.palette.gridBody}
      noValidate
      onSubmit={onSubmit}
    >
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Create Add Ons
        </Typography>
      </Grid>


      <Grid item md={16}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="discription"
          label="Package Description"
          name="discription"
          autoComplete="discription"
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="duration"
          label="Add Ons Duration"
          name="duration"
          autoComplete="duration"
          autoFocus
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Add Ons Price"
          name="price"
          autoComplete="price"
          autoFocus
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
      </Grid>

      <Button type="submit" variant="contained" sx={{ ml: 10, mt: 25, width: "50%", height: "10%" }}>
        Create Add Ons
      </Button>

    </Grid>
  );

}

export default AddAddOns;