const list = (req, res, next) => {
  const orders = [];

  res.render('user/order/list.ejs', {
    title: 'Orders',
    path: '/orders',
    orders: orders
  });
}

const store = (req, res, next) => {
  //
}

module.exports = { list, store };