const Model = require("./Model");

module.exports = class Product extends Model {
  create(product) {
    super.write(product);
  }

  async all() {
    const data = await super.read();
    return data;
  }
}
