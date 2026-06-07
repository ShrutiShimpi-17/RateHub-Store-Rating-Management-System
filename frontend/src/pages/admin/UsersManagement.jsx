import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import api from '../../services/api';
import Layout from '../../components/Layout';
import { useToast } from '../../context/ToastContext';
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
  FormHelperText,
  CircularProgress,
  IconButton,
  Grid,
  Chip,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

const UsersManagement = () => {
  const { showToast } = useToast();
  
  // List States
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('DESC');

  // Dialog States
  const [createOpen, setCreateOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

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
      email: '',
      password: '',
      role: 'USER',
      address: ''
    }
  });

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage, search, roleFilter, sortBy, order]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search,
          role: roleFilter,
          sortBy,
          order
        }
      });
      if (res.data.success) {
        setUsers(res.data.data.users);
        setTotal(res.data.data.total);
      }
    } catch (error) {
      showToast("Failed to retrieve users list.", "error");
    } finally {
      setLoading(false);
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

  const handleRoleFilterChange = (e) => {
    setRoleFilter(e.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Create User Submission
  const onCreateSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post('/admin/users', data);
      if (res.data.success) {
        showToast("User account created successfully!", "success");
        setCreateOpen(false);
        reset();
        fetchUsers();
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to create user.";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  // Open Details Modal
  const handleViewDetails = async (userId) => {
    setDetailsOpen(true);
    setDetailsLoading(true);
    try {
      const res = await api.get(`/admin/users/${userId}`);
      if (res.data.success) {
        setSelectedUser(res.data.data);
      }
    } catch (error) {
      showToast("Failed to fetch user profile details.", "error");
      setDetailsOpen(false);
    } finally {
      setDetailsLoading(false);
    }
  };

  const getRoleChipColor = (role) => {
    if (role === 'ADMIN') return 'error';
    if (role === 'STORE_OWNER') return 'success';
    return 'primary';
  };

  return (
    <Layout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Users Directory
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateOpen(true)}
          sx={{ fontWeight: 600 }}
        >
          Add User
        </Button>
      </Box>

      {/* Filters & Actions Panel */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by name, email, address..."
                value={search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter by Role</InputLabel>
                <Select
                  value={roleFilter}
                  label="Filter by Role"
                  onChange={handleRoleFilterChange}
                >
                  <MenuItem value="">All Roles</MenuItem>
                  <MenuItem value="USER">Customer (USER)</MenuItem>
                  <MenuItem value="STORE_OWNER">Store Owner</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Users Data Table */}
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
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortBy === 'email'}
                  direction={sortBy === 'email' ? order.toLowerCase() : 'asc'}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Date Registered</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary', fontStyle: 'italic' }}>
                  No user records found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.role.replace('_', ' ')} 
                      size="small" 
                      color={getRoleChipColor(row.role)}
                      sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                    />
                  </TableCell>
                  <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => handleViewDetails(row.id)}
                      title="View user details & history"
                    >
                      <VisibilityIcon />
                    </IconButton>
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

      {/* Add User Modal */}
      <Dialog 
        open={createOpen} 
        onClose={() => setCreateOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Create New User Account</DialogTitle>
        <form onSubmit={handleSubmit(onCreateSubmit)}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField
              fullWidth
              label="Full Name"
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 20, message: 'Name must be at least 20 characters' },
                maxLength: { value: 60, message: 'Name cannot exceed 60 characters' }
              })}
              error={!!errors.name}
              helperText={errors.name?.message || "Required length: 20 - 60 characters"}
            />

            <TextField
              fullWidth
              label="Email Address"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
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
            />

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Account Role</InputLabel>
                  <Select {...field} label="Account Role">
                    <MenuItem value="USER">Customer (USER)</MenuItem>
                    <MenuItem value="STORE_OWNER">Store Owner</MenuItem>
                    <MenuItem value="ADMIN">Administrator</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <TextField
              fullWidth
              label="Physical Address"
              multiline
              rows={2}
              {...register('address', {
                maxLength: { value: 400, message: 'Address cannot exceed 400 characters' }
              })}
              error={!!errors.address}
              helperText={errors.address?.message || "Maximum 400 characters"}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1, gap: 1 }}>
            <Button onClick={() => setCreateOpen(false)} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Save User
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* User Details Modal */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {detailsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : selectedUser ? (
          <>
            <DialogTitle sx={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
              <Box>User Account details</Box>
              <IconButton onClick={() => setDetailsOpen(false)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pb: 4 }}>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Name</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>{selectedUser.name}</Typography>

                  <Typography variant="caption" color="text.secondary">Email Address</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>{selectedUser.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">Role Profile</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={selectedUser.role.replace('_', ' ')} 
                      color={getRoleChipColor(selectedUser.role)}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>

                  <Typography variant="caption" color="text.secondary">Address</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedUser.address || 'No address details.'}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {selectedUser.role === 'USER' && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Star Rating Submission History ({selectedUser.ratings?.length || 0})
                  </Typography>
                  {selectedUser.ratings?.length === 0 ? (
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                      This customer has not rated any stores yet.
                    </Typography>
                  ) : (
                    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Store Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell align="center">Rating Score</TableCell>
                            <TableCell>Date Rated</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedUser.ratings.map((rate) => (
                            <TableRow key={rate.id}>
                              <TableCell sx={{ fontWeight: 600 }}>{rate.store?.name}</TableCell>
                              <TableCell>{rate.store?.address}</TableCell>
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
                </>
              )}

              {selectedUser.role === 'STORE_OWNER' && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Owned Store Profiles ({selectedUser.stores?.length || 0})
                  </Typography>
                  {selectedUser.stores?.length === 0 ? (
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                      This owner has not been assigned to any stores yet.
                    </Typography>
                  ) : (
                    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Store ID</TableCell>
                            <TableCell>Store Name</TableCell>
                            <TableCell>Store Address</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedUser.stores.map((store) => (
                            <TableRow key={store.id}>
                              <TableCell>{store.id}</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>{store.name}</TableCell>
                              <TableCell>{store.address}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </>
              )}
            </DialogContent>
          </>
        ) : null}
      </Dialog>
    </Layout>
  );
};

export default UsersManagement;
