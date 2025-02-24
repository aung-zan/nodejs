const path = require("path");

const express = require("express");

const homeRoute = require("./routes/home");
const usersRoute = require("./routes/users");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(homeRoute);
app.use(usersRoute);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000);