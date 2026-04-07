import crypto from "crypto"
import User from "../models/user.js";
import nodemailer from 'nodemailer';

dotenv.config();

export const forgotPassword = async (req,res)=>{


    try {

    const {email} = req.body;
    if(!email){
        return next(new apiError(409,"email is required please enter"));
    }

    const user = await User.findOne({email});

    if(!user){
        return next(new apiError(404,"user not exists.."));
    }
    
    const token = crypto.randomBytes(32).toString("hex");

    user.resetEmailToken = crypto.createHash("sha256").update(token).digest("hex");
    user.resetEmailExpirey  = Date.now() + 5*60*1000;

    await user.save();


    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const message = `

     <h4>password reset </h4>
     <p>click this link to reset password</p>

     <a href="${resetLink}">${resetLink}</a>
    `;
     
    const transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
              user: process.env.MAILTRAP_USERNAME, 
              pass: process.env.MAILTRAP_PASSKEY_MOHIT, 
            },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'to confirm registration',
        text: message,
      };


      await transporter.sendMail(mailOptions);





    

    return res.status(201).json(
        new apiResponse(201,user,"reset passoword link to your email sucessefully")
    );

        
    } catch (error) {


        return res.status(500).json({
            message:"we cant send you a email right now...",
            error
        });
        
    }
    

}


