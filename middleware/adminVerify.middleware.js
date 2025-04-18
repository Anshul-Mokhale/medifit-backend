const jwt = require('jsonwebtoken');
const AdminModel = require('../models/admin.model');

const JWT_SECRET = process.env.JWT_SECRET;

const adminVerify = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1].trim();
        const decoded = jwt.verify(token, JWT_SECRET);

        // Log decoded token to confirm it contains ID and role
        console.log('Decoded JWT:', decoded);

        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }

        // Check if decoded.id is valid
        if (!decoded.id) {
            return res.status(400).json({ message: 'Invalid token payload: Missing admin ID.' });
        }

        // Fetch admin by ID
        const admin = await AdminModel.getAdminById(decoded.id);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        req.admin = admin;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Login again, token is expired' });
        }
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = adminVerify;
