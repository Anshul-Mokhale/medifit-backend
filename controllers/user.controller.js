const UserService = require('../services/user.service');
const { registerUserSchema } = require('../validations/user.validation'); // Correct import
const { loginUserSchema } = require('../validations/user.validation');

// this function handles user login
const loginUser = async (req, res) => {
    try {
        const { error, value } = await loginUserSchema.validateAsync(req.body);
        if (error) {
            console.error(error);
            return res.status(400).json({ error: error.details[0].message });
        }
        const result = await UserService.loginUser(req.body);
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

// this function handles user registration
const register = async (req, res) => {
    try {
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
        const result = await UserService.registerUser({ ...req.body, identity_proof: req.file.path });
        res.status(201).json({ message: 'User registered successfully', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    register,
    loginUser
};
