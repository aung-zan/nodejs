const path = require("path");

const express = require("express");

const route = express.Router();

route.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../", "views", "home.html"));
});

module.exports = route;