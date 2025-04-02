const list = (req, res, next) => {
  const products = [];

  res.render('user/product/list.ejs', {
    title: 'Products',
    path: '/products',
    products: products
  });
}

const details = (req, res, next) => {
  const product = undefined;

  res.render('user/product/details.ejs', {
    title: 'Products Details',
    path: '/products',
    products: product
  });
}

module.exports = { list, details };