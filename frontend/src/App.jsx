import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersManagement from './pages/admin/UsersManagement';
import StoresManagement from './pages/admin/StoresManagement';
import UserDashboard from './pages/user/UserDashboard';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';

// Automatically directs authenticated users to their corresponding dashboard
const RootRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Home />;
  }

  if (user?.role === 'ADMIN') {
    return <Navigate to="/admin" replace />;
  }

  if (user?.role === 'STORE_OWNER') {
    return <Navigate to="/owner" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* Shared Protected Profile Settings */}
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN', 'USER', 'STORE_OWNER']}>
                    <Profile />
                  </ProtectedRoute>
                } 
              />

              {/* Admin Views */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <UsersManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/stores" 
                element={
                  <ProtectedRoute allowedRoles={['ADMIN']}>
                    <StoresManagement />
                  </ProtectedRoute>
                } 
              />

              {/* Store Owner Views */}
              <Route 
                path="/owner" 
                element={
                  <ProtectedRoute allowedRoles={['STORE_OWNER']}>
                    <OwnerDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Regular Customer (USER) Views */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['USER']}>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Root & Catch-All Fallbacks */}
              <Route path="/" element={<RootRedirect />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
