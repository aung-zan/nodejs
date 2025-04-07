const userRepo = require('../../Repositories/UserRepository');
const productRepo = require('../../Repositories/ProductRepository');

const list = async (req, res, next) => {
  const userId = req.session?.user?._id;
  const user = await userRepo.findById(userId);

  const products = await user.getCartItems();

  res.render('user/cart/list.ejs', {
    title: 'Cart',
    path: '/cart',
    products: products
  });
}

const store = async (req, res, next) => {
  const userId = req.session?.user?._id;
  const productId = req.body.productId;

  const existingProduct = await productRepo.findBy(productId);
  if (! existingProduct) {
    req.flash('error', 'The requested product is not created.');
    return res.redirect('/');
  }

  const user = await userRepo.findById(userId);
  await user.addToCart(productId);

  return res.redirect('/cart');
}

const destory = async (req, res, next) => {
  const userId = req.session?.user?._id;
  const _id = req.body.product_id;

  const user = await userRepo.findById(userId);
  await user.cart.items.id(_id).deleteOne();
  await user.save();

  return res.redirect('/cart');
}

module.exports = { list, store, destory };