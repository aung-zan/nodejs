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

  const result = await User.findOne({
    email: email,
    password: password
  });

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