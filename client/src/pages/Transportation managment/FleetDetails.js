import { Box } from "@mui/material";
import FleetForm from "./FleetForm";
import FleetTable from "./FleetTable";
import Axios from "axios";
import { useEffect, useState } from "react";

const FleetDetails = () => {
  const [FleetDetails, setFleetDetails] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFleetDetail, setSelectedFleetDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getFleetDetails();
  }, []);

  const getFleetDetails = () => {
    Axios.get('http://localhost:3001/api/FleetDetails')
      .then(response => {
        setFleetDetails(response.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const addFleetDetail = (data) => {
    setSubmitted(true);
    const payload = {
      Vehicleid: data.Vehicleid,
      VehicleType: data.VehicleType,
      VehicleNo: data.VehicleNo,
      DriverId: data.DriverId,
      TransportMaterials:data.TransportMaterials,
      DriverMobileNo:data.DriverMobileNo,
      TransportLocation:data.TransportLocation,
      TransportRoot:data.TransportRoot,
      EstimatedTime:data.EstimatedTime




    }
    Axios.post('http://localhost:3001/api/createFleetDetail', payload)
      .then(() => {
        getFleetDetails();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const updateFleetDetail = (data) => {
    setSubmitted(true);
    const payload = {
      Vehicleid: data.Vehicleid,
      VehicleType: data.VehicleType,
      VehicleNo: data.VehicleNo,
      DriverId: data.DriverId,
      TransportMaterials:data.TransportMaterials,
      DriverMobileNo:data.DriverMobileNo,
      TransportLocation:data.TransportLocation,
      TransportRoot:data.TransportRoot,
      EstimatedTime:data.EstimatedTime
    }
    Axios.post('http://localhost:3001/api/updateFleetDetail', payload)
      .then(() => {
        getFleetDetails();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const deleteFleetDetail = (data) => {
    Axios.post('http://localhost:3001/api/deleteFleetDetail', data)
      .then(() => {
        getFleetDetails();
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  return (
    <Box 
      sx={{
        width: 'calc(100% - 100px)',
        margin: 'auto',
        marginTop: '100px',
      }}
    >
      <FleetForm
        addFleetDetail={addFleetDetail}
        updateFleetDetail={updateFleetDetail}
        submitted={submitted}
        data={selectedFleetDetail}
        isEdit={isEdit}
      />
      <FleetTable 
        rows={FleetDetails}
        selectedUser={data => {
          setSelectedFleetDetail(data);
          setIsEdit(true);
        }}
        deleteFleetDetail={data => {
          window.confirm("Are you sure?") && deleteFleetDetail(data);
        }}
      />
    </Box>
  );
}

export default FleetDetails;
