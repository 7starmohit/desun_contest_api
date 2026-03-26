import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:["student","Admin"],
        default:"student"
    },
    
    refreshToken:{
        type:String
    },
    resetEmailToken:{
        type:String
    },
    resetEmailExpirey:{
        type:Date
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordExpirey:{
        type:String
    }
},{
    timestamps:true
});

const User = mongoose.model("User",userSchema);

export default User;