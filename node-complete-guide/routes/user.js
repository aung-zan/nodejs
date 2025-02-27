const express = require("express");

const ProductController = require("../app/Controllers/User/ProductController");

const routes = express.Router();

routes.get('/', ProductController.list);

module.exports = routes;