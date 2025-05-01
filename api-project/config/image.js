const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/images');
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + ':' + Math.round(Math.random() * 1E9);
    cb(null, uniquePrefix + '-' + file.originalname)
  }
});

module.exports = { diskStorage };