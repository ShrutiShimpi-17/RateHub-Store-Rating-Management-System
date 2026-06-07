import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Layout from '../../components/Layout';
import StarRating from '../../components/StarRating';
import { useToast } from '../../context/ToastContext';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Select, MenuItem } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StoreIcon from '@mui/icons-material/Store';
import RoomIcon from '@mui/icons-material/Room';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const OwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    fetchOwnerStore();
  }, []);

  const selectedStore = stores.find(s => s.id === selectedStoreId) || stores[0];

  const fetchOwnerStore = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.get('/ratings/owner');
      if (res.data.success) {
        const fetchedStores = res.data.data;
        setStores(fetchedStores);
        if (fetchedStores.length > 0) {
          setSelectedStoreId(fetchedStores[0].id);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMsg(error.response.data.message || "No store assigned.");
      } else {
        showToast("Failed to load store owner analytics.", "error");
        setErrorMsg("Failed to retrieve dashboard details.");
      }
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

  // If Owner is not assigned to any store yet
  if (errorMsg) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, py: 6 }}>
          <Card sx={{ maxWidth: 500, width: '100%', p: 3, textAlign: 'center', transform: 'none !important' }}>
            <CardContent>
              <Box sx={{ color: 'warning.main', mb: 2 }}>
                <InfoIcon sx={{ fontSize: 60 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                Store Assignment Pending
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                {errorMsg}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontStyle: 'italic' }}>
                System Administrators can register your store and link it to your account.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Store Profile Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 4, flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <StoreIcon color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {stores.length > 1 ? (
                    <Select
                      value={selectedStoreId || ''}
                      onChange={(e) => setSelectedStoreId(e.target.value)}
                      displayEmpty
                      size="small"
                      sx={{ minWidth: 220 }}
                    >
                      {stores.map((store) => (
                        <MenuItem key={store.id} value={store.id}>
                          {store.name}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    selectedStore?.name
                  )}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, color: 'text.secondary', mb: 4 }}>
                <RoomIcon sx={{ fontSize: 18, mt: 0.2 }} />
                {selectedStore?.address}
              </Box>
 
              <Divider sx={{ mb: 3 }} />
 
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                    AVERAGE RATING
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main' }}>
                      {selectedStore?.averageRating ? parseFloat(selectedStore.averageRating).toFixed(1) : '0.0'}
                    </Typography>
                    <Box>
                      <StarRating value={selectedStore?.averageRating} readOnly size="small" />
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        out of 5 stars
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                    TOTAL REVIEWS
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                      {selectedStore?.totalRatingsCount}
                    </Typography>
                    <Box sx={{ color: 'text.secondary' }}>
                      <PeopleIcon sx={{ fontSize: 24, mt: 0.5 }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
 
        {/* Rating Chart Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Rating Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Frequency breakdown of review ratings given by customers.
              </Typography>
              <Box sx={{ flexGrow: 1, width: '100%', minHeight: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={selectedStore?.ratingDistribution || []} layout="vertical" margin={{ top: 0, right: 10, left: -15, bottom: 0 }}>
                    <XAxis type="number" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={11} tickLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
                    <Bar dataKey="count" fill="#7C3AED" radius={[0, 4, 4, 0]} barSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Customer Ratings List */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Recent Store Ratings & Feedback
      </Typography>
      
      <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Email</TableCell>
              <TableCell>Customer Address</TableCell>
              <TableCell align="center">Rating Score</TableCell>
              <TableCell>Date Reviewed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedStore?.ratings?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary', fontStyle: 'italic' }}>
                  No customer ratings left for your store yet.
                </TableCell>
              </TableRow>
            ) : (
              selectedStore?.ratings?.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{row.user?.name}</TableCell>
                  <TableCell>{row.user?.email}</TableCell>
                  <TableCell>{row.user?.address || 'N/A'}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                      <StarIcon sx={{ color: '#F59E0B', fontSize: 18 }} />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {row.rating}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{new Date(row.updatedAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default OwnerDashboard;
