import { Paper, Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, Typography, useTheme, TextField } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CREATE_FFEDBACK, DELETE_FEEDBACK, GET_FEEDBACK, UPDATE_FEEDBACK } from "../../EndPoints";


const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const theme = useTheme();


  useEffect(() => {
    getFeedbacks();
  }, []);

  const getFeedbacks = () => {
    Axios.get(GET_FEEDBACK)
      .then(response => {
        setFeedbacks(response.data?.response || []);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const addFeedback = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      feedback: data.feedback,
    }
    Axios.post(CREATE_FFEDBACK, payload)
      .then(() => {
        getFeedbacks();
        setSubmitted(false);
        setIsEdit(false);

      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const updateFeedback = (data) => {
    setSubmitted(true);
    const payload = {
      id: data.id,
      feedback: data.feedback,
    }
    Axios.put(UPDATE_FEEDBACK, payload)
      .then(() => {
        getFeedbacks();
        setSubmitted(false);
        setIsEdit(false);
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  const deleteFeedback = (data) => {
    Axios.delete(DELETE_FEEDBACK +data)
      .then(() => {
        getFeedbacks();
      })
      .catch(error => {
        console.error("Axios Error :", error);
      });
  }

  return (
    <Grid container>
      <Grid item md={12} sx={theme.palette.gridBody}>
        <FeedbackForm
          addFeedback={addFeedback}
          updateFeedback={updateFeedback}
          submitted={submitted}
          data={selectedFeedback}
          isEdit={isEdit}
        />
      </Grid>
      <Grid item md={12} sx={theme.palette.gridBody}>
        <FeedbacksTable
          rows={feedbacks}
          selectedFeedback={data => {
            setSelectedFeedback(data);
            setIsEdit(true);
          }}
          deleteFeedback={data => {
            window.confirm("Are you sure?") && deleteFeedback(data);
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Feedbacks;


const FeedbackForm = ({ addFeedback, updateFeedback, submitted, data, isEdit }) => {

  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!submitted) {
      setId(0);
      setFeedback('');
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setId(data.id);
      setFeedback(data.feedback);
    }
  }, [data]);

  return (
    <Grid
      container
      spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">
          Feedback Form
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography component={'label'} htmlFor="id" sx={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>
          ID
        </Typography>
        <TextField
          type="number"
          id="id"
          name="id"
          value={id}
          onChange={e => setId(e.target.value)}
          fullWidth
          sx={{ marginBottom: '10px' }}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography component={'label'} htmlFor="feedback" sx={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>
          Feedback
        </Typography>
        <TextareaAutosize
          id="feedback"
          name="feedback"
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          minRows={5}
          style={{ width: '100%', padding: '8px', fontSize: '16px', marginTop: '10px' }}
        />
      </Grid>

      <Grid item xs={12}>
        <Button  variant="contained"
          onClick={() => {
            if (isEdit) {
              updateFeedback({ id, feedback });
            } else {
              addFeedback({ id, feedback });

            }
          }}
        >
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </Grid>
    </Grid>
  );
}

const FeedbacksTable = ({ rows, selectedFeedback, deleteFeedback }) => {

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Feedback</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 ? (
            rows.map(row => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope="row">{row.id}</TableCell>
                <TableCell>{row.feedback}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => selectedFeedback(row)}
                    sx={{ marginRight: '10px' }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => deleteFeedback(row.id)}
                  >
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
