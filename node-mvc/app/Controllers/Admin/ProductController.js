const Product = require("../../Models/Product");

exports.create = (req, res, next) => {
  res.render("admin/product/create.hbs", {
    title: "Add Product",
    addProduct: true
  });
}

exports.store = (req, res, next) => {
  const product = new Product();
  product.create(req.body);

  res.redirect('/');
}