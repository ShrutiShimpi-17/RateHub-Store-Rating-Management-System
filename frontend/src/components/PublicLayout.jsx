import React from 'react';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';
import { Box } from '@mui/material';

const PublicLayout = ({ children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <PublicHeader />
    <Box component="main" sx={{ flexGrow: 1 }}>
      {children}
    </Box>
    <PublicFooter />
  </Box>
);

export default PublicLayout;
