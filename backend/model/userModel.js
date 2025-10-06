import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        enum:['student','educator'],
        default:'student',
        required:true,
    },
    photoUrl:{
        type:String,
        default:"",
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
        }
    ],
} , {timeStamps: true});

const User = mongoose.model('User', userSchema);

export default User;