const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const adminVerify = require('../middleware/adminVerify.middleware');

router.post('/admin-login', AdminController.loginAdmin);
router.post('/get-admin', adminVerify, AdminController.getAdmin)

module.exports = router;