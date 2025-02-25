const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const createUser = require("./routes/createUser");
const userList = require("./routes/userList");
const route404 = require("./routes/404");

const app = express();

// setup template engine
app.engine("hbs", handlebars.engine({
  defaultLayout: "main.hbs"
}));
app.set("view engine", "hbs");
app.set("views", "views");

// make public path static.
app.use(express.static("public"));

// use bodyParser to get the form value.
app.use(bodyParser.urlencoded({extended: false}));

app.get("/favicon.ico", (req, res, next) => {
  res.status(204).end();
});

app.use(createUser.routes);
app.use(userList.routes);
app.use(route404.routes);

app.listen(3000);