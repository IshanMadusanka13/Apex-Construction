import { Button, Grid,  OutlinedInput, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const FleetForm = ({addFleetDetail, updateFleetDetail, submitted, data, isEdit}) => {

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
        if(data?.Vehicleid && data.Vehicleid !== 0 ) {
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
  <Grid container spacing={2} style={{ backgroundColor: '#ffffff', marginBottom: '200px',marginTop: '100px',marginLeft:'100px'}}>
    <Grid item xs={12}>
      <Typography variant="h4" style={{ color: '#000000',marginBottom:'50px',marginLeft:'350px' }}>Transportation Details</Typography>
    </Grid>

    <Grid item xs={12} sm={6} >
      <Typography
        component={'label'} 
        htmlFor="Vehicleid"
        sx={{
          color: '#000000',
          marginRight: '20px',
          fontSize: '16px',
          width: '200px',
          display: 'block',
        }}
      >
        Vehicle ID
      </Typography>
      <OutlinedInput 
        type="number"
        
        id='Vehicleid'
        name="Vehicleid"
        sx={{ width: '400px',height: '50px'}}
        value={Vehicleid}
        onChange={e => setVehicleid(e.target.value)}
      />
    </Grid>

    <Grid item xs={12} sm={6} >
      <Typography
        component={'label'} 
        htmlFor="VehicleType"
        sx={{
          color: '#000000',
          marginRight: '20px',
          fontSize: '16px',
          width: '200px',
          display: 'block',
        }}
      >
        Vehicle Type:
      </Typography>
      <select
        id='VehicleType'
        name="VehicleType"
        style={{ width: '400px',height: '50px'}}
        value={VehicleType}
        onChange={e => setVehicleType(e.target.value)}
      >
        <option value="">Select</option>
        <option value="Car">Car</option>
        <option value="Truck">Truck</option>
        <option value="Van">Van</option>
        {/* Add more options as needed */}
      </select>
    </Grid>

    <Grid item xs={12} sm={6} >
      <Typography
        component={'label'} 
        htmlFor="VehicleNo"
        sx={{
          color: '#000000',
          marginRight: '20px',
          fontSize: '16px',
          width: '200px',
          display: 'block',
        }}
      >
        Vehicle No:
      </Typography>
      <OutlinedInput 
        type="text"
        id='VehicleNo'
        name="VehicleNo"
        sx={{ width: '400px',height: '50px'}}
        value={VehicleNo}
        onChange={e => setVehicleNo(e.target.value)}
      />
    </Grid>

    <Grid item xs={12} sm={6} >
      <Typography
        component={'label'} 
        htmlFor="DriverId"
        sx={{
          color: '#000000',
          marginRight: '20px',
          fontSize: '16px',
          width: '200px',
          display: 'block',
        }}
      >
        Driver ID:
      </Typography>
      <OutlinedInput 
        type="number"
        id='DriverId'
        name="DriverId"
        sx={{ width: '400px',height: '50px'}}
        value={DriverId}
        onChange={e => setDriverId(e.target.value)}
      />
    </Grid>

    <Grid item xs={12} sm={6} >
      <Typography
        component={'label'} 
        htmlFor="TransportMaterial"
        sx={{
          color: '#000000',
          marginRight: '20px',
          fontSize: '16px',
          width: '200px',
          display: 'block',
        }}
      >
        Transport Material:
      </Typography>
      <select
        id='TransportMaterial'
        name="TransportMaterial"
        style={{ width: '400px',height: '50px'}}
        value={TransportMaterial}
        onChange={e => setTransportMaterial(e.target.value)}
      >
        <option value="">Select</option>
        <option value="Material1">Material 1</option>
        <option value="Material2">Material 2</option>
        <option value="Material3">Material 3</option>
        {/* Add more options as needed */}
      </select>
    </Grid>

    <Grid item xs={12} sm={6} >
      <Typography
        component={'label'} 
        htmlFor="DriverMobileNo"
        sx={{
          color: '#000000',
          marginRight: '20px',
          fontSize: '16px',
          width: '200px',
          display: 'block',
        }}
      >
        Driver Mobile No:
      </Typography>
      <OutlinedInput 
        type="text"
        id='DriverMobileNo'
        name="DriverMobileNo"
        sx={{ width: '400px',height: '50px'}}
        value={DriverMobileNo}
        onChange={e => setDriverMobileNo(e.target.value)}
      />
    </Grid>

    <Grid item xs={12} sm={6} >
      <Typography
        component={'label'} 
        htmlFor="TransportLocation"
        sx={{
          color: '#000000',
          marginRight: '20px',
          fontSize: '16px',
          width: '200px',
          display: 'block',
        }}
      >
        Transport Location:
      </Typography>
      <OutlinedInput 
        type="text"
        id='TransportLocation'
        name="TransportLocation"
        sx={{ width: '400px',height: '50px'}}
        value={TransportLocation}
        onChange={e => setTransportLocation(e.target.value)}
      />
    </Grid>

    <Grid item xs={12} sm={6} >
      <Typography
        component={'label'} 
        htmlFor="TransportRoot"
        sx={{      color: '#000000',
        marginRight: '20px',
        fontSize: '16px',
        width: '200px',
        display: 'block',
      }}
    >
      Transport Root:
    </Typography>
    <OutlinedInput 
      type="text"
      id='TransportRoot'
      name="TransportRoot"
      sx={{ width: '400px',height: '50px'}}
      value={TransportRoot}
      onChange={e => setTransportRoot(e.target.value)}
    />
  </Grid>
  
  <Grid item xs={12} sm={6} >
    <Typography
      component={'label'} 
      htmlFor="EstimatedTime"
      sx={{
        color: '#000000',
        marginRight: '20px',
        fontSize: '16px',
        width: '200px',
        display: 'block',
      }}
    >
      Estimated Time:
    </Typography>
    <OutlinedInput 
      type="text"
      id='EstimatedTime'
      name="EstimatedTime"
      sx={{ width: '400px',height: '50px'}}
      value={EstimatedTime}
      onChange={e => setEstimatedTime(e.target.value)}
    />
  </Grid>
  
  <Button
    sx={{
      margin:'auto',
      marginBottom: '20px',
      backgroundColor: '#00c6e6',
      color: '#000000',
      marginLeft:'25px',
      marginTop: '55px',
      '&:hover': {
        opacity: '0.7',
        backgroundColor: '#00c6e6',
      }
    }}
    onClick={() =>  isEdit ? updateFleetDetail({Vehicleid, VehicleType, VehicleNo, DriverId, TransportMaterial, DriverMobileNo, TransportLocation, TransportRoot, EstimatedTime}) : addFleetDetail({Vehicleid, VehicleType, VehicleNo, DriverId, TransportMaterial, DriverMobileNo, TransportLocation, TransportRoot, EstimatedTime})}
  >
    {isEdit ? 'Update' : 'Add'}
  </Button>
  </Grid>
  );
  }
  
  export default FleetForm;
  
