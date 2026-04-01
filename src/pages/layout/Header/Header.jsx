import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, Me } from '../../../redux/features/authSlice';
import Logo from '../../../components/Logo/Logo';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Button, 
  Typography, 
  Divider 
} from '@mui/material';

const drawerWidth = 240;

const Header = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(Me());
    }
  }, [dispatch]);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Quiz', to: '/quiz' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#16171d', 
          color: '#ffffff',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box sx={{ p: 3, pb: 1 }}> 
        <Logo />
      </Box>
      

      <List sx={{ px: 1, mt: 1 }}>
        {navLinks.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton 
              component={Link} 
              to={item.to} 
              sx={{ borderRadius: 1, mb: 0.5 }}
            >
              <ListItemText 
                primary={item.name} 
                primaryTypographyProps={{ 
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  letterSpacing: '0.5px'
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Divider sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        
        {user ? (
          <>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 1, fontWeight: 500 }}>
              {user.username}
            </Typography>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={() => dispatch(logoutUser())} 
              fullWidth
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button 
              component={Link} 
              to="/login" 
              variant="text" 
              fullWidth 
              sx={{ color: '#fff', textTransform: 'none' }}
            >
              Login
            </Button>
            <Button 
              component={Link} 
              to="/register" 
              variant="contained" 
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Register
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Header;