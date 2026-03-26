
import {body,validationResult} from 'express-validator';

const validateSubmission = [
  
  body('contestId').isMongoId().withMessage('Invalid Contest ID'),
  body('submissionType').isIn(['MERN', 'UI/UX']).withMessage('Invalid Submission Type'),

  
  body('mernData.gitRepoUrl')
    .if(body('submissionType').equals('MERN')) 
    .trim()
    .notEmpty().withMessage('GitHub Repo URL is required for MERN stack')
    .isURL().withMessage('Please enter a valid URL')
    .matches(/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/)
    .withMessage('Only valid GitHub repository links are allowed!'),

  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array().map(err => ({ field: err.path, message: err.msg })) 
      });
    }
    next();
  }
];
