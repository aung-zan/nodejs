const Product = require("../../Models/Product");

exports.list = async (req, res, next) => {
  try {
    const product = new Product();
    const products = await product.all();

    res.render("user/shop/list.ejs", {
      title: "Shop",
      path: "/",
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
}