import User from "../models/user.js";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const registerUser = async (req, res) =>{

    try {
    const { name, email, password, phone, role } = req.body;

    
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or phone',
      });
    }

    const hashedpassword = await bcrypt.hash(password,12);
    const user = new User({
      name,
      email,
      password:hashedpassword,
      phone,
      role,
    });

    await user.save();



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
        text: `hello ${name}, welcome to our platform , your registration is sucessefull`,
      };

      
    await transporter.sendMail(mailOptions);

    return res.status(201).json({
        message:"sucessefully registered"
    });
  }catch(err){

    console.log("the error is:",err);

    return res.status(500).json({
        message:"internal server error"
    });
  }

} 
  

export default registerUser;