const Order = require('../../models/Order');

const findAll = async () => {
  try {
    return await Order.find({});
  } catch (error) {
    throw new Error(`Unable to fetch orders: ${error.message}`);
  }
}

const save = async (data) => {
  try {
    const order = new Order(data);
    await order.save();
  } catch (error) {
    throw new Error(`Unable to save order: ${error.message}`);
  }
}

module.exports = { findAll, save }