const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes'); // only if this file exists

router.get('/', (req, res) => {
    res.send('API is running...');
});

router.use('/users', userRoutes); // comment this out temporarily if user.routes.js has issues

module.exports = router;
