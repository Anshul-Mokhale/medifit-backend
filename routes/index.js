const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes'); // only if this file exists
const adminRoutes = require('./admin.routes');
const contactRoutes = require('./contact.routes');

router.get('/', (req, res) => {
    res.send('API is running...');
});

router.use('/users', userRoutes); // comment this out temporarily if user.routes.js has issues
router.use('/admin', adminRoutes);
router.use('/contact', contactRoutes)

module.exports = router;
