const bcryptjs = require("bcryptjs");
const User = require("../../Models/User");

exports.signUp = (req, res, next) => {
  if (req.session?.isLoggedIn) {
    res.redirect("admin/product");
  }

  res.render("auth/register.ejs", {
    path: "/register",
    title: "Register"
  });
}

exports.register = async (req, res, next) => {
  // need to add email unique and password check validation.
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const hashPassword = await bcryptjs.hash(password, 12);

  const user = new User({ name: name, email: email, password: hashPassword });
  await user.save();

  res.redirect("/login");
}