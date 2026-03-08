import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';
import { theme } from '../theme';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({ username, password });
      const userData = response.data.user;
      
      login(userData);
      
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: theme.gradients.subtle,
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
      <Container component="main" maxWidth="sm">
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, sm: 5 },
            borderRadius: theme.borderRadius.large,
            boxShadow: theme.shadows.medium,
            background: theme.colors.surface
          }}
        >
          {/* Header with Hospital Icon */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                margin: '0 auto',
                mb: 2,
                background: theme.gradients.primary,
                boxShadow: theme.shadows.soft
              }}
            >
              <LocalHospitalIcon sx={{ fontSize: 48 }} />
            </Avatar>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700, 
                color: theme.colors.primary,
                mb: 1
              }}
            >
              Hospital Management
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.colors.textSecondary,
                fontWeight: 500
              }}
            >
              Welcome Back! Please login to continue
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                borderRadius: theme.borderRadius.small,
                '& .MuiAlert-icon': {
                  color: theme.colors.error
                }
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: theme.borderRadius.small,
                  '&.Mui-focused fieldset': {
                    borderColor: theme.colors.primary,
                    borderWidth: 2
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.colors.primary
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: theme.borderRadius.small,
                  '&.Mui-focused fieldset': {
                    borderColor: theme.colors.primary,
                    borderWidth: 2
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.colors.primary
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                py: 1.5,
                borderRadius: theme.borderRadius.small,
                background: theme.gradients.primary,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: theme.shadows.soft,
                '&:hover': {
                  background: theme.gradients.emerald,
                  boxShadow: theme.shadows.medium
                },
                '&:disabled': {
                  background: theme.colors.textSecondary
                }
              }}
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </Button>

            {/* Demo Credentials */}
            <Box sx={{ mt: 3, p: 2, background: theme.colors.background, borderRadius: theme.borderRadius.small }}>
              <Typography variant="caption" sx={{ color: theme.colors.textSecondary, display: 'block', mb: 1, fontWeight: 600 }}>
                Demo Credentials:
              </Typography>
              <Typography variant="caption" sx={{ color: theme.colors.textSecondary, display: 'block' }}>
                Admin: admin / 123
              </Typography>
              <Typography variant="caption" sx={{ color: theme.colors.textSecondary, display: 'block' }}>
                User: user1 / 123
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
