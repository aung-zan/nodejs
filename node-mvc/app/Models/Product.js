const products = [];

module.exports = class Product {
  static create(product) {
    products.push(product);
  }

  static all() {
    return products;
  }
}
