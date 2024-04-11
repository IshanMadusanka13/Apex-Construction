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

    //--------------------Table Functions---------------------------------
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.default,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.mainOpacity,
        },
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.primary.mainOpacity2,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    //-------------------------------Table Functions-----------------------------

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
                            <StyledTableRow>
                                {/* <TableCell>Package ID</TableCell> */}
                                <StyledTableCell>PackageId</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Price</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Duration</StyledTableCell>
                                {/* <StyledTableCell>Home Image</StyledTableCell>
                        <StyledTableCell>Model Link</StyledTableCell> */}
                                <StyledTableCell>Cost</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {packageDetails.map((row, Index) => (
                                <StyledTableRow key={row.packageId}>
                                    <StyledTableCell>{row._id}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.price}</StyledTableCell>
                                    <StyledTableCell>{row.description}</StyledTableCell>
                                    <StyledTableCell>{row.duration}</StyledTableCell>
                                    {/* <StyledTableCell>{row.homeImage}</StyledTableCell>
                            <StyledTableCell>{row.modelLink}</StyledTableCell> */}
                                    <StyledTableCell>{row.cost}</StyledTableCell>
                                    <StyledTableCell>
                                        <IconButton onClick={() => handleDelete(row._id)}>
                                            <Delete />
                                        </IconButton>
                                        <IconButton onClick={() => HandleUpdate(row._id)}>
                                            <Edit />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        sx={{ backgroundColor: theme.palette.primary.main, }}
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>
        </Grid>
    );
}


export default ViewPackage;