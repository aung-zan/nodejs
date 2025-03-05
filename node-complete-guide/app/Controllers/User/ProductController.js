const Product = require("../../Models/Product");

exports.list = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.render("user/product/list.ejs", {
      title: "Products List",
      path: "/products",
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.details = async (req, res, next) => {
  try {
    const id = req.params.productId;

    const product = await Product.findById(id);

    res.render("user/product/details.ejs", {
      title: "Product Details",
      path: "/products",
      product: product
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
}