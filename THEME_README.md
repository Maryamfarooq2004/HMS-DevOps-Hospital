# 🏥 Hospital Management System - Premium Emerald & Peach Theme

## 🎨 Design Theme

### Color Palette
- **Primary:** Deep Emerald Green `#1B9C85`
- **Secondary:** Soft Medical Peach `#FFB085`
- **Accent:** Warm Clinical Yellow `#F9D15B`
- **Background:** Clean Off-White `#FFF8F3`
- **Surface:** Pure White `#FFFFFF`
- **Text Primary:** `#1A1A1A`
- **Text Secondary:** `#4F4F4F`

### Design Features
✨ Clean, calming, modern medical interface
✨ Rounded corners (8-24px)
✨ Soft shadows with emerald tones
✨ Smooth gradient transitions
✨ Spacious layout with generous padding
✨ Hospital-themed icons
✨ Hover effects and animations
✨ Mobile-first responsive design

## 🚀 Quick Start

```cmd
npm start
```

This will start both:
- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3000

## 🔐 Login Credentials

### Admin Account
- Username: `admin`
- Password: `123`

### User Accounts
- Username: `user1` | Password: `123`
- Username: `user2` | Password: `123`
- Username: `user3` | Password: `123`
- Username: `user4` | Password: `123`
- Username: `user5` | Password: `123`

## 📱 Features

### User Dashboard
- 📊 Statistics cards with gradient backgrounds
- ⏳ Highlighted pending appointments section
- ✅ Organized appointment sections (Pending, Confirmed, Completed, Cancelled)
- ➕ Book new appointments with department/doctor selection
- 👤 View only your own appointments

### Admin Dashboard
- 📋 View all appointments
- ✏️ Update appointment status
- 👥 Manage all users' appointments

## 🎨 Theme System

The app uses a centralized theme system located in `src/theme.js`:

```javascript
import { theme } from '../theme';

// Use predefined colors
theme.colors.primary
theme.colors.secondary

// Use gradients
theme.gradients.primary
theme.gradients.emerald
theme.gradients.peach

// Use shadows
theme.shadows.soft
theme.shadows.medium

// Use border radius
theme.borderRadius.small
theme.borderRadius.medium
```

## 📦 Tech Stack

- **Frontend:** React 19.2.3 with Material-UI 7.3.6
- **Backend:** Express.js 5.2.1
- **Database:** MongoDB with Mongoose 9.0.1
- **Authentication:** JWT with bcryptjs
- **Styling:** Material-UI + Custom Theme System

## 🎭 UI Components

### Statistics Cards
- Total Appointments (Emerald gradient)
- Pending (Peach gradient)
- Confirmed (Primary gradient)
- Completed (Warm gradient)

### Appointment Cards
- Soft shadows and hover effects
- Color-coded left borders
- Status badges with theme colors
- Smooth transitions

### Forms & Dialogs
- Gradient headers
- Rounded inputs with emerald focus
- Large, accessible buttons
- Clean spacing

## 🌟 Design Philosophy

The theme creates a **warm, welcoming hospital environment** that:
- Reduces anxiety with soft, calming colors
- Maintains professionalism with clean layouts
- Improves usability with clear visual hierarchy
- Enhances accessibility with high contrast
- Provides smooth, delightful interactions

---

Made with 💚 using Emerald & Peach Theme
