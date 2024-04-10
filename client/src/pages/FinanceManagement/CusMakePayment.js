import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';



const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const theme = useTheme();
  return (
    <Grid
    container
    spacing={2}
    component="form"
    sx={theme.palette.gridBody}
    noValidate
    //onSubmit={handleSubmit}
>
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="customer-id" required>
          CustomerID
        </FormLabel>
        <OutlinedInput
          id="customer-id"
          name="customer-id"
          type="number"
          placeholder="123456789"
          autoComplete="customer-id"
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="package-name" required>
          PackageName
        </FormLabel>
        <OutlinedInput
          id="package-name"
          name="package-name"
          type="name"
          placeholder="Gold"
          autoComplete="package-name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="discription" required>
          Discription
        </FormLabel>
        <OutlinedInput
          id="discription"
          name="discription"
          type="discription"
          placeholder="june installment"
          autoComplete="discription"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="monthly-amount">Monthly Amount</FormLabel>
        <OutlinedInput
          id="monthly-amount"
          name="monthly-amount"
          type="price"
          placeholder="Rs 100000.00"
          autoComplete="monthly-amount"
          required
        />
      </FormGrid>
      
    </Grid>
    </Grid>
  );
}