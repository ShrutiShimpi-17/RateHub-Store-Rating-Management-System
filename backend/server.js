const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { initializeDatabase, sequelize } = require('./config/db.config');
const { User, Store, Rating } = require('./models');
const errorHandler = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const storeRoutes = require('./routes/store.routes');
const ratingRoutes = require('./routes/rating.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing
app.use(cors({
  origin: '*', // Allows all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ success: true, message: 'RateHub API is running' });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);

// Fallback Route for Undefined Enpoints
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.url}`
  });
});

// Centralized error handler middleware
app.use(errorHandler);

// Database Seeding Logic (Idempotent setup)
const seedDatabase = async () => {
  try {
    // 1. Admin Account
    const adminEmail = 'admin@ratehub.com';
    const [admin, adminCreated] = await User.findOrCreate({
      where: { email: adminEmail },
      defaults: {
        name: 'Administrator Account',
        email: adminEmail,
        password: await bcrypt.hash('Admin@1234', 10),
        role: 'ADMIN',
        address: 'System Admin Headquarters'
      }
    });
    if (adminCreated) {
      console.log('Seeded Admin: admin@ratehub.com / Admin@1234');
    }

    // 2. Store Owner Account
    const ownerEmail = 'owner@ratehub.com';
    const [owner, ownerCreated] = await User.findOrCreate({
      where: { email: ownerEmail },
      defaults: {
        name: 'Store Owner Demo Account',
        email: ownerEmail,
        password: await bcrypt.hash('Owner@1234', 10),
        role: 'STORE_OWNER',
        address: '123 Business Road, Suite A'
      }
    });
    if (ownerCreated) {
      console.log('Seeded Store Owner: owner@ratehub.com / Owner@1234');
    }

    // 3. User Account
    const userEmail = 'user@ratehub.com';
    const [user, userCreated] = await User.findOrCreate({
      where: { email: userEmail },
      defaults: {
        name: 'Jane Regular Customer',
        email: userEmail,
        password: await bcrypt.hash('User@1234', 10),
        role: 'USER',
        address: '456 Customer Avenue'
      }
    });
    if (userCreated) {
      console.log('Seeded User: user@ratehub.com / User@1234');
    }

    // 4. Sample Stores
    const [store1, store1Created] = await Store.findOrCreate({
      where: { name: 'Tech Emporium' },
      defaults: {
        name: 'Tech Emporium',
        address: '789 Silicon Valley Blvd, California',
        ownerId: owner.id
      }
    });
    if (store1Created) {
      console.log('Seeded store: Tech Emporium');
    }

    const [store2, store2Created] = await Store.findOrCreate({
      where: { name: 'Green Grocers & Co' },
      defaults: {
        name: 'Green Grocers & Co',
        address: '321 Organic Lane, Portland',
        ownerId: owner.id
      }
    });
    if (store2Created) {
      console.log('Seeded store: Green Grocers & Co');
    }

    // 5. Sample Rating
    const ratingCount = await Rating.count({
      where: { userId: user.id, storeId: store1.id }
    });
    if (ratingCount === 0) {
      await Rating.create({
        userId: user.id,
        storeId: store1.id,
        rating: 4
      });
      console.log('Seeded sample store rating.');
    }
  } catch (error) {
    console.error('Error during database seeding:', error.message);
  }
};

// Start Server Bootloader
const startServer = async () => {
  // 1. Ensure Database database exists
  await initializeDatabase();

  // 2. Authenticate and Sync
  try {
    await sequelize.authenticate();
    console.log('Sequelize successfully connected to MySQL server.');

    // Synchronize structures
    await sequelize.sync({ force: false });
    console.log('MySQL Database synchronized successfully.');

    // 3. Seed accounts if table is empty
    await seedDatabase();

    // 4. Listen
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
    });
  } catch (error) {
    console.error('Unable to establish connection to database:', error.message);
    process.exit(1);
  }
};

startServer();
