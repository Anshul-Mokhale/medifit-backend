const AdminService = require('../services/admin.service');

const { loginAdminSchema } = require('../validations/admin.validation');

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

const getAdmin = async (req, res) => {
    const admin = req.admin;

    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }
    return res.status(200).json({ message: 'Admin found', admin });
}

module.exports = {
    loginAdmin,
    getAdmin
};