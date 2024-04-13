import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { errorAlert } from '../../utils';
import { Grid } from "@mui/material";


const Packagelist = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [packageDetails, setPackageDetails] = useState([]);

    useEffect(() => {
        const loadPackages = async () => {
            axios
                .get("http://localhost:3001/package/getall", {})
                .then((response) => {
                    setPackageDetails(response.data);
                })
                .catch((error) => {
                    errorAlert(error.response.data.message);
                });
        };
        loadPackages();
    }, [navigate]);

    const [packageId] = useState("");

    const handleClick = (packageId) => {
        console.log(`Package ID: ${packageId}`);
        navigate(`/CuspackageDetais/${packageId}`);
      };


  return (
    <Grid container>
        <Grid
                item md={12}
                spacing={2}
                component="form"
                sx={theme.palette.gridBody}
                noValidate
                // onSubmit={handleSubmit}
            >
    <ImageList sx={{ width: '100%', height: '100%' }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      {packageDetails.map((row) => (
        <ImageListItem key={row.packageId}>
          <img
            srcSet={`${row.homeImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${row.homeImage}?w=248&fit=crop&auto=format`}
            alt={row.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={row.name}
            subtitle={row.cost}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${row.name}`}
                onClick={() => handleClick(row._id)}
              >
                
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
 </Grid>
    </Grid>
  );
  
}

export default Packagelist;
