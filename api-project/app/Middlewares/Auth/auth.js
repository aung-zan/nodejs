const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const headers = req.headers;

  if (! headers.authorization) {
    return res.status(401).json({
      success: false,
      message: 'Token required.'
    });
  }

  const token = headers.authorization.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token.'
      });
    }

    next();
  });
}

module.exports = authMiddleware;