const { getDb } = require("./Database");

class Order {
  constructor(items, userId) {
    this.items = items
    this.userId = userId
  }

  static async findAll(userId) {
    const db = getDb();

    return db.collection("orders")
      .find({ userId: userId })
      .toArray();
  }

  async create() {
    const db = getDb();

    return db.collection('orders')
      .insertOne(this);
  }
}

module.exports = Order;