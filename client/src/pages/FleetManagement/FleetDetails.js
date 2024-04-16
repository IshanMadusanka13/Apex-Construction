import { Box } from "@mui/material";
import FleetForm from "./FleetForm";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../../utils";
import FleetTable from './FleetTable.js';
import { CREATE_FLEET, DELETE_FLEET, SEARCH_FLEET, UPDATE_FLEET } from "../../EndPoints";


const FleetDetails = () => {
  const [FleetDetails, setFleetDetails] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFleetDetail, setSelectedFleetDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getFleetDetails();
  }, []);

  const getFleetDetails = () => {
    Axios.get(SEARCH_FLEET)
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

    Axios.post(CREATE_FLEET, payload)
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
    Axios.put(UPDATE_FLEET, payload)
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
    Axios.delete(DELETE_FLEET + data.Vehicleid)
      .then(() => {
        getFleetDetails();
        successAlert("Data Deleted Succesfully");
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
