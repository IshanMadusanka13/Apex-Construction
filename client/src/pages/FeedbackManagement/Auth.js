import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Select, MenuItem, useTheme } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";

import { CREATE_AUTH, DELETE_AUTH, GET_AUTH, UPDATE_AUTH } from "../../EndPoints";
import { errorAlert } from "../../utils";
import jsPDF from "jspdf";


const Auths = () => {
  const [auths, setAuths] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAuth, setSelectedAuth] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const theme = useTheme();
  


  useEffect(() => {
    getAuths();
  }, []);

  const getAuths = () => {
    Axios.get(GET_AUTH)
      .then(response => {
        setAuths(response.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const addAuth = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      localauthorityname: data.localauthorityname,
      type: data.type,
      city: data.city,
      place: data.place,
      nooffloors: data.nooffloors,
    }
    Axios.post(CREATE_AUTH, payload)
      .then(() => {
        getAuths();
        setSubmitted(false);
        setIsEdit(false);

      })
      .catch(error => {
        // console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const updateAuth = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      localauthorityname: data.localauthorityname,
      type: data.type,
      city: data.city,
      place: data.place,
      nooffloors: data.nooffloors,
    }
    Axios.put(UPDATE_AUTH, payload)
      .then(() => {
        getAuths();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const deleteAuth = (data) => {
    Axios.delete(DELETE_AUTH +data)
      .then(() => {
        getAuths();
      })
      .catch(error => {
        console.error("Axios Error :", error);
        errorAlert(error.response.data.message);
      });
  }

  const generatePDFReport = (authData) => {
    const doc = new jsPDF();
    const tableHead = [
      ['ID', 'Local Authority Name', 'Type', 'City', 'Place', 'No of Floors'],
    ];
    const tableBody = authData.map(auth => [
      auth.id,
      auth.localauthorityname,
      auth.type,
      auth.city,
      auth.place,
      auth.nooffloors,
    ]);

    doc.autoTable({
      head: tableHead,
      body: tableBody,
      startY: 20,
      columnWidths: [30, 60, 30, 30, 40, 30],
    });
    doc.save("auth_report.pdf");
  };

  return (
    <Grid container>
      <Grid item md={12} sx={theme.palette.gridBody}>
        <AuthForm
          addAuth={addAuth}
          updateAuth={updateAuth}
          submitted={submitted}
          data={selectedAuth}
          isEdit={isEdit}
        />
      </Grid>
      <Grid item md={12} sx={theme.palette.gridBody}>
        <AuthsTable
          rows={auths}
          selectedAuth={data => {
            setSelectedAuth(data);
            setIsEdit(true);
          }}
          deleteAuth={data => {
            window.confirm("Are you sure?") && deleteAuth(data);
          }}
          generatePDFReport={generatePDFReport}
        />
      </Grid>
    </Grid>
  );
}

export default Auths;

const AuthForm = ({ addAuth, updateAuth, submitted, data, isEdit }) => {
 
  const [id, setId] = useState(0);
  const [localauthorityname, setLocalauthorityname] = useState('');
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [place, setPlace] = useState('');
  const [nooffloors, setNooffloors] = useState('');

  useEffect(() => {
    if (!submitted) {
      setId(0);
      setLocalauthorityname('');
      setType('');
      setCity('');
      setPlace('');
      setNooffloors('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setId(data.id);
      setLocalauthorityname(data.localauthorityname);
      setType(data.type);
      setCity(data.city);
      setPlace(data.place);
      setNooffloors(data.nooffloors);
    }
  }, [data]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Authorization Form</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="id"
            label="ID"
            variant="outlined"
            fullWidth
            value={id}
            onChange={e => setId(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="localauthorityname"
            label="Local Authority Name"
            variant="outlined"
            fullWidth
            value={localauthorityname}
            onChange={e => setLocalauthorityname(e.target.value)}
            placeholder="Enter Local Authority Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            value={type}
            onChange={e => setType(e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>Type</MenuItem>
            <MenuItem value="building">Building</MenuItem>
            <MenuItem value="Apartment">Apartment</MenuItem>
            <MenuItem value="House">House</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={e => setCity(e.target.value)}
            placeholder="Enter City"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="place"
            label="Place"
            variant="outlined"
            fullWidth
            value={place}
            onChange={e => setPlace(e.target.value)}
            placeholder="Enter Place"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="nooffloors"
            label="No of Floors"
            variant="outlined"
            fullWidth
            value={nooffloors}
            onChange={e => setNooffloors(e.target.value)}
            placeholder="Enter No of Floors"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (isEdit) {
                updateAuth({ id, localauthorityname, type, city, place, nooffloors });
              } else {
                addAuth({ id, localauthorityname, type, city, place, nooffloors });
              }
            }}
          >
            {isEdit ? 'Update' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

}

const AuthsTable = ({ rows, selectedAuth, deleteAuth, generatePDFReport }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Local authority name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Place</TableCell>
            <TableCell>No of floors</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? (
            rows.map(row => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope="row">{row.id}</TableCell>
                <TableCell>{row.localauthorityname}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.place}</TableCell>
                <TableCell>{row.nooffloors}</TableCell>
                <TableCell>
                  <Button sx={{ margin: '0px 10px' }} onClick={() => selectedAuth(row)}>
                    Update
                  </Button>
                  <Button sx={{ margin: '0px 10px' }} onClick={() => deleteAuth(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No Data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Grid>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => generatePDFReport(rows)}
        >
          Generate Report
        </Button>
      </Grid>
    </TableContainer>
  );
}
