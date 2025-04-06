const bcrypt = require('bcrypt');

const userRepo = require('../../Repositories/UserRepository');

const login = (req, res, next) => {
  let errorMessage = req.flash('error');
  errorMessage = (errorMessage.length > 0) ? errorMessage[0] : '';

  res.render('auth/login.ejs', {
    path: '/login',
    title: 'Login',
    errorMessage: errorMessage
  });
}

const auth = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      req.flash('error', 'Please add email or password');
      return res.redirect('/login');
    }

    const user = await userRepo.findBy(email);
    if (! user) {
      req.flash('error', `${email} is not registered.`);
      return res.redirect('/login');
    }

    const result = await bcrypt.compare(password, user.password);
    if (! result) {
      req.flash('error', `An email or password is incorrect.`);
      return res.redirect('/login');
    }

    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    req.session.isAuthenticated = true

    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) reject(err);

        resolve();
      });
    });

    return res.redirect('/');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong.');
    return res.redirect('/login');
  }
}

const logout = async (req, res, next) => {
  await new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) reject(err);

      resolve();
    });
  });

  return res.redirect('/login');
}

module.exports = { login, auth, logout };