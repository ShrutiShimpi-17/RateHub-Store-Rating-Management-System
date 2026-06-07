import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Layout from '../components/Layout';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const Profile = () => {
  const { user, changePassword } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: ''
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await changePassword(data.currentPassword, data.newPassword);
      if (res.success) {
        showToast("Password updated successfully!", "success");
        reset();
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update password. Verify current password.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        {/* Left Side: Profile Summary */}
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Box 
                sx={{ 
                  bgcolor: 'rgba(37, 99, 235, 0.08)', 
                  color: 'primary.main', 
                  p: 3, 
                  borderRadius: '50%',
                  display: 'inline-flex',
                  mb: 2
                }}
              >
                <PersonIcon sx={{ fontSize: 50 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                {user?.email}
              </Typography>
              
              <Box 
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 4, 
                  fontSize: '0.75rem', 
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mb: 3
                }}
              >
                {user?.role?.replace('_', ' ')}
              </Box>

              <Divider sx={{ width: '100%', my: 2 }} />

              <Box sx={{ alignSelf: 'flex-start', width: '100%' }}>
                <Typography variant="h6" sx={{ fontSize: '0.9rem', color: 'text.secondary', mb: 1, fontWeight: 600 }}>
                  Contact Address
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontStyle: user?.address ? 'normal' : 'italic' }}>
                  {user?.address || 'No address provided.'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: Change Password Form */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <LockIcon color="primary" />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Change Password
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Update your account password. Ensure your new password satisfies the complexity guidelines.
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={showPassword1 ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword1(!showPassword1)}
                            edge="end"
                          >
                            {showPassword1 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    {...register('currentPassword', { required: 'Current password is required' })}
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword?.message}
                    disabled={loading}
                  />

                  <TextField
                    fullWidth
                    label="New Password"
                    type={showPassword2 ? 'text' : 'password'}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword2(!showPassword2)}
                            edge="end"
                          >
                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    {...register('newPassword', {
                      required: 'New password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                      maxLength: { value: 16, message: 'Password cannot exceed 16 characters' },
                      validate: {
                        hasUpper: (v) => /[A-Z]/.test(v) || "Must contain at least one uppercase letter",
                        hasSpecial: (v) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v) || "Must contain at least one special character"
                      }
                    })}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message || "8-16 chars, 1 uppercase, 1 special character"}
                    disabled={loading}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ py: 1.2, fontWeight: 600, alignSelf: 'flex-start', px: 4 }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Profile;
