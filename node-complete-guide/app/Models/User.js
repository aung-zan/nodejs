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
}

module.exports = User;