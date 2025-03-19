const { signupSchema } = require('../middlewares/validator');
const authService = require('../services/authService');
const {AppError} = require('../middlewares/errorHandler');

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