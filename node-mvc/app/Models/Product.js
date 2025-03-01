const path = require("path");

const Model = require("./Model");

const dbFile = path.join(__dirname, "../../database/products.json");

module.exports = class Product extends Model {
  constructor() {
    super(dbFile);
  }

  async all() {
    const data = await super.all();
    return data;
  }

  async create(product) {
    return super.create(product);
  }

  async details(id) {
    const product = await super.getById(id);
    return product;
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
