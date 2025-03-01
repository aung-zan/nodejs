const mysql = require("mysql2");

const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "P@ssw0rd",
  database: "node-complete"
});

module.exports = connectionPool.promise();