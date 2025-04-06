const Product = require('../../models/Product');

const findAll = async () => {
  try {
    return await Product.find({});
  } catch (error) {
    throw new Error(`Failed to fetch products: ${error}`);
  }
}

const save = async (data) => {
  try {
    const product = new Product(data);
    await product.save(data);
  } catch (error) {
    throw new Error(`Failed to save product: ${error}`);
  }
}

const findBy = async (_id) => {
  try {
    return await Product.findOne({ _id });
  } catch (error) {
    throw new Error(`Failed to fetch product: ${error}`);
  }
}

const update = async (id, data) => {
  try {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  } catch (error) {
    throw new Error(`Failed to update product: ${error}`);
  }
}

const destroy = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Failed to delete product: ${error}`);
  }
}

module.exports = { findAll, save, findBy, update, destroy };