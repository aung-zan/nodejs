const express = require("express");

const router = express.Router();

router.use((req, res) => {
  res.status(404).render("404.hbs", {
    content: "404, Not Found!"
  });
});

exports.routes = router;