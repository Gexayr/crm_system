require('dotenv').config();
const db = require('../../models');
const seedDatabase = require('./seed');

async function runSeeds() {
  try {
    console.log('Starting database sync...');
    // Sync database (this will create tables)
    await db.sequelize.sync({ force: true });
    console.log('Database synced successfully');
    
    // Run seeds
    await seedDatabase();
    
    console.log('All done!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

runSeeds(); 