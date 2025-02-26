const express = require("express");

const routes = express.Router();

routes.use((req, res, next) => {
  res.status(404).render("404.hbs", {
    content: "404 Not Found."
  });
});

module.exports = routes;