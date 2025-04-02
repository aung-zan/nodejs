const express = require('express');
const body = require('body-parser');
const session = require('express-session');
const MongodbSession = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/error');

const app = express();

app.use(express.static('public'));

app.use(body.urlencoded({ extended: false }));

app.use(flash());

app.get('/favicon.ico', (req, res, next) => {
  res.status(204).end();
});

app.use((req, res, next) => {
  res.locals.sharedData = {
    authenticated: req.session?.isAuthenticated || false
    // authenticated: true
  }

  next();
});

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);

(async () => {
  app.listen(3000);
})();