const express = require("express");
const createUser = require("./createUser");

const router = express.Router();
const users = createUser.users;

router.get('/users', (req, res) => {
  res.render("userList.hbs", {
    userList: true,
    users: users
  });
});

exports.routes = router;