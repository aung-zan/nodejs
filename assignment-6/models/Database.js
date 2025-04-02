require("dotenv").config();

const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodejs-test.bto63.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority&appName=Nodejs-Test`;

const connectMongo = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectMongo, uri };