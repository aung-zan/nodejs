const bcryptjs = require("bcryptjs");
const User = require("../../Models/User");

exports.signUp = (req, res, next) => {
  if (req.session?.isLoggedIn) {
    res.redirect("admin/product");
  }

  let errorMessage = req.flash("error");
  errorMessage = (errorMessage.length > 0) ? errorMessage[0] : '';

  res.render("auth/register.ejs", {
    path: "/register",
    title: "Register",
    errorMessage: errorMessage
  });
}

exports.register = async (req, res, next) => {
  // need to add email unique and password check validation.
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const userExit = await User.findOne({ email: email });
  if (userExit) {
    req.flash("error", `An account with ${email} is already exist.`);

    return res.redirect("/register");
  }

  const hashPassword = await bcryptjs.hash(password, 12);

  const user = new User({ name: name, email: email, password: hashPassword });
  await user.save();

  res.redirect("/login");
}