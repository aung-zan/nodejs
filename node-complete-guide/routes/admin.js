const express = require("express");

const ProductController = require("../app/Controllers/Admin/ProductController");

const routes = express.Router();

routes.get('/product/create', ProductController.create);

routes.post('/product', ProductController.store);

module.exports = routes;