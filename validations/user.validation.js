const Joi = require('joi');

// validation schema for user registration
const registerUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email',
        'any.required': 'Email is required'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Phone number must be 10 digits',
        'any.required': 'Phone number is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required'
    }),
    age: Joi.number().integer().min(18).max(99).required().messages({
        'number.base': 'Age must be a number and above 18',
        'number.required': 'Age is required'
    }),
    gender: Joi.string().required().messages({
        'string.required': 'Gender must be passed'
    }),
    blood_group: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required().messages({
        'string.valid': 'Invalid blood group',
        'any.required': 'Blood group is required'
    }),
});

// validation schema for user login
const loginUserSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required'
    })
});

module.exports = {
    registerUserSchema,
    loginUserSchema
};
