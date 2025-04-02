const express = require('express');

const Shop = require('../app/Controllers/User/ShopController')
const Product = require('../app/Controllers/User/ProductController')
const Cart = require('../app/Controllers/User/CartController')
const Order = require('../app/Controllers/User/OrderController')

const routes = express.Router();

routes.get('/', Shop.list);

routes.get('/products', Product.list);
routes.get('/product/:id', Product.details);

routes.get('/cart', Cart.list);
routes.post('/cart', Cart.store);
routes.post('/cart/:id', Cart.destory);

routes.get('/orders', Order.list);
routes.post('/order', Order.store);

module.exports = routes;