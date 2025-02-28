const express = require("express");

const ProductController = require("../app/Controllers/User/ProductController");
const ShopController = require("../app/Controllers/User/ShopController");

const routes = express.Router();

routes.get('/', ShopController.list);

routes.get('/products', ProductController.list);
routes.get('/product/:productId', ProductController.details);

routes.get('/cart');
routes.post('/cart');
routes.post('/cart/delete');

routes.get('/orders');

routes.get('/checkout');

module.exports = routes;