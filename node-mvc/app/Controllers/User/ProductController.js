const Product = require("../../Models/Product");

exports.list = (req, res, next) => {
  const products = Product.all();

  res.render("user/product/list.hbs", {
    title: "Product List",
    productList: true,
    products: products,
    emptyProduct: products.length <= 0,
  });
}