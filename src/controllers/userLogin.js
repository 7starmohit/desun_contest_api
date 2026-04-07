import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import User from "../models/user"

const generateAccessAndRefreshToken = async(userId) =>{
    try {
        const user = await User.findById(userId)

        const accessToken =  user.generateAccessToken()
        const refreshToken =  user.generateRefreshToken()
     
        await user.save({validateBeforeSave: false})

        return {accessToken,refreshToken}
    } catch (error) {
       return res.status(500).json({
        message:"got an error in generating acces and refresh tokens"
       });
    }
}


export const loginUser = async(req,res) =>{
   
    const {email,password} = req.body
    if(!email || !password){
        return res.status(404).json({
            message:"all fields are required"
        });
        
    }
     

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({
            message:"user not found"
        });
    }

    const validPassword = await user.isPasswordCorrect(password)
    
    if(!validPassword){
        return res.status(401).json({
            message:"either email or password is invalid"
        });
    }


 const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

const logInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true
    }
    
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({
        message:"sucessefully logged in"
    });
}




