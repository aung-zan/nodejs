const fs = require("fs").promises;

const Helper = require("../../utils/Helper");
module.exports = class Module {
  constructor(dbPath) {
    this.dbFile = dbPath
  }
  /**
   * get the next id.
   * @returns number
   */
  async getNextId() {
    const data = await fs.readFile(this.dbFile, "utf-8");
    const products = data ? JSON.parse(data) : [];

    const maxId = Helper.getMaxId(products, ['id']);
    return maxId + 1;
  }

  /**
   * get all records.
   * @param {*} notCart
   * @returns array
   */
  async all(notCart = true) {
    try {
      const recordsJson = await fs.readFile(this.dbFile, "utf-8");
      if (recordsJson) {
        return JSON.parse(recordsJson);
      } else {
        return notCart ? [] : {};
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        return notCart ? [] : {};
      }
      throw error;
    }
  }

  /**
   * save a record.
   * @param {*} data
   * @param {*} notCart
   */
  async create(data, notCart = true) {
    let records;

    if (notCart) {
      data['id'] = await this.getNextId();

      records = await this.all();
      records.push(data);
    } else {
      records = data;
    }

    const recordsJson = JSON.stringify(records);

    // await this.delay(); this code is for testing.
    await fs.writeFile(this.dbFile, recordsJson, "utf-8");
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
   * @param {*} data
   */
  async update(id, data) {
    const records = await this.all();

    const recordIndex = records.findIndex(record => {
      return record.id === id;
    });

    data['id'] = id
    // Do it immutable (original array stays unchanged)
    const newRecords = [...records];
    newRecords[recordIndex] = data;

    const recordsJson = JSON.stringify(newRecords);
    await fs.writeFile(this.dbFile, recordsJson, "utf-8");
  }

  /**
   * delete a product by id.
   * @param {*} id
   */
  async delete(id) {
    const records = await this.all();

    const newRecords = records.filter(record => record.id !== id);

    const recordsJson = JSON.stringify(newRecords);
    await fs.writeFile(this.dbFile, recordsJson, "utf-8");
  }
}