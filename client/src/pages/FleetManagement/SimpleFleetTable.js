import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import React from "react";
import { Style } from "@mui/icons-material";

const SimpleFleetTable = ({ rows }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vehicle ID</TableCell>
            <TableCell>Vehicle Type</TableCell>
            <TableCell>Vehicle No</TableCell>
            <TableCell>Driver ID</TableCell>
            <TableCell>Transport Materials</TableCell>
            <TableCell>Driver Mobile No</TableCell>
            <TableCell>Transport Location</TableCell>
            <TableCell>Transport Root</TableCell>
            <TableCell>Estimated Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Vehicleid}>
              <TableCell>{row.Vehicleid}</TableCell>
              <TableCell>{row.VehicleType}</TableCell>
              <TableCell>{row.VehicleNo}</TableCell>
              <TableCell>{row.DriverId}</TableCell>
              <TableCell>{row.TransportMaterials}</TableCell>
              <TableCell>{row.DriverMobileNo}</TableCell>
              <TableCell>{row.TransportLocation}</TableCell>
              <TableCell>{row.TransportRoot}</TableCell>
              <TableCell>{row.EstimatedTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SimpleFleetTable;
