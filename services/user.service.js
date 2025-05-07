const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
// this is the function created for user login and generating jwt token for verification
const loginUser = async (userData) => {
    const result = await UserModel.loginUser(userData);

    if (result.status === true && result.user) {
        const token = jwt.sign(
            {
                id: result.user.id,
                role: 'user'
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        result.token = token;
        result.expiresIn = JWT_EXPIRES_IN; // Optional
    }

    return result;
};
// this is the function created for user registration
const registerUser = async (data) => {
    const result = await UserModel.createUser(data);
    return result;
};

module.exports = {
    registerUser,
    loginUser
};
