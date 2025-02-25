const express = require("express");

const router = express.Router();
const users = [];

router.get("/", (req, res) => {
  res.render("createUser.hbs", {
    createUser: true
  });
});

router.post("/", (req, res) => {
  users.push({name: req.body.name});
  res.redirect("/users");
});

exports.routes = router;
exports.users = users;