const list = (req, res, next) => {
  const products = [];

  res.render('user/shop/list.ejs', {
    title: 'Shop',
    path: '/',
    products: products
  });
}

module.exports = { list };