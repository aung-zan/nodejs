const Model = require("./Model");

const products = [];

module.exports = class Product extends Model {
  create(product) {
    products.push(product);
    super.read();
  }

  // remove static when data saving method is changed from memory.
  static all() {
    return products;
  }
}
