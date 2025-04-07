const express = require('express');

const { auth } = require('../app/Middlewares/auth');

const Shop = require('../app/Controllers/User/ShopController')
const Product = require('../app/Controllers/User/ProductController')
const Cart = require('../app/Controllers/User/CartController')
const Order = require('../app/Controllers/User/OrderController')

const routes = express.Router();

routes.get('/', Shop.list);

routes.get('/products', Product.list);
routes.get('/product/:id', Product.details);

routes.get('/cart', auth, Cart.list);
routes.post('/cart', auth, Cart.store);
routes.post('/cart/delete', auth, Cart.destory);

routes.get('/orders', auth, Order.list);
routes.post('/order', auth, Order.store);

module.exports = routes;