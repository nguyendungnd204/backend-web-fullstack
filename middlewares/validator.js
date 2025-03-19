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
})