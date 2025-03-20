const postService = require('../services/postService');
const { postSchema } = require('../middlewares/validator');
const { AppError } = require('../middlewares/errorHandler');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await postService.getPosts();

        res.status(200).json({
            success: true,
            message: 'Get all posts successfully',
            data: posts
        })
    } catch (error) {
        next(error);
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const {title, description} = req.body;
        const {userId} = req.user;
        const {error} = postSchema.validate({title, description, userId});

        if(error){
            throw new AppError(error.details[0].message, 400);
        }

        const post = await postService.createPost(title, description, userId);
        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: post,
          });
    } catch (error) {
        next(error);
    }
}