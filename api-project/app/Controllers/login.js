const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

const RESPONSE = { success: true };

exports.login = async (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  };

  const user = await User.findOne({ email: data.email });

  if (user && await bcrypt.compare(data.password, user.password)) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(200).json({
      success: true,
      token: token
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Email or password is wrong.'
  });
}

exports.forgotPassword = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'Send an email to reset password.';

  return res.status(200).json(RESPONSE);
}

exports.resetPassword = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'Reset password successfully.';

  return res.status(200).json(RESPONSE);
}