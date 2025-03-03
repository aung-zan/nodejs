exports.list = async (req, res, next) => {
  try {
    const orders = await req.user.getOrders({ include: ['products'] });

    res.render("user/order/list.ejs", {
      title: "Order Details",
      path: "/orders",
      orders: orders
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.store = async (req, res, next) => {
  try {
    const order = await req.user.createOrder();

    const cart = await req.user.getCart();
    const products = await cart.getProducts();

    const updateProducts = products.map(product => {
      product.orderItem = { quantity: product.cartItem.quantity };
      return product;
    });
    await order.addProducts(updateProducts);

    await cart.setProducts(null);

    res.redirect("/orders");
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Internal Server Error");
  }
};

