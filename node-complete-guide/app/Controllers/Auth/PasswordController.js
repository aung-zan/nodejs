const crypto = require("crypto");
const User = require("../../Models/User");
const { sendMail } = require("../../Services/Mail");

exports.forgotPassword = (req, res, next) => {
  let errorMessage = req.flash("error");
  errorMessage = (errorMessage.length > 0) ? errorMessage[0] : '';

  res.render("auth/forgotPassword.ejs",  {
    path: "/forgot-password",
    title: "Forgot Password",
    errorMessage: errorMessage
  });
}

exports.forgot = (req, res, next) => {
  crypto.randomBytes(32, async (err, buffer) => {
    if (err) {
      console.log(err);
      res.redirect("/forgot-password");
    }

    const token = buffer.toString("hex");

    const user = await User.findOne({ email: req.body.email });

    if (! user) {
      req.flash("error", "No account with that email founds.");
    }

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 3600000;
    await user.save();

    const html = `
      <p>You requested a password reset.</p>
      <p>Click this <a href="http://localhost:3000/reset/${token}">Link</a> to set a new password.</p>
    `;

    setTimeout(() => {
      sendMail(req.body.email, "Password Reset", '', html);
    }, 5000);
  });

  res.redirect("/login");
}

exports.resetPassword = (req, res, next) => {
  let errorMessage = req.flash("error");
  errorMessage = (errorMessage.length > 0) ? errorMessage[0] : '';

  res.render("auth/resetPassword.ejs",  {
    path: "/reset-password",
    title: "Reset Password",
    errorMessage: errorMessage
  });
}

exports.reset = (req, res, next) => {
  //
}