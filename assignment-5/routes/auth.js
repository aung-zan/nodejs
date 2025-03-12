const express = require("express");
const { login, auth } = require("../app/Controllers/Auth/LoginController");

const router = express.Router();

router.get("/login", login);

router.post("/login", auth);

module.exports = router;