const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require('../../src/models');
const { User, Customer, Lead, Activity, Payment } = require('../../models');

async function seedDatabase() {
  try {
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
      }
    ]);

    console.log('Customers created:', customers.length);

    // Create leads
    const leads = await Lead.bulkCreate([
      {
        id: uuidv4(),
        title: 'Enterprise Software Solution',
        description: 'Implementation of CRM system',
        status: 'new',
        value: 25000,
        priority: 'high',
        customerId: customers[0].id,
        assignedTo: salesUser.id,
        source: 'website',
        score: 80
      },
      {
        id: uuidv4(),
        title: 'Consulting Project',
        description: 'Digital transformation consulting',
        status: 'qualified',
        value: 50000,
        priority: 'medium',
        customerId: customers[1].id,
        assignedTo: salesUser.id,
        source: 'referral',
        score: 90
      }
    ]);

    console.log('Leads created:', leads.length);

    // Create activities
    const activities = await Activity.bulkCreate([
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
      }
    ]);

    console.log('Activities created:', activities.length);

    // Create payments
    const payments = await Payment.bulkCreate([
      {
        id: uuidv4(),
        amount: 10000,
        currency: 'USD',
        status: 'completed',
        paymentMethod: 'credit_card',
        customerId: customers[0].id,
        transactionId: 'txn_' + uuidv4(),
        paymentDate: new Date()
      },
      {
        id: uuidv4(),
        amount: 15000,
        currency: 'USD',
        status: 'pending',
        paymentMethod: 'bank_transfer',
        customerId: customers[1].id,
        transactionId: 'txn_' + uuidv4(),
        paymentDate: new Date()
      }
    ]);

    console.log('Payments created:', payments.length);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

module.exports = seedDatabase; 