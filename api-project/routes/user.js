const express = require('express');

const register = require('../app/Controllers/register');
const auth = require('../app/Controllers/login');
const profile = require('../app/Controllers/profile');
const post = require('../app/Controllers/post');

const authMiddleware = require('../app/Middlewares/Auth/auth');
const { imageUpload } = require('../config/image');
const loginValidator = require('../app/Middlewares/Validations/login');
const userValidator = require('../app/Middlewares/Validations/user');
const postValidator = require('../app/Middlewares/Validations/post');

const Router = express.Router();

Router.post('/register',
  userValidator.validator,
  register.register
);

Router.post('/login',
  loginValidator.validator,
  auth.login
);
Router.get('/forgot-password', auth.forgotPassword);
Router.get('/reset-password', auth.resetPassword);

// user profile routes
Router.get('/profile/:userId',
  authMiddleware,
  profile.details
);
Router.put('/profile/:userId',
  authMiddleware, userValidator.validator,
  profile.update
);

// post routes
Router.get('/posts/',
  authMiddleware,
  post.list
);
Router.post(
  '/post/',
  authMiddleware, imageUpload.single('image'), postValidator.imageErrorHandler, postValidator.validator,
  post.store
);
Router.get('/post/:postId',
  authMiddleware,
  post.details
);
Router.put(
  '/post/:postId',
  authMiddleware, imageUpload.single('image'), postValidator.imageErrorHandler, postValidator.validator,
  post.update
);
Router.delete('/post/:postId',
  authMiddleware,
  post.delete
);

module.exports = Router;