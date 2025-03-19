const pool = require('../db');
const { AppError } = require('../middlewares/errorHandler');
const { doHash } = require('../utils/hashing');
class AuthService {

    async signup(email, password){
        const existingUser = await pool.query('select * from users where email = $1', [email]);

        if(existingUser.rows.length > 0){
            throw new AppError('User already exists!', 401);
        }
        const hashedPassword = await doHash(password, 12);
        const newUser = await pool.query('insert into users (email, password) values ($1, $2) returning *', [email, hashedPassword]);
        return newUser.rows[0];
    }
}
module.exports = new AuthService();