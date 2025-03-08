const { ObjectId } = require("mongodb");
const User = require("../../Models/User");
const Product = require("../../Models/Product");

exports.create = async (req, res, next) => {
  try {
    let products;
    const userId = req.user._id;
    const productId = req.body.productId;
    const ObjectProductId = ObjectId.createFromHexString(productId);

    const cart = await User.getCart(userId);

    if (cart?.items) {
      products = cart.items;
      const exitProduct = products.find(product => product.productId.equals(productId));

      if (exitProduct) {
        exitProduct.quantity += 1;
      } else {
        products.push({ productId: ObjectProductId, quantity: 1 });
      }
    } else {
      products = [{ productId: ObjectProductId, quantity: 1 }];
    }

    await User.addToCart(userId, products);

    res.redirect("/");
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.details = async (req, res, next) => {
  try {
    let productsInfo = [];
    const userId = req.user._id;

    const cart = await User.getCart(userId);

    if (cart?.items) {
      const productIds = cart.items.map(item => item.productId);
      const products = await Product.findManyByIds(productIds);

      productsInfo = cart.items.map(item => (
        {...item, info: products.find(product => {
          return product._id.equals(item.productId);
        })}
      ));
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
    const userId = req.user._id;
    const productId = req.body.productId;

    await User.delete(userId, productId);

    res.redirect("/cart");
  } catch (error) {
    console.error("Error deleting product in cart:", error);
    res.status(500).send("Internal Server Error");
  }
}