const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    getAllAdmins } = require('../controllers/authController');

// Test route to view all admins (for now)
router.get('/registered', getAllAdmins);

// Register a new admin
router.post('/register', register);

// Login an admin and return JWT
router.post('/login', login);

module.exports = router;
