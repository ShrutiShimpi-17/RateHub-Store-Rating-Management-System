import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, TextField, Button, Stack } from '@mui/material';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate contact form submission
    setTimeout(() => {
      showToast("Thank you for reaching out! We will get back to you shortly.", "success");
      setForm({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1200);
  };

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
            Get In Touch
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
            Have questions about RateHub? We’d love to hear from you. Send us a message below.
          </Typography>
        </Container>
      </Box>

      {/* Contact Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, flexGrow: 1 }}>
        <Grid container spacing={5}>
          {/* Info Details */}
          <Grid item xs={12} md={5}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1F2937', mb: 3, letterSpacing: '-0.02em' }}>
              Contact Information
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 5, lineHeight: 1.7 }}>
              Our support team is here to assist you with any questions or assistance you may need regarding store listings, analytics or rating submissions.
            </Typography>

            <Stack spacing={4}>
              {[
                {
                  label: 'Send Email',
                  value: 'support@ratehub.com',
                  icon: <EmailRoundedIcon sx={{ color: '#7C3AED' }} />
                },
                {
                  label: 'Call Us',
                  value: '+91 (020) 555-0199',
                  icon: <PhoneEnabledRoundedIcon sx={{ color: '#7C3AED' }} />
                },
                {
                  label: 'Our Location',
                  value: 'CDAC Road, Pune, Maharashtra, India',
                  icon: <LocationOnRoundedIcon sx={{ color: '#7C3AED' }} />
                }
              ].map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'rgba(124, 58, 237, 0.08)', display: 'inline-flex' }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
                      {item.label}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: '#1F2937' }}>
                      {item.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Form Card */}
          <Grid item xs={12} md={7}>
            <Card 
              sx={{ 
                borderRadius: 5, 
                border: '1px solid rgba(229, 231, 235, 0.6)', 
                bgcolor: '#FFFFFF', 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.03)',
                p: { xs: 3, md: 4 },
                transform: 'none !important'
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1F2937', mb: 4, letterSpacing: '-0.02em' }}>
                  Send a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{
                        py: 1.75,
                        borderRadius: 3,
                        bgcolor: '#7C3AED',
                        color: '#FFFFFF',
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '0.95rem',
                        boxShadow: '0 4px 14px rgba(124, 58, 237, 0.2)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: '#6D28D9',
                          boxShadow: '0 6px 20px rgba(124, 58, 237, 0.3)',
                          transform: 'translateY(-1px)'
                        },
                        '&:active': {
                          transform: 'translateY(0)'
                        }
                      }}
                    >
                      {loading ? 'Sending Inquiries...' : 'Send Message'}
                    </Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <PublicFooter />
    </Box>
  );
};

export default Contact;
