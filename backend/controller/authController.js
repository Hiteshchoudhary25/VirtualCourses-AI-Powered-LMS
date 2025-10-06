import validator from 'validator';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import genToken from '../config/token.js';

export const signUp = async (req, res) => {
    try {
        const {name , email , password , role} = req.body;
        let existUser = await User.findOne({email});
        if(existUser) return res.status(400).json({message : "User already exist"});
        if(!validator.isEmail(email)) return res.status(400).json({message : "Invalid email"});
        if(!validator.isStrongPassword(password)) return res.status(400).json({message : "Password is not strong"});
        
        if(password.length < 6) return res.status(400).json({message : "Password must be at least 6 characters long"});
        if(!name) return res.status(400).json({message : "Name is required"});
        if(!role) return res.status(400).json({message : "Role is required"});

        let hashedPassword = await bcrypt.hash(password , 10);
        let newUser = new User({name , email , password : hashedPassword , role});

        let token = genToken(newUser._id);

        req.cookie('token' , token , {
            httpOnly : true,
            secure : false,
            sameSite : 'Strict',
            maxAge : 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).json(newUser);
        // await newUser.save();
    } catch (error) {
        return res.status(500).json({message : `Sign up failed ${error.message}`});
    }
}