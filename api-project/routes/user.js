const express = require('express');

const welcome = require('../app/Controllers/welcome');

const Router = express.Router();

Router.get('/', welcome.index);

module.exports = Router;