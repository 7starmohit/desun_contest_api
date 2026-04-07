import { body, validationResult } from "express-validator"
export const loginValidator = [
     
    body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),

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