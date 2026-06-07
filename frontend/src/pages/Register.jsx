import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  CircularProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import StoreIcon from '@mui/icons-material/Store';

const Register = () => {
  const { register: signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await signup(data.name, data.email, data.password, data.address);
      if (res.success) {
        showToast("Registration successful! Welcome aboard.", "success");
        navigate('/dashboard');
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed. Try again.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        p: 2
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 460, boxShadow: 3, border: '1px solid #E2E8F0', transform: 'none !important' }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3.5 }}>
            <Box 
              sx={{ 
                bgcolor: 'primary.main', 
                color: 'white', 
                p: 1.5, 
                borderRadius: 3, 
                display: 'inline-flex',
                mb: 1.5
              }}
            >
              <StoreIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
              Create Account
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              Sign up as a customer to explore and rate stores.
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                {...register('name', {
                  required: 'Full name is required',
                  minLength: { value: 20, message: 'Name must be at least 20 characters' },
                  maxLength: { value: 60, message: 'Name cannot exceed 60 characters' }
                })}
                error={!!errors.name}
                helperText={errors.name?.message || "Length: 20 - 60 characters"}
                disabled={loading}
              />

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
              />

              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                multiline
                rows={2}
                placeholder="Optional address details..."
                {...register('address', {
                  maxLength: { value: 400, message: 'Address cannot exceed 400 characters' }
                })}
                error={!!errors.address}
                helperText={errors.address?.message || "Maximum 400 characters"}
                disabled={loading}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  maxLength: { value: 16, message: 'Password cannot exceed 16 characters' },
                  validate: {
                    hasUpper: (v) => /[A-Z]/.test(v) || "Must contain at least one uppercase letter",
                    hasSpecial: (v) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v) || "Must contain at least one special character"
                  }
                })}
                error={!!errors.password}
                helperText={errors.password?.message || "8-16 chars, 1 uppercase, 1 special character"}
                disabled={loading}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.5, fontSize: '1rem', fontWeight: 600, mt: 1 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
              </Button>
            </Box>
          </form>

          {/* Footer Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{ 
                  color: '#2563EB', 
                  textDecoration: 'none', 
                  fontWeight: 600 
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
