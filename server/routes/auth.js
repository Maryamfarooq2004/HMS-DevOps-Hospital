const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Register new user (admin only can add users)
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, fullName, phone, role } = req.body;

    // Check if user/admin exists in both collections
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    
    if (existingUser || existingAdmin) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    
    // If role is admin, save to Admin collection, otherwise save to User collection
    if (role === 'admin') {
      newUser = new Admin({
        username,
        password: hashedPassword,
        email,
        fullName,
        phone
      });
    } else {
      newUser = new User({
        username,
        password: hashedPassword,
        email,
        fullName,
        phone
      });
    }

    await newUser.save();

    res.status(201).json({ 
      message: `${role === 'admin' ? 'Admin' : 'User'} registered successfully`,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        role: role || 'user'
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);

    // Check admin collection first
    let user = await Admin.findOne({ username });
    let role = 'admin';
    console.log('Admin found:', user ? 'Yes' : 'No');

    // If not found in admin, check user collection
    if (!user) {
      user = await User.findOne({ username });
      role = 'user';
      console.log('User found:', user ? 'Yes' : 'No');
    }

    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Login failed: Invalid password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful for:', username, 'as', role);
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    // Fetch from both User and Admin collections
    const users = await User.find().select('-password');
    const admins = await Admin.find().select('-password');
    
    // Add role property and combine
    const usersWithRole = users.map(u => ({ ...u.toObject(), role: 'user' }));
    const adminsWithRole = admins.map(a => ({ ...a.toObject(), role: 'admin' }));
    
    const allUsers = [...usersWithRole, ...adminsWithRole];
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    // Try deleting from User collection first
    let deletedUser = await User.findByIdAndDelete(req.params.id);
    
    // If not found in User, try Admin collection
    if (!deletedUser) {
      deletedUser = await Admin.findByIdAndDelete(req.params.id);
    }
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;
