const productRepo = require('../../Repositories/ProductRepository');

const list = async (req, res, next) => {
  const products = await productRepo.findAll();

  return res.render('user/product/list.ejs', {
    title: 'Products',
    path: '/products',
    products: products
  });
}

const details = async (req, res, next) => {
  const productId = req.params.id;
  const product = await productRepo.findBy(productId);

  res.render('user/product/details.ejs', {
    title: 'Products Details',
    path: '/products',
    product: product
  });
}

module.exports = { list, details };