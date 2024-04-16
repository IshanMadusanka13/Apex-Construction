import { Box,TextField,Button } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { errorAlert } from "../../utils";
import FleetTable from './SimpleFleetTable.js';

const FleetTablePage = () => {
  const [fleetDetails, setFleetDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = () => {
    Axios.get(`http://localhost:3001/fleet/search/${searchTerm}`)
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
