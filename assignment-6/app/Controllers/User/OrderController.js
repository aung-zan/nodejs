const mongoose = require('mongoose');

const orderRepo = require('../../Repositories/OrderRepository');
const userRepo = require('../../Repositories/UserRepository');

const list = async (req, res, next) => {
  const orders = await orderRepo.findAll();

  res.render('user/order/list.ejs', {
    title: 'Orders',
    path: '/orders',
    orders: orders
  });
}

const store = async (req, res, next) => {
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    const userId = req.session?.user?._id;

    const user = await userRepo.findById(userId);
    await user.populate('cart.items.productId');
    const cartInfo = user.cart.items.toObject();

    const products = cartInfo.map((item) => (
      { product: item.productId, quantity: item.quantity }
    ));

    await orderRepo.save({ products: products, userId: user._id });

    user.cart.items = [];
    await user.save();

    await dbSession.commitTransaction();
    return res.redirect('/orders');

  } catch (error) {
    await dbSession.abortTransaction();

    console.error(error);

    req.flash('Unable to create order.');
    return res.redirect('/cart');

  } finally {
    dbSession.endSession();
  }
}

module.exports = { list, store };