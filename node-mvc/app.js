const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const errorRoutes = require("./routes/error");

const app = express();

// registered and set template engine.
app.engine("hbs", handlebars.engine({
  defaultLayout: "main.hbs"
}));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views/");

// make public path static.
app.use(express.static("public"));

// get request body properly.
app.use(bodyParser.urlencoded({extended: false}));

app.get("/favicon.ico", (req, res, next) => {
  res.status(204).end();
});

app.use('/admin/', adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);

app.listen(3000);