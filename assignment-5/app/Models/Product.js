const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: String,
  imageUrl: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true }
});

const Product = model('products', ProductSchema);

module.exports = Product;