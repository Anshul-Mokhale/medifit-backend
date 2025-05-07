const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const upload = require('../middleware/upload.middleware.js'); // Correct path

// user registration route
router.post('/register', upload('single'), UserController.register);
// user login route
router.post('/login', UserController.loginUser)

module.exports = router;
