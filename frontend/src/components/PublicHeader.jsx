import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Drawer, List, ListItemButton, ListItemText, Divider, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', p: 2, bgcolor: '#FFFFFF', height: '100%' }}>
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <StarRateRoundedIcon sx={{ color: '#7C3AED', fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1F2937', letterSpacing: '-0.025em' }}>
          RateHub
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <ListItemButton
              key={item.label}
              component={RouterLink}
              to={item.to}
              sx={{
                textAlign: 'center',
                borderRadius: 2,
                mb: 1,
                bgcolor: isActive ? 'rgba(124, 58, 237, 0.08)' : 'transparent',
                color: isActive ? '#7C3AED' : '#4B5563',
                '&:hover': { bgcolor: 'rgba(124, 58, 237, 0.04)' }
              }}
            >
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(229, 231, 235, 0.6)',
        boxShadow: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 64, md: 72 } }}>
          {/* Logo Section */}
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)'
              }}
            >
              <StarRateRoundedIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#1F2937',
                letterSpacing: '-0.03em',
                fontSize: '1.25rem',
                userSelect: 'none'
              }}
            >
              RateHub
            </Typography>
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3.5 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Button
                  key={item.label}
                  component={RouterLink}
                  to={item.to}
                  sx={{
                    color: isActive ? '#7C3AED' : '#4B5563',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.925rem',
                    textTransform: 'none',
                    position: 'relative',
                    transition: 'color 0.2s ease',
                    px: 0.5,
                    minWidth: 0,
                    '&:hover': {
                      color: '#7C3AED',
                      background: 'none',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: isActive ? '100%' : '0%',
                      height: '2px',
                      bgcolor: '#7C3AED',
                      transition: 'width 0.2s ease',
                      borderRadius: '1px'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            color="default"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' }, color: '#1F2937' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Drawer for Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260, border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
