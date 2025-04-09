const { body, validationResult } = require('express-validator');

const validation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('The title field is required'),

  body('price')
    .trim()
    .notEmpty()
    .withMessage('The price field is required.')
    .isNumeric()
    .withMessage('This price field accepts only numeric value.'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('The description field is required.'),

  body('imageUrl')
    .trim()
    .notEmpty()
    .withMessage('The Image URL field is required.'),
];

const validate = (req, res, next) => {
  const error = validationResult(req);

  if (! error.isEmpty()) {
    req.flash('error', error.array().map(err => err.msg));
    return res.redirect('/admin/product/create');
  }

  next();
}

module.exports = {
  productValidation: [validation, validate]
};