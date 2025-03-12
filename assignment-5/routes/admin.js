const express = require("express");

const ProductController = require("../app/Controllers/Admin/ProductController");

const routes = express.Router();

routes.get('/product', ProductController.list);

routes.get('/product/create', ProductController.create);

routes.post('/product', ProductController.store);

routes.get('/product/:productId/edit', ProductController.edit);

routes.post('/product/:productId', ProductController.update);

routes.post('/product/:productId/delete', ProductController.delete);

module.exports = routes;