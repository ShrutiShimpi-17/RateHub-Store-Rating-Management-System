const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const ratingController = require('../controllers/rating.controller');
const { verifyToken, hasRole } = require('../middlewares/auth.middleware');
const { validateRegistration } = require('../validators/auth.validator');
const { validateStoreInput } = require('../validators/store.validator');

// All routes here require ADMIN role
router.use(verifyToken);
router.use(hasRole(['ADMIN']));

// Dashboard metrics
router.get('/stats', adminController.getDashboardStats);

// User management
router.post('/users', validateRegistration, adminController.addUser);
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserDetails);

// Store management
router.post('/stores', validateStoreInput, adminController.addStore);
router.get('/stores', adminController.getStores);
router.get('/stores/:storeId/ratings', ratingController.getStoreRatings);

module.exports = router;
