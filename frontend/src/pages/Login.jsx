import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link as MuiLink,
  Stack,
  Divider,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { keyframes } from '@mui/system';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const float1 = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-15px) scale(1.05); }
`;

const float2 = keyframes`
  0%, 100% { transform: translateY(0) scale(1.05); }
  50% { transform: translateY(15px) scale(1); }
`;

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Session expiration flag
  const queryParams = new URLSearchParams(location.search);
  const isExpired = queryParams.get('expired') === 'true';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await login(data.email, data.password);
      if (res.success) {
        showToast('Login successful! Welcome to RateHub.', 'success');
        const role = res.user.role;
        if (role === 'ADMIN') navigate('/admin');
        else if (role === 'STORE_OWNER') navigate('/owner');
        else navigate('/dashboard');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid email or password.';
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const featureItems = [
    { text: 'Rate Stores', icon: <StarRateRoundedIcon sx={{ fontSize: 18 }} /> },
    { text: 'Discover Businesses', icon: <StorefrontRoundedIcon sx={{ fontSize: 18 }} /> },
    { text: 'Analytics Dashboard', icon: <AssessmentRoundedIcon sx={{ fontSize: 18 }} /> },
    { text: 'Secure Access', icon: <LockRoundedIcon sx={{ fontSize: 18 }} /> }
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#F8FAFC' }}>
      {/* Premium Header */}
      <PublicHeader />

      {/* Split-screen layout */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: 'calc(100vh - 72px)',
        }}
      >
        {/* LEFT PANEL - Branding (50% Split) */}
        <Box
          sx={{
            flex: 1,
            background: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #9333EA 100%)',
            color: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: { xs: 4, sm: 6, md: 8 },
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: `
              radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #9333EA 100%)
            `,
            backgroundSize: '24px 24px, 100% 100%',
          }}
        >
          {/* Decorative Floating Circles */}
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.35) 0%, transparent 70%)',
              filter: 'blur(50px)',
              animation: `${float1} 8s ease-in-out infinite`,
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '15%',
              right: '5%',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
              animation: `${float2} 10s ease-in-out infinite`,
              zIndex: 1,
            }}
          />

          {/* Branding Content */}
          <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 540, mx: 'auto', width: '100%' }}>
            {/* Logo */}
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.5, mb: { xs: 6, md: 8 } }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 42,
                  height: 42,
                  borderRadius: '12px',
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                }}
              >
                <StarRateRoundedIcon sx={{ color: '#FFFFFF', fontSize: 26 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.03em' }}>
                RateHub
              </Typography>
            </Box>

            {/* Typography */}
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              }}
            >
              Discover. Rate. Grow.
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 5,
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: 450,
                lineHeight: 1.6,
                fontSize: '1.05rem',
              }}
            >
              Connecting customers and businesses through trusted ratings and transparent feedback.
            </Typography>

            {/* Feature Chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {featureItems.map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2.2,
                    py: 1,
                    borderRadius: '24px',
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(12px)',
                    color: '#FFFFFF',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      bgcolor: 'rgba(255, 255, 255, 0.14)',
                      borderColor: 'rgba(255, 255, 255, 0.3)'
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* RIGHT PANEL - Login Card (50% Split) */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#F8FAFC',
            p: { xs: 4, sm: 6, md: 8 }
          }}
        >
          <Card
            sx={{
              maxWidth: 440,
              width: '100%',
              borderRadius: 5,
              p: { xs: 4, md: 5 },
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.6)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
              transform: 'none !important'
            }}
          >
            <CardContent sx={{ p: 0 }}>
              {/* Card Header */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: '#1F2937', mb: 1, letterSpacing: '-0.02em' }}>
                  Welcome to RateHub
                </Typography>
                <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>
                  Your trusted platform for store ratings, reviews, and business insights.
                </Typography>
              </Box>

              {isExpired && (
                <Box
                  sx={{
                    bgcolor: 'rgba(239, 68, 68, 0.08)',
                    color: '#DC2626',
                    p: 1.5,
                    borderRadius: 2.5,
                    mb: 3,
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    border: '1px solid rgba(239, 68, 68, 0.16)'
                  }}
                >
                  Your session has expired. Please log in again.
                </Box>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address'
                      }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        bgcolor: '#FFFFFF',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: '#FAFAFA'
                        },
                        '&.Mui-focused': {
                          bgcolor: '#FFFFFF',
                          boxShadow: '0 0 0 4px rgba(124, 58, 237, 0.12)'
                        }
                      }
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#9CA3AF' }}>
                            {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    disabled={loading}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        bgcolor: '#FFFFFF',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: '#FAFAFA'
                        },
                        '&.Mui-focused': {
                          bgcolor: '#FFFFFF',
                          boxShadow: '0 0 0 4px rgba(124, 58, 237, 0.12)'
                        }
                      }
                    }}
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
                      fontSize: '0.95rem',
                      textTransform: 'none',
                      boxShadow: '0 4px 14px rgba(124, 58, 237, 0.25)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: '#6D28D9',
                        boxShadow: '0 6px 20px rgba(124, 58, 237, 0.35)',
                        transform: 'translateY(-1px)'
                      },
                      '&:active': {
                        transform: 'translateY(0)'
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                  </Button>
                </Stack>
              </form>

              <Divider sx={{ my: 3.5, color: '#E5E7EB', fontSize: '0.8rem', fontWeight: 600 }}>OR</Divider>

              <Typography variant="body2" sx={{ textAlign: 'center', color: '#4B5563' }}>
                Don't have an account?{' '}
                <MuiLink
                  component={Link}
                  to="/register"
                  sx={{
                    fontWeight: 600,
                    color: '#7C3AED',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    '&:hover': {
                      color: '#6D28D9'
                    }
                  }}
                >
                  Sign Up
                </MuiLink>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Premium Footer */}
      <PublicFooter />
    </Box>
  );
};

export default Login;
