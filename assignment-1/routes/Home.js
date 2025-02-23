const Home = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Welcome</title></head>");
  res.write("<body>");
  res.write("<h1>Welcome To The Node.js</h1>");
  res.write("<form action='/create-user' method='POST'>");
  res.write("<input type='text' name='username'>");
  res.write("<button type='submit'>Create</button>")
  res.write("</form>");
  res.write("</body>");
  res.write("</html>");
  res.end();
}

module.exports = Home;