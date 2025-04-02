const express = require('express');

const { list, create, store, edit, update, destory } = require('../app/Controllers/Admin/ProductController');

const routes = express.Router();

routes.get('/products', list);
routes.get('/product/create', create);
routes.post('/product', store);
routes.get('/product/:id/edit', edit);
routes.post('/product/:id/edit', update);
routes.post('/product/:id/delete', destory);

module.exports = routes;