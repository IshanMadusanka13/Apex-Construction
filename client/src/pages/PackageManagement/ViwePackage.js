// import React, { useState, useEffect } from "react";
// import { useSelector } from 'react-redux';
// import { TextField, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme } from "@mui/material";
// import axios from "axios";
// //import { CREATE_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEE_COUNT, SEARCH_EMPLOYEE } from "../../EndPoints";
// import { errorAlert } from "../../utils.js";
// import AddNewPackage from "./AddPackage.js";


// function ViewPackage() {

//     const theme = useTheme();

//     // const loggedUser = useSelector((state) => state.user);
//     // //const [employeeCount, setEmployeeCount] = useState("");
//     // const [showDeleteButton, setShowDeleteButton] = useState(false);
//     // const [searchData, setsearchData] = useState({
//     //     value: "",
//     //     searchBy: "",
//     // });
    
//     const [_id, setPackageID] = useState("");
//     const [packageName, setPackageName] = useState("");
//     const [price, setPrice] = useState("");
//     const [description, setDescription] = useState("");
//     const [duration, setDuration] = useState("");
//     const [mcost, setCost] = useState("");
//     const [homeImage, setHomeImage] = useState("");
//     const [modelLink, setModelLink] = useState("model link");

//     // const handleChange = (field, value) => {
//     //     setsearchData((prevDetails) => ({
//     //         ...prevDetails,
//     //         [field]: value,
//     //     }));
//     // };

//     // const handleSubmit = (event) => {
//     //     event.preventDefault();

//         axios
//             .get("http://localhost:3001/package/getAllPackages", {
//                 packaegid: _id,
//                 name: packageName,
//                 price: price,
//                 description: description,
//                 duration: duration,
//                 homeImage: homeImage,
//                 modelLink: modelLink,
//                 cost: mcost,
//             })
//             .then((response) => {
                
//                 console.log(response);
//                 //setEmployeeDetails(response.data);
//                 //setShowDeleteButton(true);
//                 console.log(packageName);
//             })
//             .catch((error) => {
//                 console.log(error);
//                 errorAlert(error.response.data.message);
//             });
//    // };

//     // const handleDelete = () => {
//     //     axios
//     //         .get(DELETE_EMPLOYEE + employeeDetails.email + "/" + loggedUser.userType, {})
//     //         .then((response) => {
//     //             console.log(response);

//     //         })
//     //         .catch((error) => {
//     //             console.log(error);
//     //             errorAlert(error.response.data.message);
//     //         });
//     // };



// // return (
// //     <Grid container>
// //         <Grid item md={8}>
// //             <Grid
// //                 item md={12}
// //                 spacing={2}
// //                 component="form"
// //                 sx={theme.palette.gridBody}
// //                 noValidate
// //                 onSubmit={handleSubmit}
// //             >
// //                 <Grid item md={12}>
// //                     <Typography variant="h5" gutterBottom>
// //                         View Package
// //                     </Typography>
// //                 </Grid>
// //                 {/* <Grid item md={6}>
// //                     <TextField
// //                         margin="normal"
// //                         required
// //                         fullWidth
// //                         id="search"
// //                         label="Search"
// //                         name="search"
// //                         autoComplete="search"
// //                         autoFocus
// //                         onChange={(e) => handleChange('value', e.target.value)}
// //                     />
// //                 </Grid>
// //                 <Grid item xs={6}>
// //                     <RadioGroup aria-label="searchBy" name="searchBy" onChange={(e) => handleChange('searchBy', e.target.value)}>
// //                         <FormControlLabel value="employeeId" control={<Radio />} label="Employee ID" />
// //                         <FormControlLabel value="email" control={<Radio />} label="Email" />
// //                     </RadioGroup>
// //                 </Grid>

// //                 <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
// //                     Search Package
// //                 </Button> */}
// //                 {/* {showDeleteButton && (
// //                     <Button variant="contained" sx={{ mt: 3, ml: 2 }} onClick={handleDelete}>
// //                         Delete Employee
// //                     </Button>
// //                 )} */}
// //             </Grid>
// //             <Grid item md={12} sx={theme.palette.gridBody}>
// //                 <Grid container columnSpacing={4} rowSpacing={1}>
// //                     {Object.keys(AddNewPackage).map((key) => {

