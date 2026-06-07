const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Routes require general authentication (USER, STORE_OWNER, ADMIN)
router.use(verifyToken);

// Fetch all stores with filters (search, pagination)
router.get('/', storeController.getStores);

// Fetch a single store by ID (reviews included)
router.get('/:id', storeController.getStoreDetails);

module.exports = router;
