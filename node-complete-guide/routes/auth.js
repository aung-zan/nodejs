const express = require("express");
const { login, auth, logout } = require("../app/Controllers/Auth/LoginController");
const { signUp, register } = require("../app/Controllers/Auth/RegisterController");
const { forgotPassword, forgot, resetPassword, reset } = require("../app/Controllers/Auth/PasswordController");

const router = express.Router();

router.get("/login", login);

router.post("/login", auth);

router.post("/logout", logout);

router.get("/forgot-password", forgotPassword);

router.post("/forgot-password", forgot);

router.get("/reset-password/:token", resetPassword);

router.post("/reset-password", reset);

router.get("/register", signUp);

router.post("/register", register)

module.exports = router;