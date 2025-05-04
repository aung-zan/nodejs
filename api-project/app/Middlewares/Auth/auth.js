const jwt = require('jsonwebtoken');
require('dotenv').config();

const extractToken = (authHeader) => {
  if (! authHeader) return null;
  const [bearer, token] = authHeader.split(' ');
  return token;
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

const authMiddleware = (req, res, next) => {
  const headers = req.headers;
  const token = extractToken(headers?.authorization);

  if (! token) {
    return res.status(401).json({
      success: false,
      message: 'Token required.'
    });
  }

  const decoded = verifyToken(token);

  if (! decoded) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }

  req.userId = decoded.id;

  next();
}

module.exports = authMiddleware;