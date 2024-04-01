import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import storage from "../../Apis/firebase.config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { TextField, Typography, Button, Grid, MenuItem, useTheme } from "@mui/material";
//import { CREATE_EMPLOYEE, GET_EMPLOYEE_ID } from "../../EndPoints";
import { errorAlert, packageTypes, timedSuccessAlert, userTypes } from "../../utils.js";
import { useSelector } from 'react-redux';



const AddNewPackage = () => {
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [mcost, setCost] = useState("");
  const [homeImage, setHomeImage] = useState(
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  );
  const [modelLink, setModelLink] = useState("model link");
  const [planImage, setPlanImage] = useState("plan image");
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState();

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/admin/Package");
    
  };

  const theme = useTheme();
  const loggedUser = useSelector((state) => state.user);

  const [error, seterror] = useState(false);

  const onSubmit = async (e) => {

  

    

    if (!homeImage) {
      alert("Please choose a file first!");

      
      return;
    }

  

    await axios

    .post("http://localhost:3001/package/addpackage", {
      // package details
    })
    .then((res) => {
      console.log(res);
      goBack();
    })
    .catch((error) => {
      console.log("Error while adding a new package:", error);
      errorAlert("An error occurred while adding the package. Please try again.");
    });
  };

//   useEffect(() => {
//     const loadEmployeeId = async () => {
//         axios
//             .get(GET_EMPLOYEE_ID, {})
//             .then((response) => {
//                 console.log(response);
//                 handleChange('packageId', response.data)
//             })
//             .catch((error) => {
//                 console.log(error);
//                 errorAlert(error.response.data.message);
//             });
//     };

//     loadEmployeeId();
// }, [navigate]);


  // image upload to firebase storage as in previous function
  const onUpload = async (e) => {
    const file = e.target.files[0];

    if (file === null) {
      return;
    }
    const storageRef = ref(storage, `/package/${file.name}`);
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

  function handleChange(event) {
    setFile(event.target.files[0]);
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
                    Add Package
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
                    select
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
                    {loggedUser.userType === userTypes.ADMIN && (
                        <MenuItem key={packageTypes.ADMIN} value={packageTypes.ADMIN}>
                            {packageTypes.ADMIN.toUpperCase()}
                        </MenuItem>
                    )}
                    
                    {Object.values(packageTypes)
                        .filter(type => type !== 'admin' && type !== 'customer')
                        .map((type) => (
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
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
            </Grid>

            <Grid item md={16}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="discription"
                    label="Package Discription"
                    name="discription"
                    autoComplete="discription"
                    autoFocus
                    onChange={(e) => setDescription(parseFloat(e.target.value))}
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
                    onChange={(e) => setDuration(e.target.value)}
                />
            </Grid>

            

            <Grid item md={4}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="mcost"
                    label="Package Monthly Payment"
                    name="mcost"
                    autoComplete="mcost"
                    onChange={(e) => setCost(parseFloat(e.target.value))}
                />
                
            </Grid>

            <Grid item md={4}>
                <img 
                width = "300"
                //height= {auto}
                src={homeImage}></img>

                <input
                    type="file"
                    className="file-input file-input-bordered file-input-sm w-[75%] max-w-xs ml-10"
                    onChange={(e) => onUpload(e)}
                />
            </Grid>

            <Button type="submit" variant="contained" sx={{ ml: 10, mt: 25, width: "50%", height: "10%" }}>
                Create Package
            </Button>

        </Grid>
    );

}

export default AddNewPackage;