const list = (req, res, next) => {
  const products = [];

  res.render("admin/product/list.ejs", {
    title: "Admin Products",
    path: "/admin/products",
    products: products
  });
}

const create = (req, res, next) => {
  //
}

const store = (req, res, next) => {
  //
}

const edit = (req, res, next) => {
  //
}

const update = (req, res, next) => {
  //
}

const destory = (req, res, next) => {
  //
}

module.exports = { list, create, store, edit, update, destory };