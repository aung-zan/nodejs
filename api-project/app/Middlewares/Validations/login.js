const { body, validationResult } = require('express-validator');

const rules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('The email field is required.')
    .bail()
    .isEmail()
    .withMessage('The value is not in email format.'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('The password field is required.')
    .bail()
    .isLength({ min: 8 })
    .withMessage('The password must be 8 characters long.'),
];

const afterValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (! errors.isEmpty()) {
    const errorsObj = {};
    errors.array().map(err => errorsObj[err.path] = err.msg);

    return res.status(422).json(errorsObj);
  }

  next();
}

module.exports = { validator: [rules, afterValidation] };