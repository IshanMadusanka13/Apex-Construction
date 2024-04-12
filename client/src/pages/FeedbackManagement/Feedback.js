import { Box } from "@mui/material";
import FeedbackForm from "./FeedbackForm";
import FeedbacksTable from "./FeedbacksTable";
import Axios from "axios";
import { useEffect, useState } from "react";


const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState({});
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    getFeedbacks();
  }, []);

  const getFeedbacks = () => {
    Axios.get('http://localhost:3001/api/feedbacks')
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
    Axios.post('http://localhost:3001/api/createfeedback', payload)
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
    Axios.post('http://localhost:3001/api/updatefeedback', payload)
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
    Axios.post('http://localhost:3001/api/deletefeedback', data)
      .then(() => {
        getFeedbacks();
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
      <FeedbackForm
        addFeedback={addFeedback}
        updateFeedback={updateFeedback}
        submitted={submitted}
        data={selectedFeedback}
        isEdit={isEdit}
      />
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
    </Box>
  );
}

export default Feedbacks;
