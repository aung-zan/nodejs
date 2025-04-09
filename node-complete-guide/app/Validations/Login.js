const { body, validationResult } = require('express-validator');

const validations = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('The email field is required.')
    .bail()
    .isEmail()
    .withMessage('Please enter a valid email address.'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('The password field is required.')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (! errors.isEmpty()) {
    req.flash('error', errors.array().map(err => err.msg));
    return res.redirect('/login');
  }
  next();
}

module.exports = {
  loginValidator: [validations, validate]
};