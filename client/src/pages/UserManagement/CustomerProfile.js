import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Typography, Button, Grid, Avatar } from "@mui/material";
import axios from "axios";
import ProfileSidebar from "../../components/ProfileSidebar";
import { SEARCH_CUSTOMER_BY_USER, UPDATE_CUSTOMER } from "../../EndPoints";
import { useSelector } from 'react-redux';
import { userTypes } from "../../utils.js";

export default function CustomerProfile() {
  const [selectedContent, setSelectedContent] = useState("profile");

  const handleSidebarItemClick = (content) => {
    setSelectedContent(content);
  };
  return (
    <Grid container spacing={3} style={{ marginTop: 60 }}>
      <Grid item xs={3}>
        <ProfileSidebar onItemClick={handleSidebarItemClick} userType={userTypes.CUSTOMER} />
      </Grid>
      <Grid item xs={9}>
        <main style={{ padding: "20px" }}>
          {selectedContent === "profile" && <Profile />}
        </main>
      </Grid>
    </Grid>
  );
}

function Profile() {

  const navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nic: "",
    no: "",
    street: "",
    city: "",
    companyName: "",
    businessType: "",
    mobileNo: "",
    email: "",
  });

  const loggedUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {

    if (!loggedUser || !token) {
      navigate('/login');
    }

  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      axios
        .get(SEARCH_CUSTOMER_BY_USER + loggedUser._id, {})
        .then((response) => {
          console.log(response);
          const customer = response.data;
          setCustomerDetails({
            firstName: customer.firstName,
            lastName: customer.lastName,
            dateOfBirth: customer.dateOfBirth,
            nic: customer.nic,
            no: customer.no,
            street: customer.street,
            city: customer.city,
            companyName: customer.companyName,
            businessType: customer.businessType,
            mobileNo: customer.mobileNo,
            email: customer.email,
          });
        })
        .catch((error) => {
          console.log(error);
          //navigate("/error");
        });
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (field, value) => {
    setCustomerDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(UPDATE_CUSTOMER, customerDetails)
      .then((response) => {
        console.log("sucess response - " + response);
      })
      .catch((error) => {
        console.log(error);
        //navigate("/error");
      });
  };

  return (
    <Grid
      container
      spacing={2}
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Personal Profile
        </Typography>
      </Grid>
      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="fname"
          label="First Name"
          name="fname"
          autoComplete="fname"
          value={customerDetails.firstName}
          autoFocus
          disabled
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="lname"
          label="Last name"
          name="lname"
          autoComplete="lname"
          value={customerDetails.lastName}
          disabled
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="dob"
          name="dob"
          label="Date of Birth"
          autoComplete="dob"
          value={customerDetails.dateOfBirth.substring(0, 10)}
          disabled
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="nic"
          label="NIC"
          name="nic"
          autoComplete="nic"
          value={customerDetails.nic}
          disabled
        />
      </Grid>

      <Grid item md={3}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="no"
          label="No"
          name="no"
          autoComplete="no"
          value={customerDetails.no}
          onChange={(e) => handleChange('no', e.target.value)}
        />
      </Grid>
      <Grid item md={5}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="street"
          label="Street"
          name="street"
          autoComplete="street"
          value={customerDetails.street}
          onChange={(e) => handleChange('street', e.target.value)}
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          autoComplete="city"
          value={customerDetails.city}
          onChange={(e) => handleChange('city', e.target.value)}
        />
      </Grid>

      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="companyName"
          label="Company Name"
          name="companyName"
          autoComplete="companyName"
          value={customerDetails.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="businessType"
          label="Business Type"
          name="businessType"
          autoComplete="businessType"
          value={customerDetails.businessType}
          onChange={(e) => handleChange('businessType', e.target.value)}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="mobileNo"
          label="Mobile No"
          name="mobileNo"
          autoComplete="mobileNo"
          value={customerDetails.mobileNo}
          onChange={(e) => handleChange('mobileNo', e.target.value)}
        />
      </Grid>
      <Grid item md={6}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          value={customerDetails.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </Grid>

      <Button type="submit" variant="contained" sx={{ mt: 3, width: "50%" }}>
        Edit
      </Button>
    </Grid>
  );
}