const CreateUser = (req, res) => {
  const body = [];

  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const request = Buffer.concat(body).toString();
    const requestData = request.split("=");
    const [, username] = [...requestData];

    console.log(username);
  });

  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
}

module.exports = CreateUser;