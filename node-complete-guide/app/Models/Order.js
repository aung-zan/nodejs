const { Schema, model } = require("mongoose");

const OrderSchema = Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true }
});

const Order = model("orders", OrderSchema);

module.exports = Order;