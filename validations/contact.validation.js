const Joi = require('joi');

const contactSchema = Joi.object({
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
    subject: Joi.string().required().messages({
        'string.empty': 'Subject is required',
        'any.required': 'Subject is required'
    }),
    message: Joi.string().min(10).required().messages({
        'string.min': 'Message must be at least 10 characters',
        'any.required': 'Message is required'
    })
});

module.exports = {
    contactSchema
};
