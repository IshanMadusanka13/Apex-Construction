import { Box } from "@mui/material";
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
        setFleetDetails(response.data ? response.data : []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert("Failed to search for fleet details.");
      });
  }

  return (
    <Box>
      {/* Search functionality */}
      <div>
        <input
          type="String"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display FleetTable */}
      <FleetTable
        rows={fleetDetails}
      />
    </Box>
  );
}

export default FleetTablePage;
