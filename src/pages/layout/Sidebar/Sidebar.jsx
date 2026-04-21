import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText 
} from "@mui/material";

const drawerWidth = 240;

const Sidebar = () => {
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
          backgroundColor: 'var(--background)', 
          color: 'var(--foreground)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box sx={{ p: 3, pb: 1, display: 'flex', justifyContent: 'center' }}> 
        <Link to="/">
          <img src={logo} alt="Logo" style={{ width: '100%', maxWidth: '150px' }} />
        </Link>
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
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: '1.1rem',
                      fontWeight: 400,
                      letterSpacing: '0.5px'
                    }
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;