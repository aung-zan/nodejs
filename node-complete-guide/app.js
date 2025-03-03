const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./app/Models/Database");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const errorRoutes = require("./routes/error");

const User = require("./app/Models/User");
const Product = require("./app/Models/Product");
const Cart = require("./app/Models/Cart");
const CartItem = require("./app/Models/CartItem");

// initialize the app.
const app = express();

// make public path static.
app.use(express.static("public"));

// get request body properly.
app.use(bodyParser.urlencoded({extended: false}));

// add userinfo in every request. (not secure)
app.use(async (req, res, next) => {
  try {
    const user = await User.findByPk(1);
    req.user = user
    next();
  } catch (error) {
    console.log(error);
  }
});

// register routes.
app.get("/favicon.ico", (req, res, next) => {
  res.status(204).end();
});

app.use('/admin/', adminRoutes);
app.use(userRoutes);
app.use(errorRoutes);

// establish the relationships between models.
User.hasMany(Product);
User.hasOne(Cart);

Product.belongsToMany(Cart, { through: CartItem });

Cart.belongsToMany(Product, { through: CartItem });

// start the app.
(async () => {
  try {
    await sequelize.sync();
    const user = await User.findByPk(1);

    if (! user) {
      await User.create({
        name: "Aung",
        email: "test@example.com",
        password: "password"
      });
    }

    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
})();