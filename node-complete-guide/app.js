const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const falsh = require("connect-flash");

const adminRoutes = require("./routes/admin");
const authRouters = require("./routes/auth");
const userRoutes = require("./routes/user");
const errorRoutes = require("./routes/error");

const { connectMongo, uri } = require("./app/Models/Database");
const AuthMiddleware = require("./app/Middlewares/AuthMiddleware");

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

// for flash message
app.use(falsh());

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

app.use(authRouters);
app.use(userRoutes);
app.use("/admin/", AuthMiddleware, adminRoutes);
app.use(errorRoutes);

// start the app.
(async () => {
  try {
    await connectMongo();

    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
})();