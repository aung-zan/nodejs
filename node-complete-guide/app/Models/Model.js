const fs = require("fs").promises;
const path = require("path");

const Helper = require("../../utils/Helper");

const dbFile = path.join(__dirname, "../../database/database.json");
module.exports = class Module {
  /**
   * get the next id.
   * @returns number
   */
  async getNextId() {
    const data = await fs.readFile(dbFile, "utf-8");
    const products = data ? JSON.parse(data) : [];

    const maxId = Helper.getMaxId(products, ['id']);
    return maxId + 1;
  }

  // for testing purpose.
  delay() {
    return new Promise(resolve => {
      setTimeout(resolve, 5000);
    })
  }

  /**
   * get all records.
   * @returns array
   */
  async all() {
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

  /**
   * save a record.
   * @param {*} product
   */
  async create(product) {
    product['id'] = await this.getNextId();

    const products = await this.all();
    products.push(product);
    const data = JSON.stringify(products);

    // await this.delay(); this code is for testing.
    await fs.writeFile(dbFile, data, "utf-8");
  }

  /**
   * get a record by id.
   * @param {*} id
   * @returns object
   */
  async getById(id) {
    const records = await this.all();
    // TODO: think when empty array and wrong id.
    let filterRecord;

    records.forEach(record => {
      if (record.id === id) {
        filterRecord = record;
      }
    });

    return filterRecord;
  }

  /**
   * update a product by id.
   * @param {*} id
   * @param {*} product
   */
  async update(id, product) {
    const records = await this.all();

    const recordIndex = records.findIndex(record => {
      return record.id === id;
    });

    product['id'] = id
    // Do it immutable (original array stays unchanged)
    const newRecords = [...records];
    newRecords[recordIndex] = product;

    const data = JSON.stringify(newRecords);
    await fs.writeFile(dbFile, data, "utf-8");
  }

  async delete(id) {
    const records = await this.all();

    const newRecords = records.filter(record => record.id !== id);

    const data = JSON.stringify(newRecords);
    await fs.writeFile(dbFile, data, "utf-8");
  }
}