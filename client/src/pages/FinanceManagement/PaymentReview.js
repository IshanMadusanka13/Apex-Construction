import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

const customer = [
  { name: 'Customer Id:', detail: '123456789' },
  { name: 'Discription:', detail: 'this is customer discription' },
];
const payments = [
  { name: 'Card type:', detail: 'Visa' },
  { name: 'Card holder:', detail: 'Mr. John Smith' },
  { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date:', detail: '04/2024' },
];

export default function Review() {
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
    <Stack spacing={2}>
      <List disablePadding>
      
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Monthly Amount" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Rs 100000.00
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
        <Typography variant="subtitle2" gutterBottom>
            Customer details
          </Typography>
          <Grid container>
            {customer.map((customer) => (
              <React.Fragment key={customer.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {customer.name}
                  </Typography>
                  <Typography variant="body2">{customer.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
    </Grid>
  );
}