const express = require("express");

const ProductController = require("../app/Controllers/User/ProductController");
const ShopController = require("../app/Controllers/User/ShopController");
const CartController = require("../app/Controllers/User/CartController");

const routes = express.Router();

routes.get('/', ShopController.list);

routes.get('/products', ProductController.list);
routes.get('/product/:productId', ProductController.details);

routes.get('/cart', CartController.details);
routes.post('/cart', CartController.create);
routes.post('/cart/delete', CartController.delete);

routes.get('/orders', (req, res, next) => {
  res.render("user/order/details.ejs", {
    title: "Orders Details",
    path: "/orders",
  });
});

// routes.get('/checkout');

module.exports = routes;