const Product = require('../../models/Product');

const findAll = async () => {
  try {
    return await Product.find({});
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
}

const save = async (data) => {
  try {
    const product = new Product(data);
    await product.save();
  } catch (error) {
    throw new Error(`Failed to save product: ${error.message}`);
  }
}

const findBy = async (_id) => {
  try {
    return await Product.findOne({ _id });
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error.message}`);
  }
}

const update = async (id, data) => {
  try {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(`Failed to update product: ${error.message}`);
  }
}

const destroy = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Failed to delete product: ${error.message}`);
  }
}

module.exports = { findAll, save, findBy, update, destroy };