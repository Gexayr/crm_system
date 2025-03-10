const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { User, Customer, Lead, Activity, Payment } = require('../../models');

async function seedDatabase() {
  try {
    console.log('Starting to seed database...');

    // Create admin user
    const adminUser = await User.create({
      id: uuidv4(),
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
      isActive: true
    });

    console.log('Admin user created:', adminUser.email);

    // Create sales user
    const salesUser = await User.create({
      id: uuidv4(),
      name: 'Sales User',
      email: 'sales@example.com',
      password: await bcrypt.hash('sales123', 10),
      role: 'sales',
      isActive: true
    });

    console.log('Sales user created:', salesUser.email);

    // Create customers
    const customers = await Customer.bulkCreate([
      {
        id: uuidv4(),
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '+1234567890',
        company: 'Acme Corp',
        status: 'active',
        customerSource: 'referral',
        totalRevenue: 50000
      },
      {
        id: uuidv4(),
        name: 'TechStart Inc',
        email: 'info@techstart.com',
        phone: '+1987654321',
        company: 'TechStart',
        status: 'active',
        customerSource: 'website',
        totalRevenue: 75000
      }
    ]);

    console.log('Customers created:', customers.length);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

module.exports = seedDatabase; 