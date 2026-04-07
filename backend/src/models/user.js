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




userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
         id: this._id   
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIREY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
         id: this._id   
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIREY
        }
    )
}

const User = mongoose.model("User",userSchema);

export default User;