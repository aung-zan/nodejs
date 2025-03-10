const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

const User = model("users", UserSchema);

module.exports = User;