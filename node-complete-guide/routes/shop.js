const path = require("path");

const express = require("express");
const adminData = require("./admin");
const products = [
  {name: 'p1'},
  {name: 'p2'},
  {name: 'p3'},
];

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(adminData.products);

  res.render("shop.hbs", {
    layout: "main.hbs",
    title: "Product List",
    products: products
  });
});

module.exports = router;