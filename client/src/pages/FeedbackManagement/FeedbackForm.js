import { Button, Grid, Typography, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const FeedbackForm = ({addFeedback, updateFeedback, submitted, data, isEdit}) => {
   
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
      if(data?.id && data.id !== 0) {
         setId(data.id);
         setFeedback(data.feedback);
      }
   }, [data]);

   return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f0f0', alignItems: 'center' }}>
         <Grid
            container
            spacing={2}
            sx={{
               backgroundColor: '#ffffff',
               borderRadius: '10px',
               padding: '20px',
               boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
               marginBottom: '20px',
               width: '100%',
               maxWidth: '800px'
            }}
         >
            <Grid item xs={12}>
               <Typography variant="h4" component="h1" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                  Feedback Form
               </Typography>
            </Grid>

            <Grid item xs={12}>
               <Typography component={'label'} htmlFor="id" sx={{ fontSize: '16px', fontWeight: 'bold', display: 'block' }}>
                  ID
               </Typography>
               <input 
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
               <Button
                  variant="contained"
                  sx={{ backgroundColor: '#00c6e6', color: '#ffffff', '&:hover': { backgroundColor: '#00a6bf' }, width: '100%' }}
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

         <Grid
            container
            spacing={2}
            sx={{
               backgroundColor: '#ffffff',
               borderRadius: '10px',
               padding: '20px',
               boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
               marginBottom: '20px',
               width: '100%',
               maxWidth: '800px'
            }}
         >
            <Grid item xs={12}>
               <Button
                  variant="outlined"
                  color="primary"
                  sx={{ marginRight: '10px' }}
                  onClick={() => navigate('/auths')}
               >
                  Auths
               </Button>
               <Button
                  variant="outlined"
                  color="primary"
                  sx={{ marginRight: '10px' }}
                  onClick={() => navigate('/complaints')}
               >
                  Complaints
               </Button>
               <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/')}
               >
                  Home
               </Button>
            </Grid>
         </Grid>
      </div>
   );
}

export default FeedbackForm;
