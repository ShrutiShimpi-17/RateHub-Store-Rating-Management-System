import React from 'react';
import { Box, Container, Typography, Stack, Divider } from '@mui/material';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const Privacy = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC' }}>
      <PublicHeader />

      {/* Hero Banner */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #9333EA 100%)', 
          color: '#FFFFFF', 
          py: { xs: 8, md: 10 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 2, 
              letterSpacing: '-0.03em',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Privacy Policy
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.85)', 
              fontWeight: 400, 
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Last updated: June 7, 2026. Learn more about how we collect, protect, and use your data.
          </Typography>
        </Container>
      </Box>

      {/* Content */}
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 10 }, flexGrow: 1 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1F2937', mb: 2 }}>
              1. Information We Collect
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              We collect information you provide directly to us when creating an account, editing your store profile, or submitting store ratings. This includes your name, email address, physical address, password details, and the ratings you publish.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1F2937', mb: 2 }}>
              2. How We Use Your Information
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              We utilize your information to verify review authenticity, compile store ratings statistics, manage store owner relationships, protect the security of our platform, and communicate dashboard updates.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1F2937', mb: 2 }}>
              3. Data Security and Integrity
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              RateHub implements industry-standard technical measures (like password encryption and JWT session security) to protect your personal details from unauthorized access, loss, or disclosure.
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1F2937', mb: 2 }}>
              4. Contact Us
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              If you have any questions or complaints regarding our privacy practices, please reach out to us at privacy@ratehub.com.
            </Typography>
          </Box>
        </Stack>
      </Container>

      <PublicFooter />
    </Box>
  );
};

export default Privacy;
