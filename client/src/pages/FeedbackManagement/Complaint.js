import { Box, Button, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, Typography, useTheme } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { CREATE_COMPLAINT, DELETE_COMPLAINT, GET_COMPLAINT, UPDATE_COMPLAINT } from "../../EndPoints";


const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    getComplaints();
  }, []);

  const getComplaints = () => {
    Axios.get(GET_COMPLAINT)
      .then(response => {
        setComplaints(response.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const addComplaint = (data) => {
    setSubmitted(true);
    console.log(data);
    const payload = {
      cname: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
      subject: data.subject,
      complaint: data.complaint,
    }
    Axios.post(CREATE_COMPLAINT, payload)
      .then(() => {
        getComplaints();
        setSubmitted(false);
        setIsEdit(false);

      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const updateComplaint = (data) => {
    setSubmitted(true);
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
      subject: data.subject,
      complaint: data.complaint,
    }
    Axios.put(UPDATE_COMPLAINT, payload)
      .then(() => {
        getComplaints();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const deleteComplaint = (data) => {
    console.log(data);
    Axios.delete(DELETE_COMPLAINT + data._id)
      .then(() => {
        getComplaints();
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  return (
    <Grid container>
      <Grid item md={12} sx={theme.palette.gridBody}>
        <ComplaintForm
          addComplaint={addComplaint}
          updateComplaint={updateComplaint}
          submitted={submitted}
          data={selectedComplaint}
          isEdit={isEdit}
        />
      </Grid>
      <Grid item md={12} sx={theme.palette.gridBody}>
        <ComplaintsTable
          rows={complaints}
          selectedComplaint={data => {
            setSelectedComplaint(data);
            setIsEdit(true);
          }}
          deleteComplaint={data => {
            window.confirm("Are you sure?") && deleteComplaint(data);
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Complaints;


const ComplaintForm = ({ addComplaint, updateComplaint, submitted, data, isEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const [subject, setSubject] = useState('');
  const [complaint, setComplaint] = useState('');

  useEffect(() => {
    if (!submitted) {
      setName('');
      setEmail('');
      setPhone('');
      setType('');
      setSubject('');
      setComplaint('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.name && data.name !== 0) {
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setType(data.type);
      setSubject(data.subject);
      setComplaint(data.complaint);
    }
  }, [data]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Complaint Form</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Enter Phone"
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
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="Site">Site</MenuItem>
            <MenuItem value="Package">Package</MenuItem>
            <MenuItem value="Stock">Stock</MenuItem>
            <MenuItem value="Transportation">Transportation</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="subject"
            label="Subject"
            variant="outlined"
            fullWidth
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Enter Subject"
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            id="complaint"
            rowsMin={3}
            placeholder="Enter Complaint"
            value={complaint}
            onChange={e => setComplaint(e.target.value)}
            style={{ width: '100%', minHeight: '100px', padding: '10px', fontSize: '16px', lineHeight: '1.5', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (isEdit) {
                updateComplaint({ name, email, phone, type, subject, complaint });
              } else {
                addComplaint({ name, email, phone, type, subject, complaint });
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

const ComplaintsTable = ({ rows, selectedComplaint, deleteComplaint }) => {
    
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Complaint</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? (
            rows.map(row => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope="row">{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.complaint}</TableCell>
                <TableCell>
                  <Button variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => selectedComplaint(row)}
                    sx={{ marginRight: '10px' }}
                  >
                    Update
                  </Button>
                  <Button  
                     variant="contained"
                     color="error"
                     size="small"
                     onClick={() => deleteComplaint(row)}>
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
    </TableContainer>
    
  );
}