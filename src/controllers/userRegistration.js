import User from "../models/user.js";
import bcrypt from 'bcrypt';

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

    const hashedpassword = await bcrypt.hash(password);
    const user = new User({
      name,
      email,
      password:hashedpassword,
      phone,
      role,
    });

    await user.save();

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