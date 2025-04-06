const productRepo = require('../../Repositories/ProductRepository');

const list = async (req, res, next) => {
  const products = await productRepo.findAll();

  res.render('user/shop/list.ejs', {
    title: 'Shop',
    path: '/',
    products: products
  });
}

module.exports = { list };