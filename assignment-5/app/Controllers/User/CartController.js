const User = require("../../Models/User");
const Product = require("../../Models/Product");

exports.create = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const user = req.user;

    await user.addToCart(productId);

    res.redirect("/");
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.details = async (req, res, next) => {
  try {
    const user = req.user;

    const products = await user.populate("cart.items.productId");
    const productsInfo = products.cart.items;

    res.render("user/cart/details.ejs", {
      title: "Cart Details",
      path: "/cart",
      products: productsInfo
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.delete = async (req, res, next) => {
  try {
    const user = req.user;
    const _id = req.body.product_id;

    await user.cart.items.id(_id).deleteOne();
    await user.save();

    res.redirect("/cart");
  } catch (error) {
    console.error("Error deleting product in cart:", error);
    res.status(500).send("Internal Server Error");
  }
}