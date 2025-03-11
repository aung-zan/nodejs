const Order = require("../../Models/Order");
const Product = require("../../Models/Product");
const User = require("../../Models/User");

exports.list = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId: userId });

    res.render("user/order/list.ejs", {
      title: "Order Details",
      path: "/orders",
      orders: orders
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.store = async (req, res, next) => {
  try {
    const user = req.user;
    const userId = req.user._id;

    const userCart = await user.populate("cart.items.productId");
    const cartItems = userCart.cart.items.toObject();

    const products = cartItems.map(product => (
      {  product: product.productId, quantity: product.quantity }
    ));

    const order = new Order({ products: products, userId: userId });
    await order.save();

    user.cart.items = [];
    await user.save();

    res.redirect("/orders");
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
};

