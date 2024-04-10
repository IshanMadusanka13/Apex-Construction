// import React, { useState, useEffect } from "react";
// import { useSelector } from 'react-redux';
// import { TextField,IconButton, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import axios from "axios";
// import { errorAlert } from "../../utils";
// import Delete from '@mui/icons-material/Delete';
// import Edit from '@mui/icons-material/Edit';
// import { useNavigate } from "react-router-dom";

// function ComViewPayment() {
//   const theme = useTheme();

//     const [financeid, setFinanceID] = useState("");
//     const [lastpaymnetdate, setDate] = useState("");
//     const [discription, setDiscription] = useState("");
//     const [amount, setAmount] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     axios
//       .get("http://localhost:3001/packages/getAllPackages", {
//         _id: financeid,
//         name: lastpaymnetdate,
//         price: discription,
//         description: amount,
//       })
//       .then((response) => {
//         console.log(response);
//         console.log(packaegid);
//         setPackageDetails(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         errorAlert(error.response.data.message);
//       });
//   };

//   const handleDelete = (packageId) => {
//     axios
//       .delete(`http://localhost:3001/packages/deletePackage/${packageId}`)
//       .then((response) => {
//         console.log(response);
//         setPackageDetails(packageDetails.filter((row) => row.packageId !== packageId));
//       })
//       .catch((error) => {
//         console.log(error);
//         errorAlert(error.response.data.message);
//       });
//   };
  
//     const navigate = useNavigate();
  
//     const HandleUpdate = (packageId) => {
    
//         if (packageId) {
//             // console.log(packageId);
//             navigate(`/updatePackage/${packageId}`);
//           }
//           //${packageId}
//         // axios
//         // .put(`http://localhost:3001/package/updatePackage/${packageId}`)
//         // // .then((response) => {
//         // //   console.log(response);
//         // //   setPackageDetails(packageDetails.filter((row) => row.packageId !== packageId));
//         // // })
//         // // .catch((error) => {
//         // //   console.log(error);
//         // //   errorAlert(error.response.data.message);
//         // // });
//         }

//   return (
//     <Grid container>
//       <Grid item md={8}>
//         <Grid
//           item md={12}
//           spacing={2}
//           component="form"
//           sx={theme.palette.gridBody}
//           noValidate
//           onSubmit={handleSubmit}
//         >
//                 <Grid item md={12}>
//                     <Typography variant="h5" gutterBottom>
//                     View Package
//                     </Typography>
//                 </Grid>
//                 <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
//                     Search Package
//                 </Button>
//         </Grid>
//       </Grid>
//             <Grid item md={15} sx={theme.palette.gridBody} textAlign="center">
//                 <Typography variant="h4" gutterBottom>
//                 All Packages
//                 </Typography>
//                 <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 1000 }}>
//                     <TableHead>
//                     <TableRow>
//                         {/* <TableCell>Package ID</TableCell> */}
//                         <TableCell>PaymntId</TableCell>
//                         <TableCell>Date</TableCell>
//                         <TableCell>Discription</TableCell>
//                         <TableCell>Amount</TableCell>
//                         {/* <TableCell>Action</TableCell> */}
//                     </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {packageDetails.map((row,Index) => (
//                         <TableRow key={row.packageId}>
//                             <TableCell>{row._id}</TableCell>
//                             <TableCell>{row.name}</TableCell>
//                             <TableCell>{row.price}</TableCell>
//                             <TableCell>{row.description}</TableCell>
//                             <TableCell>
//                             {/* <IconButton onClick={() => handleDelete(row._id)}>
//                                 <Delete />
//                             </IconButton>
//                             <IconButton onClick={() => HandleUpdate(row._id)}>
//                                 <Edit />
//                             </IconButton> */}
//                             </TableCell>
//                         </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//                 </TableContainer>
//             </Grid>
//     </Grid>
//   );
// }
                
// export default ComViewPayment;


