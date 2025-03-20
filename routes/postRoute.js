const postController = require('../controllers/postController');
const express = require('express');
const router = express.Router();
const {identifier} = require('../middlewares/identification');

router.get('/', postController.getAllPosts);
router.post('/create', identifier, postController.createPost);

module.exports = router;