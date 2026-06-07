import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ConfirmDialog from './ConfirmDialog';

import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 260;

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleProfileMenuClose();
    setLogoutOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    showToast("Logged out successfully.", "success");
    setLogoutOpen(false);
    navigate('/login');
  };

  // Define sidebar menu options based on user role
  const getMenuOptions = () => {
    const role = user?.role;
    if (role === 'ADMIN') {
      return [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
        { text: 'Users Management', icon: <PeopleIcon />, path: '/admin/users' },
        { text: 'Stores Management', icon: <StoreIcon />, path: '/admin/stores' },
        { text: 'Change Password', icon: <PasswordIcon />, path: '/profile' }
      ];
    } else if (role === 'STORE_OWNER') {
      return [
        { text: 'Store Analytics', icon: <DashboardIcon />, path: '/owner' },
        { text: 'Change Password', icon: <PasswordIcon />, path: '/profile' }
      ];
    } else {
      // USER
      return [
        { text: 'Explore Stores', icon: <StoreIcon />, path: '/dashboard' },
        { text: 'Change Password', icon: <PasswordIcon />, path: '/profile' }
      ];
    }
  };

  const menuItems = getMenuOptions();

  // Get initials for profile avatar
  const getInitials = () => {
    if (!user?.name) return 'U';
    const parts = user.name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return user.name[0].toUpperCase();
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box 
        sx={{ 
          p: 2.5, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1.5,
          backgroundColor: 'primary.main',
          color: 'white'
        }}
      >
        <StoreIcon sx={{ fontSize: 32 }} />
        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '0.5px' }}>
          RateHub
        </Typography>
      </Box>
      <Divider />
      
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 600 }}>
          {getInitials()}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, noWrap: true }}>
            {user?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', textTransform: 'capitalize' }}>
            {user?.role?.replace('_', ' ').toLowerCase()}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 1 }} />

      <List sx={{ px: 1, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => isMobile && setMobileOpen(false)}
                selected={isSelected}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  px: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(37, 99, 235, 0.08)',
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main'
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(37, 99, 235, 0.12)'
                    }
                  },
                  '&:hover': {
                    borderRadius: 2
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: isSelected ? 'primary.main' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: '0.9rem', 
                    fontWeight: isSelected ? 600 : 500 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />
      <List sx={{ p: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogoutClick}
            sx={{
              borderRadius: 2,
              py: 1.2,
              px: 2,
              color: 'error.main',
              '&:hover': {
                backgroundColor: 'rgba(239, 68, 68, 0.08)'
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 600 }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      
      {/* Top Navbar Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          color: 'text.primary'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.2px' }}>
              {location.pathname === '/profile' 
                ? 'User Settings' 
                : menuItems.find(m => m.path === location.pathname)?.text || 'Dashboard'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={handleProfileMenuOpen}
              sx={{ p: 0.5, border: '1px solid', borderColor: 'divider' }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                {getInitials()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: { 
                  mt: 1.5,
                  borderRadius: 2,
                  boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid',
                  borderColor: 'divider',
                  minWidth: 160
                }
              }}
            >
              <MenuItem 
                onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}
                sx={{ gap: 1, py: 1 }}
              >
                <AccountCircleIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <Typography variant="body2">My Profile</Typography>
              </MenuItem>
              <Divider />
              <MenuItem 
                onClick={handleLogoutClick}
                sx={{ gap: 1, py: 1, color: 'error.main' }}
              >
                <LogoutIcon sx={{ color: 'error.main', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Sidebar Navigation */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Temporary Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider'
            }
          }}
        >
          {drawerContent}
        </Drawer>
        
        {/* Desktop Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider'
            }
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Panel Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px', // toolbar height
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>

      {/* Confirm Logout Modal */}
      <ConfirmDialog
        open={logoutOpen}
        title="Confirm Logout"
        message="Are you sure you want to log out of RateHub?"
        confirmText="Logout"
        confirmColor="error"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setLogoutOpen(false)}
      />
    </Box>
  );
};

export default Layout;
