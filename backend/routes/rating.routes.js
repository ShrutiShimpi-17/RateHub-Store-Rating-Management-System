const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controller');
const { verifyToken, hasRole } = require('../middlewares/auth.middleware');
const { validateRatingInput } = require('../validators/rating.validator');

// Submit/update rating (USER role only)
router.post('/', verifyToken, hasRole(['USER']), validateRatingInput, ratingController.submitOrUpdateRating);

// View ratings of a store (All authenticated roles)
router.get('/store/:storeId', verifyToken, ratingController.getStoreRatings);

// View store owner analytics & ratings list (STORE_OWNER role only)
router.get('/owner', verifyToken, hasRole(['STORE_OWNER']), ratingController.getOwnerStoreData);

module.exports = router;
