import { Button, Grid, MenuItem, OutlinedInput, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
import { SEARCH_VEHCILE_BY_TYPE } from "../../EndPoints";

const FleetForm = ({ addFleetDetail, updateFleetDetail, submitted, data, isEdit }) => {

  const theme = useTheme();

  const [VehicleType, setVehicleType] = useState('');
  const [VehicleNo, setVehicleNo] = useState([]);
  const [selectedVehicleNo, setSelectedVehicleNo] = useState('');
  const [DriverId, setDriverId] = useState(0);
  const [TransportMaterial, setTransportMaterial] = useState('');
  const [DriverMobileNo, setDriverMobileNo] = useState('');
  const [TransportLocation, setTransportLocation] = useState('');
  const [TransportRoot, setTransportRoot] = useState('');
  const [EstimatedTime, setEstimatedTime] = useState('');

  useEffect(() => {
    if (!submitted) {
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
    if (data?.VehicleNo && data.VehicleNo !== '') {
      setVehicleType(data.VehicleType);
      setSelectedVehicleNo(data.VehicleNo);
      setDriverId(data.DriverId);
      setTransportMaterial(data.TransportMaterials);
      setDriverMobileNo(data.DriverMobileNo);
      setTransportLocation(data.TransportLocation);
      setTransportRoot(data.TransportRoot);
      setEstimatedTime(data.EstimatedTime);
    }
  }, [data]);

  useEffect(() => {
    const getAddVehicles = () => {
      Axios.get(SEARCH_VEHCILE_BY_TYPE + VehicleType)
        .then(response => {
          console.log(response);
          const vNo = response.data.map((vehicle) => vehicle.VehicleNo);
          setVehicleNo(vNo);
        })
        .catch(error => {
          console.error("Axios Error :", error);
        });
    }
    getAddVehicles();
  }, [VehicleType]);

  return (
    <Grid container spacing={2} sx={theme.palette.gridBody}>
      <Grid item xs={12} sm={6} md={12}>
        <Typography variant="h4" style={{ color: '#000000', marginBottom: '50px', marginLeft: '350px' }}>Transportation Details</Typography>
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
          <MenuItem value="Car">Car</MenuItem>
          <MenuItem value="Truck">Truck</MenuItem>
          <MenuItem value="Van">Van</MenuItem>
          <MenuItem value="PickupTruck">Pickup Truck</MenuItem>
          <MenuItem value="ConcreteTruck">Concrete Truck</MenuItem>
          <MenuItem value="DumpTruck">Dump Truck</MenuItem>
          <MenuItem value="TankerTruck">Tanker Truck</MenuItem>
          <MenuItem value="SmallLorry">Small Lorry</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <TextField
          select
          margin="normal"
          required
          fullWidth
          id='VehicleNo'
          label="Vehicle No"
          name="VehicleNo"
          value={selectedVehicleNo}
          onChange={e => setSelectedVehicleNo(e.target.value)}
        >
          {Object.values(VehicleNo).map((vNo) => (
            <MenuItem value={vNo}>{vNo}</MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <TextField
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
          <MenuItem value="Concrete">Concrete </MenuItem>
          <MenuItem value="Cement">Cement </MenuItem>
          <MenuItem value="Stone">Stone</MenuItem>
          <MenuItem value="Glass">Glass</MenuItem>
          <MenuItem value="Sand">Sand</MenuItem>
          <MenuItem value="Wood">Wood</MenuItem>
          <MenuItem value="Bricks">Bricks</MenuItem>
          <MenuItem value="Steel">Steel</MenuItem>
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
        onClick={() => isEdit ? updateFleetDetail({ VehicleType, selectedVehicleNo, DriverId, TransportMaterial, DriverMobileNo, TransportLocation, TransportRoot, EstimatedTime }) : addFleetDetail({ VehicleType, selectedVehicleNo, DriverId, TransportMaterial, DriverMobileNo, TransportLocation, TransportRoot, EstimatedTime })}
      >
        {isEdit ? 'Update' : 'Add'}
      </Button>
    </Grid>
  );
}

export default FleetForm;

