# Hospital Appointment Management System - Final Structure

## ✅ Clean Project Structure

### Frontend Files (src/)
```
src/
├── App.js                        # Main app router (.js)
├── index.js                      # React entry point (.js)
├── App.css                       # App styles
├── index.css                     # Global styles
├── components/
│   └── ProtectedRoute.js        # Route protection logic (.js)
├── context/
│   └── AuthContext.js           # Authentication context (.js)
├── pages/                       # UI Components (.jsx)
│   ├── Login.jsx                # Login UI component
│   ├── Appointments.jsx         # Appointments UI component
│   └── Admin.jsx                # Admin UI component
└── services/
    └── api.js                   # API service (.js)
```

### Backend Files (server/)
```
server/
├── server.js                    # Express server
├── seed.js                      # Database seeder
├── .env                         # Environment variables
├── models/
│   ├── User.js                  # User model
│   └── Appointment.js           # Appointment model
└── routes/
    ├── auth.js                  # Auth routes
    └── appointments.js          # Appointment routes
```

## File Type Convention

- **Route/Logic files**: `.js` (App.js, AuthContext.js, ProtectedRoute.js)
- **UI Component files**: `.jsx` (Login.jsx, Appointments.jsx, Admin.jsx)
- **Service files**: `.js` (api.js)

## Routes

- `/login` - Login page
- `/appointments` - View appointments (protected)
- `/admin` - Admin dashboard (admin only)

## Quick Start

1. **Seed database:**
   ```bash
   npm run seed
   ```

2. **Start backend (Terminal 1):**
   ```bash
   npm run server
   ```

3. **Start frontend (Terminal 2):**
   ```bash
   npm start
   ```

## Credentials

- **Admin:** username: `admin`, password: `admin123`
- **User:** username: `user1`, password: `user123`

## Features

✅ JWT Authentication
✅ Protected Routes
✅ Admin-only access to /admin
✅ Material-UI components (Forms, Tables, Buttons)
✅ MongoDB database
✅ Clean file structure
