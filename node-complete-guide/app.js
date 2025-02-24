const express = require("express");

const app = express();

app.use((req, res, next) => {
  if (req.url === '/favicon.ico') {
    res.status(204).end();
    return;
  }
  console.log("First Middleware");
  next();
});

app.use((req, res, next) => {
  res.send("<h1>Hello From The Express!</h1>")
});

app.listen(3000);