const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        ufname: Joi.string().min(3).max(40).required().messages({
            'string.empty': 'First name is required.',
            'string.min': 'First name must be at least 3 characters long.',
            'string.max': 'First name must be at most 40 characters long.',
        }),
        ulname: Joi.string().min(3).max(40).required().messages({
            'string.empty': 'Last name is required.',
            'string.min': 'Last name must be at least 3 characters long.',
            'string.max': 'Last name must be at most 40 characters long.',
        }),
        uemail: Joi.string().email().required().messages({
            'string.email': 'A valid email address is required.',
        }),
        uphone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
            'string.pattern.base': 'Phone number must be of 10 digits.',
        }),
        upass: Joi.string().min(8).max(20).required().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])')).messages({
            'string.min': 'Password must be at least 8 characters long.',
            'string.max': 'Password must be at most 20 characters long.',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!@#$%^&*).',
        }),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json( { message : "Bad Request", error });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        uemail: Joi.string().email().required().messages({
            'string.email': 'A valid email address is required.',
        }),
        upass: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Bad Requestt", error });
    }
    next();
};

module.exports = { 
    signupValidation,
    loginValidation 
};
