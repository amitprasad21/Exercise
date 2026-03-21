import React from 'react';
import { Stack, Typography } from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = ({ message = 'Loading, please wait...' }) => (
  <Stack justifyContent="center" alignItems="center" width="100%" gap="8px" py="20px">
    <InfinitySpin color="grey" />
    <Typography sx={{ fontSize: { lg: '18px', xs: '14px' }, color: '#4F4C4C' }}>
      {message}
    </Typography>
  </Stack>
);

export default Loader;
