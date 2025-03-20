const pool = require('../db');
const { AppError } = require('../middlewares/errorHandler');

class PostService {
    async getPosts(){
        const posts = await pool.query('select * from posts');

        if(posts.rows.length === 0){
            throw new AppError('posts is empty', 401)
        }
        return posts.rows;
    }

    async createPost(title, description, userId){
        const post = await pool.query('insert into posts (title, description, user_id) values($1, $2, $3) returning *', [title, description, userId]);
        return post.rows[0];
    }
}

module.exports = new PostService();