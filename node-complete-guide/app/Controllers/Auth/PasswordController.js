const crypto = require("crypto");
const bcryptjs = require("bcryptjs");

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

exports.forgot = async (req, res, next) => {
  try {
    const buffer = await new Promise((resolve, reject) => {
      crypto.randomBytes(32, (err, buffer) => {
        if (err) reject(err);
        resolve(buffer);
      });
    });

    const token = buffer.toString("hex");

    const user = await User.findOne({ email: req.body.email });
    if (! user) {
      req.flash("error", "No account with that email founds.");
      return res.redirect("/login");
    }

    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 3600000;
    await user.save();

    const html = `
      <p>You requested a password reset.</p>
      <p>Click this <a href="http://localhost:3000/reset-password/${token}">Link</a> to set a new password.</p>
    `;

    // setTimeout(() => {
    //   sendMail(req.body.email, "Password Reset", html);
    // }, 5000);
    sendMail(req.body.email, "Password Reset", html);

    res.redirect("/login");
  } catch (error) {
    console.log(error);
    req.flash("error", "An error occured during password reset.");
    res.redirect("/forgot-password");
  }
}

exports.resetPassword = async (req, res, next) => {
  let errorMessage = req.flash("error");
  errorMessage = (errorMessage.length > 0) ? errorMessage[0] : '';

  let token = req.params.token;
  const user = await User.findOne({
    resetToken: token, resetTokenExpire: { $gt: Date.now() }
  });

  if (!user) {
    req.flash("error", "Invalid token or token expired.");
    return res.redirect("/login");
  }

  res.render("auth/resetPassword.ejs",  {
    userId: user._id,
    token: token,
    path: "/reset-password",
    title: "Reset Password",
    errorMessage: errorMessage
  });
}

exports.reset = async (req, res, next) => {
  const token = req.body.token;
  const userId = req.body.userId;
  const password = req.body.password;

  const user = await User.findOne({
    _id: userId, resetToken: token, resetTokenExpire: { $gt: Date.now() }
  });

  if (! user) {
    req.flash("error", "Invalid token or token expired.");
    return res.redirect("/login");
  }

  const hashPassword = await bcryptjs.hash(password, 12);

  user.password = hashPassword;
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;

  await user.save();

  res.redirect("/login");
}