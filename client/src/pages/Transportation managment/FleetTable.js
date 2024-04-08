import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const FleetTable = ({ rows, selectedFleetDetail, deleteFleetDetail }) => {
    return (
    <TableContainer component={Paper}>
     <Table>
         <TableHead>
            <TableRow>
                <TableCell>Vehicle ID</TableCell>
                <TableCell>Vehicle Type</TableCell>
                <TableCell>Vehicle No</TableCell>
                <TableCell>Driver ID</TableCell>
                <TableCell>Transport Material</TableCell>
                <TableCell>Driver Mobile No</TableCell>
                <TableCell>Transport Location</TableCell>
                <TableCell>Transport Root</TableCell>
                <TableCell>Estimated Time</TableCell>
                 <TableCell>Action</TableCell>
            </TableRow>
         </TableHead>
          <TableBody>
                 {
                   rows.length > 0 ? rows.map(row => (
                    <TableRow key={row.Vehicleid} sx={{ '&:last-child td, &:last-child th' : {border:0 }}}>
                    <TableCell component='th' scope="row">{row.Vehicleid}</TableCell>
                    <TableCell component='th' scope="row">{row.VehicleType}</TableCell>
                    <TableCell component='th' scope="row">{row.VehicleNo}</TableCell>
                    <TableCell component='th' scope="row">{row.DriverId}</TableCell>
                    <TableCell component='th' scope="row">{row.TransportMaterials}</TableCell>
                    <TableCell component='th' scope="row">{row.DriverMobileNo}</TableCell>
                    <TableCell component='th' scope="row">{row.TransportLocation}</TableCell>
                    <TableCell component='th' scope="row">{row.TransportRoot}</TableCell>
                    <TableCell component='th' scope="row">{row.EstimatedTime}</TableCell>
                    
                    <TableCell>
                        <Button sx={{ margin: '0px 10px'}}
                                onClick={() => selectedFleetDetail({ Vehicleid: row.Vehicleid, VehicleType: row.VehicleType, VehicleNo: row.VehicleNo, DriverId: row.DriverId, TransportMaterials: row.TransportMaterials, DriverMobileNo: row.DriverMobileNo, TransportLocation: row.TransportLocation, TransportRoot: row.TransportRoot, EstimatedTime: row.EstimatedTime})}
                                >
                                    Upadate

                        </Button>
                        <Button sx={{ margin: '0px 10px'}}
                                onClick={() => deleteFleetDetail({Vehicleid: row.Vehicleid})}
                                >
                                    Delete

                        </Button>
                    </TableCell>
                    </TableRow>
                   )) : (
                    <TableRow  sx={{ '&:last-child td, &:last-child th' : {border:0 }}}>
                        <TableCell component='th' scope="row">No Data</TableCell>
                    </TableRow>
                   )
                 }
          </TableBody>
          
     </Table>

    </TableContainer>
    );
}

export default FleetTable;