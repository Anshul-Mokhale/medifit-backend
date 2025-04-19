const db = require('../config/db');

const ContactModel = async (contactData) => {
    try {
        const sql = `INSERT INTO contact_request(name,email,phone,subject,message) 
        VALUES(?,?,?,?,?)`;
        const result = await db.query(sql, [
            contactData.name,
            contactData.email,
            contactData.phone,
            contactData.subject,
            contactData.message
        ]);
        return result;
    } catch (err) {
        console.error('Error inserting contact data:', err);
        throw err;
    }
}

module.exports = {
    ContactModel
}