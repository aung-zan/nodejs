const Product = require("../../Models/Product");

exports.list = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.render("admin/product/list.ejs", {
      title: "Product List",
      path: "/admin/product",
      products: products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.create = (req, res, next) => {
  res.render("admin/product/create.ejs", {
    title: "Add Product",
    path: "/admin/product/create"
  });
}

exports.store = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {title, price, description, imageUrl} = req.body;

    const p = new Product(title, price, description, imageUrl, userId);
    await p.create();

    res.redirect("/admin/product");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.edit = async (req, res, next) => {
  try {
    const id = req.params.productId;

    const product = await Product.findById(id);

    res.render("admin/product/edit.ejs", {
      title: "Edit Product",
      path: "/admin/product",
      product: product
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.update = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const id = req.params.productId;

    const {title, price, description, imageUrl} = req.body;

    const p = new Product(title, price, description, imageUrl, userId);
    await p.update(id);

    res.redirect("/admin/product");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.productId;

    await Product.delete(id);

    res.redirect("/admin/product");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
}