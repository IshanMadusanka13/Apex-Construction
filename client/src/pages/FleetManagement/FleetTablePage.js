import { Box, TextField, Button } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert } from "../../utils";
import FleetTable from './SimpleFleetTable.js';
import { SEARCH_FLEET, SEARCH_FLEET_BY_DRIVER_ID } from "../../EndPoints";

const FleetTablePage = () => {
  const [fleetDetails, setFleetDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = () => {
    Axios.get(SEARCH_FLEET_BY_DRIVER_ID + searchTerm)
      .then(response => {
        setFleetDetails(response.data ? [response.data] : []);
        console.log(response.data);
        console.log(fleetDetails);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert("Failed to search for fleet details.");
      });
  }



  return (
    <Box>
      {/* Search functionality */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <TextField
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch} sx={{ marginLeft: '10px' }}>Search</Button>
      </Box>

      {/* Display FleetTable */}
      <FleetTable
        rows={fleetDetails}

      />
    </Box>
  );
}

export default FleetTablePage;
