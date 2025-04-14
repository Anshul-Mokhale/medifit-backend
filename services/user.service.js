const UserModel = require('../models/user.model');

const registerUser = async (data) => {
    const result = await UserModel.createUser(data);
    return result;
};

module.exports = {
    registerUser
};
