const fs = require("fs").promises;
const path = require("path");

const dbFile = path.join(__dirname, "../../database/database.json");
module.exports = class Module {
  async read() {
    try {
      const data = await fs.readFile(dbFile, "utf-8");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async write(product) {
    const products = await this.read();
    products.push(product);
    const data = JSON.stringify(products);

    await fs.writeFile(dbFile, data, "utf-8");
  }
}