import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../redux/features/authSlice';
import Logo from '../../../components/Logo/Logo';
import {
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemText, Button, Divider
} from '@mui/material';

const drawerWidth = 240;

const Sidebar = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

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
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ p: 3, pb: 1 }}>
        <Logo />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <List sx={{ px: 1, mt: 1 }}>
          {navLinks.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton component={Link} to={item.to} sx={{ borderRadius: 1, mb: 0.5 }}>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2, mb: 2 }}>
        {user ? (
          <>
            <Divider sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
            <Button
              variant="outlined"
              color="error"
              onClick={() => dispatch(logoutUser())}
              fullWidth
              sx={{ textTransform: 'none' }}
            >
              Logout
            </Button>
          </>
        ) : (
          <ListItemText primary="No User" sx={{ textAlign: 'center', opacity: 0.5 }} />
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;