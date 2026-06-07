import React from 'react';
import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

const PublicFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#F8FAFC',
        color: '#4B5563',
        py: 6,
        borderTop: '1px solid rgba(229, 231, 235, 0.8)',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 4,
          }}
        >
          {/* Logo and Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)',
              }}
            >
              <StarRateRoundedIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#1F2937',
                letterSpacing: '-0.03em',
                fontSize: '1.1rem',
              }}
            >
              RateHub
            </Typography>
          </Box>

          {/* Links Section */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 4 }}
            sx={{ flexWrap: 'wrap' }}
          >
            {[
              { label: 'Home', to: '/' },
              { label: 'About Us', to: '/about' },
              { label: 'Contact Us', to: '/contact' },
              { label: 'Privacy Policy', to: '/privacy' },
            ].map((link) => (
              <Link
                key={link.label}
                component={RouterLink}
                to={link.to}
                color="inherit"
                underline="none"
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#7C3AED',
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </Box>

        <Divider sx={{ my: 4, borderColor: 'rgba(229, 231, 235, 0.6)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
            © {currentYear} RateHub. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
            Built for transparent customer-business relations.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PublicFooter;
