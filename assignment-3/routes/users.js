const path = require("path");

const express = require("express");

const route = express.Router();

route.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "users.html"));
});

module.exports = route;