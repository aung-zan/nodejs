const register = (req, res, next) => {
  // let errorMessage = req.flash('error');
  let errorMessage = [];
  errorMessage = (errorMessage.length > 0) ? errorMessage[0] : '';

  res.render('auth/register.ejs', {
    path: '/register',
    title: 'Register',
    errorMessage: errorMessage
  });
}

const signUp = (req, res, next) => {
  //
}

module.exports = { register, signUp };