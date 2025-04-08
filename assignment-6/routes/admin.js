const express = require('express');

const { list, create, store, edit, update, destory } = require('../app/Controllers/Admin/ProductController');
const { productValidation } = require('../app/Validations/product');

const routes = express.Router();

routes.get('/products', list);
routes.get('/product/create', create);
routes.post('/product', productValidation, store);
routes.get('/product/:id/edit', edit);
routes.post('/product/:id', update);
routes.post('/product/:id/delete', destory);

module.exports = routes;