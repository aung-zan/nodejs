const path = require("path");
const fs = require("fs");

const PDFDocument = require("pdfkit");

const generatePdf = (order, res) => {
  const products = order.products;
  const fontPath = path.join(__dirname, "../../public/fonts/Inconsolata-Regular.ttf");

  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream('output.pdf'));
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=hello.pdf");
  doc.pipe(res);
  doc.font(fontPath);

  let total = 0;
  const data = [
    [
      { text: "Product Item Name", font: { size: 16 } },
      { align: { x: "right" }, text: "Price", font: { size: 16 } }
    ]
  ];

  products.forEach(element => {
    data.push([
      element.product.title,
      { align: { x: "right" }, text: element.product.price }
    ]);
    total += parseFloat(element.product.price);
  });

  data.push([
    { align: { x: "right" }, text: "Total" },
    { align: { x: "right" }, text: total }
  ]);

  doc.table({
    columnStyles: [400, "*"],
    data: data
  })

  doc.end();
}

module.exports = { generatePdf };