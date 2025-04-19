const db = require('../config/db');
const bcrypt = require('bcryptjs');


const createDeliveryBoy = async (userData) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const sql = `
                 INSERT INTO users (role_id, name, email, phone, password, age, gender, blood_group, identity_proof)
                 VALUES (3, ?, ?, ?, ?, ?, ?, ?, ?)
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
}

module.exports = {
    createDeliveryBoy
}