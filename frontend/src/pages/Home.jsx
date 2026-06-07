import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button, Stack, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';

const Home = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC' }}>
      <PublicHeader />

      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          pt: { xs: 8, md: 14 },
          pb: { xs: 10, md: 16 },
          overflow: 'hidden',
          background: 'radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.08) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(147, 51, 234, 0.05) 0%, transparent 40%)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Box 
                  sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    px: 2, 
                    py: 0.8, 
                    borderRadius: '20px', 
                    bgcolor: 'rgba(124, 58, 237, 0.08)', 
                    border: '1px solid rgba(124, 58, 237, 0.15)',
                    color: '#7C3AED',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    mb: 3
                  }}
                >
                  <StarRateRoundedIcon sx={{ fontSize: 16 }} />
                  <span>The Premium Store Rating Management Platform</span>
                </Box>
                
                <Typography 
                  variant="h1" 
                  sx={{ 
                    fontWeight: 900, 
                    lineHeight: 1.15,
                    letterSpacing: '-0.03em',
                    color: '#1F2937',
                    fontSize: { xs: '2.75rem', sm: '3.75rem', md: '4.25rem' },
                    mb: 3
                  }}
                >
                  Discover. Rate.<br />
                  <span style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Grow Businesses.
                  </span>
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#6B7280', 
                    fontWeight: 400, 
                    lineHeight: 1.6,
                    maxWidth: '580px',
                    mx: { xs: 'auto', md: '0' },
                    mb: 5,
                    fontSize: { xs: '1.05rem', md: '1.2rem' }
                  }}
                >
                  Connecting customers and store owners through verified reviews, transparent scoring, and professional business growth dashboards.
                </Typography>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                >
                  <Button 
                    component={RouterLink} 
                    to="/register" 
                    variant="contained" 
                    size="large"
                    sx={{ 
                      py: 1.75, 
                      px: 4, 
                      borderRadius: 3, 
                      bgcolor: '#7C3AED', 
                      color: '#FFFFFF',
                      fontWeight: 600,
                      boxShadow: '0 4px 14px rgba(124, 58, 237, 0.25)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: '#6D28D9',
                        boxShadow: '0 6px 20px rgba(124, 58, 237, 0.35)',
                        transform: 'translateY(-1px)'
                      }
                    }}
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    component={RouterLink} 
                    to="/login" 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      py: 1.75, 
                      px: 4, 
                      borderRadius: 3, 
                      borderColor: '#D1D5DB',
                      color: '#4B5563',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: '#7C3AED',
                        color: '#7C3AED',
                        bgcolor: 'rgba(124, 58, 237, 0.04)'
                      }
                    }}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              <Box 
                sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  height: '420px', 
                  borderRadius: 5, 
                  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(147, 51, 234, 0.05) 100%)',
                  border: '1px solid rgba(124, 58, 237, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.03)'
                }}
              >
                {/* Floating graphic element */}
                <Box 
                  sx={{ 
                    width: '280px', 
                    bgcolor: 'rgba(255, 255, 255, 0.85)', 
                    backdropFilter: 'blur(16px)', 
                    borderRadius: 4, 
                    border: '1px solid rgba(255, 255, 255, 0.6)', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
                    p: 4,
                    textAlign: 'center'
                  }}
                >
                  <Avatar sx={{ bgcolor: '#7C3AED', width: 64, height: 64, mx: 'auto', mb: 2, boxShadow: '0 8px 20px rgba(124, 58, 237, 0.2)' }}>
                    <StorefrontRoundedIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1F2937', mb: 1 }}>Tech Emporium</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, color: '#F59E0B', mb: 2 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarRateRoundedIcon key={s} sx={{ fontSize: 22 }} />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary">4.8 Average Rating</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Trusted By Logos */}
      <Box sx={{ py: 6, borderY: '1px solid rgba(229, 231, 235, 0.6)', bgcolor: '#FFFFFF' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center" sx={{ color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 3 }}>
            Trusted by modern retail brands
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ opacity: 0.6 }}>
            {['Stripe', 'Linear', 'Framer', 'Notion', 'Arc'].map((name, i) => (
              <Grid item xs={4} sm={2.4} key={i} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#4B5563', letterSpacing: '-0.02em' }}>
                  {name}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#1F2937', mb: 2, letterSpacing: '-0.025em' }}>
            Built for growth and transparency
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', fontSize: '1.05rem' }}>
            A comprehensive suite of rating management and analytics tools configured for both consumers and business managers.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            {
              title: 'Discover Stores',
              desc: 'Explore retail listings with authentic ratings submitted by users.',
              icon: <StorefrontRoundedIcon sx={{ fontSize: 28, color: '#7C3AED' }} />
            },
            {
              title: 'Submit Ratings',
              desc: 'Give honest feedback to stores you have visited. One review per store per customer.',
              icon: <StarRateRoundedIcon sx={{ fontSize: 28, color: '#7C3AED' }} />
            },
            {
              title: 'Analytics Dashboard',
              desc: 'Detailed charts and statistics breakdown showing rating distribution trends over time.',
              icon: <AssessmentRoundedIcon sx={{ fontSize: 28, color: '#7C3AED' }} />
            },
            {
              title: 'Secure Environment',
              desc: 'Robust protection keeping user profiles and feedback fully verified and confidential.',
              icon: <LockRoundedIcon sx={{ fontSize: 28, color: '#7C3AED' }} />
            }
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card sx={{ height: '100%', borderRadius: 4, bgcolor: '#FFFFFF', border: '1px solid rgba(229, 231, 235, 0.6)', transition: 'all 0.2s ease', '&:hover': { boxShadow: '0 12px 30px rgba(124, 58, 237, 0.05)', transform: 'translateY(-2px)' } }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2.5, display: 'inline-flex', p: 1.5, borderRadius: 3, bgcolor: 'rgba(124, 58, 237, 0.06)' }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#1F2937', mb: 1.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: '#FFFFFF', py: { xs: 10, md: 14 }, borderY: '1px solid rgba(229, 231, 235, 0.6)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#1F2937', mb: 2, letterSpacing: '-0.025em' }}>
              How It Works
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto', fontSize: '1.05rem' }}>
              Transparency is simple. Follow these three steps to engage with RateHub.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { step: '1', title: 'Create Account', desc: 'Register as a standard customer to rate stores or log in with owner details to manage store profiles.' },
              { step: '2', title: 'Submit Ratings', desc: 'Browse registered stores, select your target store, and leave an authentic rating (1-5 stars).' },
              { step: '3', title: 'Drive Decisions', desc: 'Help other buyers make smart selections and help store managers analyze feedback score trends.' }
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box sx={{ p: 3, position: 'relative' }}>
                  <Box 
                    sx={{ 
                      width: 50, 
                      height: 50, 
                      borderRadius: 3, 
                      bgcolor: '#7C3AED', 
                      color: '#FFFFFF', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 800, 
                      fontSize: '1.25rem',
                      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
                      mb: 3
                    }}
                  >
                    {item.step}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#1F2937', mb: 1.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: '0.925rem' }}>
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 14 } }}>
        <Box 
          sx={{ 
            background: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #9333EA 100%)', 
            color: '#FFFFFF',
            borderRadius: 6,
            p: { xs: 6, md: 8 },
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(124, 58, 237, 0.15)'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '-100px',
              left: '-100px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)',
              filter: 'blur(50px)'
            }}
          />
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-0.02em', fontSize: { xs: '2rem', md: '3rem' } }}>
              Ready to transform your store ratings?
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.85)', mb: 5, maxWidth: 600, mx: 'auto' }}>
              Create a free customer profile today to start rating, or access your store manager dashboard to monitor ratings logs.
            </Typography>
            <Button 
              component={RouterLink} 
              to="/register" 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: '#FFFFFF', 
                color: '#7C3AED', 
                fontWeight: 700, 
                px: 5, 
                py: 2, 
                borderRadius: 3, 
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#F3F4F6',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Sign Up Now
            </Button>
          </Box>
        </Box>
      </Container>

      <PublicFooter />
    </Box>
  );
};

export default Home;
