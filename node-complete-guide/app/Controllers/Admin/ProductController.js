const Product = require("../../Models/Product");

exports.create = (req, res, next) => {
  res.render("admin/product/create.ejs", {
    title: "Add Product",
    path: "/admin/product/create"
  });
}

exports.store = async (req, res, next) => {
  try {
    const product = new Product();
    await product.create(req.body);

    res.redirect("/");
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
}