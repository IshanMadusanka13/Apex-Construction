import { Box } from "@mui/material";
import AuthForm from "./AuthForm";
import AuthsTable from "./AuthsTable";
import Axios from "axios";
import { useEffect, useState } from "react";


const Auths = () => {
  const [auths, setAuths] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAuth, setSelectedAuth] = useState({});
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    getAuths();
  }, []);

  const getAuths = () => {
    Axios.get('http://localhost:3001/api/auths')
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
    Axios.post('http://localhost:3001/api/createauth', payload)
      .then(() => {
        getAuths();
        setSubmitted(false);
        setIsEdit(false);

      })
      .catch(error => {
        console.error("Axios Error :", error);
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
    Axios.post('http://localhost:3001/api/updateauth', payload)
      .then(() => {
        getAuths();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const deleteAuth = (data) => {
    Axios.post('http://localhost:3001/api/deleteauth', data)
      .then(() => {
        getAuths();
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
      <AuthForm
        addAuth={addAuth}
        updateAuth={updateAuth}
        submitted={submitted}
        data={selectedAuth}
        isEdit={isEdit}
      />
      <AuthsTable
        rows={auths}
        selectedAuth={data => {
          setSelectedAuth(data);
          setIsEdit(true);
        }}
        deleteAuth={data => {
          window.confirm("Are you sure?") && deleteAuth(data);
        }}
      />
    </Box>
  );
}

export default Auths;
