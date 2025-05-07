const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contact.controller')

// implementing the contact us route for sedning mail and storeing that entry in database
router.post('/contact-request', ContactController.contactRequest);

module.exports = router;