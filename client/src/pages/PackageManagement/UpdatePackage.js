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

const UpdatePackage = (values) => {
  const data = values.data;
  const [packageId, setPackageId] = useState(data ? data._id : '');
  const [packageName, setPackageName] = useState(data ? data.name : '');
  const [price, setPrice] = useState(data ? data.price : '');
  const [description, setDescription] = useState(data ? data.description : '');
  const [duration, setDuration] = useState(data ? data.duration : '');
  const [mcost, setCost] = useState(data ? data.cost : '');
  const [homeImage, setHomeImage] = useState(data ? data.homeImage : '');
  const theme = useTheme();
  const [percent, setPercent] = useState(0);


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(
      packageId,
      packageName,
      price,
      description,
      duration,
      mcost,
      homeImage,
    );
    axios.put('http://localhost:3001/package/update', {
      id: data._id,
      name: packageName,
      price: price,
      description: description,
      duration: duration,
      homeImage: homeImage,
      modelLink: null,
      cost: mcost,
      planImage: null,
      isApproved: true,
    }).then((response) => {
      successAlert("Package Updated");
    })

  }

  const onUpload = async (e) => {
    const file = e.target.files[0];

    if (file === null) {
      return;
    }
    const storageRef = ref(storage, `/packages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setHomeImage(url);
          console.log(url);
        });
      }
    );
  };

  if (!values) {
    return <div>No data found.</div>;
  } else {
    console.log(data);
    console.log(packageName);
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
          Update Package
        </Typography>
      </Grid>
      {/* <Grid item md={6}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="packageId"
                    label="Package Id"
                    name="packageId"
                    autoComplete="packageId"
                    value={AddNewPackage.packageId}
                    autoFocus
                    disabled
                />
            </Grid> */}
      <Grid item md={6}>
        <TextField
          // select
          margin="normal"
          required
          fullWidth
          id="name"
          label="Package Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
        >
          {Object.values(packageTypes).map((type) => (
            <MenuItem key={type} value={type}>
              {type.toUpperCase()}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Package Price"
          name="price"
          autoComplete="price"
          autoFocus
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
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
          label="Package Duration"
          name="duration"
          autoComplete="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </Grid>



      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="mcost"
          label="Package Monthly Payment"
          name="mcost"
          autoComplete="mcost"
          value={mcost}
          onChange={(e) => setCost(parseFloat(e.target.value))}
        />

      </Grid>

      <Grid item md={4}>
        <img
          width="300"
          //height= {auto}
          src={homeImage}></img>

        <Button
          component="label"
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          onChange={(e) => onUpload(e)}
        >
          Upload Image
          <VisuallyHiddenInput type="file" />
        </Button>
      </Grid>

      <Button type="submit" variant="contained" sx={{ ml: 10, mt: 25, width: "50%", height: "10%" }}>
        Update Package
      </Button>

    </Grid>
  );

}

export default UpdatePackage;
