const { body, validationResult } = require('express-validator');

const validations = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('The name field is required'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('The email field is required')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('The password field is required.')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.'),

  body('confirm_password')
    .trim()
    .notEmpty()
    .withMessage('The confirm password field is required.')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('The confirm password must be same with the password.')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (! errors.isEmpty()) {
    req.flash('error', errors.array().map(err => err.msg));
    return res.redirect('/register');
  }

  next();
};

module.exports = {
  registerValidator: [validations, validate]
};