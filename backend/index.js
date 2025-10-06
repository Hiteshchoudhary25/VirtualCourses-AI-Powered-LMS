import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/conectDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());


const PORT = process.env.PORT || 8000;

app.get('/',(req,res) => {
    res.send('Hello from backend');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});