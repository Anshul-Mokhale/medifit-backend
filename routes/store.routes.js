const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store.controller');

// Fetching all the items from the items table in database
router.get('/get-all-items', storeController.getAllItems);
// fetching the items by category from the items table in database
router.get('/get-items-by-category', storeController.getItemByCategory);
// fetching the items by id from the items table in database
router.get('/get-item-by-id', storeController.getItemById);

module.exports = router;