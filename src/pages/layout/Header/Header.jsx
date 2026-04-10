import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, Me } from '../../../redux/features/authSlice';
import { AppBar, Toolbar, Box, Button, Typography } from '@mui/material';

const Header = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(Me());
    }
  }, [dispatch]);

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        width: `calc(100% - 240px)`, 
        ml: `240px`,
        backgroundColor: '#16171d',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1000
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              component={Link} 
              to="/profile" 
              sx={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}
            >
              {user.username}
            </Typography>
            <Button 
              variant="outlined" 
              color="error" 
              size="small"
              onClick={() => dispatch(logoutUser())}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              component={Link} 
              to="/login" 
              sx={{ color: '#fff', textTransform: 'none' }}
            >
              Login
            </Button>
            <Button 
              component={Link} 
              to="/register" 
              variant="contained" 
              sx={{ textTransform: 'none' }}
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;