const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const errorRoutes = require("./routes/error");

const { connectMongo } = require("./app/Models/Database");

// initialize the app.
const app = express();

// make public path static.
app.use(express.static("public"));

// get request body properly.
app.use(bodyParser.urlencoded({extended: false}));

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
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
})();