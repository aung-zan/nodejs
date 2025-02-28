const Model = require("./Model");

module.exports = class Product extends Model {
  async all() {
    const data = await super.all();
    return data;
  }

  async create(product) {
    return super.create(product);
  }

  async edit(id) {
    const product = await super.getById(id);
    return product;
  }

  async update(id, data) {
    return super.update(id, data);
  }

  async delete(id) {
    return super.delete(id);
  }
}
