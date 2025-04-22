const express = require("express");

const ProductController = require("../app/Controllers/User/ProductController");
const ShopController = require("../app/Controllers/User/ShopController");
const CartController = require("../app/Controllers/User/CartController");
const OrderController = require("../app/Controllers/User/OrderController");
const AuthMiddleware = require("../app/Middlewares/AuthMiddleware");

const routes = express.Router();

routes.get("/", ShopController.list);

routes.get("/products", ProductController.list);
routes.get("/product/:productId", ProductController.details);

routes.get("/cart", AuthMiddleware, CartController.details);
routes.post("/cart", AuthMiddleware, CartController.create);
routes.post("/cart/delete", AuthMiddleware, CartController.delete);

routes.get("/orders", AuthMiddleware, OrderController.list);
routes.post("/order", AuthMiddleware, OrderController.store);
routes.get("/orders/:orderId", AuthMiddleware, OrderController.download);

module.exports = routes;