const Product = require('../../models/Product');

const findAll = async (userId) => {
  try {
    const options = {};

    if (userId) options.userId = userId;

    return await Product.find(options);
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

const findBy = async (_id, userId) => {
  try {
    const options = { _id: _id };

    if (userId) options.userId = userId;

    return await Product.findOne(options);
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