import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { TextField, IconButton, Typography, Button, Grid, FormControlLabel, Radio, RadioGroup, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled, tableCellClasses, TablePagination } from "@mui/material";
import axios from "axios";
import { errorAlert, successAlert } from "../../utils";
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import UpdatePackage from "./UpdatePackage";
import UpdateAddOns from "./UpdateAddOns";

function ViewAddOns() {
    const theme = useTheme();
    const navigate = useNavigate();

    const [packageDetails, setPackageDetails] = useState([]);
    const [viewUpdateContent, setViewUpdateContent] = useState(false);
    const [selectedRow, setSelectedRow] = useState('');
    const [packageName, setPackageName] = useState('');
    const [filteredPackageDetails, setFilteredPackageDetails] = useState([]);

    useEffect(() => {
        if (packageName) {
            const filteredData = packageDetails.filter(pkg => pkg.name.toLowerCase().includes(packageName.toLowerCase()));
            setFilteredPackageDetails(filteredData);
        } else {
            setFilteredPackageDetails(packageDetails);
        }
    }, [packageName, packageDetails]);


    useEffect(() => {
        const loadPackages = async () => {
            axios
                .get("http://localhost:3001/packageaddon/getall", {})
                .then((response) => {
                    setPackageDetails(response.data);
                })
                .catch((error) => {
                    errorAlert(error.response.data.message);
                });
        };
        loadPackages();
    }, [navigate]);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios
    //         .get("", {})
    //         .then((response) => {
    //         })
    //         .catch((error) => {
    //             errorAlert(error.response.data.message);
    //         });
    // };

    const handleDelete = (packageId) => {
        axios
            .delete("http://localhost:3001/packageaddon/delete/" + packageId)
            .then((response) => {
                console.log(response);
                successAlert("Package Deleted");
                setPackageDetails(packageDetails.filter((row) => row.packageId !== packageId));
            })
            .catch((error) => {
                console.log(error);
                errorAlert(error.response.data.message);
            });
    };

    const HandleUpdate = (row) => {
        setSelectedRow(row);
        setViewUpdateContent(true);
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
            <Grid>
            <Grid
                item md={12}
                spacing={2}
                component="form"
                sx={theme.palette.gridBody}
                noValidate
                // onSubmit={handleSubmit}
            >
                <Grid item md={12}>
                
                    <Typography variant="h5" gutterBottom>
                        Search Add Ons
                    </Typography>
                </Grid>
                <TextField
                    
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
                ></TextField>
                {/* <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
                    Search Package
                </Button> */}
            </Grid>
            <Grid item md={12} sx={theme.palette.gridBody} textAlign="center">
            <div style={{ display: 'flex',  alignItems: 'center' }}>
            <Button type="submit" variant="contained" sx={{ mt: 3, marginBottom: 2 , width: "20%" }} onClick={() => navigate('/addAddOns')}>
                Create Add Ons
            </Button>
                <Typography variant="h4" ml={25}>
                    All Add Ons
                </Typography>
            </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }}>
                        <TableHead>
                            <StyledTableRow>
                                {/* <TableCell>Package ID</TableCell> */}
                                {/* <StyledTableCell>PackageId</StyledTableCell> */}
                                
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Duration</StyledTableCell>
                                <StyledTableCell>Price</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                                {/* <StyledTableCell>Home Image</StyledTableCell>
                        <StyledTableCell>Model Link</StyledTableCell> */}
                                
                            </StyledTableRow>
                        </TableHead>
                       
                        
                        <TableBody>
                            {filteredPackageDetails.map((row) => (
                                <StyledTableRow key={row.packageId}>
                                    
                                    <StyledTableCell>{row.description}</StyledTableCell>
                                    <StyledTableCell>{row.duration}</StyledTableCell>
                                    <StyledTableCell>{row.price}</StyledTableCell>
                                    
                                    <StyledTableCell>
                                        <IconButton onClick={() => handleDelete(row._id)}>
                                            <Delete />
                                        </IconButton>
                                        <IconButton onClick={() => HandleUpdate(row)}>
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
                        count={packageDetails.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Grid>

            <Grid item md={12}>
                {viewUpdateContent && <UpdateAddOns data={selectedRow} />}
            </Grid>
            </Grid>
        </Grid>
    );
}


export default ViewAddOns;