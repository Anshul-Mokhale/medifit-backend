const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const adminVerify = require('../middleware/adminVerify.middleware');
const upload = require('../middleware/upload.middleware');


// Admin login
router.post('/admin-login', AdminController.loginAdmin);
// adming verification testing
router.post('/get-admin', adminVerify, AdminController.getAdmin);
// register agent by admin
router.post('/register-agent', adminVerify, upload('single'), AdminController.registerAgent);
// register deliveryboy by admin
router.post('/register-deliveryboy', adminVerify, upload('single'), AdminController.registerDeliveryBoy);
module.exports = router;