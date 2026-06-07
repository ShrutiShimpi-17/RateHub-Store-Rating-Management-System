import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ratehub_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle API errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Session expired or unauthorized
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('ratehub_token');
      localStorage.removeItem('ratehub_user');
      
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login?expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
