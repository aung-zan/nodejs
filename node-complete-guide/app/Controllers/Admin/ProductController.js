const Product = require("../../Models/Product");

const { deleteImage } = require("../../../utils/Helper");

const RESPONSE = { status: "success" };

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
    if (! req.file) {
      return res.redirect("/admin/product/create");
    }

    const data = req.body;
    data.userId = req.session?.user?._id;
    data.imageName = req.file.filename;
    data.originalImageName = req.file.originalname;

    const product = new Product(data);
    await product.save();

    return res.redirect("/admin/product");
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).send("Internal Server Error");
  }
}

exports.edit = async (req, res, next) => {
  try {
    let errorMessage = req.flash("error");
    errorMessage = (errorMessage.length > 0) ? errorMessage : '';

    const userId = req.session?.user?._id;
    const id = req.params.productId;

    const product = await Product.findOne({
      _id: id,
      userId: userId
    });

    if (! product) {
      return res.status(404).render("404.ejs", {
        title: "Error",
        path: "",
        content: "404 Not Found."
      });
    }

    return res.render("admin/product/edit.ejs", {
      title: "Edit Product",
      path: "/admin/product",
      product: product,
      errorMessage: errorMessage
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).send("Internal Server Error");
  }
}

exports.update = async (req, res, next) => {
  try {
    const userId = req.session?.user?._id;
    const id = req.params.productId;
    const data = req.body;
    data.userId = userId;

    if (req?.file) {
      await deleteImage(data.imageName);

      data.imageName = req.file.filename;
      data.originalImageName = req.file.originalname;
    }

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
      RESPONSE.status = "failed";
      RESPONSE.message = "Forbidden";

      res.status(403).json(RESPONSE);
    }

    await deleteImage(product.imageName);

    await Product.findByIdAndDelete(id);

    RESPONSE.message = "Successfully deleted.";

    return res.status(200).json(RESPONSE);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send("Internal Server Error");
  }
}