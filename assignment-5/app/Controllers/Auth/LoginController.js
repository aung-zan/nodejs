exports.login = (req, res, next) => {
  if (req.session?.isLoggedIn) {
    return res.redirect("/admin/product");
  }

  res.render("auth/login.ejs", {
    path: "/login",
    title: "Login"
  });
}

exports.auth = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === "test@example.com" && password === "password") {
    req.session.credentials = { email: email, password: password };
    req.session.isLoggedIn = true;

    return res.redirect("/admin/product");
  }

  return res.redirect("/login");
}