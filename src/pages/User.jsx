import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Alert,
  AppBar,
  Avatar,
  Badge,
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
  MenuItem,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { appointmentsAPI } from '../services/api';
import { theme } from '../theme';

// Pre-built lists
const DOCTORS = [
  { name: 'Dr. Sarah Johnson', department: 'Cardiology' },
  { name: 'Dr. Michael Chen', department: 'Neurology' },
  { name: 'Dr. Emily Rodriguez', department: 'Orthopedics' },
  { name: 'Dr. James Anderson', department: 'Pediatrics' },
  { name: 'Dr. Maria Garcia', department: 'Dermatology' },
  { name: 'Dr. David Kim', department: 'General Medicine' },
  { name: 'Dr. Lisa Thompson', department: 'ENT' },
  { name: 'Dr. Robert Wilson', department: 'Ophthalmology' }
];

const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Dermatology',
  'General Medicine',
  'ENT',
  'Ophthalmology'
];

const User = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [myAppointments, setMyAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [newAppointment, setNewAppointment] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    doctorName: '',
    department: '',
    date: '',
    time: '',
    symptoms: ''
  });

  useEffect(() => {
    fetchUserAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserAppointments = async () => {
    try {
      const response = await appointmentsAPI.getUserAppointments(user.id);
      setMyAppointments(response.data);
    } catch (err) {
      setError('Failed to fetch appointments');
    }
  };



  const handleDepartmentChange = (department) => {
    setNewAppointment({ ...newAppointment, department });
    // Clear doctor if department changes
    if (newAppointment.doctorName) {
      const doctor = DOCTORS.find(d => d.name === newAppointment.doctorName);
      if (doctor && doctor.department !== department) {
        setNewAppointment({ ...newAppointment, department, doctorName: '' });
      }
    }
  };

  const getAvailableDoctors = () => {
    if (!newAppointment.department) return [];
    return DOCTORS.filter(d => d.department === newAppointment.department);
  };

  const handleCreateAppointment = async () => {
    try {
      setError('');
      setSuccess('');
      await appointmentsAPI.createAppointment({
        ...newAppointment,
        userId: user.id,
        status: 'Pending'
      });
      setSuccess('Appointment created successfully!');
      setOpenDialog(false);
      setNewAppointment({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        doctorName: '',
        department: '',
        date: '',
        time: '',
        symptoms: ''
      });
      fetchUserAppointments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create appointment');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filter appointments by status
  const pendingAppointments = myAppointments.filter(a => a.status === 'Pending');
  const confirmedAppointments = myAppointments.filter(a => a.status === 'Confirmed');
  const completedAppointments = myAppointments.filter(a => a.status === 'Completed');
  const cancelledAppointments = myAppointments.filter(a => a.status === 'Cancelled');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.colors.background }}>
      <AppBar position="static" elevation={0} sx={{ background: theme.gradients.primary }}>
        <Toolbar sx={{ py: 1 }}>
          <LocalHospitalIcon sx={{ mr: 2, fontSize: 36 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Hospital Management System
          </Typography>
          <Chip 
            avatar={<Avatar sx={{ bgcolor: 'white', color: theme.colors.primary }}>{user?.fullName?.charAt(0)}</Avatar>}
            label={user?.fullName}
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

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: theme.borderRadius.medium,
                background: theme.gradients.emerald,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: theme.shadows.soft,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows.medium }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {myAppointments.length}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 500 }}>
                  Total Appointments
                </Typography>
              </Box>
              <CalendarMonthIcon sx={{ position: 'absolute', right: 16, bottom: 16, fontSize: 80, opacity: 0.2 }} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: theme.borderRadius.medium,
                background: theme.gradients.peach,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: theme.shadows.soft,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows.medium }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {pendingAppointments.length}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 500 }}>
                  Pending
                </Typography>
              </Box>
              <HourglassEmptyIcon sx={{ position: 'absolute', right: 16, bottom: 16, fontSize: 80, opacity: 0.2 }} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: theme.borderRadius.medium,
                background: theme.gradients.primary,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: theme.shadows.soft,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows.medium }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {confirmedAppointments.length}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 500 }}>
                  Confirmed
                </Typography>
              </Box>
              <EventAvailableIcon sx={{ position: 'absolute', right: 16, bottom: 16, fontSize: 80, opacity: 0.2 }} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3, 
                borderRadius: theme.borderRadius.medium,
                background: theme.gradients.warm,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: theme.shadows.soft,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows.medium }
              }}
            >
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {completedAppointments.length}
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 500 }}>
                  Completed
                </Typography>
              </Box>
              <CheckCircleIcon sx={{ position: 'absolute', right: 16, bottom: 16, fontSize: 80, opacity: 0.2 }} />
            </Paper>
          </Grid>
        </Grid>

        {/* Action Bar */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: theme.borderRadius.medium,
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            boxShadow: theme.shadows.soft,
            background: theme.colors.surface
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: theme.colors.primary, mb: 0.5 }}>
              My Appointments
            </Typography>
            <Typography variant="body2" sx={{ color: theme.colors.textSecondary }}>
              Manage your hospital appointments
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            size="large"
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
                boxShadow: theme.shadows.medium,
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.2s'
            }}
          >
            Book Appointment
          </Button>
        </Paper>

        {/* Pending Appointments Section */}
        {pendingAppointments.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: theme.borderRadius.medium,
                background: `linear-gradient(135deg, ${theme.colors.surface} 0%, #FFF5E5 100%)`,
                border: `3px solid ${theme.colors.secondary}`,
                boxShadow: theme.shadows.soft
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Badge badgeContent={pendingAppointments.length} sx={{ 
                  mr: 2,
                  '& .MuiBadge-badge': {
                    bgcolor: theme.colors.accent,
                    color: theme.colors.textPrimary,
                    fontWeight: 700
                  }
                }}>
                  <HourglassEmptyIcon sx={{ fontSize: 40, color: theme.colors.secondary }} />
                </Badge>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.colors.secondary }}>
                  Pending Appointments
                </Typography>
              </Box>
              <Divider sx={{ mb: 3, borderColor: theme.colors.secondary, opacity: 0.3 }} />
              <Grid container spacing={3}>
                {pendingAppointments.map((appointment) => (
                  <Grid item xs={12} md={6} key={appointment._id}>
                    <Card 
                      elevation={0}
                      sx={{ 
                        borderRadius: theme.borderRadius.medium,
                        border: `2px solid ${theme.colors.secondary}`,
                        transition: 'all 0.3s',
                        boxShadow: theme.shadows.soft,
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.shadows.medium,
                          borderColor: theme.colors.accent
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                            {appointment.patientName}
                          </Typography>
                          <Chip 
                            label={appointment.status} 
                            color="warning"
                            size="small"
                            icon={<HourglassEmptyIcon />}
                          />
                        </Box>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" color="textSecondary" sx={{ minWidth: 100, fontWeight: 600 }}>
                              Doctor:
                            </Typography>
                            <Typography variant="body2">{appointment.doctorName}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" color="textSecondary" sx={{ minWidth: 100, fontWeight: 600 }}>
                              Department:
                            </Typography>
                            <Chip label={appointment.department} size="small" />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="body2" color="textSecondary" sx={{ minWidth: 100, fontWeight: 600 }}>
                              Date & Time:
                            </Typography>
                            <Typography variant="body2">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                            </Typography>
                          </Box>
                          <Divider />
                          <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                            {appointment.symptoms}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        )}

        {/* All Appointments by Status */}
        <Grid container spacing={3}>
          {/* Confirmed */}
          {confirmedAppointments.length > 0 && (
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ 
                p: 4, 
                borderRadius: theme.borderRadius.medium,
                boxShadow: theme.shadows.soft,
                background: theme.colors.surface
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <EventAvailableIcon sx={{ fontSize: 36, color: theme.colors.primary, mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, color: theme.colors.textPrimary }}>
                    Confirmed Appointments
                  </Typography>
                  <Chip 
                    label={confirmedAppointments.length} 
                    sx={{ 
                      ml: 2,
                      bgcolor: theme.colors.primary,
                      color: 'white',
                      fontWeight: 700
                    }} 
                  />
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                  {confirmedAppointments.map((appointment) => (
                    <Grid item xs={12} md={6} lg={4} key={appointment._id}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          borderRadius: theme.borderRadius.large,
                          background: `linear-gradient(135deg, ${theme.colors.surface} 0%, #E8F5F2 100%)`,
                          border: `2px solid ${theme.colors.primary}`,
                          transition: 'all 0.3s',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 12px 40px ${theme.colors.primary}40`
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '6px',
                            background: theme.gradients.emerald
                          }
                        }}
                      >
                        <CardContent sx={{ p: 3, pt: 4 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                            <Box>
                              <Typography variant="h5" sx={{ fontWeight: 700, color: theme.colors.primary, mb: 0.5 }}>
                                {appointment.patientName}
                              </Typography>
                              <Chip 
                                icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                                label={appointment.status} 
                                size="small"
                                sx={{
                                  bgcolor: theme.colors.primary,
                                  color: 'white',
                                  fontWeight: 700,
                                  borderRadius: theme.borderRadius.small
                                }}
                              />
                            </Box>
                          </Box>
                          <Divider sx={{ mb: 2, borderColor: theme.colors.primary, opacity: 0.2 }} />
                          <Stack spacing={1.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: theme.colors.textSecondary, minWidth: 60 }}>
                                Doctor:
                              </Typography>
                              <Typography variant="body2" sx={{ color: theme.colors.textPrimary, fontWeight: 500 }}>
                                {appointment.doctorName}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: theme.colors.textSecondary, minWidth: 60 }}>
                                Dept:
                              </Typography>
                              <Typography variant="body2" sx={{ color: theme.colors.textPrimary, fontWeight: 500 }}>
                                {appointment.department}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: theme.colors.textSecondary, minWidth: 60 }}>
                                Date:
                              </Typography>
                              <Typography variant="body2" sx={{ color: theme.colors.textPrimary, fontWeight: 500 }}>
                                {new Date(appointment.date).toLocaleDateString()}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: theme.colors.textSecondary, minWidth: 60 }}>
                                Time:
                              </Typography>
                              <Typography variant="body2" sx={{ color: theme.colors.textPrimary, fontWeight: 500 }}>
                                {appointment.time}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          )}

          {/* Completed */}
          {completedAppointments.length > 0 && (
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ 
                p: 4, 
                borderRadius: theme.borderRadius.medium,
                boxShadow: theme.shadows.soft,
                background: theme.colors.surface
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <CheckCircleIcon sx={{ fontSize: 36, color: theme.colors.accent, mr: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, color: theme.colors.textPrimary }}>
                    Completed Appointments
                  </Typography>
                  <Chip 
                    label={completedAppointments.length}
                    sx={{ 
                      ml: 2,
                      bgcolor: theme.colors.accent,
                      color: theme.colors.textPrimary,
                      fontWeight: 700
                    }} 
                  />
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  {completedAppointments.map((appointment) => (
                    <Grid item xs={12} md={4} key={appointment._id}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          borderRadius: theme.borderRadius.medium,
                          borderLeft: `5px solid ${theme.colors.accent}`,
                          opacity: 0.9,
                          transition: 'all 0.3s',
                          boxShadow: theme.shadows.soft,
                          '&:hover': {
                            opacity: 1,
                            transform: 'translateY(-4px)',
                            boxShadow: theme.shadows.medium
                          }
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.colors.textPrimary }}>
                              {appointment.patientName}
                            </Typography>
                            <Chip 
                              label={appointment.status}
                              size="small"
                              sx={{
                                bgcolor: theme.colors.accent,
                                color: theme.colors.textPrimary,
                                fontWeight: 600
                              }}
                            />
                          </Box>
                          <Stack spacing={1}>
                            <Typography variant="body2"><strong>Doctor:</strong> {appointment.doctorName}</Typography>
                            <Typography variant="body2"><strong>Dept:</strong> {appointment.department}</Typography>
                            <Typography variant="body2"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          )}

          {/* Cancelled */}
          {cancelledAppointments.length > 0 && (
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ 
                p: 4, 
                borderRadius: theme.borderRadius.medium,
                bgcolor: '#FFF5F5',
                boxShadow: theme.shadows.soft
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: theme.colors.error }}>
                    Cancelled Appointments
                  </Typography>
                  <Chip 
                    label={cancelledAppointments.length}
                    sx={{ 
                      ml: 2,
                      bgcolor: theme.colors.error,
                      color: 'white',
                      fontWeight: 700
                    }} 
                  />
                </Box>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  {cancelledAppointments.map((appointment) => (
                    <Grid item xs={12} md={4} key={appointment._id}>
                      <Card 
                        elevation={0}
                        sx={{ 
                          borderRadius: theme.borderRadius.medium,
                          borderLeft: `5px solid ${theme.colors.error}`,
                          opacity: 0.8,
                          boxShadow: theme.shadows.soft
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.colors.textPrimary }}>
                              {appointment.patientName}
                            </Typography>
                            <Chip 
                              label={appointment.status}
                              size="small"
                              sx={{
                                bgcolor: theme.colors.error,
                                color: 'white',
                                fontWeight: 600
                              }}
                            />
                          </Box>
                          <Stack spacing={1}>
                            <Typography variant="body2"><strong>Doctor:</strong> {appointment.doctorName}</Typography>
                            <Typography variant="body2"><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>

        {myAppointments.length === 0 && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 8, 
              borderRadius: theme.borderRadius.large, 
              textAlign: 'center',
              background: theme.gradients.subtle,
              boxShadow: theme.shadows.soft
            }}
          >
            <LocalHospitalIcon sx={{ fontSize: 100, color: theme.colors.primary, mb: 3 }} />
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: theme.colors.textPrimary }}>
              No Appointments Yet
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: theme.colors.textSecondary, fontSize: '1.1rem' }}>
              Start your healthcare journey by booking your first appointment!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              size="large"
              sx={{ 
                borderRadius: theme.borderRadius.small,
                textTransform: 'none',
                fontWeight: 600,
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                background: theme.gradients.primary,
                boxShadow: theme.shadows.soft,
                '&:hover': {
                  background: theme.gradients.emerald,
                  boxShadow: theme.shadows.medium,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s'
              }}
            >
              Book Your First Appointment
            </Button>
          </Paper>
        )}
      </Container>

      {/* Create Appointment Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: theme.borderRadius.large,
            background: theme.colors.surface
          }
        }}
      >
        <DialogTitle sx={{ 
          background: theme.gradients.primary,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.5rem',
          fontWeight: 700,
          py: 3
        }}>
          <LocalHospitalIcon sx={{ mr: 2, fontSize: 36 }} />
          Book New Appointment
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Patient Name"
              fullWidth
              value={newAppointment.patientName}
              onChange={(e) => setNewAppointment({ ...newAppointment, patientName: e.target.value })}
              required
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={newAppointment.patientEmail}
              onChange={(e) => setNewAppointment({ ...newAppointment, patientEmail: e.target.value })}
              required
            />
            <TextField
              label="Phone"
              fullWidth
              value={newAppointment.patientPhone}
              onChange={(e) => setNewAppointment({ ...newAppointment, patientPhone: e.target.value })}
              required
            />
            <TextField
              select
              label="Department"
              fullWidth
              value={newAppointment.department}
              onChange={(e) => handleDepartmentChange(e.target.value)}
              required
            >
              {DEPARTMENTS.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Doctor Name"
              fullWidth
              value={newAppointment.doctorName}
              onChange={(e) => setNewAppointment({ ...newAppointment, doctorName: e.target.value })}
              required
              disabled={!newAppointment.department}
              helperText={!newAppointment.department ? "Please select a department first" : ""}
            >
              {getAvailableDoctors().map((doctor) => (
                <MenuItem key={doctor.name} value={doctor.name}>
                  {doctor.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              required
            />
            <TextField
              label="Time"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              required
            />
            <TextField
              label="Symptoms"
              multiline
              rows={3}
              fullWidth
              value={newAppointment.symptoms}
              onChange={(e) => setNewAppointment({ ...newAppointment, symptoms: e.target.value })}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, background: theme.colors.background }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{ 
              borderRadius: theme.borderRadius.small,
              textTransform: 'none',
              fontWeight: 600,
              color: theme.colors.textSecondary,
              '&:hover': {
                bgcolor: theme.colors.background
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateAppointment} 
            variant="contained"
            size="large"
            sx={{ 
              borderRadius: theme.borderRadius.small,
              textTransform: 'none',
              fontWeight: 600,
              px: 5,
              background: theme.gradients.primary,
              boxShadow: theme.shadows.soft,
              '&:hover': {
                background: theme.gradients.emerald,
                boxShadow: theme.shadows.medium
              }
            }}
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default User;
