const forgotPassword = (req, res, next) => {
  // let errorMessage = req.flash('error');
  let errorMessage = [];
  errorMessage = (errorMessage.length > 0) ? errorMessage[0] : '';

  res.render('auth/forgotPassword.ejs', {
    path: '/forgot-password',
    title: 'Forgot Password',
    errorMessage: errorMessage
  });
}

const passwordForgot = (req, res, next) => {
  //
}

const resetPassword = (req, res, next) => {
  // let errorMessage = req.flash('error');
  let errorMessage = [];
  errorMessage = (errorMessage.length > 0) ? errorMessage[0] : '';

  res.render('auth/resetPassword.ejs', {
    path: '/reset-password',
    title: 'Reset Password',
    errorMessage: errorMessage
  });
}

const passwordReset = (req, res, next) => {
  //
}

module.exports = { forgotPassword, passwordForgot, resetPassword, passwordReset };