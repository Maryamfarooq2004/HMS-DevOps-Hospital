import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getAllUsers: () => api.get('/auth/users'),
  deleteUser: (id) => api.delete(`/auth/users/${id}`),
};

// Appointments API
export const appointmentsAPI = {
  createAppointment: (appointmentData) => api.post('/appointments', appointmentData),
  getAllAppointments: () => api.get('/appointments'),
  getUserAppointments: (userId) => api.get(`/appointments/user/${userId}`),
  updateAppointmentStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }),
  deleteAppointment: (id) => api.delete(`/appointments/${id}`),
};

export default api;
