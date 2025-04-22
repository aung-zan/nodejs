const multer = require("multer");

const imageTypes = [
  'image/png', 'image/jpg', 'image/jpeg'
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-"  + file.originalname)
  }
});

const filter = (req, file, cb) => {
  // need to add required validation for file.
  if (imageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.flash("error", "Wrong type of image.");
    cb(null, false);
  }
}

module.exports = { storage, filter };