// //                         if (!["packageId", "packageName", "price", "description", "mcost", "homeImage", "modelLink"].includes(key)) {
// //                             return null;
// //                         }

// //                         return (
// //                             <Grid item md={6} key={key}>
// //                                 {key.toUpperCase()}
// //                                 <TextField
// //                                     margin="normal"
// //                                     required
// //                                     disabled
// //                                     fullWidth
// //                                     id={key}
// //                                     label={key.charAt(0).toUpperCase() + key.slice(1)}
// //                                     name={key}
// //                                     autoComplete={key}
// //                                     value={AddNewPackage[key]}
// //                                 />
// //                             </Grid>
// //                         );
// //                     })}

// //                 </Grid>
// //             </Grid>
// //         </Grid>
// //         <Grid item md={3} sx={theme.palette.gridBody} textAlign="center">
// //             <Typography variant="h4" gutterBottom>
// //                 Total Employees
// //             </Typography>
// //             {/* <Typography variant="h5" gutterBottom>
// //             {employeeCount}
// //             </Typography>  */}
// //         </Grid>
// //     </Grid>
// // );

// }

// export default ViewPackage;


import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { TextField,IconButton, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import axios from "axios";
import { errorAlert } from "../../utils";
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

function ViewPackage() {
  const theme = useTheme();

    const [packaegid, setPackageID] = useState("");
    const [packageName, setPackageName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [mcost, setCost] = useState("");
    const [homeImage, setHomeImage] = useState("");
    const [modelLink, setModelLink] = useState("model link");

  const [packageDetails, setPackageDetails] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get("http://localhost:3001/packages/getAllPackages", {
        _id: packaegid,
        name: packageName,
        price: price,
        description: description,
        duration: duration,
        homeImage: homeImage,
        modelLink: modelLink,
        cost: mcost,
      })
      .then((response) => {
        console.log(response);
        console.log(packaegid);
        setPackageDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
        errorAlert(error.response.data.message);
      });
  };

  const handleDelete = (packageId) => {
    axios
      .delete(`http://localhost:3001/packages/deletePackage/${packageId}`)
      .then((response) => {
        console.log(response);
        setPackageDetails(packageDetails.filter((row) => row.packageId !== packageId));
      })
      .catch((error) => {
        console.log(error);
        errorAlert(error.response.data.message);
      });
  };
  
    const navigate = useNavigate();
  
    const HandleUpdate = (packageId) => {
        if (packageId) {
          navigate(`/updatePackage/${packageId}`);
        }
        }

  return (
    <Grid container>
      <Grid item md={8}>
        <Grid
          item md={12}
          spacing={2}
          component="form"
          sx={theme.palette.gridBody}
          noValidate
          onSubmit={handleSubmit}
        >
                <Grid item md={12}>
                    <Typography variant="h5" gutterBottom>
                    View Package
                    </Typography>
                </Grid>
                <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                    Search Package
                </Button>
        </Grid>
      </Grid>
            <Grid item md={15} sx={theme.palette.gridBody} textAlign="center">
                <Typography variant="h4" gutterBottom>
                All Packages
                </Typography>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 1000 }}>
                    <TableHead>
                    <TableRow>
                        {/* <TableCell>Package ID</TableCell> */}
                        <TableCell>PackageId</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Duration</TableCell>
                        {/* <TableCell>Home Image</TableCell>
                        <TableCell>Model Link</TableCell> */}
                        <TableCell>Cost</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {packageDetails.map((row,Index) => (
                        <TableRow key={row.packageId}>
                            <TableCell>{row._id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.duration}</TableCell>
                            {/* <TableCell>{row.homeImage}</TableCell>
                            <TableCell>{row.modelLink}</TableCell> */}
                            <TableCell>{row.cost}</TableCell>
                            <TableCell>
                            <IconButton onClick={() => handleDelete(row._id)}>
                                <Delete />
                            </IconButton>
                            <IconButton onClick={() => HandleUpdate(row._id)}>
                                <Edit />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </Grid>
    </Grid>
  );
}
                

export default ViewPackage;