const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const paymentsRouter = require('./routes/payments');
const profileRouter = require('./routes/profile');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/payments', paymentsRouter);
app.use('/api/profile', profileRouter);

// Database sync
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error syncing database:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));