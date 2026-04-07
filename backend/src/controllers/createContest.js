import { Contest } from "../models/contest.js";


export const createcontest = async(req,res)=>{


    try{

        const{title,description,category,startDate,deadline,contestlevel,prizePool} = req.body;
    
    
    if (!title || !description || !category || !startDate || !deadline || !contestlevel|| !prizePool) {
      return res.status(400).json({ 
        success: false, 
        message: "please filled the required fields" 
      });
    }

   
    

    
    const newContest = await Contest.create({
      title,
      description,
      category,
      startDate,
      deadline,
      contestlevel,
      prizePool
    });

    
    res.status(201).json({
      success: true,
      message: "we have created the contest",
      data: newContest
    });

    }
    

   catch (error) {
    

    res.status(500).json({ 
      success: false, 
      message: "cant create the contest", 
      error: error.message 
    });
  }


}