const Order = require("../../Models/Order");
const Product = require("../../Models/Product");
const User = require("../../Models/User");

exports.list = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const orders = await Order.findAll(userId);

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
    const userId = req.user._id;
    const cart = await User.getCart(userId);

    const cartProductId = cart?.items.map(item => item.productId);
    const productInfo = await Product.findManyByIds(cartProductId);

    const cartProducts = productInfo.map(product => (
      {...product, quantity: cart?.items.find(item => (
        item.productId.equals(product._id)
      ))?.quantity}
    ));

    const order = new Order(cartProducts, userId);
    await order.create();

    await User.emptyCart(userId);

    res.redirect("/orders");
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
};

