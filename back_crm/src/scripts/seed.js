require('dotenv').config();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require('../models');

async function seedDatabase() {
  try {
    // Sync database with force option to recreate tables
    await db.sequelize.sync({ force: true });
    console.log('Database synced');

    // Create admin user
    const adminUser = await db.User.create({
      id: uuidv4(),
      name: 'Admin User',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
      isActive: true
    });
    console.log('Admin user created');

    // Create sales user
    const salesUser = await db.User.create({
      id: uuidv4(),
      name: 'Sales User',
      email: 'sales@example.com',
      password: await bcrypt.hash('sales123', 10),
      role: 'sales',
      isActive: true
    });
    console.log('Sales user created');

    // Create customers
    const customers = await db.Customer.bulkCreate([
      {
        id: uuidv4(),
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '+1234567890',
        company: 'Acme Corp',
        status: 'active',
        notes: 'Key customer in technology sector',
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
        notes: 'Startup with high growth potential',
        customerSource: 'website',
        totalRevenue: 75000
      },
      {
        id: uuidv4(),
        name: 'Global Solutions',
        email: 'contact@globalsolutions.com',
        phone: '+1122334455',
        company: 'Global Solutions Ltd',
        status: 'active',
        notes: 'Enterprise client',
        customerSource: 'conference',
        totalRevenue: 100000
      }
    ]);
    console.log('Customers created');

    // Create leads
    const leads = await db.Lead.bulkCreate([
      {
        id: uuidv4(),
        title: 'Enterprise Software Implementation',
        description: 'Full CRM implementation project',
        status: 'new',
        value: 50000,
        priority: 'high',
        customerId: customers[0].id,
        assignedTo: salesUser.id,
        source: 'website',
        score: 85
      },
      {
        id: uuidv4(),
        title: 'Cloud Migration Project',
        description: 'AWS cloud migration services',
        status: 'qualified',
        value: 75000,
        priority: 'medium',
        customerId: customers[1].id,
        assignedTo: salesUser.id,
        source: 'referral',
        score: 90
      }
    ]);
    console.log('Leads created');

    // Create activities
    await db.Activity.bulkCreate([
      {
        id: uuidv4(),
        type: 'call',
        subject: 'Initial Contact',
        description: 'First call with customer',
        status: 'completed',
        priority: 'high',
        userId: salesUser.id,
        customerId: customers[0].id,
        leadId: leads[0].id
      },
      {
        id: uuidv4(),
        type: 'meeting',
        subject: 'Project Discussion',
        description: 'Discuss project requirements',
        status: 'pending',
        priority: 'medium',
        userId: salesUser.id,
        customerId: customers[1].id,
        leadId: leads[1].id
      },
      {
        id: uuidv4(),
        type: 'email',
        subject: 'Proposal Follow-up',
        description: 'Follow up on sent proposal',
        status: 'pending',
        priority: 'high',
        userId: salesUser.id,
        customerId: customers[2].id
      }
    ]);
    console.log('Activities created');

    // Create payments
    await db.Payment.bulkCreate([
      {
        id: uuidv4(),
        amount: 10000,
        currency: 'USD',
        status: 'completed',
        paymentMethod: 'credit_card',
        customerId: customers[0].id,
        transactionId: 'txn_' + uuidv4(),
        paymentDate: new Date(),
        description: 'Initial payment for services'
      },
      {
        id: uuidv4(),
        amount: 15000,
        currency: 'USD',
        status: 'pending',
        paymentMethod: 'bank_transfer',
        customerId: customers[1].id,
        transactionId: 'txn_' + uuidv4(),
        paymentDate: new Date(),
        description: 'Monthly service payment'
      }
    ]);
    console.log('Payments created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 