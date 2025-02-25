const path = require("path");

const express = require("express");

const router = express.Router();
const products = [];

router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    layout: "main.hbs",
    title: "Add Product"
  });
});

router.post("/add-product", (req, res, next) => {
  products.push({
    name: req.body.product
  });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;