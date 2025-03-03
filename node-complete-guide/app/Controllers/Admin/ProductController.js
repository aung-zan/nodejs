const { where } = require("sequelize");
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
    await Product.create({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      description: req.body.description
    });

    res.redirect("/admin/product");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.edit = async (req, res, next) => {
  const id = req.params.productId;

  const product = await Product.findByPk(id);

  res.render("admin/product/edit.ejs", {
    title: "Edit Product",
    path: "/admin/product",
    product: product
  });
}

exports.update = async (req, res, next) => {
  const id = req.params.productId;

  await Product.update({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description
  }, {
    where: {
      id: id
    }
  })

  res.redirect("/admin/product");
}

exports.delete = async (req, res, next) => {
  const id = req.params.productId;

  await Product.destroy({
    where: {
      id: id
    }
  })

  res.redirect("/admin/product");
}