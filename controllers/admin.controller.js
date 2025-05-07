const AdminService = require('../services/admin.service');
const { registerUserSchema } = require('../validations/user.validation');
const { loginAdminSchema } = require('../validations/admin.validation');

// This function handles the login of an admin
const loginAdmin = async (req, res) => {
    try {
        const { error, value } = await loginAdminSchema.validateAsync(req.body);
        if (error) {
            console.error(error);
            return res.status(400).json({ error: error.details[0].message });
        }
        const result = await AdminService.loginAdmin(req.body);
        if (result.status == true) {
            return res.status(200).json({ message: result.message, token: result.token, expiresIn: result.expiresIn });
        } else {
            return res.status(401).json({ error: result.message });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// This function retrieves the admin information
const getAdmin = async (req, res) => {
    const admin = req.admin;

    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }
    return res.status(200).json({ message: 'Admin found', admin });
}

// This function handles the registration of an agent
const registerAgent = async (req, res) => {
    try {

        if (req.admin.user.role_id !== 1) {
            console.log(req.admin)
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }

        if (req.file) {
            const identityProof = req.file.path;  // Save the file path
        } else {
            // Handle the case where the file is not uploaded
            return res.status(400).json({ error: 'Identity proof is required.' });
        }

        // Validate the user data
        const { error, value } = await registerUserSchema.validateAsync(req.body); // Await async validation
        if (error) {
            console.error(error);
            return res.status(400).json({ error: error.details[0].message });
        }

        console.log(value);
        const result = await AdminService.registerAgent({ ...req.body, identity_proof: req.file.path });
        res.status(201).json({ message: 'Agent registered successfully', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// This function handles the registration of a deliveryboy
const registerDeliveryBoy = async (req, res) => {
    try {

        if (req.admin.user.role_id !== 1) {
            console.log(req.admin)
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }

        if (req.file) {
            const identityProof = req.file.path;  // Save the file path
        } else {
            // Handle the case where the file is not uploaded
            return res.status(400).json({ error: 'Identity proof is required.' });
        }

        // Validate the user data
        const { error, value } = await registerUserSchema.validateAsync(req.body); // Await async validation
        if (error) {
            console.error(error);
            return res.status(400).json({ error: error.details[0].message });
        }

        const result = await AdminService.registerDeliveryBoy({ ...req.body, identity_proof: req.file.path });
        res.status(201).json({ message: 'Delivery Boy registered successfully', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    loginAdmin,
    getAdmin,
    registerAgent,
    registerDeliveryBoy
};