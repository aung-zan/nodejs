const Cart = require("../../Models/Cart");

exports.create = async (req, res, next) => {
  try {
    const data = req.body;
    const cart = new Cart();
    await cart.create(data);

    res.redirect("/");
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).send("Internal Server Error");
  }
}

exports.details = (req, res, next) => {

}

exports.delete = (req, res, next) => {

}