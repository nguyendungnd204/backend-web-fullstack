const { signupSchema } = require('../middlewares/validator');
const authService = require('../services/authService');
const {AppError} = require('../middlewares/errorHandler');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const {error} = signupSchema.validate({email, password});

        if(error){
            throw new AppError(error.details[0].message, 401);
        }

        const result = await authService.signup(email, password);

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: {
                user: result
            }
        });
    } catch (error) {
        next(error);
    }
}

exports.signin = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const {error} = signupSchema.validate({email, password});

        if(error){
            throw new AppError(error.details[0].message, 401);
        }

        const user = await authService.signin(email, password);

        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            verified: user.verified
        }, process.env.JWT_SECRET, {expiresIn: '1h'}
        );

        res.cookie('Authorization', 'Bearer ' + token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: process.env.NODE_ENV === 'production' ? true : false,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'strict'
        }).json({
            success: true,
            token,
            message: 'User logged in successfully'
        })

    } catch (error) {
        next(error);
        
    }
}