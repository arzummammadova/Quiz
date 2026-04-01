import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Me } from '../../../redux/features/authSlice';
import { Box, Button, Typography } from '@mui/material';

const Header = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(Me());
    }
  }, [dispatch]);

  return (
    <Box 
      component="header" 
      sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)' 
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {user ? (
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {user.username}
          </Typography>
        ) : (
          <>
            <Button 
              component={Link} 
              to="/login" 
              sx={{ color: '#fff', textTransform: 'none', fontSize: '1rem' }}
            >
              Login
            </Button>
            <Button 
              component={Link} 
              to="/register" 
              variant="contained" 
              sx={{ textTransform: 'none', fontSize: '1rem' }}
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;