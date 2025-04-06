const express = require('express');
const body = require('body-parser');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const errorRoutes = require('./routes/error');

const { connectMongo, uri } = require('./models/Database');
const { auth } = require('./app/Middlewares/auth');

// setup the app with express.
const app = express();

// setup the session storage with MongoDB.
const sessionStore = MongoDBSession({
  uri: uri,
  collection: "session",
  expires: 1000 * 60 * 60
});

// add the session storage to the app.
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false, store: sessionStore })
);

// add the public path to the app.
app.use(express.static('public'));

// add the form body to the app.
app.use(body.urlencoded({ extended: false }));

// add the flash message to the app.
app.use(flash());

app.get('/favicon.ico', (req, res, next) => {
  res.status(204).end();
});

// add the local shared data to the app.
app.use((req, res, next) => {
  res.locals.sharedData = {
    authenticated: req.session?.isAuthenticated || false
  }

  next();
});

// add the routes to the app.
app.use(authRoutes);
app.use('/admin', auth, adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);

// start the app.
(async () => {
  try {
    // connect the db.
    await connectMongo();

    // run the app with specific port.
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
})();