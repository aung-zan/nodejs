const express = require('express');

const { login, auth } = require('../app/Controllers/Auth/LoginController');
const { register, signUp } = require('../app/Controllers/Auth/RegisterController');
const { forgotPassword, passwordForgot, resetPassword, passwordReset } = require('../app/Controllers/Auth/PasswordController');

const routes = express.Router();

routes.get('/login', login);
routes.post('/login', auth);

routes.get('/register', register);
routes.post('/register', signUp);

routes.get('/forgot-password', forgotPassword);
routes.post('/forgot-password', passwordForgot);
routes.get('/reset-password', resetPassword);
routes.post('/reset-password', passwordReset);

module.exports = routes;