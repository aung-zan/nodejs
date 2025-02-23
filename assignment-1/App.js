const http = require("http");
const Home = require("./routes/Home");
const Users = require("./routes/Users");
const CreateUser = require("./routes/CreateUser");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    Home(req, res);
  }

  if (url === "/users") {
    Users(req, res);
  }

  if (url === "/create-user" && method === "POST") {
    CreateUser(req, res);
  }
});

server.listen(3000);