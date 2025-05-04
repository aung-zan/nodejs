const { body, validationResult } = require('express-validator');
const { removeImage } = require('../../../utils/Helper');

const validations = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('The title field is required.'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('The description field is required.')
];

// After validation process.
const afterValidation = async (req, res, next) => {
  const errors = validationResult(req);

  if (! errors.isEmpty()) {
    const errorsObj = {};

    if (req.file) {
      const filename = req.file.filename;
      await removeImage(filename);
    }

    errors.array().map(err => errorsObj[err.path] = err.msg);
    if (! req.file && req.method === 'POST') {
      errorsObj['image'] = 'The image field is required.';
    }

    return res.status(422).json({
      success: false,
      message: errorsObj
    });
  }

  next();
}

// Image error handler.
const imageErrorHandler = (err, req, res, next) => {
  if (err) {
    return res.status(422).json({
      success: false,
      message: {
        image: err.message
      }
    })
  }

  next();
}

module.exports = {
  validator: [validations, afterValidation],
  imageErrorHandler
};