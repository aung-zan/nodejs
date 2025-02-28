const path = require("path");

const Model = require("./Model");

const dbFile = path.join(__dirname, "../../database/carts.json");

module.exports = class Cart extends Model {
  constructor() {
    super(dbFile);
  }

  addQty(cart, data) {
    const cartSize = Object.keys(cart).length;

    // empty cart
    if (cartSize == 0) {
      data['qty'] = 1;

      cart['products'] = [data];
      cart['totalPrice'] = data.price;

      return cart;
    }

    const productIndex = cart.products.findIndex(product => product.id === data.id);

    // incoming product doesn't exit in cart.
    if (productIndex < 0) {
      data['qty'] = 1;

      cart['products'] = [...cart.products, data];
      cart['totalPrice'] += data.price;

      return cart;
    }

    // incoming product exits in cart.
    const newProducts = [...cart.products];
    const productInCart = newProducts[productIndex];
    productInCart['qty'] ++;

    cart['products'] = newProducts;
    cart['totalPrice'] += productInCart['price'];

    return cart;
  }

  // { id: 1, title: 'T1', price: '1' }
  async create(data) {
    const cart = await super.all(false);

    const cartData = this.addQty(cart, data);

    return super.create(cartData, false);
  }

  async details() {
    const cart = await super.all();

    return cart;
  }

  async delete() {
    //
  }
}