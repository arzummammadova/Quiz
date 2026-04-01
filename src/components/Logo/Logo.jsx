import React from 'react';
import { Box } from '@mui/material';
import logoImg from '../../assets/logo.png';

const Logo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={logoImg} 
        alt="Logo" 
        style={{ 
          width: '100%', 
          maxWidth: '100px',
          height: 'auto',
          display: 'block' 
        }} 
      />
    </Box>
  );
};

export default Logo;
