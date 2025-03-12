const User = require("../../Models/User");

exports.create = async (req, res, next) => {
  try {
    const productId = req.body.productId;
    const userId = req.session?.user?._id;

    if (userId) {
      const user = await User.findOne({ _id: userId });
      await user.addToCart(productId);
    }

    res.redirect("/");
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.details = async (req, res, next) => {
  try {
    let productsInfo;
    const userId = req.session?.user?._id;

    if (! userId) {
      productsInfo = [];
    } else {
      const user = await User.findOne({ _id: userId });
      const products = await user.populate("cart.items.productId");
      productsInfo = products.cart.items;
    }

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
    const userId = req.session?.user?._id;
    const _id = req.body.product_id;

    if (userId) {
      const user = await User.findOne({ _id: userId });
      await user.cart.items.id(_id).deleteOne();
      await user.save();
    }

    res.redirect("/cart");
  } catch (error) {
    console.error("Error deleting product in cart:", error);
    res.status(500).send("Internal Server Error");
  }
}