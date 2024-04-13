import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { errorAlert } from '../../utils';
import { Grid, Container, Card, CardMedia, CardContent, CardActions, Button, Checkbox, Paper } from '@mui/material';

import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box} from "@mui/material";

// ...

const CusPackageDetails = () => {
  const [addOnsDetails, setAddOnsDetails] = useState([]);
  const { packageId } = useParams();
  const [packageDetails, setPackageDetails] = useState([]);
  const [addOnsOpen, setAddOnsOpen] = useState(false);
  const [addOns, setAddOns] = useState([]);
  const navigate = useNavigate();

    const loadAddons = async () => {
        axios
            .get("http://localhost:3001/packageaddon/getall", {})
            .then((response) => {
              setAddOnsDetails(response.data);
              // console.log(response.data);
              console.log(addOnsDetails);
            })
            .catch((error) => {
                errorAlert(error.response.data.message);
            });
    };
    

  // Do something with packageId
  // console.log(`Package ID is : ${packageId}`);

  useEffect(() => {
    const loadPackages = async () => {
        axios
            .get(`http://localhost:3001/package/get/${packageId}`, {})
            .then((response) => {
                setPackageDetails(response.data);
                // console.log(response);
                // console.log(packageDetails);
            })
            .catch((error) => {
              console.log(error);
                errorAlert(error.response.data.message);
            });
    };
    loadPackages();
  }, [packageId]); // only re-run effect when packageId changes

  const handleAddOns = () => {
    loadAddons();
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

  const handleBuy = async () => {

  };

  return(
    <Grid container>
        <Container maxWidth="lg" style={{ minHeight: "300px" }} >
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
          <CardActions sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Box sx={{ display: "flex", width: "100%", marginBottom: '1em' }}>
              <Button variant="contained" onClick={handleAddOns} sx={{ width: "150px", marginLeft: 2}}>
                Add Ons
              </Button>
              <Button variant="contained" onClick={handleBuy} sx={{ width: "150px", marginLeft: 2 }}>
                Buy Package
              </Button>
            </Box>
            <div>
              {addOnsOpen && (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 100 }}>
                      <TableHead>
                          <TableRow>
                              <TableCell>Description</TableCell>
                              <TableCell>Duration</TableCell>
                              <TableCell>Price</TableCell> 
                              <TableCell>Action</TableCell> 
                          </TableRow>
                      </TableHead>
                      <TableBody>
                        {addOnsDetails.map((row) => (
                          <TableRow key={row._id}>
                                      
                                      <TableCell>{row.description}</TableCell>
                                      <TableCell>{row.duration}</TableCell>
                                      <TableCell>{row.price}</TableCell>
                              
                                      <TableCell>
                                          {<Checkbox value={row._id} onChange={handleAddOnChange} />}
                                      </TableCell>
                                  </TableRow>
                        ))}
                      </TableBody>
                      
                  </Table>
                  </TableContainer>
              )}

            </div>
            
          </CardActions>
        </CardContent>
      </Card>
    </Container>
    </Grid>
  );
};

export default CusPackageDetails;