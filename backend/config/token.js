import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.JWT_SECRET;


const genToken = async (userId) =>{
    try {
        const token = jwt.sign({userId} , secretKey , {
            expiresIn : '7d',
        });
        console.log(token);
    } catch (error) {
        console.log(error.message);
    }
}
export default genToken;
