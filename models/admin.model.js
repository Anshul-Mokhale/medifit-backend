const db = require('../config/db');
const bcrypt = require('bcryptjs');


const loginAdmin = async (userData) => {
    try {
        const sql = `SELECT * FROM users WHERE email = ? `;
        const [rows] = await db.execute(sql, [userData.email]);

        if (rows.length === 0) {
            return { status: false, message: 'User not found' };
        }
        const user = rows[0];
        if (user.role_id == 1) {
            const isMatch = await bcrypt.compare(userData.password, user.password);
            if (isMatch) {
                return { status: true, message: 'Login successful', user };
            } else {
                return { status: false, message: 'Invalid password' };
            }
        } else {
            return { status: false, message: 'You are not authorized to login as admin' }
        }

    } catch (err) {
        console.error('Error logging in admin:', err);
        throw new Error('Error logging in admin');
    }
}

const getAdminById = async (userData) => {
    try {
        const sql = `SELECT * FROM users WHERE id = ? `;
        const [rows] = await db.execute(sql, [userData]);
        if (rows.length === 0) {
            return { status: false, message: 'User not found' };
        }
        const user = rows[0];
        if (user.role_id == 1) {
            return { status: true, message: 'User found', user };
        } else {
            return { status: false, message: 'You are not authorized to login as admin' }
        }
    } catch (err) {
        console.error('Error getting admin by ID:', err);
        throw new Error('Error getting admin by ID');
    }
}
module.exports = {
    loginAdmin,
    getAdminById
};