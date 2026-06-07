import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Layout from '../../components/Layout';
import { useToast } from '../../context/ToastContext';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Divider,
  useTheme
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import StarIcon from '@mui/icons-material/Star';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const theme = useTheme();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/stats');
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      showToast("Failed to fetch dashboard metrics.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
          <CircularProgress color="primary" />
        </Box>
      </Layout>
    );
  }

  // Define colors for Pie Chart
  const COLORS = ['#2563EB', '#10B981', '#F59E0B'];

  const roleData = stats?.roles
    ? [
        { name: 'Customers (USER)', value: stats.roles.user },
        { name: 'Store Owners', value: stats.roles.owner },
        { name: 'Admins', value: stats.roles.admin }
      ]
    : [];

  const overviewData = stats
    ? [
        { name: 'Total Users', count: stats.totalUsers },
        { name: 'Total Stores', count: stats.totalStores },
        { name: 'Total Ratings', count: stats.totalRatings }
      ]
    : [];

  return (
    <Layout>
      {/* Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', mb: 0.5 }}>
                  Total Users
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                  {stats?.totalUsers}
                </Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(37, 99, 235, 0.08)', color: 'primary.main', p: 2, borderRadius: 3 }}>
                <PeopleIcon sx={{ fontSize: 30 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', mb: 0.5 }}>
                  Total Stores
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                  {stats?.totalStores}
                </Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(16, 185, 129, 0.08)', color: 'success.main', p: 2, borderRadius: 3 }}>
                <StoreIcon sx={{ fontSize: 30 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', mb: 0.5 }}>
                  Total Ratings
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                  {stats?.totalRatings}
                </Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(245, 158, 11, 0.08)', color: 'warning.main', p: 2, borderRadius: 3 }}>
                <StarIcon sx={{ fontSize: 30 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 3 }}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', mb: 0.5 }}>
                  Average Rating
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800 }}>
                  {stats?.overallAvg ? parseFloat(stats.overallAvg).toFixed(1) : '0.0'}
                </Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(139, 92, 246, 0.08)', color: 'purple', p: 2, borderRadius: 3 }}>
                <ShowChartIcon sx={{ fontSize: 30 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Visualizations Panel */}
      <Grid container spacing={3}>
        {/* Left Side: Overview Stats */}
        <Grid item xs={12} lg={7}>
          <Card sx={{ height: 400, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                System Metrics Comparison
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Counts of user accounts, created stores, and submitted reviews.
              </Typography>
              <Box sx={{ flexGrow: 1, width: '100%', minHeight: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
                    <Bar dataKey="count" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: Role Breakdown */}
        <Grid item xs={12} lg={5}>
          <Card sx={{ height: 400, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Role Breakdown
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Distribution of user profiles registered in the system.
              </Typography>
              <Box sx={{ flexGrow: 1, width: '100%', minHeight: 220, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {roleData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AdminDashboard;
