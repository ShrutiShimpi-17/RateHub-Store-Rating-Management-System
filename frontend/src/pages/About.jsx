import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';

const About = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC' }}>
      <PublicHeader />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #9333EA 100%)', 
          color: '#FFFFFF', 
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '-50%',
            left: '-20%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)',
            filter: 'blur(60px)'
          }}
        />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 3, 
              letterSpacing: '-0.03em',
              fontSize: { xs: '2.5rem', md: '3.75rem' }
            }}
          >
            Empowering Transparent Feedback
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.85)', 
              fontWeight: 400, 
              lineHeight: 1.6,
              maxWidth: '700px',
              mx: 'auto'
            }}
          >
            RateHub is a premium platform built to connect consumers with local businesses, driving growth through trusted and transparent store reviews.
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, flexGrow: 1 }}>
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1F2937', mb: 3, letterSpacing: '-0.02em' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.7, fontSize: '1.05rem' }}>
              At RateHub, we believe that honest customer feedback is the most powerful tool for business improvement. We provide a clean, secure, and user-friendly ecosystem where store ratings are transparently shared.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '1.05rem' }}>
              We help business owners take control of their online reputation by providing advanced analytics, detailed review breakdowns, and direct customer insights to help their stores thrive.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box 
              sx={{ 
                width: '100%', 
                height: '280px', 
                borderRadius: 4, 
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
                border: '1px solid rgba(124, 58, 237, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <Avatar sx={{ bgcolor: '#7C3AED', width: 80, height: 80, boxShadow: '0 8px 24px rgba(124, 58, 237, 0.25)' }}>
                <GroupsRoundedIcon sx={{ fontSize: 40, color: '#FFFFFF' }} />
              </Avatar>
            </Box>
          </Grid>
        </Grid>

        {/* Core Values */}
        <Typography variant="h4" align="center" sx={{ fontWeight: 800, color: '#1F2937', mb: 6, letterSpacing: '-0.02em' }}>
          Our Core Values
        </Typography>

        <Grid container spacing={3}>
          {[
            {
              title: 'Transparency First',
              desc: 'We guarantee that all reviews are displayed authentically without manipulation, ensuring high trust and credibility.',
              icon: <VisibilityRoundedIcon sx={{ fontSize: 32, color: '#7C3AED' }} />
            },
            {
              title: 'Growth-Focused',
              desc: 'Our analytics tools help stores monitor trends, identify pain points, and continually refine their customer experience.',
              icon: <AutoGraphRoundedIcon sx={{ fontSize: 32, color: '#7C3AED' }} />
            },
            {
              title: 'Secure Access',
              desc: 'We enforce robust security protocols to protect users accounts and verify reviewer authenticity.',
              icon: <LockRoundedIcon sx={{ fontSize: 32, color: '#7C3AED' }} />
            }
          ].map((value, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card sx={{ height: '100%', borderRadius: 4, border: '1px solid rgba(229, 231, 235, 0.6)', bgcolor: '#FFFFFF', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)', transform: 'none !important' }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2, display: 'inline-flex', p: 1.5, borderRadius: 3, bgcolor: 'rgba(124, 58, 237, 0.08)' }}>
                    {value.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, color: '#1F2937' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {value.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <PublicFooter />
    </Box>
  );
};

export default About;
