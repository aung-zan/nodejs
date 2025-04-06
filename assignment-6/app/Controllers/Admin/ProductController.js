const productRepo = require('../../Repositories/ProductRepository');

const list = async (req, res, next) => {
  const products = await productRepo.findAll();

  return res.render("admin/product/list.ejs", {
    title: "Admin Products",
    path: "/admin/products",
    products: products
  });
}

const create = (req, res, next) => {
  return res.render('admin/product/create.ejs', {
    title: 'Admin Create Product',
    path: '/admin/product/create',
  });
}

const store = async (req, res, next) => {
  const data = req.body;
  data.userId = req.session.user._id;

  await productRepo.save(data);

  return res.redirect('/admin/products');
}

const edit = async (req, res, next) => {
  const productId = req.params.id;
  const product = await productRepo.findBy(productId);

  return res.render('admin/product/edit.ejs', {
    title: 'Admin Edit Product',
    path: '/admin/product/edit',
    product: product
  });
}

const update = async (req, res, next) => {
  const productId = req.params.id;
  const data = req.body;

  await productRepo.update(productId, data);

  return res.redirect('/admin/products');
}

const destory = async (req, res, next) => {
  const productId = req.params.id;

  await productRepo.destroy(productId);

  return res.redirect('/admin/products');
}

module.exports = { list, create, store, edit, update, destory };