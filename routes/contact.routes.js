const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contact.controller')

router.post('/contact-request', ContactController.contactRequest);

module.exports = router;