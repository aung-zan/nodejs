const Product = require("../../Models/Product");

exports.create = async (req, res, next) => {
  try {
    let cart;
    let product;
    let quantity;
    const productId = req.body.productId;

    cart = await req.user.getCart();
    if (! cart) {
      cart = await req.user.createCart();
    }

    const products = await cart.getProducts({ where: { id: productId } });

    if (products.length > 0) {
      product = products[0];
      quantity = product.cartItem.quantity + 1;
    } else {
      product = await Product.findByPk(productId);
      quantity = 1;
    }

    await cart.addProduct(product, { through: { quantity: quantity } });

    res.redirect("/");
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.details = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    res.render("user/cart/details.ejs", {
      title: "Cart Details",
      path: "/cart",
      products: products
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.delete = async (req, res, next) => {
  try {
    const productId = req.body.productId;

    const cart = await req.user.getCart();
    await cart.removeProduct([productId]);

    res.redirect("/cart");
  } catch (error) {
    console.error("Error deleting product in cart:", error);
    res.status(500).send("Internal Server Error");
  }
}