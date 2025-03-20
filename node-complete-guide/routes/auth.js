const express = require("express");
const { login, auth, logout } = require("../app/Controllers/Auth/LoginController");
const { signUp, register } = require("../app/Controllers/Auth/RegisterController");

const router = express.Router();

router.get("/login", login);

router.post("/login", auth);

router.post("/logout", logout);

router.get("/register", signUp);

router.post("/register", register)

module.exports = router;