const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const adminVerify = require('../middleware/adminVerify.middleware');
const upload = require('../middleware/upload.middleware');

router.post('/admin-login', AdminController.loginAdmin);
router.post('/get-admin', adminVerify, AdminController.getAdmin);
router.post('/register-agent', adminVerify, upload('single'), AdminController.registerAgent);
router.post('/register-deliveryboy', adminVerify, upload('single'), AdminController.registerDeliveryBoy);
module.exports = router;