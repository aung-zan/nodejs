require("dotenv").config();

const {MongoClient} = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodejs-test.bto63.mongodb.net/?retryWrites=true&w=majority&appName=Nodejs-Test`;
const client = new MongoClient(uri);

let db;

const connectMongo = async () => {
  try {
    await client.connect();
    db = client.db("shop");
  } catch (error) {
    console.log(error);
    await client.close();
  }
};

const getDb = () => {
  if (!db) {
    throw new Error("Database not connected!");
  }

  return db;
};

module.exports = { connectMongo, getDb };