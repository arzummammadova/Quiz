import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser, Me } from '../../../redux/features/authSlice';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const Header = () => {
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { setTheme } = useTheme()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(Me());
    }
  }, [dispatch]);

  return (
    <AppBar
    className='dar'
      position="fixed"
      sx={{
        width: `calc(100% - 300px)`,
        ml: `240px`,
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        boxShadow: 'none',
        borderBottom: '1px solid var(--border)',
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


        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Toolbar>


    </AppBar>
  );
};

export default Header;