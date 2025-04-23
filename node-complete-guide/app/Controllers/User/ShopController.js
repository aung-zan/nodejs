const Product = require("../../Models/Product");

const PAGE_PER_ITEM = 1;

exports.list = async (req, res, next) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const skipItems = (PAGE_PER_ITEM * page) - PAGE_PER_ITEM;

    const countProducts = await Product.countDocuments();

    const products = await Product
      .find()
      .skip(skipItems)
      .limit(PAGE_PER_ITEM);

    res.render("user/shop/list.ejs", {
      title: "Shop",
      path: "/",
      products: products,
      currentPage: page,
      prevPage: skipItems,
      nextPage: countProducts - (PAGE_PER_ITEM * page)
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
}