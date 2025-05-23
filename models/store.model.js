const db = require('../config/db');

const getAllItems = async () => {
    try {
        const sql = `SELECT * FROM items`;
        const [rows] = await db.execute(sql);
        if (rows.length === 0) {
            return { status: false, message: 'No items found' };
        }
        return { status: true, message: 'Items found', items: rows };
    } catch (err) {
        console.error('Error getting all items:', err);
        throw new Error('Error getting all items');
    }
}

const getItemsByCategory = async (category) => {
    try {
        const sql = `SELECT 
            items.id,
            items.item_name, 
            items.company_name, 
            items.sub_category, 
            items.created_at, 
            categories.category_name, 
            items.item_image 
        FROM items
        JOIN categories ON items.category_id = categories.id
        WHERE categories.category_name = ?`;


        const [rows] = await db.execute(sql, [category]);
        if (rows.length === 0) {
            return { status: false, message: 'No items found in this category' };
        } else {
            return { status: true, message: 'Items found in this category', items: rows };
        }
    } catch (err) {
        console.error('Error getting items by category:', err);
        throw new Error('Error getting items by category');
    }
}

const getItemById = async (id) => {
    try {
        const sql = `SELECT * FROM items WHERE id = ?`;
        const [rows] = await db.execute(sql, [id]);
        if (rows.length === 0) {
            return { status: false, message: 'No items found with this id' };
        } else {
            return { status: true, message: 'Item found', items: rows }
        }
    } catch (err) {
        console.error('Error getting items by id:', err);
        throw new Error('Error getting items by id');
    }
}

// search items by any name it will give near by matches
const searchItem = async (search) => {
    try {
        const sql = `SELECT 
                items.item_name, 
                items.company_name, 
                items.sub_category, 
                items.created_at, 
                categories.category_name, 
                items.item_image 
            FROM items
            JOIN categories ON items.category_id = categories.id
            WHERE items.sub_category LIKE ?
                OR categories.category_name LIKE ?
                OR items.item_name LIKE ?
                OR items.company_name LIKE ?
    `;
        const [rows] = await db.execute(sql, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]);
        if (rows.length === 0) {
            return { status: false, message: 'No items found' };
        }
        else {
            return { status: true, message: 'item found', items: rows }
        }
    } catch (err) {
        console.error('Error searching items:', err);
        throw new Error('Error searching items');
    }
}


module.exports = {
    getAllItems,
    getItemsByCategory,
    getItemById,
    searchItem
}