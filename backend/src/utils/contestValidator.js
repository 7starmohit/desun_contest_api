
    



import { body, validationResult } from 'express-validator';


export const contestValidationRules = [
body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 8 }).withMessage('Title must be at least 10 characters'),

  body('description')
    .notEmpty().withMessage('Description is required'),

  body('category')
    .isIn(['MERN', 'UI/UX', 'DIGITAL MARKETING'])
    .withMessage('please select a category'),

  body('contestlevel')
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Level must be Easy, Medium, or Hard'),

  body('startDate')
    .isISO8601().withMessage('Start date must be a valid date').toDate()
    .custom((value) => {
      if (value < new Date()) {
        throw new Error('Start date cannot be in the past');
      }
      return true;
    }),

  body('deadline')
    .isISO8601().withMessage('Deadline must be a valid date').toDate()
    .custom((value, { req }) => {
      if (value <= new Date(req.body.startDate)) {
        throw new Error('Deadline must be after the start date');
      }
      return true;
    }),

  body('prizePool')
    .optional()
    .isString().withMessage('Prize pool must be a string'),


    
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
    


]
  


