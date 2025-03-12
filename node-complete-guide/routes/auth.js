const express = require("express");
const { login, auth, logout } = require("../app/Controllers/Auth/LoginController");

const router = express.Router();

router.get("/login", login);

router.post("/login", auth);

router.post("/logout", logout);

module.exports = router;