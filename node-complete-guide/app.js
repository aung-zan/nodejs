const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const errorRoutes = require("./routes/error");

const { connectMongo } = require("./app/Models/Database");
const User = require("./app/Models/User");

// initialize the app.
const app = express();

// make public path static.
app.use(express.static("public"));

// get request body properly.
app.use(bodyParser.urlencoded({extended: false}));

// add userinfo in every requests. (not secure)
app.use(async (req, res, next) => {
  const user = await User.getByEmail("test@example.com");
  req.user = user;

  next();
});

// register routes.
app.get("/favicon.ico", (req, res, next) => {
  res.status(204).end();
});

app.use('/admin/', adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);

// start the app.
(async () => {
  try {
    await connectMongo();

    const user = await User.getByEmail("test@example.com");
    if (! user) {
      const u = new User("Aung", "test@example.com", "password");
      await u.store();
    }

    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
})();