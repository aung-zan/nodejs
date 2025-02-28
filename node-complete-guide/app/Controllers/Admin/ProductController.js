const Product = require("../../Models/Product");

exports.list = async (req, res, next) => {
  try {
    const product = new Product();
    const products = await product.all();

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
    const product = new Product();
    await product.create(req.body);

    res.redirect("/admin/product");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.edit = async (req, res, next) => {
  const id = Number(req.params.productId);

  const p = new Product();
  const product = await p.getById(id);

  res.render("admin/product/edit.ejs", {
    title: "Edit Product",
    path: "/admin/product",
    product: product
  });
}

exports.update = async (req, res, next) => {
  const id = Number(req.params.productId);

  const product = new Product();
  await product.update(id, req.body);

  res.redirect("/admin/product");
}

exports.delete = async (req, res, next) => {
  const id = Number(req.params.productId);

  const product = new Product();
  await product.delete(id);

  res.redirect("/admin/product");
}