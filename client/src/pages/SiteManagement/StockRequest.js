import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { TextField, Typography, Button, Grid, MenuItem, styled, TableCell, tableCellClasses, TableRow, TableContainer, Table, TableHead, TableBody, TablePagination, useTheme, Box, Paper } from "@mui/material";
import { useSelector } from 'react-redux';
import { errorAlert, successAlert } from "../../utils.js";


function StockRequest() {

    const theme = useTheme();

    const [stockDetails, setStockDetails] = useState([]);
    const [selectedStock, setSelectedStock] = useState({});

    useEffect(() => {
        getStockDetails();
    }, []);

    const getStockDetails = () => {
        Axios.get("GET_ALL_STOCK")
            .then(response => {
                console.log(response);
                setStockDetails(response.data ? response.data : []);
            })
            .catch(error => {
                errorAlert("Axios Error :", error);
            });
    }

    const handleRequest = (content) => {
        setSelectedStock(content.row);
    }

    const requestStock = (data) => {

    }

    return (
        <Grid container>
            <Grid item md={8}>
                <ExisitngStock
                    rows={stockDetails}
                    selectedRow={handleRequest} />
            </Grid>
            <Grid item md={4}>
                <RequestForm requestStock={requestStock} data={selectedStock} />
            </Grid>
            <Grid item md={12}>
                <RequestedStock data={requestStock} />
            </Grid>
        </Grid>
    );

}

export default StockRequest;

function ExisitngStock(rows, selectedRow) {
    const theme = useTheme();

    //----------------------Table Functions-----------------------------------
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
    //----------------------Table Functions End-----------------------------------

    const handleRequest = (content) => {
        selectedRow(content);
    };

    return (
        <Box sx={theme.palette.gridBody}>
            <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Equipment Id</StyledTableCell>
                            <StyledTableCell>Equipment Name</StyledTableCell>
                            <StyledTableCell>Unit Price</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell>Available Qty</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length > 0 ? rows.map(row => (
                            <StyledTableRow key={row.equipmentId}>
                                <StyledTableCell>{row.equipmentId}</StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.price}</StyledTableCell>
                                <StyledTableCell>{row.description}</StyledTableCell>
                                <StyledTableCell>{row.qty}</StyledTableCell>

                                <StyledTableCell>
                                    <Button sx={{ margin: '0px 10px' }}
                                        onClick={() => handleRequest({ row })}
                                    >
                                        Request
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        )) : (
                            <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell>No Data</StyledTableCell>
                            </StyledTableRow>
                        )
                        }
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
        </Box>
    );
}

function RequestForm(data, requestStock) {

    const [equipmentId, setEquipmentId] = useState(0);
    const [equipmentName, setEquipmentName] = useState('');
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [existingQty, setExistingQty] = useState(0);

    useEffect(() => {
        console.log(data)
        if (data?.equipmentId) {
            setEquipmentId(data.equipmentId);
            setEquipmentName(data.name);
            setPrice(data.price);
            setExistingQty(data.qty);
        }
    }, [data]);

    const handleClick = () => {
        if (qty > existingQty) {
            errorAlert("Insufficent Stock");
        } else {
            requestStock({ equipmentId, equipmentName, price, qty });
        }
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Request Stock
                </Typography>
            </Grid>
            <Grid item md={12}>
                <TextField
                    required
                    fullWidth
                    id='equipmentName'
                    label="Equipment Name"
                    name="equipmentName"
                    autoComplete="equipmentName"
                    value={equipmentName}
                    autoFocus
                    onChange={e => setEquipmentName(e.target.value)}
                />
            </Grid>
            <Grid item md={12}>
                <TextField
                    type="number"
                    margin="normal"
                    required
                    fullWidth
                    id='qty'
                    label="Qty"
                    name="qty"
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                />
            </Grid>
            <Button
                variant="contained" sx={{ mt: 3, width: "50%" }}
                onClick={() => handleClick()}
            >
                Request
            </Button>
        </Grid>
    );
}

function RequestedStock(data) {

    const theme = useTheme();

    //------------------------Table Functions Start------------------------------------
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
    //------------------------Table Functions End------------------------------------

    const [rows, setRows] = useState([]);

    useEffect(() => {
        console.log(data)
        if (data?.equipmentId) {
            if (!rows.some(row => row.equipmentId === data.equipmentId)) {
                const rowData = {
                    equipmentId: data.equipmentId,
                    equipmentName: data.name,
                    value: data.price,
                    qty: data.qty
                };
                const updatedRows = [...rows, rowData];
                setRows(updatedRows);
            }
        }
    }, [data]);

    const removeRow = (content) => {
        let equipmentIdToRemove = content.equipmentId;
        const updatedRows = rows.filter(row => row.equipmentId !== equipmentIdToRemove);
        setRows(updatedRows);
    };

    return (
        <Box sx={theme.palette.gridBody}>
            <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Equipment Id</StyledTableCell>
                            <StyledTableCell>Equipment Name</StyledTableCell>
                            <StyledTableCell>Qty</StyledTableCell>
                            <StyledTableCell>Total Price</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.length > 0 ? rows.map(row => (
                                <StyledTableRow key={row.equipmentId}>
                                    <StyledTableCell>{row.equipmentId}</StyledTableCell>
                                    <StyledTableCell>{row.name}</StyledTableCell>
                                    <StyledTableCell>{row.qty}</StyledTableCell>
                                    <StyledTableCell>{(row.price * row.qty)}</StyledTableCell>


                                    <StyledTableCell>
                                        <Button sx={{ margin: '0px 10px' }} onClick={() => removeRow(row)}>
                                            Remove
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            )) : (
                                <StyledTableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <StyledTableCell>No Data</StyledTableCell>
                                </StyledTableRow>
                            )
                        }
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
        </Box>
    );
}