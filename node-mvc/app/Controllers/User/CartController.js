const Cart = require("../../Models/Cart");
const Product = require("../../Models/Product");

exports.create = async (req, res, next) => {
  try {
    const productId = Number(req.body.productId);

    const p = new Product();
    const product = await p.details(productId);

    if (!product) {
      throw new Error("Product not found");
    }
    const cartData = {id: productId, title: product.title, price: Number(product.price)};

    const cart = new Cart();
    await cart.create(cartData);

    res.redirect("/");
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.details = async (req, res, next) => {
  try {
    const c = new Cart();
    const cart = await c.details();

    res.render("user/cart/details.ejs", {
      title: "Cart Details",
      path: "/cart",
      cart: cart
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.delete = async (req, res, next) => {
  try {
    const productId = Number(req.body.productId);

    const cart = new Cart();
    await cart.delete(productId);

    res.redirect("/cart");
  } catch (error) {
    console.error("Error deleting product in cart:", error);
    res.status(500).send("Internal Server Error");
  }
}