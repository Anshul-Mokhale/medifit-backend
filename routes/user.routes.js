const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const upload = require('../middleware/upload.middleware.js'); // Correct path

router.post('/register', upload('single'), UserController.register);

module.exports = router;
