const storeModel = require('../models/store.model');

// This function retrieves all items from the store
const getAllItems = async () => {
    const result = await storeModel.getAllItems();
    return result;
}
// This function retrieves items from the store by category
const getItemByCategory = async (userdata) => {
    const result = await storeModel.getItemsByCategory(userdata);
    return result;
}
// This function retrieves an item from the store by id
const getItemById = async (id) => {
    const result = await storeModel.getItemById(id);
    return result;
}

// This function searches for items in the store based on a search term
const searchItem = async (search) => {
    const result = await storeModel.searchItem(search);
    return result;
}

module.exports = {
    getAllItems,
    getItemByCategory,
    getItemById,
    searchItem
}