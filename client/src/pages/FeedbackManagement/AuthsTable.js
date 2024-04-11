import React from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


const AuthsTable = ({ rows, selectedAuth, deleteAuth }) => {
    
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Local authority name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Place</TableCell>
            <TableCell>No of floors</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? (
            rows.map(row => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope="row">{row.id}</TableCell>
                <TableCell>{row.localauthorityname}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.place}</TableCell>
                <TableCell>{row.nooffloors}</TableCell>
                <TableCell>
                  <Button sx={{ margin: '0px 10px' }} onClick={() => selectedAuth(row)}>
                    Update
                  </Button>
                  <Button sx={{ margin: '0px 10px' }} onClick={() => deleteAuth(row)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No Data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    
  );

  
  
}

export default AuthsTable;
