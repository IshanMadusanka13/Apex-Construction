import { Box } from "@mui/material";
import FleetForm from "./FleetForm";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../../utils";
import FleetTable from './FleetTable.js';


const FleetDetails = () => {
  const [FleetDetails, setFleetDetails] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFleetDetail, setSelectedFleetDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getFleetDetails();
  }, []);

  const getFleetDetails = () => {
    Axios.get('http://localhost:3001/fleet/search')
      .then(response => {
        setFleetDetails(response.data ? response.data : []);
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
      TransportMaterials: data.TransportMaterials,
      DriverMobileNo: data.DriverMobileNo,
      TransportLocation: data.TransportLocation,
      TransportRoot: data.TransportRoot,
      EstimatedTime: data.EstimatedTime
    }

    Axios.post('http://localhost:3001/fleet/create', payload)
      .then(() => {
        getFleetDetails();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Added Succesfully");
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const updateFleetDetail = (data) => {
    setSubmitted(true);
    const payload = {
      Vehicleid: data.Vehicleid,
      VehicleType: data.VehicleType,
      VehicleNo: data.VehicleNo,
      DriverId: data.DriverId,
      TransportMaterials: data.TransportMaterials,
      DriverMobileNo: data.DriverMobileNo,
      TransportLocation: data.TransportLocation,
      TransportRoot: data.TransportRoot,
      EstimatedTime: data.EstimatedTime
    }
    Axios.put('http://localhost:3001/fleet/update', payload)
      .then(() => {
        getFleetDetails();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Updated Succesfully");
      })
      .catch(error => {
        errorAlert(error.response.data.message);
        console.error("Axios Error :", error);
      });
  }

  const deleteFleetDetail = (data) => {
    Axios.delete('http://localhost:3001/fleet/delete', data)
      .then(() => {
        getFleetDetails();
      })
      .catch(error => {
        errorAlert(error.response.data.message);
        console.error("Axios Error :", error);
      });
  }

  const handleUpdate = (content) => {
    setSelectedFleetDetail(content.row);
    setIsEdit(true);
  }

  return (
    <Box>
      <FleetForm
        addFleetDetail={addFleetDetail}
        updateFleetDetail={updateFleetDetail}
        submitted={submitted}
        data={selectedFleetDetail}
        isEdit={isEdit}
      />
      <FleetTable
        rows={FleetDetails}
        selectedUser={handleUpdate}
        deleteFleetDetail={data => {
          window.confirm("Are you sure?") && deleteFleetDetail(data);
        }}
      />
    </Box>
  );
}

export default FleetDetails;
