// const mysql = require("mysql2");

// const connectionPool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "P@ssw0rd",
//   database: "node-complete"
// });


const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "node-complete",
  "root",
  "P@ssw0rd",
  {
    dialect: "mysql",
    host: "localhost"
  }
);

module.exports = sequelize;