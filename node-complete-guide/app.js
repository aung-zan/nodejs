const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write("<html>");
    res.write("<head><title>Enter a message</title></head>");
    res.write("<body>");
    res.write("<form action='/message' method='POST'>");
    res.write("<input type='text' name='message'>");
    res.write("<button type='submit'>Submit</button>")
    res.write("</form>");
    res.write("</body>");
    res.write("</html>");

    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const data = parseBody.split("=");
      const [, text] = [...data];
      fs.writeFileSync("test.txt", text);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");

    return res.end();
  }
});

server.listen(3000);