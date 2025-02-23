const Users = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Users List</title></head>");
  res.write("<body>");
  res.write("<ul><li>User 1</li></ul>");
  res.write("</body>");
  res.write("</html>");
  res.end();
}

module.exports = Users;