const Product = require("../../Models/Product");

exports.list = async (req, res, next) => {
  try {
    const userId = req.session?.user?._id;
    const products = await Product.find({ userId: userId });

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
  let errorMessage = req.flash("error");
  errorMessage = (errorMessage.length > 0) ? errorMessage : '';

  res.render("admin/product/create.ejs", {
    title: "Add Product",
    path: "/admin/product/create",
    errorMessage: errorMessage
  });
}

exports.store = async (req, res, next) => {
  try {
    const data = req.body;
    data.userId = req.session?.user?._id;

    const product = new Product(data);
    await product.save();

    res.redirect("/admin/product");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.edit = async (req, res, next) => {
  try {
    const userId = req.session?.user?._id;
    const id = req.params.productId;

    const product = await Product.findOne({
      _id: id,
      userId: userId
    });

    if (! product) {
      res.status(404).render("404.ejs", {
        title: "Error",
        path: "",
        content: "404 Not Found."
      });
    }

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
    const userId = req.session?.user?._id;
    const id = req.params.productId;
    const data = req.body;
    data.userId = userId;

    const product = await Product.findOne({
      _id: id,
      userId: userId
    });

    if (! product) {
      res.status(403).send("Forbidden");
    }

    await Product.findByIdAndUpdate(id, data);

    res.redirect("/admin/product");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.delete = async (req, res, next) => {
  try {
    const userId = req.session?.user?._id;
    const id = req.params.productId;

    const product = await Product.findOne({
      _id: id,
      userId: userId
    });

    if (! product) {
      res.status(403).send("Forbidden");
    }

    await Product.findByIdAndDelete(id);

    res.redirect("/admin/product");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
}