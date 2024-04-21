import React, { useState } from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, tableCellClasses, TablePagination, TableHead, TableRow, useTheme } from "@mui/material";
import { styled } from '@mui/material/styles';
import jsPDF from "jspdf";
import "jspdf-autotable";

const FleetTable = ({ rows, selectedUser, deleteFleetDetail }) => {

    const theme = useTheme();
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

    const handleUpdate = (content) => {
        selectedUser(content);
    };

    const generatePDFReport = () => {
        const doc = new jsPDF();
        const tableHead = [
            ['Vehicle Type', 'Vehicle No', 'Driver ID', 'Driver Mobile No', 'Transport Material', 'Transport Location', 'Transport Root', 'Estimated Time'],
        ];
        const tableBody = [];
        rows.forEach((fleet) => {
            const fleetData = [
                fleet.VehicleType,
                fleet.VehicleNo,
                fleet.DriverId,
                fleet.DriverMobileNo,
                fleet.TransportMaterials,
                fleet.TransportLocation,
                fleet.TransportRoot,
                fleet.EstimatedTime,

            ];
            tableBody.push(fleetData);
        });
        doc.autoTable({
            head: tableHead,
            body: tableBody,
            startY: 20,
        });
        doc.save("fleetDetails.pdf");
    };

    return (
        <Box sx={theme.palette.gridBody}>
            <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.primary.main }}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Vehicle Type</StyledTableCell>
                            <StyledTableCell>Vehicle No</StyledTableCell>
                            <StyledTableCell>Driver ID</StyledTableCell>
                            <StyledTableCell>Driver Mobile No</StyledTableCell>
                            <StyledTableCell>Transport Material</StyledTableCell>
                            <StyledTableCell>Transport Location</StyledTableCell>
                            <StyledTableCell>Transport Root</StyledTableCell>
                            <StyledTableCell>Estimated Time</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.length > 0 ? rows.map(row => (
                                <StyledTableRow key={row.VehicleNo}>
                                    <StyledTableCell>{row.VehicleType}</StyledTableCell>
                                    <StyledTableCell>{row.VehicleNo}</StyledTableCell>
                                    <StyledTableCell>{row.DriverId}</StyledTableCell>
                                    <StyledTableCell>{row.DriverMobileNo}</StyledTableCell>
                                    <StyledTableCell>{row.TransportMaterials}</StyledTableCell>
                                    <StyledTableCell>{row.TransportLocation}</StyledTableCell>
                                    <StyledTableCell>{row.TransportRoot}</StyledTableCell>
                                    <StyledTableCell>{row.EstimatedTime}</StyledTableCell>
                                    <StyledTableCell>
                                        <Button sx={{ margin: '0px 10px' }}
                                            onClick={() => handleUpdate({ row })}
                                        >
                                            Upadate

                                        </Button>
                                        <Button sx={{ margin: '0px 10px' }}
                                            onClick={() => deleteFleetDetail({ VehicleNo: row.VehicleNo })}
                                        >
                                            Delete

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
            <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }} onClick={() => generatePDFReport()}>
                Generate Report
            </Button>
        </Box>
    );
}

export default FleetTable;