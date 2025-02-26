const Product = require("../../Models/Product");

exports.create = (req, res, next) => {
  res.render("admin/product/create.hbs", {
    title: "Add Product",
    addProduct: true
  });
}

exports.store = (req, res, next) => {
  Product.create(req.body);

  res.redirect('/');
}