const { ObjectId } = require("mongodb");
const { getDb } = require("./Database");
class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  static async findAll() {
    const db = getDb();
    return db.collection("products")
      .find()
      .toArray();
  }

  async create() {
    const db = getDb();
    return db.collection("products")
      .insertOne(this);
  }

  static async findById(id) {
    const db = getDb();

    return db.collection("products")
      .findOne({ _id: ObjectId.createFromHexString(id) });
  }

  static async findManyByIds(ids) {
    const db = getDb();

    return db.collection("products")
      .find( {_id: { $in: ids } } )
      .toArray();
  }

  async update(id) {
    const db = getDb();
    return db.collection("products")
      .updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: this }
      );
  }

  static async delete(id) {
    const db = getDb();

    return db.collection("products")
      .deleteOne(
        { _id: ObjectId.createFromHexString(id) }
      );
  }
}

module.exports = Product;