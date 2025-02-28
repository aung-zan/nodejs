const path = require("path");

const Model = require("./Model");

const dbFile = path.join(__dirname, "../../database/carts.json");

module.exports = class Cart extends Model {
  constructor() {
    super(dbFile);
  }

  async create(data) {
    return super.create(data);
  }

  async details() {
    //
  }

  async delete() {
    //
  }
}