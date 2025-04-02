const login = (req, res, next) => {
  // let errorMessage = req.flash('error');
  let errorMessage = [];
  errorMessage = (errorMessage.length > 0) ? errorMessage[0] : '';

  res.render('auth/login.ejs', {
    path: '/login',
    title: 'Login',
    errorMessage: errorMessage
  });
}

const auth = (req, res, next) => {
  //
}

module.exports = { login, auth };