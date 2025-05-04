const { body, validationResult } = require('express-validator');
const User = require('../../Models/User');

const rules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('The name field is required.'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('The email field is required.')
    .bail()
    .isEmail()
    .withMessage('The value is not in email format.')
    .bail()
    .custom(async (email, { req }) => {
      const userId = req.params?.userId;
      const user = await User.findOne({ email: email });

      if (! user) return true;

      if (userId && user._id.equals(userId)) return true;

      throw new Error('E-mail already in use.');
    }),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('The password field is required.')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
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