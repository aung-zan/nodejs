const productRepo = require('../../Repositories/ProductRepository');

const list = async (req, res, next) => {
  let errorMessage = req.flash('error');
  errorMessage = (errorMessage.length > 0) ? errorMessage[0] : '';

  const products = await productRepo.findAll();

  res.render('user/shop/list.ejs', {
    title: 'Shop',
    path: '/',
    products: products,
    errorMessage: errorMessage
  });
}

module.exports = { list };