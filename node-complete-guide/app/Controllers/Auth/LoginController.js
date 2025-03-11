exports.login = (req, res, next) => {
  res.render("auth/login.ejs", {
    path: "/login",
    title: "Login"
  });
}

exports.auth = (req, res, next) => {
  console.log(req.body);
}