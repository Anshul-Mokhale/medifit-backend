const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing
const db = require('../config/db');

const createUser = async (userData) => {
    try {
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const sql = `
            INSERT INTO users (role_id, name, email, phone, password, age, gender, blood_group, identity_proof)
            VALUES (4, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.execute(sql, [
            userData.name,
            userData.email,
            userData.phone,
            hashedPassword,  // Insert the hashed password
            userData.age,
            userData.gender,
            userData.blood_group,
            userData.identity_proof
        ]);

        return result;
    } catch (err) {
        console.error('Error creating user:', err);
        throw new Error('Error creating user');
    }
};

const loginUser = async (userData) => {
    try {
        const sql = `SELECT * FROM users WHERE email = ? `;
        const [rows] = await db.execute(sql, [userData.email]);

        if (rows.length === 0) {
            return { status: false, message: 'User not found' };
        }
        const user = rows[0];
        if (user.role_id == 4) {
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

module.exports = {
    createUser,
    loginUser
};
