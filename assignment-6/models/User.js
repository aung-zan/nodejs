const { Schema, model } = require("mongoose");
const Product = require('./Product');

const UserSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpire: Date,
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

UserSchema.methods.addToCart = async function (productId) {
  let products;
  const cart = this.cart;

  if (cart?.items) {
    products = cart.items;
    const exitProduct = products.find(product => product.productId.equals(productId));

    if (exitProduct) {
      exitProduct.quantity += 1;
    } else {
      products.push({ productId: productId, quantity: 1 });
    }
  } else {
    products = [{ productId: productId, quantity: 1 }];
  }

  const updatedCart = {
    items: products
  };

  this.cart = updatedCart;

  return await this.save();
};

UserSchema.methods.getCartItems = async function () {
  const cart = this.cart.items;
  const productIds = cart.map(item => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  return cart.map(item => {
    const productInfo = products.find(product => product._id.equals(item.productId));;

    return {
      ...item.toObject(),
      info: productInfo
    };
  });
}

const User = model("users", UserSchema);

module.exports = User;