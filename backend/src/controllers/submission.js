import Submission from "../models/submission.js";
import cloudinary from "../config/cloudinary.js";
import fs from 'fs';

export const createSubmission = async (req, res) => {
  try {
    const { contestId, submissionType, gitRepoUrl, liveLink, feedback } = req.body;
    const userId = req.user.id;

    
    const existingSubmission = await Submission.findOne({ contestId, userId });
    if (existingSubmission) {
      if (req.files) req.files.forEach(file => fs.unlinkSync(file.path));
      return res.status(400).json({ message: "You have already submitted." });
    }

    let submissionData = { contestId, userId, submissionType, feedback };

    if (submissionType === 'MERN') {
      submissionData.mernData = { gitRepoUrl, liveLink };
    }

    
    if (submissionType === 'UI/UX') {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Upload files first." });
      }

      const uploadedFilesArray = [];

      
      for (const file of req.files) {
        
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'contest_submissions',
        });

       
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }

        
        uploadedFilesArray.push({
          url: result.secure_url,
          publicId: result.public_id,
          fileType: file.mimetype
        });
      }

      submissionData.uiUxData = { files: uploadedFilesArray };
    }

    
    const newSubmission = await Submission.create(submissionData);
    res.status(201).json({ success: true, data: newSubmission });

  } catch (error) {
    
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      });
    }
    res.status(500).json({ message: error.message });
  }
};
