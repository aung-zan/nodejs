const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const adminRoutes = require("./routes/admin");
const authRouters = require("./routes/auth");
const userRoutes = require("./routes/user");
const errorRoutes = require("./routes/error");

const { connectMongo, uri } = require("./app/Models/Database");
const User = require("./app/Models/User");

// initialize the app.
const app = express();

const store = new MongoDBStore({
  uri: uri,
  collection: "sessions",
  expires: 1000 * 60 * 60,
});

// make public path static.
app.use(express.static("public"));

// get request body properly.
app.use(bodyParser.urlencoded({extended: false}));

// session config
app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false, store: store })
);

// register routes.
app.get("/favicon.ico", (req, res, next) => {
  res.status(204).end();
});

// share data to views.
app.use((req, res, next) => {
  res.locals.sharedData = {
    loggedIn: req.session?.isLoggedIn || false
  };

  next();
});

app.use(userRoutes);
app.use(authRouters);
app.use("/admin/", (req, res, next) => {
  if (! req.session?.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});
app.use('/admin/', adminRoutes);
app.use(errorRoutes);

// start the app.
(async () => {
  try {
    await connectMongo();

    const user = await User.findOne({ email: "test@example.com" });
    if (! user) {
      const user = new User({ name: "Aung", email: "test@example.com", password: "password" });
      await user.save();
    }

    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
})();