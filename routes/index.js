const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const adminRoutes = require('./admin.routes');
const contactRoutes = require('./contact.routes');
const storeRoutes = require('./store.routes');

router.get('/', (req, res) => {
    res.send('API is running...');
});
// including all the users routes
router.use('/users', userRoutes);
// including all the admin routes
router.use('/admin', adminRoutes);
// includiing all contact routes
router.use('/contact', contactRoutes);
// including all the store routes
router.use('/store', storeRoutes);

module.exports = router;
