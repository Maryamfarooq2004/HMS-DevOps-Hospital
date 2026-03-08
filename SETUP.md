# Hospital Management System

A full-stack Hospital Management System built with React, Node.js, Express, and MongoDB.

## Features

### User Role
- Book appointments with doctor details
- View personal appointment history
- See appointment status (Pending, Confirmed, Cancelled, Completed)

### Admin Role
- View all appointments
- Update appointment status
- Add new users to the system
- Delete users and appointments
- Manage all hospital data

## Tech Stack

**Frontend:**
- React 19
- Material-UI (MUI)
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (localhost:27017)
- Mongoose
- bcryptjs for password hashing

## Database

Database Name: `HospitalManagmentSystem`
MongoDB URI: `mongodb://localhost:27017/HospitalManagmentSystem`

## Installation

1. Make sure MongoDB is running on localhost:27017

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Option 1: Run both frontend and backend together
```bash
npm run dev
```

### Option 2: Run separately

**Start Backend Server (Port 5000):**
```bash
npm run server
```

**Start Frontend (Port 3000):**
```bash
npm start
```

## Initial Setup

### Create Admin User

Before you can log in, you need to create an admin user. You can do this by:

1. Start MongoDB
2. Start the backend server: `npm run server`
3. Use a tool like Postman or curl to register an admin:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "email": "admin@hospital.com",
    "fullName": "Admin User",
    "phone": "1234567890",
    "role": "admin"
  }'
```

Or create a regular user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "user1",
    "password": "user123",
    "email": "user1@hospital.com",
    "fullName": "John Doe",
    "phone": "0987654321",
    "role": "user"
  }'
```

## Routes

- `/login` - Login page
- `/user` - User dashboard (protected, user role)
- `/admin` - Admin dashboard (protected, admin role only)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/users` - Get all users (admin)
- `DELETE /api/auth/users/:id` - Delete user (admin)

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get all appointments (admin)
- `GET /api/appointments/user/:userId` - Get user appointments
- `PATCH /api/appointments/:id/status` - Update appointment status
- `DELETE /api/appointments/:id` - Delete appointment

## Project Structure

```
hospital-managment/
├── public/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Appointment.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── appointments.js
│   ├── .env
│   └── server.js
├── src/
│   ├── components/
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── pages/
│   │   ├── Login.js
│   │   ├── User.js
│   │   └── AdminNew.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   └── index.js
└── package.json
```

## Usage

1. **Login** as admin or user
2. **User Dashboard**: Book appointments and view your appointments
3. **Admin Dashboard**: 
   - Switch between Appointments and Users tabs
   - Manage all appointments (update status, delete)
   - Add new users with specified roles
   - Delete users from the system

## Notes

- Make sure MongoDB is running before starting the application
- The backend runs on port 5000
- The frontend runs on port 3000
- CORS is enabled for local development
