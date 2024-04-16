import { Button, Grid, MenuItem, OutlinedInput, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const AddForm = ({ addAddVehicle, updateAddVehicle, submitted, data, isEdit }) => {

  const theme = useTheme();
  const [ChassisNo, setChassisNo] = useState(0);
  const [Vehicleid, setVehicleid] = useState(0);
  const [VehicleType, setVehicleType] = useState('');
  const [VehicleManufachuredYear, setVehicleManufachuredYear] = useState('');
  const [VehicleBrand, setVehicleBrand] = useState('');
  const [VehicleNo, setVehicleNo] = useState('');
  

  useEffect(() => {
    if (!submitted) {
      setChassisNo(0)  
      setVehicleid(0);
      setVehicleType('');
      setVehicleManufachuredYear('');
      setVehicleBrand('');
      setVehicleNo('');
      
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.Vehicleid && data.Vehicleid !== 0) {
      setChassisNo(data.ChassisNo);  
      setVehicleid(data.Vehicleid);
      setVehicleType(data.VehicleType);
      setVehicleManufachuredYear(data.VehicleManufachuredYear);
      setVehicleBrand(data.VehicleBrand);
      setVehicleNo(data.VehicleNo);
      
    }
  }, [data]);

  return (
    <Grid container spacing={2} sx={theme.palette.gridBody}>
      <Grid item md={12}>
        <Typography variant="h5" gutterBottom>Add Vehicles</Typography>
      </Grid>

      <Grid item md={6}>
        <TextField
          type="number"
          required
          fullWidth
          id='ChassisNo'
          label="Chassis No"
          name="ChassisNo"
          autoComplete="ChassisNo"
          value={ChassisNo}
          onChange={e => setChassisNo(e.target.value)}
          autoFocus
        />
      </Grid>

      <Grid item md={6}>
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
        />
      </Grid>

      <Grid item md={6}>
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
        </TextField>
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id='VehicleManufachuredYear'
          label="Vehicle Manufachured Year "
          name="VehicleManufachuredYear"
          value={VehicleManufachuredYear}
          onChange={e => setVehicleManufachuredYear(e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id='VehicleBrand'
          label="Vehicle Brand "
          name="VehicleBrand"
          value={VehicleBrand}
          onChange={e => setVehicleBrand(e.target.value)}
        />
      </Grid>


      <Grid item md={6}>
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
      <Button
        variant="contained" sx={{ mt: 3, width: "50%" }}
        onClick={() => isEdit ? updateAddVehicle({ ChassisNo, Vehicleid, VehicleType, VehicleManufachuredYear, VehicleBrand,  VehicleNo }) : addAddVehicle({ ChassisNo, Vehicleid, VehicleType, VehicleManufachuredYear, VehicleBrand, VehicleNo })}
      >
        {isEdit ? 'Update' : 'Add'}
      </Button>
    </Grid>
  );
}

export default AddForm;

