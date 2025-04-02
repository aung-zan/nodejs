const list = (req, res, next) => {
  const products = [];

  res.render('user/cart/list.ejs', {
    title: 'Cart',
    path: '/cart',
    products: products
  });
}

const store = (req, res, next) => {
  //
}

const destory = (req, res, next) => {
  //
}

module.exports = { list, store, destory };