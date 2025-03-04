const Sequelize = require("sequelize");

const sequelize = require("./Database");

const Cart = sequelize.define("carts", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;