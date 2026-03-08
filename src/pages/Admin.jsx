import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupIcon from '@mui/icons-material/Group';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Alert,
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { appointmentsAPI, authAPI } from '../services/api';
import { theme } from '../theme';

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    role: 'user'
  });

  useEffect(() => {
    fetchAppointments();
    fetchUsers();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentsAPI.getAllAppointments();
      setAppointments(response.data);
    } catch (err) {
      setError('Failed to fetch appointments');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await authAPI.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenUserDialog = () => {
    setOpenUserDialog(true);
    setError('');
    setSuccess('');
  };

  const handleCloseUserDialog = () => {
    setOpenUserDialog(false);
    setNewUser({
      username: '',
      password: '',
      email: '',
      fullName: '',
      phone: '',
      role: 'user'
    });
  };

  const handleAddUser = async () => {
    setLoading(true);
    setError('');
    
    try {
      await authAPI.register(newUser);
      setSuccess('User added successfully!');
      handleCloseUserDialog();
      fetchUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await authAPI.deleteUser(id);
        setSuccess('User deleted successfully!');
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentsAPI.deleteAppointment(id);
        setSuccess('Appointment deleted successfully!');
        fetchAppointments();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete appointment');
      }
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await appointmentsAPI.updateAppointmentStatus(id, newStatus);
      setSuccess('Status updated successfully!');
      fetchAppointments();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'success',
      'Pending': 'warning',
      'Cancelled': 'error',
      'Completed': 'info'
    };
    return colors[status] || 'default';
  };

  // Calculate statistics
  const totalAppointments = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'Confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.colors.background }}>
      <AppBar position="static" elevation={0} sx={{ background: theme.gradients.primary }}>
        <Toolbar sx={{ py: 1 }}>
          <LocalHospitalIcon sx={{ mr: 2, fontSize: 36 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Admin Dashboard
          </Typography>
          <Chip 
            avatar={<Avatar sx={{ bgcolor: 'white', color: theme.colors.primary }}>
              <AdminPanelSettingsIcon />
            </Avatar>}
            label={user?.fullName || user?.username}
            sx={{ 
              mr: 2, 
              bgcolor: 'rgba(255,255,255,0.25)', 
              color: 'white', 
              fontWeight: 600,
              borderRadius: theme.borderRadius.small
            }}
          />
          <Button 
            color="inherit" 
            onClick={handleLogout} 
            startIcon={<LogoutIcon />}
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.25)', 
              '&:hover': { bgcolor: 'rgba(255,255,255,0.35)' },
              borderRadius: theme.borderRadius.small,
              textTransform: 'none',
              fontWeight: 600,
              px: 3
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {success && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3, 
              borderRadius: theme.borderRadius.small,
              boxShadow: theme.shadows.soft,
              bgcolor: theme.colors.primary,
              color: 'white',
              '& .MuiAlert-icon': { color: 'white' }
            }}
          >
            {success}
          </Alert>
        )}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              borderRadius: theme.borderRadius.small,
              boxShadow: theme.shadows.soft
            }}
          >
            {error}
          </Alert>
        )}

        {/* Statistics Dashboard */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: theme.borderRadius.medium,
                background: theme.gradients.emerald,
                color: 'white',
                boxShadow: theme.shadows.soft,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows.medium }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarMonthIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {totalAppointments}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 500 }}>
                      Total Appointments
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: theme.borderRadius.medium,
                background: theme.gradients.peach,
                color: 'white',
                boxShadow: theme.shadows.soft,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows.medium }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HourglassEmptyIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {pendingCount}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 500 }}>
                      Pending
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: theme.borderRadius.medium,
                background: theme.gradients.primary,
                color: 'white',
                boxShadow: theme.shadows.soft,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows.medium }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EventAvailableIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {confirmedCount}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 500 }}>
                      Confirmed
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={0}
              sx={{ 
                borderRadius: theme.borderRadius.medium,
                background: theme.gradients.warm,
                color: 'white',
                boxShadow: theme.shadows.soft,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows.medium }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircleIcon sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {completedCount}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 500 }}>
                      Completed
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: theme.borderRadius.large,
            boxShadow: theme.shadows.medium,
            overflow: 'hidden'
          }}
        >
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{ 
              px: 3,
              pt: 2,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                minHeight: 60,
                '&.Mui-selected': {
                  color: theme.colors.primary
                }
              },
              '& .MuiTabs-indicator': {
                height: 3,
                bgcolor: theme.colors.primary,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab label="📋 Appointments" />
            <Tab label="👥 Users" />
          </Tabs>

          <Divider />

          {/* Appointments Tab */}
          {tabValue === 0 && (
            <Box sx={{ p: 4 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.colors.primary, mb: 1 }}>
                  All Appointments
                </Typography>
                <Typography variant="body1" sx={{ color: theme.colors.textSecondary }}>
                  Manage and update appointment statuses
                </Typography>
              </Box>

              <TableContainer sx={{ 
                borderRadius: theme.borderRadius.medium,
                border: `1px solid ${theme.colors.background}`
              }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ 
                      background: theme.gradients.primary
                    }}>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Patient</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Doctor</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Department</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Date</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Time</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Status</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                          <Typography variant="h6" sx={{ color: theme.colors.textSecondary }}>
                            No appointments found
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      appointments.map((appointment) => (
                        <TableRow 
                          key={appointment._id}
                          sx={{
                            '&:hover': { 
                              bgcolor: theme.colors.background,
                              transition: 'background-color 0.2s'
                            }
                          }}
                        >
                          <TableCell sx={{ fontWeight: 600, color: theme.colors.textPrimary }}>
                            {appointment.patientName}
                          </TableCell>
                          <TableCell sx={{ color: theme.colors.textPrimary }}>
                            {appointment.doctorName}
                          </TableCell>
                          <TableCell sx={{ color: theme.colors.textPrimary }}>
                            {appointment.department}
                          </TableCell>
                          <TableCell sx={{ color: theme.colors.textPrimary }}>
                            {new Date(appointment.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell sx={{ color: theme.colors.textPrimary }}>
                            {appointment.time}
                          </TableCell>
                          <TableCell>
                            <TextField
                              select
                              size="small"
                              value={appointment.status}
                              onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                              sx={{
                                minWidth: 130,
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: theme.borderRadius.small,
                                  '&.Mui-focused fieldset': {
                                    borderColor: theme.colors.primary,
                                    borderWidth: 2
                                  }
                                }
                              }}
                            >
                              <MenuItem value="Pending">⏳ Pending</MenuItem>
                              <MenuItem value="Confirmed">✅ Confirmed</MenuItem>
                              <MenuItem value="Completed">🎉 Completed</MenuItem>
                              <MenuItem value="Cancelled">❌ Cancelled</MenuItem>
                            </TextField>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteAppointment(appointment._id)}
                              sx={{
                                color: theme.colors.error,
                                '&:hover': {
                                  bgcolor: '#FFE5E5',
                                  transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s'
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Users Tab */}
          {tabValue === 1 && (
            <Box sx={{ p: 4 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: theme.colors.primary, mb: 1 }}>
                    User Management
                  </Typography>
                  <Typography variant="body1" sx={{ color: theme.colors.textSecondary }}>
                    Add and manage system users
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenUserDialog}
                  sx={{
                    borderRadius: theme.borderRadius.small,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    background: theme.gradients.primary,
                    boxShadow: theme.shadows.soft,
                    '&:hover': {
                      background: theme.gradients.emerald,
                      boxShadow: theme.shadows.medium
                    }
                  }}
                >
                  Add User
                </Button>
              </Box>

              <TableContainer sx={{ 
                borderRadius: theme.borderRadius.medium,
                border: `1px solid ${theme.colors.background}`
              }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: theme.gradients.primary }}>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Username</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Full Name</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Email</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Role</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} align="center">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((u) => (
                        <TableRow 
                          key={u._id}
                          sx={{
                            '&:hover': { 
                              bgcolor: theme.colors.background,
                              transition: 'background-color 0.2s'
                            }
                          }}
                        >
                          <TableCell sx={{ fontWeight: 600, color: theme.colors.textPrimary }}>
                            {u.username}
                          </TableCell>
                          <TableCell sx={{ color: theme.colors.textPrimary }}>
                            {u.fullName}
                          </TableCell>
                          <TableCell sx={{ color: theme.colors.textPrimary }}>
                            {u.email}
                          </TableCell>
                          <TableCell>
                            <Chip
                              icon={u.role === 'admin' ? <AdminPanelSettingsIcon sx={{ fontSize: 16 }} /> : <GroupIcon sx={{ fontSize: 16 }} />}
                              label={(u.role || 'user').toUpperCase()}
                              size="small"
                              sx={{
                                bgcolor: u.role === 'admin' ? theme.colors.secondary : theme.colors.primary,
                                color: 'white',
                                fontWeight: 700,
                                borderRadius: theme.borderRadius.small
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleDeleteUser(u._id)}
                              disabled={u._id === user.id}
                              sx={{
                                color: theme.colors.error,
                                '&:hover': {
                                  bgcolor: '#FFE5E5',
                                  transform: 'scale(1.1)'
                                },
                                '&.Mui-disabled': {
                                  color: theme.colors.textSecondary,
                                  opacity: 0.3
                                },
                                transition: 'all 0.2s'
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Paper>
      </Container>

      {/* Add User Dialog */}
      <Dialog open={openUserDialog} onClose={handleCloseUserDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              required
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              required
              value={newUser.fullName}
              onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained" disabled={loading}>
            {loading ? 'Adding...' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admin;
