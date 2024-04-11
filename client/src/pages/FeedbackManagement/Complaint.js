import { Box } from "@mui/material";
import CompaintForm from "./ComplaintForm";
import ComplaintsTable from "./ComplaintsTable";
import Axios from "axios";
import { useEffect, useState } from "react";


const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState({});
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    getComplaints();
  }, []);

  const getComplaints = () => {
    Axios.get('http://localhost:3001/api/complaints')
      .then(response => {
        setComplaints(response.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const addComplaint = (data) => {
    setSubmitted(true);
    const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        type: data.type,
        subject: data.subject,
        complaint: data.complaint,
    }
    Axios.post('http://localhost:3001/api/createcomplaint', payload)
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
    Axios.post('http://localhost:3001/api/updatecomplaint', payload)
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
    Axios.post('http://localhost:3001/api/deletecomplaint', data)
      .then(() => {
        getComplaints();
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
      <CompaintForm
        addComplaint={addComplaint}
        updateComplaint={updateComplaint}
        submitted={submitted}
        data={selectedComplaint}
        isEdit={isEdit}
      />
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
    </Box>
  );
}

export default Complaints;
