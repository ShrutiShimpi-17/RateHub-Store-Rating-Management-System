const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const {
  validateRegistration,
  validateLogin,
  validatePasswordChange
} = require('../validators/auth.validator');

// Register a new user
router.post('/register', validateRegistration, authController.register);

// Login (All Roles)
router.post('/login', validateLogin, authController.login);

// Change password (Requires token)
router.put('/change-password', verifyToken, validatePasswordChange, authController.changePassword);

module.exports = router;
