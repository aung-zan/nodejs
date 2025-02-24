const express = require("express");

const app = express();

app.use("/favicon.ico", (req, res, next) => {
  res.status(204).end();
});

app.use("/users", (req, res, next) => {
  console.log("url is /users.");
  res.send("<h1>Users List</h1>");
});

app.use("/", (req, res, next) => {
  console.log("url is /.");
  res.send("<h1>Hello From Express.js!</h1>");
});

app.listen(3000);