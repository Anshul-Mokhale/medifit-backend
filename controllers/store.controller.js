const storeService = require('../services/store.service');

// this function handles the request to get all items from the items table
const getAllItems = async (req, res) => {
    try {
        const items = await storeService.getAllItems();
        if (items.status != true) {
            return res.status(404).json({ status: 404, message: items.items });
        } else {
            return res.status(200).json({ status: 200, message: items.items });
        }
    } catch (err) {
        console.error('Error in getting all items:', err);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}

// this function handles the request to get items by category
const getItemByCategory = async (req, res) => {
    try {
        const category = req.body.category || req.query.category;

        if (!category) {
            return res.status(400).json({ status: 400, message: 'Category query parameter is required' });
        }

        console.log('Category:', category);

        const items = await storeService.getItemByCategory(category);
        if (items.status != true) {
            return res.status(404).json({ status: 404, message: items.items });
        } else {
            return res.status(200).json({ status: 200, message: items.items });
        }
    } catch (err) {
        console.error('Error in getting item by category:', err);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}

// this function handles the request to get item by id
const getItemById = async (req, res) => {
    try {
        const id = req.body.id;
        if (!id) {
            return res.status(400).json({ status: 400, message: 'Id is required' });
        }
        const item = await storeService.getItemById(id);
        if (item.status != true) {
            return res.status(404).json({ status: 404, message: 'Item not found' });
        }
        else {
            return res.status(200).json({ status: 200, data: item.items });
        }
    } catch (err) {
        console.error('Error in getting item by id:', err);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}

// this function is for search any term in database in items table
const searchItem = async (req, res) => {
    try {
        const searchTerm = req.body.search || req.query.search;
        if (!searchTerm) {
            return res.status(400).json({ status: 400, message: 'Search term is required' });
        }
        const items = await storeService.searchItem(searchTerm);
        if (items.status != true) {
            return res.status(404).json({ status: 404, message: 'Item not found' });
        } else {
            return res.status(200).json({ status: 200, message: items.items });
        }
    } catch (err) {
        console.error('Error in searching item:', err);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
}

module.exports = {
    getAllItems,
    getItemByCategory,
    getItemById,
    searchItem
}