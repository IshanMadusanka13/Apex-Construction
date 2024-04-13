import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { errorAlert } from '../../utils';
import { Grid, Container, Card, CardMedia, CardContent, CardActions, Button, Checkbox, FormControlLabel } from '@mui/material';
import Typography from '@mui/material/Typography';

// ...

const CusPackageDetails = () => {
  const { packageId } = useParams();
  const [packageDetails, setPackageDetails] = useState([]);
  const [addOnsOpen, setAddOnsOpen] = useState(false);
  const [addOns, setAddOns] = useState([]);

  // Do something with packageId
  console.log(`Package ID is : ${packageId}`);

  useEffect(() => {
    const loadPackages = async () => {
        axios
            .get(`http://localhost:3001/package/get/${packageId}`, {})
            .then((response) => {
                setPackageDetails(response.data);
                console.log(response);
                console.log(packageDetails);
            })
            .catch((error) => {
              console.log(error);
                errorAlert(error.response.data.message);
            });
    };
    loadPackages();
  }, [packageId]); // only re-run effect when packageId changes

  const handleAddOns = () => {
    console.log("aa");
    setAddOnsOpen(true);
  };

  const handleAddOnChange = (event) => {
    const addOnId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setAddOns([...addOns, addOnId]);
    } else {
      setAddOns(addOns.filter((id) => id !== addOnId));
    }
  };

  return(
    <Grid container>
        <Container maxWidth="md">
      <Card sx={{ display: 'flex', mt: 15 }}>
        <CardMedia
          component="img"
          sx={{ width: 500 }}
          image={packageDetails.homeImage}
          alt={packageDetails.name}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" component="h2">
            {packageDetails.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {packageDetails.description}
          </Typography>
          <Typography variant="body1">
            Duration: {packageDetails.duration}
          </Typography>
          <Typography variant="body1">
            Price: {packageDetails.price}
          </Typography>
          <Typography variant="body1">
            Cost: {packageDetails.cost}
          </Typography>
          <CardActions>
            <Button variant="contained" onClick={handleAddOns}>
              Add Ons
            </Button>
            {addOnsOpen && (
              <div>
                {packageDetails.addOns.map((addOn) => (
                  <FormControlLabel
                    key={addOn._id}
                    control={<Checkbox value={addOn._id} onChange={handleAddOnChange} />}
                    label={addOn.name}
                  />
                ))}
              </div>
            )}
          </CardActions>
        </CardContent>
      </Card>
    </Container>
    </Grid>
  );
};

export default CusPackageDetails;