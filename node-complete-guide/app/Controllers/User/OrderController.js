const Order = require("../../Models/Order");
const User = require("../../Models/User");
const { generatePdf } = require("../../Services/Invoice");

exports.list = async (req, res, next) => {
  try {
    let orders;

    const userId = req.session?.user?._id;

    if (! userId) {
      orders = [];
    } else {
      orders = await Order.find({ userId: userId });
    }

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
    const userId = req.session?.user._id;

    if (userId) {
      const user = await User.findOne({ _id: userId });
      const userCart = await user.populate("cart.items.productId");
      const cartItems = userCart.cart.items.toObject();

      const products = cartItems.map(product => (
        {  product: product.productId, quantity: product.quantity }
      ));

      const order = new Order({ products: products, userId: userId });
      await order.save();

      user.cart.items = [];
      await user.save();
    }

    res.redirect("/orders");
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.download = async (req, res, next) => {
  try {
    const orderId = req.params?.orderId;
    const userId = req.session?.user._id;

    const order = await Order.findOne({ _id: orderId });

    if (! order) {
      req.flash("error", "Order not found.");
      return res.redirect("/orders");
    }

    if (! order.userId.equals(userId)) {
      req.flash("error", "Cannot access order.");
      return res.redirect("/orders");
    }

    generatePdf(order, res);
  } catch (error) {

  }
}

