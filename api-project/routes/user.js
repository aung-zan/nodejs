const express = require('express');

const auth = require('../app/Controllers/login');
const register = require('../app/Controllers/register');
const profile = require('../app/Controllers/profile');
const post = require('../app/Controllers/post');

const Router = express.Router();

Router.post('/login', auth.login);
Router.get('/forgot-password', auth.forgotPassword);
Router.get('/reset-password', auth.resetPassword);
Router.post('/register', register.register);

Router.get('/profile/:userId', profile.details);
Router.put('/profile/:userId', profile.update);

Router.get('/posts/', post.list);
Router.post('/post/', post.store);
Router.get('/post/:postId', post.details);
Router.put('/post/:postId', post.update);
Router.delete('/post/:postId', post.delete);

module.exports = Router;