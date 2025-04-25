const express = require('express');

const auth = require('../app/Controllers/login');
const register = require('../app/Controllers/register');
const post = require('../app/Controllers/post');

const Router = express.Router();

Router.get('/login', auth.login);
Router.get('/forgot-password', auth.forgotPassword);
Router.get('/reset-password', auth.resetPassword);
Router.get('/register', register.register);

Router.get('/', post.list);
Router.post('/', post.store);
Router.get('/:postId', post.details);
Router.put('/:postId', post.update);
Router.delete('/:postId', post.delete);

module.exports = Router;