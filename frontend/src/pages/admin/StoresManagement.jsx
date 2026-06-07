import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import api from '../../services/api';
import Layout from '../../components/Layout';
import { useToast } from '../../context/ToastContext';
import StarRating from '../../components/StarRating';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  IconButton,
  Grid,
  Paper,
  Divider,
  Rating
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

const StoresManagement = () => {
  const { showToast } = useToast();

  // List States
  const [stores, setStores] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('DESC');

  // Owner list for dropdown
  const [owners, setOwners] = useState([]);
  const [ownersLoading, setOwnersLoading] = useState(false);

  // Dialog States
  const [createOpen, setCreateOpen] = useState(false);
  const [ratingsOpen, setRatingsOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [ratingsLoading, setRatingsLoading] = useState(false);

  // Form hook
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
      ownerId: ''
    }
  });

  useEffect(() => {
    fetchStores();
  }, [page, rowsPerPage, search, sortBy, order]);

  useEffect(() => {
    if (createOpen) {
      fetchOwners();
    }
  }, [createOpen]);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/stores', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search,
          sortBy,
          order
        }
      });
      if (res.data.success) {
        setStores(res.data.data.stores);
        setTotal(res.data.data.total);
      }
    } catch (error) {
      showToast("Failed to retrieve stores list.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    setOwnersLoading(true);
    try {
      // Fetch users with role STORE_OWNER
      const res = await api.get('/admin/users', {
        params: {
          limit: 100,
          role: 'STORE_OWNER'
        }
      });
      if (res.data.success) {
        setOwners(res.data.data.users);
      }
    } catch (error) {
      showToast("Failed to fetch store owner list.", "error");
    } finally {
      setOwnersLoading(false);
    }
  };

  const handleSort = (field) => {
    const isAsc = sortBy === field && order === 'ASC';
    setOrder(isAsc ? 'DESC' : 'ASC');
    setSortBy(field);
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Create Store Submission
  const onCreateSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        address: data.address,
        ownerId: data.ownerId || null
      };
      const res = await api.post('/admin/stores', payload);
      if (res.data.success) {
        showToast("Store created successfully!", "success");
        setCreateOpen(false);
        reset();
        fetchStores();
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to create store.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  // Open Ratings List Modal
  const handleViewRatings = async (store) => {
    setSelectedStore(store);
    setRatingsOpen(true);
    setRatingsLoading(true);
    try {
      const res = await api.get(`/admin/stores/${store.id}/ratings`);
      if (res.data.success) {
        setRatings(res.data.data);
      }
    } catch (error) {
      showToast("Failed to fetch store ratings.", "error");
      setRatingsOpen(false);
    } finally {
      setRatingsLoading(false);
    }
  };

  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Stores Directory
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateOpen(true)}
          sx={{ fontWeight: 600 }}
        >
          Add Store
        </Button>
      </Box>

      {/* Filter / Search Panel */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by store name, address..."
                value={search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Stores Table */}
      <TableContainer component={Paper} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'id'}
                  direction={sortBy === 'id' ? order.toLowerCase() : 'desc'}
                  onClick={() => handleSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortBy === 'name' ? order.toLowerCase() : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Store Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Assigned Owner</TableCell>
              <TableCell>
                Average Rating
              </TableCell>
              <TableCell align="center">Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            ) : stores.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary', fontStyle: 'italic' }}>
                  No store records found.
                </TableCell>
              </TableRow>
            ) : (
              stores.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>
                    {row.owner ? (
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {row.owner.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {row.owner.email}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                        Unassigned
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <StarRating value={row.averageRating} readOnly size="small" />
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      ({row.totalRatingsCount} ratings)
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewRatings(row)}
                      sx={{ fontWeight: 600 }}
                    >
                      Ratings
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>

      {/* Add Store Modal */}
      <Dialog 
        open={createOpen} 
        onClose={() => setCreateOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Create New Store Profile</DialogTitle>
        <form onSubmit={handleSubmit(onCreateSubmit)}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              label="Store Name"
              {...register('name', { required: 'Store name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              fullWidth
              label="Store Location Address"
              multiline
              rows={2}
              {...register('address', {
                required: 'Store location address is required',
                maxLength: { value: 400, message: 'Address cannot exceed 400 characters' }
              })}
              error={!!errors.address}
              helperText={errors.address?.message || "Maximum 400 characters"}
            />

            <Controller
              name="ownerId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Assign Owner (User with role STORE_OWNER)</InputLabel>
                  <Select 
                    {...field} 
                    label="Assign Owner (User with role STORE_OWNER)"
                    disabled={ownersLoading}
                  >
                    <MenuItem value=""><em>None (Keep Unassigned)</em></MenuItem>
                    {owners.map(owner => (
                      <MenuItem key={owner.id} value={owner.id}>
                        {owner.name} ({owner.email})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1, gap: 1 }}>
            <Button onClick={() => setCreateOpen(false)} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save Store
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Store Ratings Overlay */}
      <Dialog
        open={ratingsOpen}
        onClose={() => setRatingsOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {ratingsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : selectedStore ? (
          <>
            <DialogTitle sx={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Ratings for: {selectedStore.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedStore.address}
                </Typography>
              </Box>
              <IconButton onClick={() => setRatingsOpen(false)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pb: 4 }}>
              {ratings.length === 0 ? (
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', py: 2 }}>
                  This store has not received any rating submissions yet.
                </Typography>
              ) : (
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Customer Email</TableCell>
                        <TableCell align="center">Rating Score</TableCell>
                        <TableCell>Date Rated</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ratings.map((rate) => (
                        <TableRow key={rate.id}>
                          <TableCell sx={{ fontWeight: 600 }}>{rate.user?.name}</TableCell>
                          <TableCell>{rate.user?.email}</TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                              <StarIcon sx={{ color: '#F59E0B', fontSize: 18 }} />
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {rate.rating}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{new Date(rate.updatedAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DialogContent>
          </>
        ) : null}
      </Dialog>
    </Layout>
  );
};

export default StoresManagement;
