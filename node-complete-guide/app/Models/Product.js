const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  title: { type: String, required: true },
  imageName: { type: String, required: true },
  originalImageName: { type: String, required: true },
  price: { type: String, required: true },
  description: String,
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true }
});

const Product = model('products', ProductSchema);

module.exports = Product;