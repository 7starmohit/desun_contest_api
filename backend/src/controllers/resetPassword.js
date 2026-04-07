import crypto from "crypto";
import User from "../models/user.js";
export const resetPassword = async(req,res)=>{
    try {

    const {password}  = req.body;
    const {token} = req.params;

    console.log("welcome to reset password>>");

    if(!password || ! token){
        return next(new apiError(400,"cant recived the data"));
    }

    const hashedtoken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        resetEmailToken:hashedtoken,
        resetEmailExpirey:{
            $gt: Date.now()
        }
    });

    if(!user){
        return next(apiError(404,"token got expired..."));
    }

    user.password = password;
    user.resetEmailToken = undefined;
    user.resetEmailExpirey = undefined;

    await user.save({
        validateBeforeSave:false
    });

    return res.status(200).json(
        new apiResponse(200,user,"sucesefully password reset")
    );
        
    } catch (error) {

        return res.status(500).json({
            message:"we cant reset the password sorry..",
            error
        });
        
    }

};