const bcryptjs = require("bcryptjs");

const User = require("../../Models/User");

exports.login = (req, res, next) => {
  if (req.session?.isLoggedIn) {
    return res.redirect("/admin/product");
  }

  res.render("auth/login.ejs", {
    path: "/login",
    title: "Login"
  });
}

exports.auth = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const result = await checkCredentials(email, password);

  if (result) {
    req.session.user = {
      _id: result._id,
      name: result.name,
      email: result.email,
    }
    req.session.isLoggedIn = true;

    return res.redirect("/admin/product");
  }

  return res.redirect("/login");
}

exports.logout = async (req, res, next) => {
  await req.session.destroy();

  res.redirect("/login");
}

const checkCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (user) {
    const hashPassword = user.password;

    const result = await bcryptjs.compare(password, hashPassword);

    if (result) {
      return true;
    }
  }

  return false;
}