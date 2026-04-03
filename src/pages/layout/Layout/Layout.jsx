import React from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar'; 
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: '#0f1014',
          minHeight: '100vh'
        }}
      >
        <Header />
        <Box sx={{ 
          flexGrow: 1, 
          p: 3, 
          display: 'flex',
          flexDirection: 'column' 
        }}>
          <Toolbar /> 
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;