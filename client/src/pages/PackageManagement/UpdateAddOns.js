import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import storage from "../../Apis/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
import { useSelector } from 'react-redux';
import VisuallyHiddenInput from '../../components/VisuallyHiddenInput.js';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { packageTypes, successAlert } from "../../utils";

const UpdateAddOns = (values) => {
  const data = values.data;
  const [packageId, setPackageId] = useState(data ? data._id : '');
  const [price, setPrice] = useState(data ? data.price : '');
  const [description, setDescription] = useState(data ? data.description : '');
  const [duration, setDuration] = useState(data ? data.duration : '');
  
  const theme = useTheme();
 


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      packageId,
      price,
      description,
      duration,
     
    );
    axios.put('http://localhost:3001/packageaddon/update', {
      id: data._id,
      
      price: price,
      description: description,
      duration: duration,
      
    }).then((response) => {
      successAlert("Package Updated");
    })

  }


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
          Upadate Add Ons
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
        Upadate Add Ons
      </Button>

    </Grid>
  );


}

export default UpdateAddOns;
