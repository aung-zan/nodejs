const express = require('express');

const auth = require('../app/Controllers/login');
const register = require('../app/Controllers/register');
const profile = require('../app/Controllers/profile');
const post = require('../app/Controllers/post');

const { imageUpload } = require('../config/image');
const userValidator = require('../app/Validations/user');
const postValidator = require('../app/Validations/post');

const Router = express.Router();

Router.post('/login', auth.login);
Router.get('/forgot-password', auth.forgotPassword);
Router.get('/reset-password', auth.resetPassword);
Router.post('/register', userValidator.validator, register.register);

Router.get('/profile/:userId', profile.details);
Router.put('/profile/:userId', userValidator.validator, profile.update);

Router.get('/posts/', post.list);
Router.post(
  '/post/', imageUpload.single('image'),
  postValidator.imageErrorHandler,
  postValidator.validator,
  post.store
);
Router.get('/post/:postId', post.details);
Router.put(
  '/post/:postId', imageUpload.single('image'),
  postValidator.imageErrorHandler,
  postValidator.validator,
  post.update
);
Router.delete('/post/:postId', post.delete);

module.exports = Router;