import { Box } from "@mui/material";
import AddForm from "./AddForm.js";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert, successAlert } from "../../utils";
import AddTable from './AddTable.js';
import { CREATE_VEHCILE, DELETE_VEHCILE, SEARCH_VEHCILE, UPDATE_VEHCILE } from "../../EndPoints";

const AddVehicles = () => {
  const [AddVehicles, setAddVehicles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAddVehicle, setSelectedAddVehicle] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getAddVehicles();
  }, []);

  const getAddVehicles = () => {
    Axios.get(SEARCH_VEHCILE)
      .then(response => {
        setAddVehicles(response.data ? response.data : []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const addAddVehicle = (data) => {
    setSubmitted(true);
    const payload = {
      ChassisNo: data.ChassisNo,
      VehicleType: data.VehicleType,
      VehicleManufachuredYear: data.VehicleManufachuredYear,
      VehicleBrand: data.VehicleBrand,
      VehicleNo: data.VehicleNo,
    }

    Axios.post(CREATE_VEHCILE, payload)
      .then(() => {
        getAddVehicles();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Added Succesfully");
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const updateAddVehicle = (data) => {
    setSubmitted(true);
    const payload = {
      ChassisNo: data.ChassisNo,
      VehicleType: data.VehicleType,
      VehicleManufachuredYear: data.VehicleManufachuredYear,
      VehicleBrand: data.VehicleBrand,
      VehicleNo: data.VehicleNo,
    }
    Axios.put(UPDATE_VEHCILE, payload)
      .then(() => {
        getAddVehicles();
        setSubmitted(false);
        setIsEdit(false);
        successAlert("Details Updated Succesfully");
      })
      .catch(error => {
        errorAlert(error.response.data.message);
        console.error("Axios Error :", error);
      });
  }

  const deleteAddVehicle = (data) => {
    Axios.delete(DELETE_VEHCILE + data.ChassisNo)
      .then(() => {
        getAddVehicles();
        successAlert("Data Deleted Succesfully");
      })
      .catch(error => {
        errorAlert(error.response.data.message);
        console.error("Axios Error :", error);
      });
  }

  const handleUpdate = (content) => {
    setSelectedAddVehicle(content.row);
    setIsEdit(true);
  }

  return (
    <Box>
      <AddForm
        addAddVehicle={addAddVehicle}
        updateAddVehicle={updateAddVehicle}
        submitted={submitted}
        data={selectedAddVehicle}
        isEdit={isEdit}
      />
      <AddTable
        rows={AddVehicles}
        selectedUser={handleUpdate}
        deleteAddVehicle={data => {
          window.confirm("Are you sure?") && deleteAddVehicle(data);
        }}
      />
    </Box>
  );
}

export default AddVehicles;
