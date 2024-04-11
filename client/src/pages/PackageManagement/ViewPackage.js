import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { TextField, IconButton, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
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
            .get("http://localhost:3001/package/getall", {})
            .then((response) => {
                console.log(response);
                setPackageDetails(response.data);
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const handleDelete = (packageId) => {

        axios
            .delete("http://localhost:3001/package/delete/" + packageId)
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
            // console.log(packageId);
            navigate(`/updatePackage/${packageId}`);
        }
    }

    return (
        <Grid container>
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
                            {packageDetails.map((row, Index) => (
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