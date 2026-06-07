import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('ratehub_token');
    const savedUser = localStorage.getItem('ratehub_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.success) {
      const { token: userToken, user: userData } = response.data;
      localStorage.setItem('ratehub_token', userToken);
      localStorage.setItem('ratehub_user', JSON.stringify(userData));
      setToken(userToken);
      setUser(userData);
    }
    return response.data;
  };

  const register = async (name, email, password, address) => {
    const response = await api.post('/auth/register', { name, email, password, address });
    if (response.data.success) {
      const { token: userToken, user: userData } = response.data;
      localStorage.setItem('ratehub_token', userToken);
      localStorage.setItem('ratehub_user', JSON.stringify(userData));
      setToken(userToken);
      setUser(userData);
    }
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('ratehub_token');
    localStorage.removeItem('ratehub_user');
    setToken(null);
    setUser(null);
  };

  const changePassword = async (currentPassword, newPassword) => {
    const response = await api.put('/auth/change-password', { currentPassword, newPassword });
    return response.data;
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    changePassword,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export default AuthContext;
