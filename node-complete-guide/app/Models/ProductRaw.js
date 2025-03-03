const db = require("./Database");

module.exports = class Product {
  all() {
    return db.execute("SELECT * FROM products;");
  }

  async create(data) {
    const productData = [
      data.title, data.price, data.description, data.imageUrl
    ];

    return db.execute(
      "INSERT INTO products (title, price, description, imageUrl) values(?, ?, ?, ?)",
      productData
    );
  }

  async getById(id) {
    const [productData] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);

    return productData;
  }

  async update(id, data) {
    const productData = [
      data.title, data.price, data.description, data.imageUrl, id
    ];

    return db.execute(
      "UPDATE products SET title = ?, price = ?, description = ?, imageURL = ? where id = ?",
      productData
    );
  }

  async delete(id) {
    return db.execute("DELETE FROM products where id = ?", [id]);
  }
}
