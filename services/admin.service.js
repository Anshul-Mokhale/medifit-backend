const AdminModel = require('../models/admin.model');
const AgentModel = require('../models/agent.model');
const DeliveryModel = require('../models/delivery.model');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
// created this function for admin login and generating the jwt token for verification
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

// created this function for agent registration
const registerAgent = async (userData) => {
    const result = await AgentModel.createAgent(userData);
    return result;
}
// created this function for deliveryboy registration
const registerDeliveryBoy = async (userData) => {
    const result = await DeliveryModel.createDeliveryBoy(userData);
    return result;
}
module.exports = {
    loginAdmin,
    registerAgent,
    registerDeliveryBoy
};