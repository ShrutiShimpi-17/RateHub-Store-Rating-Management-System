import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundColor: '#F8FAFC'
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect user to their default dashboard if unauthorized
    if (user.role === 'ADMIN') {
      return <Navigate to="/admin" replace />;
    }
    if (user.role === 'STORE_OWNER') {
      return <Navigate to="/owner" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
