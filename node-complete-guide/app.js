const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// set template engine.
app.engine("hbs", handlebars.engine());
app.set("view engine", "hbs");
app.set("views", "views");

// get the data properly from the post request.
app.use(bodyParser.urlencoded({extended: false}));
// make the public path static.
app.use(express.static(path.join(__dirname, "public")));

app.get("/favicon.ico", (req, res, next) => {
  res.status(204).end();
});

app.use('/admin/', adminRoutes.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  const content404 = "404, Page Not Found.";

  res.status(404)
    // .sendFile(path.join(__dirname, "views", "404.html"));
    .render("404.hbs", {
      layout: "main.hbs",
      title: "Page Not Found",
      content: content404
    });
});

app.listen(3000);