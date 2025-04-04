const { ObjectId } = require("mongodb");
const { getDb } = require("./Database");
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async getByEmail(email) {
    const db = getDb();

    return db.collection("users")
      .findOne({ email: email });
  }

  async store() {
    const db = getDb();

    await db.collection("users")
      .insertOne(this);
  }

  static async getCart(userId) {
    const db = getDb();

    const user = await db.collection("users")
      .findOne({ _id: userId });

    return user?.cart ?? {};
  }

  static async addToCart(userId, products) {
    const db = getDb();
    const items = {
      items: products
    };

    return db.collection("users")
      .updateOne(
        { _id: userId },
        { $set: { cart: items } }
      );
  }

  static async deleteFromCart(userId, productId) {
    const db = getDb();

    return db.collection("users")
      .updateOne(
        { _id: userId },
        { $pull: { "cart.items": { productId: ObjectId.createFromHexString(productId) } } }
      )
  }

  static async emptyCart(userId) {
    const db = getDb();

    return db.collection("users")
      .updateOne(
        { _id: userId },
        { $set: { cart: {} } }
      )
  }
}

module.exports = User;