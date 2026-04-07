export const checkrole = async(req,res,next)=>{
    
    
    if (req.user.role =="student") {
      return res.status(403).json({ message: "only admins can access this" });
    }
    next();
};
