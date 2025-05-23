const userRepo = require('../../Repositories/UserRepository');

const register = (req, res, next) => {
  let errorMessage = req.flash('error');
  errorMessage = (errorMessage.length > 0) ? errorMessage : '';

  res.render('auth/register.ejs', {
    path: '/register',
    title: 'Register',
    errorMessage: errorMessage
  });
}

const signUp = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;

    const user = await userRepo.findBy(email);
    if (user) {
      req.flash('error', `An account with ${email} already exists.`)
      return res.redirect('/register');
    }

    await userRepo.save(name, email, password);

    return res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong.');
    return res.redirect('/register');
  }
}

module.exports = { register, signUp };