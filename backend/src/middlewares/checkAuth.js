import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const checkauth =async(req,res,next)=>{
    try{

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(401).json({
                message:"unothorized request"
            });
        }

        const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedtoken?.id).select("-password -refreshToken");

        if(!user){
            return res.status(404).json({
                message:"invalid access token"
            });
        }

        req.user = user;

        next();

    }catch(err){

        return res.status(501).json({
            message:"something went wrong in user checking",
            err
        });

    }
}