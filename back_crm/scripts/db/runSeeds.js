require('dotenv').config();
const db = require('../../models');
const seedDatabase = require('./seed');

async function runSeeds() {
  try {
    console.log('Starting database sync...');
    // Sync database (this will create tables)
    await db.sequelize.sync({ force: true });
    console.log('Database synced successfully');
    
    console.log('Starting to seed database...');
    // Run seeds
    await seedDatabase();
    
    console.log('Database initialized and seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

runSeeds(); 