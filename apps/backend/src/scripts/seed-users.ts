import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config({ path: 'apps/backend/.env' });

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('✅ Connected to MongoDB');

    // Departments you want to seed
    const departments = ['sales', 'hr', 'it'];

    // Base users
    const baseUsers = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin',
        department: null,
      },
    ];

    // Managers per department
    const managers = departments.map((dept) => ({
      name: `${dept.toUpperCase()} Manager`,
      email: `${dept}.manager@example.com`,
      password: 'password123',
      role: 'manager',
      department: dept,
    }));

    // Staff per department (2 staff each as example)
    const staff = departments.flatMap((dept, i) => [
      {
        name: `${dept.toUpperCase()} Staff 1`,
        email: `${dept}.staff1@example.com`,
        password: 'password123',
        role: 'staff',
        department: dept,
      },
      {
        name: `${dept.toUpperCase()} Staff 2`,
        email: `${dept}.staff2@example.com`,
        password: 'password123',
        role: 'staff',
        department: dept,
      },
    ]);

    const users = [...baseUsers, ...managers, ...staff];

    for (const user of users) {
      const existing = await User.findOne({ email: user.email });
      if (existing) {
        console.log(`⚠️ User already exists: ${user.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        ...user,
        password: hashedPassword,
      });

      console.log(`✅ Created user: ${user.email} (${user.role}, dept: ${user.department ?? 'N/A'})`);
    }

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding users:', err);
    process.exit(1);
  }
}

seedUsers();
