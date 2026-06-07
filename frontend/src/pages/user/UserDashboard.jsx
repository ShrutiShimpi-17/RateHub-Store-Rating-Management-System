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
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CardActions,
  Divider,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import RoomIcon from '@mui/icons-material/Room';

const UserDashboard = () => {
  const { showToast } = useToast();

  // Store Catalog States
  const [stores, setStores] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // Show 6 stores per page in a beautiful grid
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('ASC');

  // Rating Modal States
  const [ratingOpen, setRatingOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [submittingRating, setSubmittingRating] = useState(false);

  useEffect(() => {
    fetchStores();
  }, [page, search, sortBy, order]);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await api.get('/stores', {
        params: {
          page,
          limit,
          search,
          sortBy,
          order
        }
      });
      if (res.data.success) {
        setStores(res.data.data.stores);
        setTotal(res.data.data.total);
        setTotalPages(res.data.data.totalPages);
      }
    } catch (error) {
      showToast("Failed to load store listing.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 on filter
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    setPage(1);
  };

  const handleOrderChange = (e) => {
    const value = e.target.value;
    setOrder(value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Open Submit Rating Dialog
  const handleOpenRatingModal = (store) => {
    setSelectedStore(store);
    // Preset user's own rating if they have rated the store previously
    setRatingValue(store.myRating || 0);
    setRatingOpen(true);
  };

  // Submit Rating Handler
  const handleRatingSubmit = async () => {
    if (ratingValue === 0) {
      showToast("Please choose a star rating score.", "warning");
      return;
    }

    setSubmittingRating(true);
    try {
      const res = await api.post('/ratings', {
        storeId: selectedStore.id,
        rating: ratingValue
      });
      
      if (res.data.success) {
        showToast(res.data.message || "Rating saved successfully!", "success");
        setRatingOpen(false);
        fetchStores(); // Refresh average ratings and personal ratings
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to submit rating.";
      showToast(msg, "error");
    } finally {
      setSubmittingRating(false);
    }
  };

  return (
    <Layout>
      {/* Search and Sort Toolbar */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent sx={{ p: 2.5 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search stores by name or address..."
                value={search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6} md={3.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort By</InputLabel>
                <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
                  <MenuItem value="name">Store Name</MenuItem>
                  <MenuItem value="id">Creation Date</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={3.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Direction</InputLabel>
                <Select value={order} label="Direction" onChange={handleOrderChange}>
                  <MenuItem value="ASC">Ascending (A-Z)</MenuItem>
                  <MenuItem value="DESC">Descending (Z-A)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Grid View */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10, flexGrow: 1 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : stores.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h6" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
            No stores match your search query.
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stores.map((store) => (
              <Grid item xs={12} sm={6} md={4} key={store.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transform: 'none !important' }}>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary' }}>
                      {store.name}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 3.5, color: 'text.secondary' }}>
                      <RoomIcon sx={{ fontSize: 18, mt: 0.2, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden',
                        height: 40
                      }}>
                        {store.address}
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                          AVERAGE RATING
                        </Typography>
                        <StarRating value={store.averageRating} readOnly size="small" />
                        <Typography variant="caption" color="text.secondary">
                          ({store.totalRatingsCount} reviews)
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                          YOUR RATING
                        </Typography>
                        {store.myRating ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <StarIcon sx={{ color: 'warning.main', fontSize: 18 }} />
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {store.myRating} / 5
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                            <StarBorderIcon sx={{ fontSize: 18 }} />
                            <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.85rem' }}>
                              Not rated
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, justifyContent: 'flex-end' }}>
                    <Button
                      variant={store.myRating ? "outlined" : "contained"}
                      size="small"
                      color="primary"
                      onClick={() => handleOpenRatingModal(store)}
                      sx={{ fontWeight: 600 }}
                    >
                      {store.myRating ? "Modify Rating" : "Submit Rating"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', py: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </Box>
      )}

      {/* Submit/Update Rating Dialog Modal */}
      <Dialog
        open={ratingOpen}
        onClose={() => setRatingOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {selectedStore && (
          <>
            <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
              {selectedStore.myRating ? 'Update Your Rating' : 'Leave a Rating'}
            </DialogTitle>
            <DialogContent sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', textAlign: 'center' }}>
                {selectedStore.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 1 }}>
                Select star rating score below for this store.
              </Typography>
              
              {/* Interactive Rating Component */}
              <StarRating
                value={ratingValue}
                onChange={(newValue) => setRatingValue(newValue)}
              />
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 1, gap: 1 }}>
              <Button 
                onClick={() => setRatingOpen(false)} 
                variant="outlined" 
                color="inherit"
                disabled={submittingRating}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleRatingSubmit} 
                variant="contained" 
                color="primary"
                disabled={submittingRating}
              >
                {submittingRating ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Layout>
  );
};

export default UserDashboard;
