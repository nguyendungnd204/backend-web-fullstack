const joi = require('joi');

exports.signupSchema = joi.object({
    email: joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds: {allow: ['com', 'net']},
        })
        .messages({
            'string.min': 'Username phải có ít nhất 3 ký tự',
            'string.max': 'Username không được vượt quá 30 ký tự',
            'any.required': 'Username là bắt buộc',
        }),
    password: joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
        .messages({
            'string.pattern.base': 'Password phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số',
            'any.required': 'Password là bắt buộc',
        }),
});

exports.postSchema = joi.object({
    title: joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': 'Title phải có ít nhất 3 ký tự',
            'string.max': 'Title không được vượt quá 100 ký tự',
            'any.required': 'Title là bắt buộc',
        }),
    description: joi.string()
        .min(10)
        .max(500)
        .required()
        .messages({
            'string.min': 'Description phải có ít nhất 10 ký tự',
            'string.max': 'Description không được vượt quá 500 ký tự',
            'any.required': 'Description là bắt buộc',
        }),
    userId: joi.number()
        .integer()
        .required()
        .messages({
            'any.required': 'UserId is required',
        }),
})