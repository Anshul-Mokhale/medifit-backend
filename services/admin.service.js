const AdminModel = require('../models/admin.model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const loginAdmin = async (userData) => {
    const result = await AdminModel.loginAdmin(userData);

    if (result.status === true && result.user) {
        const token = jwt.sign(
            {
                id: result.user.id,
                role: 'admin'
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        result.token = token;
        result.expiresIn = JWT_EXPIRES_IN; // Optional
    }

    return result;
};

module.exports = {
    loginAdmin
};