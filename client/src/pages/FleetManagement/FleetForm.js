import { Button, Grid, MenuItem, OutlinedInput, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const FleetForm = ({ addFleetDetail, updateFleetDetail, submitted, data, isEdit }) => {

  const theme = useTheme();

  const [Vehicleid, setVehicleid] = useState(0);
  const [VehicleType, setVehicleType] = useState('');
  const [VehicleNo, setVehicleNo] = useState('');
  const [DriverId, setDriverId] = useState(0);
  const [TransportMaterial, setTransportMaterial] = useState('');
  const [DriverMobileNo, setDriverMobileNo] = useState('');
  const [TransportLocation, setTransportLocation] = useState('');
  const [TransportRoot, setTransportRoot] = useState('');
  const [EstimatedTime, setEstimatedTime] = useState('');

  useEffect(() => {
    if (!submitted) {
      setVehicleid(0);
      setVehicleType('');
      setVehicleNo('');
      setDriverId(0);
      setTransportMaterial('');
      setDriverMobileNo('');
      setTransportLocation('');
      setTransportRoot('');
      setEstimatedTime('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.Vehicleid && data.Vehicleid !== 0) {
      setVehicleid(data.Vehicleid);
      setVehicleType(data.VehicleType);
      setVehicleNo(data.VehicleNo);
      setDriverId(data.DriverId);
      setTransportMaterial(data.TransportMaterial);
      setDriverMobileNo(data.DriverMobileNo);
      setTransportLocation(data.TransportLocation);
      setTransportRoot(data.TransportRoot);
      setEstimatedTime(data.EstimatedTime);
    }
  }, [data]);

  return (
    <Grid container spacing={2} sx={theme.palette.gridBody}>
      <Grid item xs={12} sm={6} md={12}>
        <Typography variant="h4" style={{ color: '#000000', marginBottom: '50px', marginLeft: '350px' }}>Transportation Details</Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <TextField
          type="number"
          required
          fullWidth
          id='Vehicleid'
          label="Vehicle Id"
          name="Vehicleid"
          autoComplete="Vehicleid"
          value={Vehicleid}
          onChange={e => setVehicleid(e.target.value)}
          autoFocus
        />
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <TextField
          select
          id='VehicleType'
          required
          fullWidth
          name="VehicleType"
          label='VehicleType'
          value={VehicleType}
          onChange={e => setVehicleType(e.target.value)}
        >
          <MenuItem value="crane">Pickup Truck</MenuItem>
          <MenuItem value="Truck">Truck</MenuItem>
          <MenuItem value="Loader">Concrete Truck</MenuItem>
          <MenuItem value="Loader">Dump Truck</MenuItem>
          <MenuItem value="Loader">Tanker Truck</MenuItem>
          <MenuItem value="Loader">Small Lorry</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id='VehicleNo'
          label="Vehicle No"
          name="VehicleNo"
          value={VehicleNo}
          onChange={e => setVehicleNo(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <TextField
          type="number"
          margin="normal"
          required
          fullWidth
          id='DriverId'
          label='Driver Id'
          name="DriverId"
          value={DriverId}
          onChange={e => setDriverId(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <TextField
          select
          id='TransportMaterial'
          required
          fullWidth
          name="TransportMaterial"
          label='Transport Material'
          value={TransportMaterial}
          onChange={e => setTransportMaterial(e.target.value)}
        >
          <MenuItem value="Material1">Concrete </MenuItem>
          <MenuItem value="Material2">Cement </MenuItem>
          <MenuItem value="Material3">Stone</MenuItem>
          <MenuItem value="Material3">Glass</MenuItem>
          <MenuItem value="Material3">Sand</MenuItem>
          <MenuItem value="Material3">Wood</MenuItem>
          <MenuItem value="Material3">Bricks</MenuItem>
          <MenuItem value="Material3">Steel</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id='DriverMobileNo'
          required
          fullWidth
          label='Driver Mobile No'
          name="DriverMobileNo"
          value={DriverMobileNo}
          onChange={e => setDriverMobileNo(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <TextField
          id='TransportLocation'
          required
          fullWidth
          name="TransportLocation"
          label='Transport Location'
          value={TransportLocation}
          onChange={e => setTransportLocation(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} >
        <TextField
          id='TransportRoot'
          required
          fullWidth
          label='Transport Root'
          name="TransportRoot"
          value={TransportRoot}
          onChange={e => setTransportRoot(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6} >
        <TextField
          id='EstimatedTime'
          required
          fullWidth
          name="EstimatedTime"
          label='Estimated Time'
          value={EstimatedTime}
          onChange={e => setEstimatedTime(e.target.value)}
        />
      </Grid>

      <Button
        variant="contained" sx={{ mt: 3, width: "50%" }}
        onClick={() => isEdit ? updateFleetDetail({ Vehicleid, VehicleType, VehicleNo, DriverId, TransportMaterial, DriverMobileNo, TransportLocation, TransportRoot, EstimatedTime }) : addFleetDetail({ Vehicleid, VehicleType, VehicleNo, DriverId, TransportMaterial, DriverMobileNo, TransportLocation, TransportRoot, EstimatedTime })}
      >
        {isEdit ? 'Update' : 'Add'}
      </Button>
    </Grid>
  );
}

export default FleetForm;

