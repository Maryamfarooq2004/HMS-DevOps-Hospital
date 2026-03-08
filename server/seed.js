const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Admin = require('./models/Admin');
const Appointment = require('./models/Appointment');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/HospitalManagmentSystem';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create admin
    const adminPassword = await bcrypt.hash('123', 10);
    const admin = new Admin({
      username: 'admin',
      password: adminPassword,
      email: 'admin@hospital.com',
      fullName: 'Admin User',
      phone: '1234567890'
    });

    // Create regular users
    const user1Password = await bcrypt.hash('123', 10);
    const user1 = new User({
      username: 'user1',
      password: user1Password,
      email: 'user1@hospital.com',
      fullName: 'Ahmed Ali',
      phone: '03001234567'
    });

    const user2Password = await bcrypt.hash('123', 10);
    const user2 = new User({
      username: 'user2',
      password: user2Password,
      email: 'user2@hospital.com',
      fullName: 'Fatima Khan',
      phone: '03012345678'
    });

    const user3Password = await bcrypt.hash('123', 10);
    const user3 = new User({
      username: 'user3',
      password: user3Password,
      email: 'user3@hospital.com',
      fullName: 'Hassan Raza',
      phone: '03023456789'
    });

    const user4Password = await bcrypt.hash('123', 10);
    const user4 = new User({
      username: 'user4',
      password: user4Password,
      email: 'user4@hospital.com',
      fullName: 'Ayesha Malik',
      phone: '03034567890'
    });

    const user5Password = await bcrypt.hash('123', 10);
    const user5 = new User({
      username: 'user5',
      password: user5Password,
      email: 'user5@hospital.com',
      fullName: 'Bilal Ahmed',
      phone: '03045678901'
    });

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      await admin.save();
      console.log('✅ Admin created: username=admin, password=123');
    } else {
      console.log('ℹ️  Admin already exists');
    }

    // Check if users exist
    const existingUser1 = await User.findOne({ username: 'user1' });
    if (!existingUser1) {
      await user1.save();
      console.log('✅ User1 created: username=user1, password=123');
    } else {
      console.log('ℹ️  User1 already exists');
    }

    const existingUser2 = await User.findOne({ username: 'user2' });
    if (!existingUser2) {
      await user2.save();
      console.log('✅ User2 created: username=user2, password=123');
    } else {
      console.log('ℹ️  User2 already exists');
    }

    const existingUser3 = await User.findOne({ username: 'user3' });
    if (!existingUser3) {
      await user3.save();
      console.log('✅ User3 created: username=user3, password=123');
    } else {
      console.log('ℹ️  User3 already exists');
    }

    const existingUser4 = await User.findOne({ username: 'user4' });
    if (!existingUser4) {
      await user4.save();
      console.log('✅ User4 created: username=user4, password=123');
    } else {
      console.log('ℹ️  User4 already exists');
    }

    const existingUser5 = await User.findOne({ username: 'user5' });
    if (!existingUser5) {
      await user5.save();
      console.log('✅ User5 created: username=user5, password=123');
    } else {
      console.log('ℹ️  User5 already exists');
    }

    // Create dummy appointments
    const appointmentsCount = await Appointment.countDocuments();
    if (appointmentsCount === 0) {
      const dummyAppointments = [
        // User 1 appointments
        {
          patientName: 'Ahmed Ali',
          patientEmail: 'ahmed@email.com',
          patientPhone: '03001234567',
          doctorName: 'Dr. Sarah Johnson',
          department: 'Cardiology',
          date: new Date('2025-12-15'),
          time: '10:00 AM',
          symptoms: 'Chest pain and shortness of breath',
          status: 'Confirmed',
          userId: existingUser1?._id || user1._id
        },
        {
          patientName: 'Ahmed Ali',
          patientEmail: 'ahmed@email.com',
          patientPhone: '03001234567',
          doctorName: 'Dr. Michael Chen',
          department: 'Neurology',
          date: new Date('2025-12-16'),
          time: '2:30 PM',
          symptoms: 'Frequent headaches',
          status: 'Pending',
          userId: existingUser1?._id || user1._id
        },
        {
          patientName: 'Ahmed Ali',
          patientEmail: 'ahmed@email.com',
          patientPhone: '03001234567',
          doctorName: 'Dr. David Kim',
          department: 'General Medicine',
          date: new Date('2025-12-17'),
          time: '11:00 AM',
          symptoms: 'Regular checkup',
          status: 'Confirmed',
          userId: existingUser1?._id || user1._id
        },
        // User 2 appointments
        {
          patientName: 'Fatima Khan',
          patientEmail: 'fatima@email.com',
          patientPhone: '03012345678',
          doctorName: 'Dr. Maria Garcia',
          department: 'Dermatology',
          date: new Date('2025-12-18'),
          time: '3:00 PM',
          symptoms: 'Skin allergy and rash',
          status: 'Confirmed',
          userId: existingUser2?._id || user2._id
        },
        {
          patientName: 'Fatima Khan',
          patientEmail: 'fatima@email.com',
          patientPhone: '03012345678',
          doctorName: 'Dr. Emily Rodriguez',
          department: 'Orthopedics',
          date: new Date('2025-12-19'),
          time: '9:30 AM',
          symptoms: 'Back pain',
          status: 'Pending',
          userId: existingUser2?._id || user2._id
        },
        // User 3 appointments
        {
          patientName: 'Hassan Raza',
          patientEmail: 'hassan@email.com',
          patientPhone: '03023456789',
          doctorName: 'Dr. James Anderson',
          department: 'Pediatrics',
          date: new Date('2025-12-20'),
          time: '1:00 PM',
          symptoms: 'Child fever and cough',
          status: 'Confirmed',
          userId: existingUser3?._id || user3._id
        },
        {
          patientName: 'Hassan Raza',
          patientEmail: 'hassan@email.com',
          patientPhone: '03023456789',
          doctorName: 'Dr. Robert Wilson',
          department: 'Ophthalmology',
          date: new Date('2025-12-21'),
          time: '10:30 AM',
          symptoms: 'Eye checkup',
          status: 'Pending',
          userId: existingUser3?._id || user3._id
        },
        // User 4 appointments
        {
          patientName: 'Ayesha Malik',
          patientEmail: 'ayesha@email.com',
          patientPhone: '03034567890',
          doctorName: 'Dr. Lisa Thompson',
          department: 'ENT',
          date: new Date('2025-12-22'),
          time: '11:00 AM',
          symptoms: 'Throat infection',
          status: 'Confirmed',
          userId: existingUser4?._id || user4._id
        },
        {
          patientName: 'Ayesha Malik',
          patientEmail: 'ayesha@email.com',
          patientPhone: '03034567890',
          doctorName: 'Dr. Sarah Johnson',
          department: 'Cardiology',
          date: new Date('2025-12-23'),
          time: '2:00 PM',
          symptoms: 'Heart checkup',
          status: 'Pending',
          userId: existingUser4?._id || user4._id
        },
        // User 5 appointments
        {
          patientName: 'Bilal Ahmed',
          patientEmail: 'bilal@email.com',
          patientPhone: '03045678901',
          doctorName: 'Dr. David Kim',
          department: 'General Medicine',
          date: new Date('2025-12-24'),
          time: '9:00 AM',
          symptoms: 'Flu symptoms',
          status: 'Confirmed',
          userId: existingUser5?._id || user5._id
        },
        {
          patientName: 'Bilal Ahmed',
          patientEmail: 'bilal@email.com',
          patientPhone: '03045678901',
          doctorName: 'Dr. Michael Chen',
          department: 'Neurology',
          date: new Date('2025-12-25'),
          time: '3:30 PM',
          symptoms: 'Migraine headaches',
          status: 'Pending',
          userId: existingUser5?._id || user5._id
        },
        // Additional appointments
        {
          patientName: 'Zainab Hassan',
          patientEmail: 'zainab@email.com',
          patientPhone: '03056789012',
          doctorName: 'Dr. Emily Rodriguez',
          department: 'Orthopedics',
          date: new Date('2025-12-26'),
          time: '10:00 AM',
          symptoms: 'Knee injury',
          status: 'Confirmed',
          userId: existingUser1?._id || user1._id
        },
        {
          patientName: 'Usman Sheikh',
          patientEmail: 'usman@email.com',
          patientPhone: '03067890123',
          doctorName: 'Dr. Robert Wilson',
          department: 'Ophthalmology',
          date: new Date('2025-12-27'),
          time: '11:30 AM',
          symptoms: 'Vision problems',
          status: 'Confirmed',
          userId: existingUser2?._id || user2._id
        },
        {
          patientName: 'Mariam Iqbal',
          patientEmail: 'mariam@email.com',
          patientPhone: '03078901234',
          doctorName: 'Dr. James Anderson',
          department: 'Pediatrics',
          date: new Date('2025-12-28'),
          time: '1:30 PM',
          symptoms: 'Child vaccination',
          status: 'Completed',
          userId: existingUser3?._id || user3._id
        },
        {
          patientName: 'Ali Raza',
          patientEmail: 'aliraza@email.com',
          patientPhone: '03089012345',
          doctorName: 'Dr. Lisa Thompson',
          department: 'ENT',
          date: new Date('2025-12-29'),
          time: '2:30 PM',
          symptoms: 'Ear pain',
          status: 'Cancelled',
          userId: existingUser4?._id || user4._id
        }
      ];

      await Appointment.insertMany(dummyAppointments);
      console.log(`✅ Dummy appointments created: ${dummyAppointments.length} appointments added`);
    } else {
      console.log('ℹ️  Appointments already exist');
    }

    console.log('\n🎉 Database seeded successfully!\n');
    console.log('You can now login with:');
    console.log('Admin: username=admin, password=123');
    console.log('User1 (Ahmed Ali): username=user1, password=123');
    console.log('User2 (Fatima Khan): username=user2, password=123');
    console.log('User3 (Hassan Raza): username=user3, password=123');
    console.log('User4 (Ayesha Malik): username=user4, password=123');
    console.log('User5 (Bilal Ahmed): username=user5, password=123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
